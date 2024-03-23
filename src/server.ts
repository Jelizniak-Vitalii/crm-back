import http, { IncomingMessage, ServerResponse } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { handleRequest } from './routes';
import { handleError } from './core/errors';
import { parseRequest, parseUrl } from './services';
import { CustomRequest } from './shared';

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

    await handleRequest(req as CustomRequest, res, parsedUrl);
  } catch (error) {
    await handleError(error, res);
  }
});
