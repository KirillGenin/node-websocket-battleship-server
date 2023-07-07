import { Players } from './players';

class AppModel {
  players: Players;

  constructor() {
    this.players = new Players();
  }
}

export default new AppModel();
