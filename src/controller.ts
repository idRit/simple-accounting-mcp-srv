import { Knex } from "knex";

export default async (db: Knex) => {
  return {
    addEntry: async (req: any, res: any) => {
      try {
        if (!req.body?.origin || !req.body?.amount || !['credit', 'debit'].includes(req.body?.type)) {
          return res.status(400).json({ message: 'Invalid input' });
        }

        const { origin, amount, type } = req.body;

        const [newTransaction] = await db('transactions')
          .insert({
            origin,
            amount,
            type,
            date: new Date()
          })
          .returning('*');

        res.json(newTransaction);
      } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    },

    getAllEntries: async (req: any, res: any) => {
      try {
        const transactions = await db('transactions').select('*').orderBy('date', 'desc');
        res.json(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    },
  };
};
