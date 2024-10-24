export class Chatbot {
    private name: string;
  
    constructor(name: string = "DefaultChatbot") {
      this.name = name; // Se puede usar para diferentes configuraciones del chatbot (e.g., en retail, en soporte, etc.)
    }
  
    // Método para recibir un mensaje y responder
    receiveMessage(message: string): string {
      // Aquí se puede implementar alguna lógica simple o delegar al ChatbotService
      return `Procesando mensaje: ${message} (desde ${this.name})`;
    }
  }