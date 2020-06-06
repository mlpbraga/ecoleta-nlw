import express from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import winston from 'winston';
import expressWinston from 'express-winston';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
}));

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/points', routes.pointsRoute);
app.use('/items', routes.itemsRoute);

app.use(errors());

app.listen(3377);