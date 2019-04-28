import uniqid from 'uniqid';

export class Track {
  genres: string[];
  name: string;
  duration: number; // in seconds
  id: string;

  constructor(newName: string, newDuration:number, newGender: string[]) {
    this.genres = this.removerDuplicados(newGender);
    this.name = newName;
    this.duration = newDuration;
    this.id = uniqid();
  }
  private removerDuplicados = function (anArray: any[]): any[] {
    // tslint:disable-next-line: prefer-const
    let resultado: any[] = [];
    const noExiste: number = -1;
    // tslint:disable-next-line: no-increment-decrement
    for (let i = 0; i < anArray.length; i++) {
      if (resultado.indexOf(anArray[i]) === noExiste) {
        resultado.push(anArray[i]);
      }
    }
    return resultado;
  };
  getName(): string {
    return this.name;
  }
  getDuration(): number {
    return this.duration;
  }
  getGenders(): string[] {
    return this.genres;
  }
  getId(): string {
    return this.id;
  }
  shareAnyGenre(genresP: string[]) : boolean {
    return this.genres.some(aGender => genresP.includes(aGender));
  }
}
