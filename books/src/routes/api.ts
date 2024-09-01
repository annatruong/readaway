import { books } from 'controllers';
import express from 'express';

const router = express.Router();

router.get('/books/search', books.search);
router.get('/books', books.getBooks);
router.post('/books/add', books.add);

export default router;
