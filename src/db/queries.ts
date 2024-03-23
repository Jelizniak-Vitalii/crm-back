import { pool } from './connection';

export async function query(sql: string, args: any) {
  return await pool.query(sql, args);
}

export async function read(table: string, id: string, fields = ['*']) {
  const names = fields.join(', ');
  const sql = `SELECT ${names} FROM ${table}`;
  if (!id) return pool.query(sql);
  return await pool.query(`${sql} WHERE id = $1`, [id]);
}

export async function create(table: string, { ...record }) {
  const keys = Object.keys(record);
  const nums = new Array(keys.length);
  const data = new Array(keys.length);
  let i = 0;
  for (const key of keys) {
    data[i] = record[key];
    nums[i] = `$${++i}`;
  }
  const fields = '"' + keys.join('", "') + '"';
  const params = nums.join(', ');
  const sql = `INSERT INTO "${table}" (${fields}) VALUES (${params})`;
  return await pool.query(sql, data);
}

export async function update(table: string, id: string, { ...record }) {
  const keys = Object.keys(record);
  const updates = new Array(keys.length);
  const data = new Array(keys.length);
  let i = 0;
  for (const key of keys) {
    data[i] = record[key];
    updates[i] = `${key} = $${++i}`;
  }
  const delta = updates.join(', ');
  const sql = `UPDATE ${table} SET ${delta} WHERE id = $${++i}`;
  data.push(id);
  return await pool.query(sql, data);
}

export async function deleteColumn(table: string, id: string) {
  const sql = `DELETE FROM ${table} WHERE id = $1`;
  return await pool.query(sql, [id]);
}
