'use strict';

const Antl = use('Antl');

class User {
  get validateAll () {
    return true;
  }

  get rules () {
    const userId = this.ctx.params.id;

    return {
      username: `string|required|unique:users,username,id,${userId}`,
      education_level: 'in:superior completo, superior incompleto, medio completo, medio incompleto, fundamental completo, fundamental incompleto'|'required',
      profession: 'string|required',
      name: 'string|required',
      email: `required|email|unique:users,email,id,${userId}`
    };
  }

  get messages () {
    return Antl.list('validation');
  }

  async fails (errorMessages) {
    return this.ctx.response.status(422).json({ errors: errorMessages });
  }
  static get traits () {
    return [
      '@provider:Rocketseat/Acl/HasRole',
      '@provider:Rocketseat/Acl/HasPermission'
    ]
  }
}

module.exports = User;
