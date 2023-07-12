import { WebSocket } from 'ws';
import { RequestDataReg, ResponseDataReg, GameEvent } from '../../types/types';
import appModel from '../model/app';

export const handlerRegistration = (data: RequestDataReg, ws: WebSocket) => {
  const { name, password } = data;

  const sendResponse = (data: ResponseDataReg) => {
    ws.send(
      JSON.stringify({
        type: GameEvent.REG,
        data: JSON.stringify(data),
      })
    );
  };

  const isValidPassword = password.length >= 5;

  if (!isValidPassword) {
    sendResponse({
      name,
      index: 0,
      error: true,
      errorText: 'Password minimum 5 characters',
    });
    return;
  }

  const foundPlayer = appModel.players.findPlayerByName(name);

  if (!foundPlayer) {
    const playerID = appModel.players.addPlayer(ws, data);
    sendResponse({ name, index: playerID, error: false, errorText: '' });
    return;
  }

  const [playerWS, player] = foundPlayer;

  if (playerWS.readyState === WebSocket.CLOSED) {
    if (player.password === password) {
      const { id: playerID } = player;
      appModel.players.removePlayer(playerWS);
      appModel.players.addPlayer(ws, data, playerID);
      sendResponse({ name, index: playerID, error: false, errorText: '' });
    } else {
      sendResponse({
        name,
        index: 0,
        error: true,
        errorText: 'Incorrect password',
      });
    }
  } else {
    sendResponse({
      name,
      index: 0,
      error: true,
      errorText: 'This nickname is already taken',
    });
  }
};
