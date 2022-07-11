import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';

import routesv1 from './routes/index.js';

const { json, urlencoded } = express;
const app = express();

app.use(cors({ origin: '*', optionsSuccessStatus: StatusCodes.OK }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(routesv1);

export default app;
