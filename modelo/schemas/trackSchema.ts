import mongoose from 'mongoose';

const schema = mongoose.Schema;

const trackSchemaJSON = {
  _id: {
    type: schema.Types.Number,
    require: true,
  },
  name: {
    type: schema.Types.String,
    require: true,
  },
  albumName: {
    type: schema.Types.String,
    require: true,
  },
  genres: {
    type: [schema.Types.String],
    require: true,
  },
  duration: {
    type: schema.Types.Number,
    require: true,
  },
  lyrics: {
    type: schema.Types.String,
  },
};

export const trackSchema = new schema(trackSchemaJSON);
