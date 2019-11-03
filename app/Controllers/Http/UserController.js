/* eslint-disable no-unused-vars */

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User');

class UserController {
  async index({ request, response, view }) {
    const users = await User.all();
    return response.ok({ users });
  }

  async show({ params, request, response }) {
    const { id } = params;
    const user = await User.findOrFail(id);

    return response.ok({ user });
  }

  async update({ params, request, response }) {
    const { id } = params;
    const data = request.only([
      'username',
      'name',
      'email',
      'profession',
      'education_level',
    ]);

    const user = await User.findOrFail(id);
    await user.merge(data);
    await user.save();
    return response.ok({ user });
  }

  async destroy({ params, response }) {
    const { id } = params;
    const user = await User.find(id);
    await user.delete();
    return response.noContent();
  }

  async grantRoles({ request, params, response }) {
    const { id } = params;
    const { roles } = request.only(['roles']);
    const user = await User.find(id);
    await user.roles().attach(roles);
    await user.load('roles');
    return response.ok({ user });
  }

  async showRoles({ params, response }) {
    const { id } = params;
    const user = await User.findOrFail(id);
    await user.load('roles');
    return response.ok({ user });
  }

  async revokeRoles({ request, params, response }) {
    const { id } = params;
    const { roles } = request.only(['roles']);
    const user = await User.find(id);
    await user.roles().detach(roles);
    await user.load('roles');
    return response.ok({ user });
  }
}

module.exports = UserController;
