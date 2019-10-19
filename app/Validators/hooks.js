const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Validator = use('Validator');
  const Database = use('Database');
  const Moment = use('moment');

  const doubleFn = async (data, field, message, args, get) => {
    const value = get(data, field);

    if (!value) {
      return;
    }

    const double = String(value).match(/^\d+\.\d{0,2}$/g);

    if (!double) {
      throw message;
    }
  };

  Validator.extend('double', doubleFn);


  const checkDatetimeFormat = async (data, field, message, args, get) => {
    const value = get(data, field);

    if (!value) {
      return;
    }

    const valid = Moment(value, 'YYYY-MM-DD HH:mm:ss', true);

    if (valid.isValid() === false) {
      throw message;
    }
  };

  Validator.extend('checkDatetimeFormat', checkDatetimeFormat);


  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field);
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return;
    }

    const [table, column] = args;
    const row = await Database.table(table).where(column, value).first();

    if (!row) {
      throw message;
    }
  };

  Validator.extend('exists', existsFn);
});
