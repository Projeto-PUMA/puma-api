'use strict';

const Antl = use('Antl');

class Register {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      username: `string|required|unique:users,username`,
      education_level: 'in:superior completo, superior incompleto, medio completo, medio incompleto, fundamental completo, fundamental incompleto|required',
      profession: 'string|required',
      name: 'string|required',
      email: `required|email|unique:users,email`,
      password: 'string|required',
    };
  }

  get messages () {
    return Antl.list('validation');
  }

  async fails (errorMessages) {
    return this.ctx.response.status(422).json({ errors: errorMessages });
  }
}

module.exports = Register;
