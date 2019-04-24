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
  }
}
