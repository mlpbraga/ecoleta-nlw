import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

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
  pointsController.create,
);

export default routes;