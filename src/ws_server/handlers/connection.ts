import { WebSocket } from 'ws';
import {
  RequestMessage,
  RequestDataReg,
  GameEvent,
  RequestData,
  RequestDataAddUserToRoom,
  RequestDataAddShips,
  RequestDataAttack,
  RequestDataRandomAttack,
} from '../../types/types';
import {
  handlerRegistration,
  handlerCreateRoom,
  closeWebsocket,
  handlerAddUserToRoom,
  handlerAddShips,
  handlerAttack,
  handlerRandomAttack,
} from './';

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

  ws.on('close', () => {
    closeWebsocket(ws);
  });

  ws.on('message', (message: string) => {
    try {
      const request: RequestMessage = JSON.parse(message);

      let data: RequestData = '';

      if (request.data && request.data.trim()) {
        data = JSON.parse(request.data);
      }

      switch (request.type) {
        case GameEvent.REG:
          handlerRegistration(data as RequestDataReg, ws);
          break;

        case GameEvent.CREATE_ROOM:
          handlerCreateRoom(ws);
          break;

        case GameEvent.ADD_USER_TO_ROOM:
          handlerAddUserToRoom(data as RequestDataAddUserToRoom, ws);
          break;

        case GameEvent.ADD_SHIPS:
          handlerAddShips(data as RequestDataAddShips, ws);
          break;

        case GameEvent.ATTACK:
          handlerAttack(data as RequestDataAttack, ws);
          break;

        case GameEvent.RANDOMATTACK:
          handlerRandomAttack(data as RequestDataRandomAttack, ws);
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
