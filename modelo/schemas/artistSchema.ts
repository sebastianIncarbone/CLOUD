import mongoose from 'mongoose';

import { albumDB } from '../AdministradorMongoDB';

const schema = mongoose.Schema;

const artistSchemaJSON = {
  name: {
    type: schema.Types.String,
    require: true,
  },
  country: {
    type: schema.Types.String,
    require: true,
  },
  albums: {
    type: [albumDB],
    ref: 'Album',
  },
};

export const artistSchema = new schema(artistSchemaJSON);
