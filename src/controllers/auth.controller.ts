import { ServerResponse } from 'http';

import { CustomRequest } from '../shared';
import { loginService, registrationService } from '../services';
import { loginSchema, registerSchema, validate } from '../validation';

export async function loginController(req: CustomRequest, res: ServerResponse) {
  await validate(req.body, loginSchema);

  const token = await loginService(req.body.email, req.body.password);

  res.end(JSON.stringify({ token }));
}

export async function registrationController(req: CustomRequest, res: ServerResponse) {
  await validate(req.body, registerSchema);

  const token = await registrationService(req.body);

  res.end(JSON.stringify({ token }));
}
