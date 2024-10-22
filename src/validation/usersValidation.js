import Joi from 'joi';

export const userRegistrationValidation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '"Email" must be a valid email address',
    'any.required': '"Email" is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.min': '"Password" must be at least 8 characters long',
    'string.max': '"Password" cannot be longer than 64 characters',
    'any.required': '"Password" is required',
  }),
});

export const userLoginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '"Email" must be a valid email address',
    'any.required': '"Email" is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.min': '"Password" must be at least 8 characters long',
    'string.max': '"Password" cannot be longer than 64 characters',
    'any.required': '"Password" is required',
  }),
});

export const avatarUserUrlValidation = Joi.object({
  avatarUrl: Joi.string().uri().messages({
    'string.uri': '"Avatar URL" must be a valid URL',
  }),
});

export const updateUserDataValidation = Joi.object({
  name: Joi.string().min(2).max(32).optional().messages({
    'string.min': '"Name" must be at least 2 characters long',
    'string.max': '"Name" cannot be longer than 100 characters',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': '"Email" must be a valid email address',
  }),
  password: Joi.string().min(8).max(64).optional().messages({
    'string.min': '"Password" must be at least 8 characters long',
    'string.max': '"Password" cannot be longer than 64 characters',
    'any.required': '"Password" is required',
  }),
  oldPassword: Joi.string().min(8).max(64).optional().messages({
    'string.min': '"Password" must be at least 8 characters long',
    'string.max': '"Password" cannot be longer than 64 characters',
    'any.required': '"Password" is required',
  }),
  gender: Joi.string().valid('male', 'female').optional().messages({
    'any.only': '"Gender" must be one of "male", "female"',
  }),
});

export const updateUserWaterIntakeValidation = Joi.object({
  dailyNorm: Joi.number().min(0).max(15000).required().messages({
    'number.min': '"Daily Water Intake" must be at least 0 ml',
    'number.max': '"Daily Water Intake" cannot exceed 15000 ml',
    'any.required': '"Daily Water Intake" is required',
  }),
});
