import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const Poll = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    question: {
      type: String,
      required: [true, 'Question required'],
      minLenght: 5,
      maxLength: 120
    },
    options: [
      {
        _id: { type: String, default: () => nanoid(8) },
        value: {
          type: String,
          required: [true, 'Option required'],
          minlength: 2,
          maxLength: 24
        },
        votes: { type: Number, default: 0 }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default new mongoose.model('Poll', Poll);
