import { Track } from './Track';
import uniqid from 'uniqid';
import {Artist} from "./Artist";

export class Album {
  id: string;
  name: string;
  year: number;
  artistName: string;
  tracks: Track[];

  constructor(newName: string, newYear: number, newArtistName: string) {
    this.name = newName;
    this.year = newYear;
    this.tracks = [];
    this.artistName = newArtistName;
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
  getArtistName(): string {
    return this.artistName;
  }
  addTrack(newTrack: Track): void {
    if (this.tracks.some((track: Track) => track.getName() !== newTrack.getName())) {
      this.tracks.push(newTrack);
    }
    throw new Error('That Track already exists');
  }
  deleteTrack(track: Track): void {
    const index = this.tracks.indexOf(track);
    this.tracks.splice(index);
  }
}
