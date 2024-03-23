import { CustomError, HttpStatus } from '../core/errors';
import { getUserByEmailService } from '../controllers';
import { checkIsPasswordValid, generateAccessToken } from '../utils/auth';
import { createUserService } from './users.service';

export async function loginService(email: string, password: string) {
  const user: any = await getUserByEmailService(email);

  if (!user) {
    throw new CustomError('User not found', HttpStatus.UNAUTHORIZED);
  }

  const isPasswordValid = await checkIsPasswordValid(password, user.password);

  if (!isPasswordValid) {
    throw new CustomError('Invalid email address or password', HttpStatus.UNAUTHORIZED);
  }

  return generateAccessToken(user.id, user.role_id || 1);
}

export async function registrationService(user: any) {
  const candidate = await getUserByEmailService(user.email);

  if (candidate) {
    throw new CustomError('User already exist', HttpStatus.NOT_FOUND);
  }

  await createUserService(user);
  const newUser = await getUserByEmailService(user.email);

  return await generateAccessToken(newUser.id, newUser.role_id);
}
