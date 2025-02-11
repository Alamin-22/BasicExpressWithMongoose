/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routers';
import cookieParser from 'cookie-parser';
// parser

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'] }));

//Application Routes
app.use('/api/v1', router); // handling routers from separate func

const Test = (req: Request, res: Response) => {
  res.send('BU Server Is Running');
};

app.get('/', Test);

// handling error

app.use(globalErrorHandler as any);
app.use(notFound as any);

export default app;
