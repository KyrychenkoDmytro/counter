import express from 'express';
import { getCounts, updateCount } from '../controllers/countController.js';
import checkDateMiddleware from '../middleware/checkDateMiddleware.js';

const router = express.Router();

router.get('/', checkDateMiddleware, getCounts);
router.patch('/', updateCount);

export default router;