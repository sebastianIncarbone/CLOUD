import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const trackSchema = new Schema({
  id: {
    type: Schema.Types.String,
    require: true,
  },
  name: {
    type: Schema.Types.String,
    require: true,
  },
  albumName: {
    type: Schema.Types.String,
    require: true,
  },
  genders: {
    type: [Schema.Types.String],
    require: true,
  },
  duration: {
    type: Schema.Types.Number,
    require: true,
  },
});
