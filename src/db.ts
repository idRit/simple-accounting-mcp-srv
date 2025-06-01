import knex, { Knex } from 'knex';
import 'dotenv/config';

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT || 0),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  }
});

export async function checkDbConnection(): Promise<Knex> {
  return new Promise(async (resolve, reject) => {
    try {
      // Run a simple query like SELECT 1
      await db.raw('SELECT 1');
      console.log('✅ Database connection successful');
      resolve(db);
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      reject(error);
    }
  });
}

export default db;