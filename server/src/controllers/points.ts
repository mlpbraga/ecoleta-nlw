import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;
    const point = {
      image: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=50',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }
    const trx = await knex.transaction();
    try {
      const insertedIds = await trx('points').insert(point);
      const pointId = insertedIds[0];
      const pointItems = items.map((item_id: Number) => ({
        item_id,
        point_id: pointId,
      }))
      await trx('point_items').insert(pointItems);
      await trx.commit();
      return res.json({
        id: pointId,
        ...point,
      });
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
  async show( req: Request, res: Response) {
    const { id } = req.params;
    const point = await knex('points').where('id', id).first();
    if (!point) {
      return res.status(400).json({message: 'Point not found'});
    }
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');
    return res.json({
      point,
      items,
    });
  }
  async index( req: Request, res: Response) {
    console.log(req.url);
    const {
      city,
      uf,
      items,
    } = req.query;
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');
    console.log(points)
    return res.json(points);
  }
};

export default PointsController;
