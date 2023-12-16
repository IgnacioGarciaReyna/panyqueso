import { Player } from "./Player";

export class PlayersListClass {
  private players: Array<Player> = [];
  public nextIDForPlayer: number = 0;

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public copyPlayersList() {
    const newPlayersList = new PlayersListClass();

    this.players.forEach((player) => newPlayersList.addPlayer(player));
    newPlayersList.nextIDForPlayer = this.nextIDForPlayer;

    return newPlayersList;
  }

  public getPlayers() {
    return this.players;
  }

  public hasSomePlayer() {
    return this.players.length > 0;
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

  public removePlayer(idToDelete: number) {
    return (this.players = this.players.filter(
      (player) => player.getId() !== idToDelete
    ));
  }

  public firstPlayerToAdd(): Player {
    return this.hasGoalkeeper() ? this.firstGoalkeeper() : this.bestPlayer();
  }

  public hasPlayer(playerName: String) {
    return this.players.find(
      (player: Player) => player.name.toUpperCase() === playerName.toUpperCase()
    );
  }

  public newIDForPlayer() {
    const id = this.nextIDForPlayer;
    this.nextIDForPlayer++;
    return id;
  }
}
