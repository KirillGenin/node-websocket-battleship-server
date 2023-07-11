import { WebSocket } from 'ws';
import { Player, RequestDataReg } from '../../types/types';

export class Players {
  players: Map<WebSocket, Player>;
  currentID: number;

  constructor() {
    this.players = new Map();
    this.currentID = 0;
  }

  public addPlayer(ws: WebSocket, data: RequestDataReg) {
    const player: Player = {
      id: this.getID(),
      ...data,
    };

    this.players.set(ws, player);

    return player.id;
  }

  public findPlayerByName(name: string) {
    return Array.from(this.players.values()).find(
      (player) => player.name === name
    );
  }

  private getID() {
    this.currentID++;
    return this.currentID;
  }
}
