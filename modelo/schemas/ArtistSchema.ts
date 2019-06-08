import mongoose from 'mongoose';
import { Album } from '../Album';

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
  country: {
    type: Schema.Types.String,
    require: true,
  },
  albums: {
    type: [Album],
    require: true,
  },
});
