import { Player } from "./Player";
import { PlayersListClass } from "./PlayersListClass";
import { TeamClass } from "./TeamClass.tsx";

export class MatchClass {
  constructor(playersList: PlayersListClass) {
    this.playersList = playersList.copyPlayersList();
  }

  playersList: PlayersListClass;

  public createTeams = () => {
    const firstTeam = new TeamClass(1);
    const secondTeam = new TeamClass(2);

    this.playersList.shufflePlayers();

    while (this.playersList.hasSomePlayer()) {
      //Si es arquero, uso al arquero, si no al mejor de la lista
      //Arqueros: es necesario separarlos al principio? Está bien que solo pueda haber dos? Si estuviera mal debería agregarse como una habilidad como por ej goleador, rápido, arquero, etc es un jugador que tiene la posibilidad de atajar pero no es arquero fijo

      const playerToAdd: Player = this.playersList.firstPlayerToAdd();

      //Agregar al team con menos skills
      if (firstTeam.skills() > secondTeam.skills()) {
        secondTeam.addPlayer(playerToAdd);
      } else {
        firstTeam.addPlayer(playerToAdd);
      }

      //Quitar player
      this.playersList.removePlayer(playerToAdd.getId());
    }

    const tuplaTeams: [TeamClass, TeamClass] = [firstTeam, secondTeam];

    //Crear una función para nivelar los equipos.
    //Si hay mucha diferencia, se debería pasar un jugador de equipo, probablemente una normal por uno malo

    return tuplaTeams;
  };

  public refreshTeams(team1, team2) {
    const firstTeam = new TeamClass(1);
    const secondTeam = new TeamClass(2);
    team1.getPlayers().forEach((player) => firstTeam.addPlayer(player));
    team2.getPlayers().forEach((player) => secondTeam.addPlayer(player));

    const tuplaTeams: [TeamClass, TeamClass] = [firstTeam, secondTeam];
    return tuplaTeams;
  }
}
