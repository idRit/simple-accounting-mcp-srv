import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { checkDbConnection } from './db';
import { Knex } from 'knex';
import initRoutes from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

checkDbConnection().then(async (db: Knex) => {
  db.schema.hasTable('transactions').then(exists => {
    if (!exists) {
      return db.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.string('origin').notNullable();
        table.decimal('amount', 14, 2).notNullable();
        table.enu('type', ['credit', 'debit']).notNullable();
        table.timestamp('date').defaultTo(db.fn.now()).notNullable();
      });
    }
  });

  app.get('/', (req: any, res: any) => {
    return res.json({
      success: true
    });
  });

  const routes = await initRoutes(db);
  app.use('/transaction', routes);

  app.listen(4200);
  console.log('Running on Port 4200');
});
