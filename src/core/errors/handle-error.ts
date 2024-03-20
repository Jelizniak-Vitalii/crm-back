import { ServerResponse } from 'http';
import { CustomError } from './custom-error';

export async function handleError(err: any, res: ServerResponse) {
  if (err instanceof CustomError) {
    console.log(`${err.message}`, 'error');

    res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: err.statusCode, message: err.message }));
  } else {
    console.log(`${err.message}`, 'error');

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 500, message: 'Internal server error' }));
  }
}
