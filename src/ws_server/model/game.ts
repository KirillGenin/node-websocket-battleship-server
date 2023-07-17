import WebSocket from 'ws';
import {
  GamePlayer,
  GamePlayerShip,
  GamePlayerShips,
  IGame,
  InitShips,
  AttackStatus,
} from '../../types/types';

export class Games {
  private games: Map<number, IGame>;

  private currentID: number;

  constructor() {
    this.currentID = 0;
    this.games = new Map();
  }

  public createGame() {
    const gameID = this.generateGameID();

    this.games.set(gameID, {
      currentPlayer: null,
      winPlayer: null,
      players: new Map(),
      initPlayerShips: new Map(),
    });

    return gameID;
  }

  public makeAttack(
    gameID: number,
    playerID: number,
    enemyID: number,
    x: number,
    y: number
  ): AttackStatus {
    const game = this.getGame(gameID) as IGame;

    const { ships } = game.players.get(enemyID) as GamePlayer;

    const ship = ships.find(
      (ship) =>
        !ship.isKilled &&
        ship.positions.some(
          (position) => !position.isHit && position.x === x && position.y === y
        )
    );

    if (!ship) {
      this.setCurrentPlayer(gameID, enemyID);
      return AttackStatus.MISS;
    }

    ship.positions = ship.positions.map((position) => {
      if (position.x === x && position.y === y) position.isHit = true;
      return position;
    });

    const isShipWasKilled = ship.positions.every((position) => position.isHit);

    if (isShipWasKilled) {
      ship.isKilled = true;

      const isPlayerWin = ships.every((ship) => ship.isKilled);
      if (isPlayerWin) this.setWinner(gameID, playerID);

      return AttackStatus.KILLED;
    } else {
      return AttackStatus.SHOT;
    }
  }

  private setWinner(gameID: number, playerID: number) {
    const game = this.getGame(gameID) as IGame;
    game.winPlayer = playerID;
    this.games.set(gameID, game);
  }

  public getWinner(gameID: number) {
    const game = this.getGame(gameID) as IGame;
    return game.winPlayer;
  }

  public getGame(id: number) {
    return this.games.get(id) as IGame;
  }

  public addPlayerToGame(
    gameID: number,
    playerID: number,
    ws: WebSocket,
    ships: InitShips
  ) {
    const game = this.getGame(gameID) as IGame;

    game.initPlayerShips.set(ws, { playerID, initShips: ships });
    game.players.set(playerID, {
      ws,
      ships: this.formatShips(ships),
    });

    this.games.set(gameID, game);
  }

  public removeGame(gameID: number) {
    this.games.delete(gameID);
  }

  public getCurrentPlayer(gameID: number) {
    const game = this.getGame(gameID) as IGame;

    return game.currentPlayer as number;
  }

  public setCurrentPlayer(gameID: number, playerID: number) {
    const game = this.getGame(gameID) as IGame;
    game.currentPlayer = playerID;
    this.games.set(gameID, game);
  }

  public initCurrentPlayer(gameID: number) {
    const game = this.getGame(gameID) as IGame;
    const players = Array.from(game.players.keys());
    game.currentPlayer = players[Math.floor(Math.random() * 2)];
    this.games.set(gameID, game);
  }

  private generateGameID() {
    this.currentID += 1;
    return this.currentID;
  }

  private formatShips(ships: InitShips): GamePlayerShips {
    return ships.reduce((acc, ship) => {
      const { x, y } = ship.position;

      const formatShip: GamePlayerShip = {
        positions: [],
        isKilled: false,
      };

      for (let i = 0; i < ship.length; i++) {
        formatShip.positions.push({
          x: ship.direction ? x : x + i,
          y: ship.direction ? y + i : y,
          isHit: false,
        });
      }

      acc.push(formatShip);
      return acc;
    }, [] as GamePlayerShips);
  }
}
