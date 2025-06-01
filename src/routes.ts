import { Router } from 'express';
import { Knex } from 'knex';
import initController from './controller';

const router = Router();

export default async (db: Knex) => {
  const controller = await initController(db);

  router.post('/entry', controller.addEntry);
  router.get('/all-entries', controller.getAllEntries);

  return router;
};
