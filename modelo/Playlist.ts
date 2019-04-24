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
    this.genders = newGenders;
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

  duration(): number {
    return this.maxDuration;
  }

  addTrack(newTrack: Track): void {
    this.tracks.push(newTrack);
  }
  getId(): string {
    return this.id;
  }

  hasTrack(aTrack: Track): boolean {
    return this.tracks.includes(aTrack);
  }

}
