import { Schema, model } from 'mongoose';

import mongooseError from '../../utils/mongoosError.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'female',
      required: true,
    },
    dailyNorm: {
      type: Number,
      default: 1500,
    },
    avatarUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', mongooseError);
userSchema.post('findOneAndUpdate', mongooseError);

const UserSchema = model('user', userSchema);

export default UserSchema;
