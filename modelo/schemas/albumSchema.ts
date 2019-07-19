import mongoose from 'mongoose';

import { trackDB } from '../AdministradorMongoDB';

const schema = mongoose.Schema;

const albumSchemaJSON = {
  name: {
    type: schema.Types.String,
    require: true,
  },
  year: {
    type: schema.Types.Number,
    require: true,
  },
  artistName: {
    type: schema.Types.String,
    require: true,
  },
  tracks: {
    type: [trackDB],
    ref: 'Track',
  },
};

export const albumSchema = new schema(albumSchemaJSON);
