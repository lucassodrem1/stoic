import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'stoic',
  password: 'admin123',
  port: 5432,
});

pool
  .connect()
  .then(client => {
    console.log('DB connected!');
    client.release();
  })
  .catch(err => console.log(err));

export const query = (text: any, params: any) => pool.query(text, params);
