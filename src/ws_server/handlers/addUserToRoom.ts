import { WebSocket } from 'ws';
import appModel from '../model/app';
import { send } from '../../utils/utils';
import { GameEvent, RequestDataAddUserToRoom } from '../../types/types';

export const handlerAddUserToRoom = (
  data: RequestDataAddUserToRoom,
  ws: WebSocket
) => {
  const { indexRoom: targetRoomID } = data;

  const { id, name, room: currentRoomID } = appModel.players.getPlayer(ws);

  if (currentRoomID === targetRoomID) return;

  appModel.rooms.addToRoom(targetRoomID, ws, id, name);

  appModel.players.updatePlayerRoom(ws, targetRoomID);

  appModel.players.getPlayers().forEach((ws) => {
    send(ws, GameEvent.UPDATE_ROOM, appModel.rooms.getListOpenRooms());
  });

  const room = appModel.rooms.getRoom(targetRoomID);

  console.log(room);
};
