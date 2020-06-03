import express from 'express';

import PointsController from './controllers/points';
import ItemsController from './controllers/items';

//TODO: não usar classe
const pointsController = new PointsController();
const itemsController = new ItemsController();

const routes = express.Router();

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);

export default routes;