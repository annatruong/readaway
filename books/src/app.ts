import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';
import cors from 'cors';
import corsOptions from 'utils/whitelisting';
import { checkAuth } from './middleware/auth.middleware';
declare module 'express' {
  interface Request {
    user?: any;
  }
}

const app = express();
const PORT = 3001;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', checkAuth, routes.api);

app.get('/', (req: Request, res: Response) => {
  res.send('Books service up and running!');
});

app.listen(PORT, () => {
  console.log(`Books service is running on port ${PORT}`);
});
