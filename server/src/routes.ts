import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/points';
import ItemsController from './controllers/items';

//TODO: não usar classe
const pointsController = new PointsController();
const itemsController = new ItemsController();

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points',
  upload.single('image'), // apenas um arquivo, se fossem mt reeberiamos .array
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    }),
  }, {
    abortEarly: false,
  }),
  pointsController.create,
);

export default routes;