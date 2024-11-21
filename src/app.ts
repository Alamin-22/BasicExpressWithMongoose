import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/Modules/Students/student.route';

// parser

app.use(express.json());
app.use(cors());

//Application Routes

app.use('/api/v1/students', StudentRoutes);

const GetAController = (req: Request, res: Response) => {
  res.send('Hello World! er maire bap');
};

app.get('/', GetAController);

export default app;
