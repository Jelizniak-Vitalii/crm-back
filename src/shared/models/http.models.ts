import { IncomingMessage } from 'http';

export enum ContentType {
  ApplicationJson = 'application/json',
  XWwwFormUrlencoded = 'application/x-www-form-urlencoded',
  MultipartFormData = 'multipart/form-data'
}

export interface CustomRequest<T = any> extends IncomingMessage {
  body: T;
}
