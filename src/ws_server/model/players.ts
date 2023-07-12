import { WebSocket } from 'ws';
import { Player, RequestDataReg } from '../../types/types';

export class Players {
  players: Map<WebSocket, Player>;
  currentID: number;

  constructor() {
    this.players = new Map();
    this.currentID = 0;
  }

  public addPlayer(ws: WebSocket, data: RequestDataReg, id?: number) {
    const player: Player = {
      id: id ? id : this.getID(),
      ...data,
    };

    this.players.set(ws, player);

    return player.id;
  }

  public findPlayerByName(name: string) {
    return Array.from(this.players.entries()).find(
      (player) => player[1].name === name
    );
  }

  public removePlayer(ws: WebSocket) {
    this.players.delete(ws);
  }

  private getID() {
    this.currentID++;
    return this.currentID;
  }
}
