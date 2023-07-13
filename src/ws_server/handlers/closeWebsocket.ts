import { WebSocket } from 'ws';
import appModel from '../model/app';
import { send } from '../../utils/utils';
import { GameEvent } from '../../types/types';

export const closeWebsocket = (ws: WebSocket) => {
  const player = appModel.players.getPlayer(ws);
  const { room: roomID } = player;

  if (!roomID) return;

  appModel.players.updatePlayerRoom(ws, null);

  appModel.rooms.removeRoom(roomID);

  appModel.players.getPlayers().forEach((ws) => {
    send(ws, GameEvent.UPDATE_ROOM, appModel.rooms.getListOpenRooms());
  });
};
