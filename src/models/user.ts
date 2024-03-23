import { pool } from '../db';
import { log, LogLevel } from '../utils/logger';

export const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),       
        password VARCHAR(255) NOT NULL,
        role_id INT DEFAULT 1,
        FOREIGN KEY (role_id) REFERENCES roles(role_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    log('Users table created successfully');
  } catch (error: any) {
    log(`Error creating users table: ${error.message}`, LogLevel.ERROR);
    throw error;
  }
};
