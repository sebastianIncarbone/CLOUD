import { Track } from './Track';
import uniqid from 'uniqid';

export class Album {
  id: string;
  name: string;
  year: number;
  tracks: Track[];

  constructor(newName: string, newYear: number) {
    this.name = newName;
    this.year = newYear;
    this.tracks = [];
    this.id = uniqid();
  }
  getId(): string {
    return this.id;
  }
  getName() : string {
    return this.name;
  }
  getYear() : number {
    return this.year;
  }
  getTracks() : Track[] {
    return this.tracks;
  }
  addTrack(newTrack: Track): void {
    this.tracks.push(newTrack);
    this.tracks = this.removerDuplicados(this.tracks);
  }
  deleteTrack(track: Track): void {
    const index = this.tracks.indexOf(track);
    this.tracks.splice(index);
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
}
