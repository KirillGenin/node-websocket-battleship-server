import { WebSocketServer } from 'ws';
import { handlerConnection } from './handlers/connection';

export const createWebSocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on('listening', () => {
    console.log(`Start websocket server on the ${port} port!`);
  });

  wss.on('connection', handlerConnection);
};
