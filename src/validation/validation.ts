import Joi from 'joi';
import { CustomError, HttpStatus } from '../core/errors';

export async function validate<T>(data: T, schema: Joi.ObjectSchema) {
  try {
    const { error }: Joi.ValidationResult = schema.validate(data);

    if (error) {
      throw new CustomError(error.details[0].message, HttpStatus.BAD_REQUEST);
    }

    // @ts-ignore
    return error ? error.details[0].message : null;
  } catch (error) {
    throw new CustomError('Ошибка при валидации данных');
  }
}
