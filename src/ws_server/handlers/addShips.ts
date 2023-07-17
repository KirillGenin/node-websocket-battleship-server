import { WebSocket } from 'ws';
import appModel from '../model/app';
import { send } from '../../utils/utils';
import {
  GameEvent,
  IGame,
  RequestDataAddShips,
  ResponseDataStartGame,
  ResponseDataTurn,
} from '../../types/types';

export const handlerAddShips = (data: RequestDataAddShips, ws: WebSocket) => {
  const { gameId, indexPlayer: playerID, ships } = data;

  appModel.games.addPlayerToGame(gameId, playerID, ws, ships);

  const game = appModel.games.getGame(gameId) as IGame;

  const canStartGame = game.players.size > 1;

  if (!canStartGame) return;

  Array.from(game.initPlayerShips.entries()).forEach((player) => {
    const [ws, playerData] = player;
    const { playerID, initShips } = playerData;

    const data: ResponseDataStartGame = {
      currentPlayerIndex: playerID,
      ships: initShips,
    };

    send(ws, GameEvent.START_GAME, data);
  });

  appModel.games.initCurrentPlayer(gameId);

  const currentPlayer = appModel.games.getCurrentPlayer(gameId);

  Array.from(game.players.values()).forEach((player) => {
    const { ws } = player;

    const data: ResponseDataTurn = {
      currentPlayer: currentPlayer,
    };

    send(ws, GameEvent.TURN, data);
  });
};
