import express, { Request, Response } from 'express';
import routes from './routes';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes.api);

app.get('/', (req: Request, res: Response) => {
  res.send('Admin service up and running!');
});

app.listen(PORT, () => {
  console.log(`Admin service is running on port ${PORT}`);
});
