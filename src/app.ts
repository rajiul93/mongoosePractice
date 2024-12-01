import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalError } from './app/config/globalError';
import { notFoundRoute } from './app/config/notFoundRout';
import { StudentRoutes } from './app/modules/students/student.route';
const app: Application = express();
// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.all('*', notFoundRoute);

app.use(globalError);

export default app;
