import { pool } from '../db';
import { log, LogLevel } from '../utils/logger';

export const createRolesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS roles (
        role_id SERIAL PRIMARY KEY,
        role_name VARCHAR(100) NOT NULL
       );
    `);

    log('Roles table created successfully');
  } catch (error: any) {
    log(`Error creating roles table: ${error.message}`, LogLevel.ERROR);
  }
};
