import { authentication } from 'controllers';
import express from 'express';

const router = express.Router();

router.post('/login', authentication.login);

export default router;
