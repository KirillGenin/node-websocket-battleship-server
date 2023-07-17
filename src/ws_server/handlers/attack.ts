import WebSocket from 'ws';
import appModel from '../model/app';
import {
  GameEvent,
  GamePlayer,
  IGame,
  RequestDataAttack,
  ResponseDataAttack,
  ResponseDataTurn,
  ResponseDataFinish,
} from '../../types/types';
import { send } from '../../utils/utils';

export const handlerAttack = (data: RequestDataAttack, playerWS: WebSocket) => {
  const { gameId, indexPlayer, x, y } = data;

  const game = appModel.games.getGame(gameId) as IGame;

  const [enemyID, enemyPlayer] = Array.from(game.players.entries()).find(
    (players) => players[0] !== indexPlayer
  ) as [number, GamePlayer];

  const { ws: enemyWS } = enemyPlayer;

  const resultAttack = appModel.games.makeAttack(
    gameId,
    indexPlayer,
    enemyID,
    x,
    y
  );

  const responseDataAttack: ResponseDataAttack = {
    position: {
      x,
      y,
    },
    currentPlayer: indexPlayer,
    status: resultAttack,
  };

  Array.from(game.players.values()).forEach((player) => {
    const { ws } = player;
    send(ws, GameEvent.ATTACK, responseDataAttack);
  });

  const winner = appModel.games.getWinner(gameId);

  if (winner) {
    const responseDataFinish: ResponseDataFinish = { winPlayer: winner };

    Array.from(game.players.values()).forEach((player) => {
      const { ws } = player;
      send(ws, GameEvent.FINISH, responseDataFinish);
    });

    appModel.players.updatePlayerRoom(playerWS, null);
    appModel.players.updatePlayerRoom(enemyWS, null);

    return;
  }

  const currentPlayer = appModel.games.getCurrentPlayer(gameId);

  Array.from(game.players.values()).forEach((player) => {
    const { ws } = player;

    const data: ResponseDataTurn = {
      currentPlayer: currentPlayer,
    };

    send(ws, GameEvent.TURN, data);
  });
};
