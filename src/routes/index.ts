import { ServerResponse } from 'http';
import { routes } from './api';
import { CustomError, HttpStatus } from '../core/errors';
import { CustomRequest, RoutePath } from '../shared';

export async function handleRequest(req: CustomRequest, res: ServerResponse, url: URL) {
  const routeHandler = routes[url.pathname as RoutePath];

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

function parseClientPath(serverPath: string, clientPath: string) {
  const serverPathComponents = serverPath.split('/');
  const clientPathComponents = clientPath.split('/');

  if (serverPathComponents.length !== clientPathComponents.length) {
    return null; // Пути имеют разную длину, не соответствуют
  }

  const params: any = {};
  for (let i = 0; i < serverPathComponents.length; i++) {
    const serverPathComponent = serverPathComponents[i];
    const clientPathComponent = clientPathComponents[i];

    if (serverPathComponent.startsWith(':')) {
      // Если компонент шаблона пути сервера начинается с :, это параметр
      const paramName = serverPathComponent.slice(1);
      params[paramName] = clientPathComponent;
    } else if (serverPathComponent !== clientPathComponent) {
      // Если компоненты не совпадают и не являются параметрами, пути не соответствуют
      return null;
    }
  }

  return params;
}
