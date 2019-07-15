import mongoose from 'mongoose';

import { trackDB } from '../AdministradorMongoDB';

const schema = mongoose.Schema;

const playlistSchemaJSON = {
  _id: {
    type: schema.Types.Number,
    require: true,
  },
  name: {
    type: schema.Types.String,
    require: true,
  },
  genders: {
    type: [schema.Types.String],
    require: true,
  },
  maxDuration: {
    type: schema.Types.Number,
    require: true,
  },
  tracks: {
    type: [trackDB],
    ref: 'Track',
  },
};

export const playlistSchema = new schema(playlistSchemaJSON);
