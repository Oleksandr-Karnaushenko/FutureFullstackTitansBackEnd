import Joi from 'joi';

export const authRegisterUserSchema = Joi.object({
//   name: Joi.string().min(3).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const authLoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
