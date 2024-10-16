import Joi from 'joi';

export const addWaterValidation = Joi.object({
  date: Joi.string().isoDate().required().messages({
    'string.isoDate': '"Date" must be a valid ISO date (YYYY-MM-DD)',
    'any.required': '"Date" is required',
  }),
  waterVolume: Joi.number().min(0).max(5000).required().messages({
    'number.min': '"Water Volume" must be at least 0',
    'number.max': '"Water Volume" cannot exceed 5000',
    'any.required': '"Water Volume" is required',
  }),
});

export const updateWaterValidation = Joi.object({
  date: Joi.string().isoDate().required().messages({
    'string.isoDate': '"Date" must be a valid ISO date (YYYY-MM-DDTHH:mm)"',
    'any.required': '"Date" is required',
  }),
  waterVolume: Joi.number().min(0).max(5000).required().messages({
    'number.min': '"Water Volume" must be at least 0',
    'number.max': '"Water Volume" cannot exceed 5000',
    'any.required': '"Water Volume" is required',
  }),
});

