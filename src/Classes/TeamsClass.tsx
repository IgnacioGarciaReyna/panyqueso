import { Player } from "./Player";

export class TeamClass {
  constructor() {}

  private players: Array<Player> = [];

  public skills() {
    if (this.players.length > 0) {
      return this.players.reduce((accumulator, player: Player) => {
        return accumulator + player.skills;
      }, 0);
    } else {
      return 0;
    }
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public playersOfTheTeam() {
    return this.players;
  }
}
