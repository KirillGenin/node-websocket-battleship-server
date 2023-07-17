import { WebSocket } from 'ws';
import appModel from '../model/app';
import { send } from '../../utils/utils';
import {
  GameEvent,
  RequestDataAddUserToRoom,
  ResponseDataCreateGame,
} from '../../types/types';

export const handlerAddUserToRoom = (
  data: RequestDataAddUserToRoom,
  ws: WebSocket
) => {
  const { indexRoom: targetRoomID } = data;

  const { id, name, room: currentRoomID } = appModel.players.getPlayer(ws);

  if (currentRoomID === targetRoomID) return;

  appModel.rooms.addToRoom(targetRoomID, ws, id, name);

  appModel.players.updatePlayerRoom(ws, targetRoomID);

  appModel.rooms.removeRoom(currentRoomID as number);

  appModel.players.getPlayers().forEach((ws) => {
    send(ws, GameEvent.UPDATE_ROOM, appModel.rooms.getListOpenRooms());
  });

  const newGameID = appModel.games.createGame();

  const room = appModel.rooms.getRoom(targetRoomID);

  room.forEach((currentPlayer) => {
    const idGame = newGameID;
    const idPlayer = room.find((player) => player.name === currentPlayer.name)
      ?.index as number;

    send<ResponseDataCreateGame>(currentPlayer.ws, GameEvent.CREATE_GAME, {
      idGame,
      idPlayer,
    });
  });
};
