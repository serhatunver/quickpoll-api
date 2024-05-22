import { Server } from 'socket.io';

let socketServer = null;

const createSocketServer = (httpServer) => {
  socketServer = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'OPTIONS'],
    },
  });

  socketServer.on('connection', (socket) => {
    console.log(`New client connected id = ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`Client disconnected id = ${socket.id}`);
    });
  });
};

export { socketServer, createSocketServer };
