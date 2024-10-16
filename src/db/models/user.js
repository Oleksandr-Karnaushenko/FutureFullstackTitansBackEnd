import { Schema, model } from 'mongoose';
import Joi from 'joi';

import mongooseError from '../../utils/mongoosError.js';

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

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginWithTokenSchema = Joi.object({
  token: Joi.string().required(),
});

const schema = {
  registerSchema,
  loginSchema,
  loginWithTokenSchema,
};
const User = model('user', userSchema);

export default { User, schema };
