import { Player } from "./Player";

export class TeamClass {
  constructor(teamNumber: number) {
    this.teamNumber = teamNumber;
  }

  private players: Array<Player> = [];
  private teamNumber: number;

  public skills() {
    if (this.players.length > 0) {
      return this.players.reduce((accumulator, player: Player) => {
        return accumulator + player.skills;
      }, 0);
    } else {
      return 0;
    }
  }

  public getTeamNumber(): number {
    return this.teamNumber;
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public getPlayers() {
    return this.players;
  }
}
