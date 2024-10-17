import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const configureSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado', socket.id);

    socket.emit('welcome', '¡Bienvenido al servidor Socket.IO!');
    
    socket.on('message', (msg) => {
      console.log('Mensaje recibido: ', msg);
      socket.emit('response', 'Mensaje recibido en el servidor');
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado', socket.id);
    });
  });

  return io;
};
