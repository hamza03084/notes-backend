const Yup = require('yup');
const mongoose = require('mongoose');

module.exports.validate = async (schema, data) => {
  return await schema
    .validate(data, {abortEarly: false, stripUnknown: true})
    .then((parameters) => {
      return {parameters};
    })
    .catch((error) => {
      return {
        errors: error.errors.join(', '),
      };
    });
};

module.exports.mongooseIdValidate = (name) => {
  return Yup.string()
    .required(`${name} ID is required`)
    .test({
      name: 'Id validation',
      message: `Invalid ${name} id`,
      test: (value) => (value ? mongoose.Types.ObjectId.isValid(value) : true),
    });
};
