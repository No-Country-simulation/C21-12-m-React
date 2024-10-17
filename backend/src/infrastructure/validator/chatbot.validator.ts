import Joi from 'joi';


 export const chatbotSchema = Joi.object({
  message: Joi.string().trim().min(8).max(500).required()
});

