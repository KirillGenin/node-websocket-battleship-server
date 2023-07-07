import { WebSocket } from 'ws';
import { Player, RequestDataReg } from '../../types/types';

export class Players {
  players: Player[];
  id: number;

  constructor() {
    this.players = [];
    this.id = 0;
  }

  public addPlayer(data: RequestDataReg, ws: WebSocket) {
    const player: Player = {
      id: this.generateID(),
      ...data,
      ws,
    };

    this.players.push(player);

    return player.id;
  }

  public findPlayerByName(name: string) {
    return this.players.find((player) => player.name === name);
  }

  private generateID() {
    this.id++;
    return this.id;
  }
}
