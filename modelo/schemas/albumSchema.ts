import mongoose from 'mongoose';

const schema = mongoose.Schema;

const albumSchemaJSON = {
  _id: {
    type: schema.Types.Number,
    require: true,
  },
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
    type: [schema.Types.ObjectId],
    ref: 'Track',
  },
};

export const albumSchema = new schema(albumSchemaJSON);
