import mongoose from 'mongoose';
import { Track } from '../Track';

const Schema = mongoose.Schema;

export const albumSchema = new Schema({

  id: {
    type: Schema.Types.String,
    require: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  firstName: {
    type: Schema.Types.String,
    required: true,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    require: true,
  },
  year: {
    type: Schema.Types.Number,
    require: true,
  },
  artistName: {
    type: Schema.Types.String,
    require: true,
  },
  tracks: {
    type: [Track],
    require: true,
  },
});
