const Yup = require('yup');
const {validate, mongooseIdValidate} = require('../utils/validatorUtils');
const {TAGS_ENUM} = require('../constants/notes');

const validateCreateNoteRequest = (note) => {
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(255),
    content: Yup.string().required('Content is required'),
    tags: Yup.array().of(Yup.string().oneOf(TAGS_ENUM)),
  });

  return validate(schema, note);
};

const validateUpdateNoteRequest = (note) => {
  const schema = Yup.object().shape({
    title: Yup.string().max(255),
    content: Yup.string(),
    tags: Yup.array().of(Yup.string().oneOf(TAGS_ENUM)),
  });

  return validate(schema, note);
};

const validateNoteIdParams = (note) => {
  const schema = Yup.object().shape({
    id: mongooseIdValidate('Note'),
  });

  return validate(schema, note);
};

module.exports = {
  validateCreateNoteRequest,
  validateUpdateNoteRequest,
  validateNoteIdParams,
};
