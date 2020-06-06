const { Router } = require('express');

import ItemsController from '../../controllers/items';

const itemsController = new ItemsController();

const router = Router();

router.get('/', itemsController.index);

export default router;
