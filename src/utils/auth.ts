import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string | number, role_id: number) => {
  return jwt.sign({ id, role_id }, 'SECRET_KEY_RANDOM', {expiresIn: "2h"} );
}

export async function checkIsPasswordValid(
  password: string,
  passwordFromDB: string,
) {
  return await bcrypt.compare(password, passwordFromDB);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 5);
}
