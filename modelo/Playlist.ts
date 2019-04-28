import { Track } from './Track';
import uniqid from 'uniqid';

export class Playlist {

  name: string;
  genders: string[];
  maxDuration: number;
  tracks: Track[];
  id: string;

  constructor(newName: string, newGenders: string[], newMaxDuration: number) {
    this.name = newName;
    this.genders = this.removerDuplicados(newGenders);
    this.maxDuration = newMaxDuration;
    this.tracks = [];
    this.id = uniqid();
  }

  getName(): string {
    return this.name;
  }

  getgenders(): string[] {
    return this.genders;
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  duration(): number {
    return this.maxDuration;
  }

  addTrack(newTrack: Track): void {
    this.tracks.push(newTrack);
    this.tracks = this.removerDuplicados(this.tracks);
  }

  getId(): string {
    return this.id;
  }

  hasTrack(aTrack: Track): boolean {
    return this.tracks.includes(aTrack);
  }

  deleteTrack(aTrack: Track): void {
    const index = this.tracks.indexOf(aTrack);
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
