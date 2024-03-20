import http, { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import cors from 'cors';

import { handleRequest } from './routes';
import { handleError } from './core/errors';
import { parseRequest } from './services';

const corsMiddleware = cors({
  methods: 'GET,POST,PUT,DELETE'
});

function handleCors(req: IncomingMessage, res: ServerResponse) {
  return new Promise(resolve => corsMiddleware(req, res, resolve));
}

export const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    await handleCors(req, res);
    await parseRequest(req, res);

    const parsedUrl = new URL(req.url || '', `https://${req.headers.host}`);
    parsedUrl.pathname = parsedUrl.pathname.replace(/^\/api/, '');

    await handleRequest(req, res, parsedUrl);
  } catch (error) {
    await handleError(error, res);
  }
});
