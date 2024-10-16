import Joi from 'joi';

export const waterValidateScheme = Joi.object({
  date: Joi.string().isoDate().required().messages({
    'string.isoDate': '"Date" must be a valid ISO date (YYYY-MM-DD)',
    'any.required': '"Date" is required',
  }),

  userId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': '"User ID" must be a valid UUID',
    'any.required': '"User ID" is required',
  }),

  dailyNorm: Joi.number().min(0).max(10000).required().messages({
    'number.min': '"Daily Norm" must be at least 0',
    'number.max': '"Daily Norm" cannot exceed 10000',
    'any.required': '"Daily Norm" is required',
  }),

  waterVolume: Joi.number().min(0).max(10000).required().messages({
    'number.min': '"Water Volume" must be at least 0',
    'number.max': '"Water Volume" cannot exceed 10000',
    'any.required': '"Water Volume" is required',
  }),
});
