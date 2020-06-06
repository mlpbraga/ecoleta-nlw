import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/points', routes.pointsRoute);
app.use('/items', routes.itemsRoute);

app.use(errors());

app.listen(3377);