import multer from 'multer';
const { Router } = require('express');
import { celebrate } from 'celebrate';

import multerConfig from './../../config/multer';
import PointsController from '../../controllers/points';
import pointsValidation from './validation';

const pointsController = new PointsController();

const router = Router();
const upload = multer(multerConfig);

router.get('/', pointsController.index);
router.get('/:id', pointsController.show);
router.post(
  '/',
  upload.single('image'), // apenas um arquivo, se fossem mt reeberiamos .array
  celebrate(pointsValidation.post, {
    abortEarly: false,
  }),
  pointsController.create,
);

export default router;
