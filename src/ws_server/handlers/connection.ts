import { WebSocket } from 'ws';
import { RequestMessage, RequestDataReg, GameEvent } from '../../types/types';
import { handlerRegistration } from './';

export const handlerConnection = (ws: WebSocket) => {
  ws.send(
    JSON.stringify('You are connected to a WebSocket server! This is cool!')
  );

  ws.on('error', (error) => {
    console.error(error);
    ws.send(
      JSON.stringify(
        `Server side error: ${error.message}.\nPlease, refresh the page!`
      )
    );
    ws.close();
  });

  ws.on('message', (message: string) => {
    try {
      const request: RequestMessage = JSON.parse(message);
      console.log('request:', request);

      switch (request.type) {
        case GameEvent.REG:
          {
            const data: RequestDataReg = JSON.parse(request.data);
            handlerRegistration(data, ws);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  });
};
