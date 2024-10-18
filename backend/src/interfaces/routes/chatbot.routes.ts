import { Router } from 'express';
import { chatbotController} from '../../infrastructure/controllers/chatbot.controller';

const router = Router();

router.post('/chatbot', chatbotController);

export default router;