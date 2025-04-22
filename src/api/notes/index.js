const express = require('express');
const {
  getAllNotes,
  createNote,
  deleteNoteById,
  updateNoteById,
} = require('./notesController');
const validateBodyMiddleware = require('../../middleware/validateBodyMiddleware');
const validateParamsMiddleware = require('../../middleware/validateParamsMiddleware');
const {
  validateCreateNoteRequest,
  validateUpdateNoteRequest,
  validateNoteIdParams,
} = require('../../schemas/notesSchema');

const router = express.Router();

const validateNoteId = validateParamsMiddleware({
  validateFunction: validateNoteIdParams,
});

router
  .route('/')
  .get(getAllNotes)
  .post(
    validateBodyMiddleware({validateFunction: validateCreateNoteRequest}),
    createNote
  );

router
  .route('/:id')
  .patch(
    validateNoteId,
    validateBodyMiddleware({validateFunction: validateUpdateNoteRequest}),
    updateNoteById
  )
  .delete(validateNoteId, deleteNoteById);

module.exports = router;
