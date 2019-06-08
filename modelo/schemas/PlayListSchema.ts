import mongoose from 'mongoose';
import { Track } from '../Track';

const Schema = mongoose.Schema;

export const albumSchema = new Schema({
  id: {
    type: Schema.Types.String,
    require: true,
  },
  name: {
    type: Schema.Types.String,
    require: true,
  },
  genders: {
    type: [Schema.Types.String],
    require: true,
  },
  maxDuration: {
    type: Schema.Types.Number,
    require: true,
  },
  tracks: {
    type: [Track],
    require: true,
  },
});
