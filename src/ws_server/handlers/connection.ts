import { WebSocket } from 'ws';

export const handlerConnection = (ws: WebSocket) => {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log('received: %s', data);
  });

  ws.send('something');
};
