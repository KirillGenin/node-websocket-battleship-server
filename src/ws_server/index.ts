import { WebSocketServer } from 'ws';
import { handlerConnection } from './handlers/connection';

export const createWebSocketServer = (port: number, cb: () => void) => {
  const wss = new WebSocketServer({ port });
  wss.on('connection', handlerConnection);
  cb();
};
