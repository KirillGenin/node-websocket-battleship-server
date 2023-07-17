import { Players } from './players';
import { Winners } from './winners';
import { Rooms } from './rooms';
import { Games } from './game';

class AppModel {
  players: Players;
  winners: Winners;
  rooms: Rooms;
  games: Games;

  constructor() {
    this.players = new Players();
    this.winners = new Winners();
    this.rooms = new Rooms();
    this.games = new Games();
  }
}

export default new AppModel();
