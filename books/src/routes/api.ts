import { books } from 'controllers';
import express from 'express';

const router = express.Router();

router.get('/books/find', books.findBook);

export default router;
