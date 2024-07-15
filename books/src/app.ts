import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
import corsOptions from 'utils/whitelisting';

const app = express();
const PORT = 3001;

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', routes.api);

app.get('/', (req: Request, res: Response) => {
  res.send('Books service up and running!');
});

app.listen(PORT, () => {
  console.log(`Books service is running on port ${PORT}`);
});
