import { create, pool, read, update } from '../db';
import { hashPassword } from '../utils/auth';

export async function getUserById(userId: string) {
  return await read(
    'users',
    userId,
    ['id', 'first_name', 'last_name', 'email', 'phone', 'user_name', 'age', 'role_id']
  );
}

export async function getUserByEmail(email: string) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

export async function createUser(user: any) {
  const password = await hashPassword(user.password);
  return await create('users', { ...user, password });
}

export async function updateUser(user: any) {
  return await update(
    'users',
    user.id,
    user
  );
}
