export class Player {
  constructor(id: number, name: String) {
    this.id = id;
    this.name = name;
    this.skills = 2;
    this.goalkeeper = false;
  }

  private id: number;
  name: String;
  skills: number;
  goalkeeper: Boolean;

  public getId() {
    return this.id;
  }

  public setId(newID: number) {
    this.id = newID;
  }

  public getName() {
    return this.name;
  }

  public equalSkill(otherPlayer: Player) {
    //Compara con otro jugador a ver si son del mismo tipo (rápido, goleador, defensor)
  }
}
