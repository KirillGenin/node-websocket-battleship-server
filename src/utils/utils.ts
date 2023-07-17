import { WebSocket } from 'ws';
import { GameEvent, ResponseData } from '../types/types';

export const send = <T extends ResponseData>(
  ws: WebSocket,
  type: GameEvent,
  data: T
) => {
  ws.send(
    JSON.stringify({
      type,
      data: JSON.stringify(data),
    })
  );
};
