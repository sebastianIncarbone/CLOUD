import { ITrack } from './Track';
import uniqid from 'uniqid';

export interface IPlaylist {

  name: string;
  genders: string[];
  maxDuration: number;
  tracks: ITrack[];
  id: string;

  getName(): string;
  getgenders(): string[];
  getTracks(): ITrack[];
  duration(): number;
  addTrack(newTrack: ITrack): void;
  getId(): string;
  hasTrack(aTrack: ITrack): boolean;
  deleteTrack(aTrack: ITrack): void;
  deleteTracks(tracksToDelete: ITrack[]) : void;

}

export class Playlist implements IPlaylist{

  name: string;
  genders: string[];
  maxDuration: number;
  tracks: ITrack[];
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

  getTracks(): ITrack[] {
    return this.tracks;
  }

  duration(): number {
    return this.maxDuration;
  }

  addTrack(newTrack: ITrack): void {
    this.tracks.push(newTrack);
  }

  getId(): string {
    return this.id;
  }

  hasTrack(aTrack: ITrack): boolean {
    return this.tracks.includes(aTrack);
  }

  deleteTrack(aTrack: ITrack): void {
    const index = this.tracks.indexOf(aTrack);
    this.tracks.splice(index);
  }
  deleteTracks(tracksToDelete: ITrack[]) : void {
    this.tracks = this.tracks.filter((track : ITrack) => !tracksToDelete.includes(track));
  }
}
