export class Player {
  constructor() {
    this.skills = 2;
    this.goalkeeper = false;
  }

  id: number;
  name: String;
  skills: number;
  goalkeeper: Boolean;

  public equalSkill(otherPlayer: Player) {
    //Compara con otro jugador a ver si son del mismo tipo (rápido, goleador, defensor)
  }
}
