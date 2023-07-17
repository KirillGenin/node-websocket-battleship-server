import { WebSocket } from 'ws';
import {
  RequestDataReg,
  ResponseDataReg,
  ResponseDataWinners,
  GameEvent,
} from '../../types/types';
import { send } from '../../utils/utils';
import appModel from '../model/app';

export const handlerRegistration = (data: RequestDataReg, ws: WebSocket) => {
  const { name, password } = data;

  const sendReg = send<ResponseDataReg>;
  const sendWinners = send<ResponseDataWinners>;

  const isValidPassword = password.length >= 5;

  if (!isValidPassword) {
    sendReg(ws, GameEvent.REG, {
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

    sendReg(ws, GameEvent.REG, {
      name,
      index: playerID,
      error: false,
      errorText: '',
    });

    sendWinners(ws, GameEvent.UPDATE_WINNERS, appModel.winners.getWinners());

    appModel.players.getPlayers().forEach((ws) => {
      send(ws, GameEvent.UPDATE_ROOM, appModel.rooms.getListOpenRooms());
    });

    return;
  }

  const [playerWS, player] = foundPlayer;

  if (playerWS.readyState === WebSocket.CLOSED) {
    if (player.password === password) {
      appModel.players.removePlayer(playerWS);
      appModel.players.addPlayer(ws, data, player.id);

      sendReg(ws, GameEvent.REG, {
        name,
        index: player.id,
        error: false,
        errorText: '',
      });

      sendWinners(ws, GameEvent.UPDATE_WINNERS, appModel.winners.getWinners());

      appModel.players.getPlayers().forEach((ws) => {
        send(ws, GameEvent.UPDATE_ROOM, appModel.rooms.getListOpenRooms());
      });
    } else {
      sendReg(ws, GameEvent.REG, {
        name,
        index: 0,
        error: true,
        errorText: 'Incorrect password',
      });
    }
  } else {
    sendReg(ws, GameEvent.REG, {
      name,
      index: 0,
      error: true,
      errorText: 'This nickname is already taken',
    });
  }
};
