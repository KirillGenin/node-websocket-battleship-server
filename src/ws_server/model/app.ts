import { Players } from './players';
import { Winners } from './winners';

class AppModel {
  players: Players;
  winners: Winners;

  constructor() {
    this.players = new Players();
    this.winners = new Winners();
  }
}

export default new AppModel();
