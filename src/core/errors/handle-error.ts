import { ServerResponse } from 'http';
import { CustomError } from './custom-error';
import { ContentType } from '../../shared';

export async function handleError(err: any, res: ServerResponse) {
  if (err instanceof CustomError) {
    console.log(`${err.message}`, 'error');

    res.writeHead(err.statusCode, { 'Content-Type': ContentType.ApplicationJson });
    res.end(JSON.stringify({ status: err.statusCode, message: err.message }));
  } else {
    console.log(`${err.message}`, 'error');

    res.writeHead(500, { 'Content-Type': ContentType.ApplicationJson });
    res.end(JSON.stringify({ status: 500, message: 'Internal server error' }));
  }
}
