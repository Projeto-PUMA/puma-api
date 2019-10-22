'use strict'
const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Event = use('Event');
const { randomBytes } = use('crypto');
const { promisify } = use('util');
const moment = use('moment');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  async login ({ request, auth, response }) {
    const { email, password } = request.only([
      'email', 'password'
    ]);

    const token = await auth.attempt(email, password);
    const user = await User.findBy({ email });
    return response.ok({ user, token });
  }

  async register({ request, response }) {
    try {
      const data = request.only(['name', 'email', 'password', 'education_level', 'username', 'profession']);
      const user = await User.create(data);
      const random = await promisify(randomBytes)(16);
      const token = random.toString('hex');
      await user.tokens().create({
        token,
        type: 'validate-register'
      });
      await Event.fire('auth::register', { name: user.name, email: user.email, token });
      return response.ok({});
    }
    catch (error) {
      return error;
    }
  }

  async confirmation({ request, response }) {
    const token = await Token.findByOrFail('token', request.only(['token']).token);

    if(!moment(token.created_at).isAfter(moment().subtract(1, 'hours')) || token.is_revoked){
      return response.badRequest({error: 'Expired Token'})
    }

    const user = await token.user().fetch();
    await user.merge({ account_status: true });
    await user.save()

    await token.merge({ is_revoked: true });
    await token.save()

    return response.ok();
  }

  async forgotPassword({ request, response }) {
    let { email } = request.only(['email']);
    const user = await User.findByOrFail({ email });
    const random = await promisify(randomBytes)(16);
    const token = random.toString('hex');
    await user.tokens().create({
      token,
      type: 'forgot-password'
    });
    await Event.fire('auth::forgotPassword', { email: user.email, token });
    return response.ok();
  }

  async resetPassword({ request, response }) {
    let { password } = request.only(['password']);
    const token = await Token.findByOrFail('token', request.only(['token']).token);

    if(!moment(token.created_at).isAfter(moment().subtract(1, 'hours')) || token.is_revoked){
      return response.badRequest({error: 'Expired Token'})
    }

    const user = await token.user().fetch();
    await user.merge({ password: password });
    await user.save();

    await token.merge({ is_revoked: true });
    await token.save();

    await Event.fire('auth::resetPassword', { email: user.email });
    return response.ok();
  }

  async login({auth, request, response}) {
    const { email, password } = request.only([
      'email', 'password'
    ]);

    const token = await auth.attempt(email, password);
    const user = await User.findBy({ email });
    return response.ok({ user, token });
  }
}

module.exports = AuthController
