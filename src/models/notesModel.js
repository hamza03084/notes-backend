const mongoose = require('mongoose');

const {TAGS_ENUM} = require('../constants/notes');
const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        enum: TAGS_ENUM,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;
