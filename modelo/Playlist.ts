import { Track } from './Track';
import { UniqueIdGenerator } from './UniqueIdGenerator';

export class Playlist {

  name: string;
  genders: string[];
  maxDuration: number;
  tracks: Track[];
  id: number;

  constructor(newName: string, newGenders: string[], newMaxDuration: number) {
    this.name = newName;
    this.genders = newGenders;
    this.maxDuration = newMaxDuration;
    this.tracks = [];
    this.id = UniqueIdGenerator.get();
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
  }

  getId(): number {
    return this.id;
  }

  hasTrack(aTrack: Track): boolean {
    return this.tracks.includes(aTrack);
  }

  deleteTrack(aTrack: Track): void {
    const index = this.tracks.indexOf(aTrack);
    this.tracks.splice(index);
  }
  deleteTracks(tracksToDelete: Track[]) : void {
    this.tracks = this.tracks.filter((track : Track) => !tracksToDelete.includes(track));
  }
}
