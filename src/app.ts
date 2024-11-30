
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/Modules/Students/student.route';
import { userRoutes } from './app/Modules/User/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

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
app.use(globalErrorHandler);

export default app;
