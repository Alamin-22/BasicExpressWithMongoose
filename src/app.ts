/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/Modules/Students/student.route';
import { userRoutes } from './app/Modules/User/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

// parser

app.use(express.json());
app.use(cors());

//Application Routes

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoutes);

const GetAController = (req: Request, res: Response) => {
  res.send('Hello World! er maire bap');
};

app.get('/', GetAController);

// handling error

app.use(globalErrorHandler as any);
app.use(notFound as any);

export default app;
