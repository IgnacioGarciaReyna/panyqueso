import { Player } from "./Player";

export class PlayersListClass {
  private players: Array<Player> = [];

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public getPlayers() {
    return this.players;
  }

  public bestPlayer(): Player {
    let maxSkill = this.players
      .map((player: Player) => player.skills)
      .reduce((a: number, b: number) => {
        return Math.max(a, b);
      });
    const bestPlayer = this.players.filter(
      (player: Player) => player.skills === maxSkill
    );
    return bestPlayer[0];
  }

  public hasGoalkeeper(): Boolean {
    return this.players.some((player) => player.goalkeeper);
  }

  public firstGoalkeeper(): Player {
    return this.players.filter((player) => player.goalkeeper)[0];
  }

  public shufflePlayers() {
    this.players.sort(() => Math.random() - 0.5);
  }

  public deletePlayer(playerToDelete: Player) {
    this.players = this.players.filter(
      (player) => player.id !== playerToDelete.id
    );
  }

  public firstPlayerToAdd(): Player {
    return this.hasGoalkeeper() ? this.firstGoalkeeper() : this.bestPlayer();
  }
}
