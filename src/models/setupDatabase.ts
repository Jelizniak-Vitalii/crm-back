import { createUsersTable } from './user';
import { createRolesTable } from './roles';

export async function setupDatabase() {
  try {
    await createRolesTable();
    await createUsersTable();
  } catch (error) {
    console.log(error);
  }
}
