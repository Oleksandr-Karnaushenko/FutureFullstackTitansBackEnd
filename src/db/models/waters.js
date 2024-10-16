import { Schema, model } from 'mongoose';

import mongooseError from '../../utils/mongoosError.js';

const waterSchema = new Schema(
  {
    waterVolume: {
      type: Number,
      required: true,
    },
    dailyNorm: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

waterSchema.post('save', mongooseError);
waterSchema.post('findOneAndUpdate', mongooseError);

const WaterCollection = model('water', waterSchema);

export default WaterCollection;
