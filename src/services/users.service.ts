import { createUser, getUserByEmail } from '../repositories/users.repository';
import { CustomError, HttpStatus } from '../core/errors';

export async function getUserByEmailService(email: string) {
  return await getUserByEmail(email);
}

export async function createUserService(user: any) {
  const candidate = await getUserByEmailService(user.email);

  if (candidate) {
    throw new CustomError('User already exists', HttpStatus.BAD_REQUEST);
  }

  return await createUser(user);
}
