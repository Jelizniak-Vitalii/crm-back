import http, { IncomingMessage, ServerResponse } from 'http';
import cors from 'cors';

import { handleRequest } from './routes';
import { handleError } from './core/errors';
import { parseRequest, parseUrl } from './services';

const corsMiddleware = cors({
  methods: 'GET,POST,PUT,DELETE'
});

function handleCors(req: IncomingMessage, res: ServerResponse) {
  return new Promise(resolve => corsMiddleware(req, res, resolve));
}

export const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const parsedUrl = await parseUrl(req);
    await handleCors(req, res);
    await parseRequest(req, res);

    await handleRequest(req, res, parsedUrl);
  } catch (error) {
    await handleError(error, res);
  }
});
