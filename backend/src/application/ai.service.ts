import { CohereClient } from "cohere-ai/Client";
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.COHEREAI_API_KEY) {
  throw new Error('La variable de entorno COHEREAI_API_KEY no está definida');
}
const cohere = new CohereClient({
  token: process.env.COHEREAI_API_KEY,
})

export class AIService {
  public async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await cohere.generate({
        model: 'command',
        prompt: `Responde en español: ${prompt}`,   
        temperature: 0.6,
        
      });

      console.log('Respuesta de la API:', response);

      if (response && response.generations && response.generations.length > 0) {
        return response.generations[0].text.trim();
      } else {
        throw new Error('No se recibió respuesta válida de la API de Cohere.');
      }
    } catch (error: any) {
      console.error('Error en la API de Cohere:', error);
      throw new Error('Error al generar la respuesta con IA');
    }
  }
}