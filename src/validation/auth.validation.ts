import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().min(4).required(),
  password: Joi.string().min(4).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  age: Joi.number().optional().allow(null),
  phone: Joi.string().optional().allow('', null),
  role_id: Joi.number().optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().min(4).required(),
  password: Joi.string().min(4).required()
});
