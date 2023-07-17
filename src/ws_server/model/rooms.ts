import { WebSocket } from 'ws';
import { ResponseDataUpdateRooms, Room } from '../../types/types';

export class Rooms {
  private rooms: Map<number, Room[]>;

  private currentID: number;

  constructor() {
    this.rooms = new Map();
    this.currentID = 0;
  }

  public createRoom(ws: WebSocket, index: number, name: string) {
    const roomID = this.generateRoomID();
    this.rooms.set(roomID, [{ ws, index, name }]);
    return roomID;
  }

  public addToRoom(roomID: number, ws: WebSocket, index: number, name: string) {
    const room = this.rooms.get(roomID);
    if (room && room.length < 2) {
      this.rooms.set(roomID, room.concat({ ws, index, name }));
    }
  }

  public getListOpenRooms() {
    return Array.from(this.rooms.entries())
      .filter((room) => room[1].length === 1)
      .reduce((acc, room) => {
        const roomId = room[0];
        const { name, index } = room[1][0];
        const roomUsers = [{ name, index }];
        acc.push({ roomId, roomUsers });
        return acc;
      }, [] as ResponseDataUpdateRooms);
  }

  public getRoom(id: number) {
    return this.rooms.get(id) as Room[];
  }

  public removeRoom(roomID: number) {
    this.rooms.delete(roomID);
  }

  private generateRoomID() {
    this.currentID += 1;
    return this.currentID;
  }
}
