import { Players } from './players';
import { Winners } from './winners';
import { Rooms } from './rooms';

class AppModel {
  players: Players;
  winners: Winners;
  rooms: Rooms;

  constructor() {
    this.players = new Players();
    this.winners = new Winners();
    this.rooms = new Rooms();
  }
}

export default new AppModel();
