import { WebSocket } from 'ws';
import appModel from '../model/app';
import { send } from '../../utils/utils';
import { GameEvent } from '../../types/types';

export const handlerCreateRoom = (ws: WebSocket) => {
  const { id, name, room } = appModel.players.getPlayer(ws);
  if (room) return;

  const roomID = appModel.rooms.createRoom(ws, id, name);

  appModel.players.updatePlayerRoom(ws, roomID);

  appModel.players.getPlayers().forEach((ws) => {
    send(ws, GameEvent.UPDATE_ROOM, appModel.rooms.getListOpenRooms());
  });
};
