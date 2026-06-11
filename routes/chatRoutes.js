import express from 'express';
import { askFreshyBot } from '../controllers/chatController.js';

const router = express.Router();

router.post('/ask', askFreshyBot);

export default router;