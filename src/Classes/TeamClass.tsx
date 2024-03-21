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

  public averageSkill() {
    return this.skills() / this.players.length;
  }

  public getTeamNumber(): number {
    return this.teamNumber;
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  private removePlayerByName(name: String) {
    this.players = this.players.filter((player) => player.getName() != name);
  }

  public getPlayers() {
    return this.players;
  }

  public getPlayersNames(): Array<String> {
    return this.players.map((player) => player.getName());
  }

  public getPlayerByName(name: String) {
    return this.players.filter((player) => player.getName() == name);
  }

  public handleTransfer(ids: String[], otherTeam: TeamClass | undefined) {
    const missingPlayer = this.players.filter(
      (player) => !ids.includes(player.getName())
    );

    if (missingPlayer[0]) {
      this.transferPlayerByName(missingPlayer[0].getName(), otherTeam);
    }
  }

  public transferPlayerByName(nameToTransfer: String, otherTeam: TeamClass | undefined) {
    const playerToTransfer = this.getPlayerByName(nameToTransfer);
    this.removePlayerByName(nameToTransfer);
    otherTeam?.addPlayer(playerToTransfer[0]);
  }
}
