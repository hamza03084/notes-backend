const Notes = require('../../models/notesModel');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

const createNote = catchAsync(async (req, res) => {
  const note = await Notes.create({...req.body, user: req.user.id});
  res.status(201).json(note);
});

const getAllNotes = catchAsync(async (req, res) => {
  const notes = await Notes.find({user: req.user.id});
  res.status(200).json(notes);
});

const updateNoteById = catchAsync(async (req, res, next) => {
  const note = await Notes.findOneAndUpdate(
    {_id: req.params.id, user: req.user.id},
    req.body,
    {new: true, runValidators: true}
  );
  if (!note) {
    return next(new AppError('Note not found', 404));
  }
  res.status(200).json(note);
});

const deleteNoteById = catchAsync(async (req, res, next) => {
  const note = await Notes.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!note) {
    return next(new AppError('Note not found', 404));
  }
  res.status(200).json({message: 'Note successfully deleted'});
});

module.exports = {
  createNote,
  getAllNotes,
  updateNoteById,
  deleteNoteById,
};
