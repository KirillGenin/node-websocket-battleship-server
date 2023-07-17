import WebSocket from 'ws';
import { RequestDataAttack, RequestDataRandomAttack } from '../../types/types';
import { handlerAttack } from './';

export const handlerRandomAttack = (
  data: RequestDataRandomAttack,
  ws: WebSocket
) => {
  const { gameId, indexPlayer } = data;

  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  const dataAttack: RequestDataAttack = {
    gameId,
    indexPlayer,
    x,
    y,
  };

  handlerAttack(dataAttack, ws);
};
