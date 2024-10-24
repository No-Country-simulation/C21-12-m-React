import { Request, Response } from 'express';
import { ChatbotService } from '../../application/chatbot.service';
import { AIService } from '../../application/ai.service';
import { chatbotSchema } from '../validator/chatbot.validator';

const aiService = new AIService();
const chatbotService = new ChatbotService(aiService);

export const chatbotController = async (req: Request, res: Response) => {
  // Validar los datos del request
  const { error } = chatbotSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { message } = req.body;

  try {
    const response = await chatbotService.handleMessage(message);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
