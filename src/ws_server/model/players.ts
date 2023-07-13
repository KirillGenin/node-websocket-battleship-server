import { WebSocket } from 'ws';
import { Player, RequestDataReg } from '../../types/types';

export class Players {
  private players: Map<WebSocket, Player>;
  private currentID: number;

  constructor() {
    this.players = new Map();
    this.currentID = 0;
  }

  public addPlayer(ws: WebSocket, data: RequestDataReg, id?: number) {
    const player: Player = {
      id: id ? id : this.getID(),
      room: null,
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

  public getPlayer(ws: WebSocket) {
    return this.players.get(ws) as Player;
  }

  public updatePlayerRoom(ws: WebSocket, roomID: number) {
    const player = this.players.get(ws);

    if (player) {
      this.players.set(ws, {
        ...player,
        room: roomID,
      });
    }
  }

  public getPlayers() {
    return Array.from(this.players.keys());
  }

  public removePlayer(ws: WebSocket) {
    this.players.delete(ws);
  }

  private getID() {
    this.currentID++;
    return this.currentID;
  }
}
