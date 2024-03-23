import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import busboy from 'busboy';
import * as bodyParser from 'body-parser';

import { ContentType, CustomRequest } from '../shared';
import { CustomError } from '../core/errors';
import { log } from '../utils/logger';

const jsonParser = bodyParser.json({ limit: '10mb' });
const urlencodedParser = bodyParser.urlencoded({ extended: true });

export async function parseUrl(req: IncomingMessage): Promise<URL> {
  const parsedUrl = new URL(req.url || '', `https://${req.headers.host}`);
  parsedUrl.pathname = parsedUrl.pathname.replace(/^\/api-crm/, '');
  log(JSON.stringify(req.url));
  log(JSON.stringify(parsedUrl));

  return parsedUrl;
}

export async function parseRequest(req: IncomingMessage, res: ServerResponse): Promise<CustomRequest> {
  return new Promise( async (resolve, reject) => {
    try {
      const contentType = req.headers['content-type'];

      if (contentType === ContentType.ApplicationJson) {
        jsonParser(req, res, () => resolve(req as CustomRequest));
      } else if (contentType === ContentType.XWwwFormUrlencoded) {
        urlencodedParser(req, res, () => resolve(req as CustomRequest))
      } else if (contentType?.includes(ContentType.MultipartFormData)) {
        await parseFormData(req);
        resolve(req as CustomRequest);
      } else {
        throw new CustomError('Error processing request body');
      }
    } catch (error) {
      reject(error);
    }
  })
}

async function parseFormData(req: IncomingMessage): Promise<void> {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    const formData: any = {};

    bb.on(
      'file',
      (
        fieldName: string,
        fileStream: NodeJS.ReadableStream,
        fileName: string,
        __: string,
        mimeType: string
      ) => {
        fileStream.on('data', (data) => {
          formData[fieldName] = data;
        });

        fileStream.on('end', () => {});
    });

    bb.on('field', (fieldName: string, val: any) => {
      if (fieldName === 'fields') {
        formData[fieldName] = JSON.parse(val);
      } else {
        formData[fieldName] = val;
      }
    });

    bb.on('finish', () => {
      (req as CustomRequest).body = formData;
      resolve();
    });

    bb.on('error', (err: Error) => {
      reject(err);
    });

    req.pipe(bb);
  });
}
