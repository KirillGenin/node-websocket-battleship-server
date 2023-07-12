import { IWinners, ResponseDataWinners } from '../../types/types';

export class Winners {
  private winners: IWinners;

  constructor() {
    this.winners = {};
  }

  public add(name: string) {
    if (!this.winners[name]) {
      this.winners[name] = 1;
    } else {
      this.winners[name] += 1;
    }
  }

  public getWinners() {
    return Object.entries(this.winners).reduce((acc, winner) => {
      const [name, wins] = winner;
      acc.push({ name, wins });
      return acc;
    }, [] as ResponseDataWinners);
  }
}
