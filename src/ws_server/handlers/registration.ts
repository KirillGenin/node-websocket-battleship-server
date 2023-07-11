import { WebSocket } from 'ws';
import { RequestDataReg, ResponseDataReg, GameEvent } from '../../types/types';
import appModel from '../model/app';

export const handlerRegistration = (data: RequestDataReg, ws: WebSocket) => {
  const { name, password } = data;

  const send = (data: ResponseDataReg) => {
    ws.send(
      JSON.stringify({
        type: GameEvent.REG,
        data: JSON.stringify(data),
      })
    );
  };

  const foundPlayer = appModel.players.findPlayerByName(name);

  if (!foundPlayer) {
    const playerID = appModel.players.addPlayer(ws, data);
    send({ name, index: playerID, error: false, errorText: '' });
  } else
    send({
      name,
      index: foundPlayer.id,
      error: true,
      errorText: 'This nickname is already taken',
    });
};
