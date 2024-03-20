import { HttpStatus } from './errors.models';

export class CustomError extends Error {
  statusCode: HttpStatus;

  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
