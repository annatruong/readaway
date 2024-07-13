import { books } from 'controllers';
import express from 'express';

const router = express.Router();

router.get('/books/search', books.searchBook);

export default router;
