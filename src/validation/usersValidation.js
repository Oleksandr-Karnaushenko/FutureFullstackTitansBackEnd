
import Joi from 'joi';

export const userValidateScheme = Joi.object({
  name: Joi.string().min(2).max(64).optional().messages({
    'string.base': '"Name" should be a text',
    'string.empty': '"Name" cannot be empty',
    'string.min': '"Name" should have at least 2 characters',
    'string.max': '"Name" should not exceed 64 characters',
  }),

  email: Joi.string().email().optional().messages({
    'string.email': '"Email" must be a valid email address',
    'string.empty': '"Email" cannot be empty',
  }),

  gender: Joi.string().valid('male', 'female').optional().messages({
    'any.only': '"Gender" must be one of "male", "female"',
  }),

  avatarUrl: Joi.string().uri().optional().messages({
    'string.uri': '"Avatar URL" must be a valid URL',
  }),

  dailyNorm: Joi.number().min(0).max(10000).optional().messages({
    'number.base': '"Daily Norm" must be a number',
    'number.min': '"Daily Norm" must be at least 0',
    'number.max': '"Daily Norm" cannot exceed 10000',
  }),
});
