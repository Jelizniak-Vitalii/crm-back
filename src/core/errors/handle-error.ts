import { ServerResponse } from 'http';

import { CustomError } from './custom-error';
import { ContentType } from '../../shared';
import { log, LogLevel } from '../../utils/logger';

export async function handleError(err: any, res: ServerResponse) {
  if (err instanceof CustomError) {
    log(err.message, LogLevel.ERROR);

    res.writeHead(err.statusCode, { 'Content-Type': ContentType.ApplicationJson });
    res.end(JSON.stringify({ status: err.statusCode, message: err.message }));
  } else {
    log(err.message, LogLevel.ERROR);

    res.writeHead(500, { 'Content-Type': ContentType.ApplicationJson });
    res.end(JSON.stringify({ status: 500, message: 'Internal server error' }));
  }
}
