
import Joi from 'joi';

//   gender: Joi.string().valid('male', 'female').optional().messages({
//     'any.only': '"Gender" must be one of "male", "female"',
//   }),

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
  avatarUrl: Joi.string().uri().optional().messages({
    'string.uri': '"Avatar URL" must be a valid URL',
     }),
})

export const updateUserValidation = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': '"Email" must be a valid email address',
  }),
});

export const updateUserWaterIntakeValidation = Joi.object({
  dailyNorm: Joi.number().min(0).max(15000).required().messages({
    'number.min': '"Daily Water Intake" must be at least 0 ml',
    'number.max': '"Daily Water Intake" cannot exceed 15000 ml',
    'any.required': '"Daily Water Intake" is required',
  }),
});

