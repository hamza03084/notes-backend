const Yup = require('yup');
const {validate} = require('../utils/validatorUtils');

const commonAuthSchema = {
  email: Yup.string()
    .email()
    .required('Email is required')
    .test('email', 'Email is not valid', (value) => {
      // This custom regex test enhances email validation to address limitations in the default Yup validation, which fails to catch certain invalid email formats like "test@test" or "test@test.c".
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),
  password: Yup.string()
    .required('Password is required')
    .min(
      8,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    )
    .matches(
      /[A-Z]/,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    ),
  name: Yup.string().min(1).max(255).required('Name is required'),
};

const validateCreateRequest = (user) => {
  const schema = Yup.object().shape(commonAuthSchema);

  return validate(schema, user);
};

const validateLoginRequest = (user) => {
  const schema = Yup.object().shape({
    email: commonAuthSchema.email,
    password: commonAuthSchema.password,
  });

  return validate(schema, user);
};

module.exports = {
  validateCreateRequest,
  validateLoginRequest,
};
