import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

import { Request, Response } from 'express';
import knex from '../database/connection';

const { API_URL } = process.env;
class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      imageUrl: `${API_URL}/uploads/${item.image}`,
    }));
    return res.json(serializedItems);
  }
};

export default ItemsController;
