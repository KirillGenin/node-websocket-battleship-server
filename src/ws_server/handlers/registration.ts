import { WebSocket } from 'ws';
import { RequestDataReg, ResponseDataReg, GameEvent } from '../../types/types';
import model from '../model/app';

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

  const foundPlayer = model.players.findPlayerByName(name);

  if (!foundPlayer) {
    const index = model.players.addPlayer(data, ws);
    send({ name, index, error: false, errorText: '' });
  } else {
    const isCorrectPassword = foundPlayer.password === password;

    if (isCorrectPassword) {
      send({ name, index: foundPlayer.id, error: false, errorText: '' });
    } else {
      send({
        name,
        index: foundPlayer.id,
        error: true,
        errorText: 'Incorrect password',
      });
    }
  }
};
