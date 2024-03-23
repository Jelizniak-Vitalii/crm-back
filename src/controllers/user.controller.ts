import { getUserByEmail } from '../repositories/users.repository';

export async function getUserByEmailService(email: string) {
  return await getUserByEmail(email);
}
