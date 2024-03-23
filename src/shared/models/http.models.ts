import { IncomingMessage, ServerResponse } from 'http';

export enum ContentType {
  ApplicationJson = 'application/json',
  XWwwFormUrlencoded = 'application/x-www-form-urlencoded',
  MultipartFormData = 'multipart/form-data'
}

export enum RoutePath {
  AuthLogin = '/auth/login',
  AuthRegistration = '/auth/registration'
}

export type Route = {
  [key in RoutePath]: (req: CustomRequest, res: ServerResponse) => void;
};

export interface CustomRequest<T = any> extends IncomingMessage {
  body: T;
}
