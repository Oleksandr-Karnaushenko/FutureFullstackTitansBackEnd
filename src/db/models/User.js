import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
      enum: ['man', 'woman'],
      default: 'woman',
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

const UserCollection = model('user', userSchema);

export default UserCollection;
