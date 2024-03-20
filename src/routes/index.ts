import { IncomingMessage, ServerResponse } from 'http';
import { routes } from './api';
import { CustomError, HttpStatus } from '../core/errors';

export async function handleRequest(req: IncomingMessage, res: ServerResponse, url: URL) {
  const routeHandler = routes[url.pathname];

  if (routeHandler) {
    try {
      await routeHandler(req, res);
    } catch (error) {
      throw error;
    }
  } else {
    throw new CustomError('404 Page not found', HttpStatus.NOT_FOUND);
  }
}
