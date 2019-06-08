import { ITrack } from './Track.d';
import uniqid from 'uniqid';

export class Album{
  id: string;
  name: string;
  year: number;
  artistName: string;
  tracks: ITrack[];

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
  getName(): string {
    return this.name;
  }
  getYear(): number {
    return this.year;
  }
  getTracks() : ITrack[] {
    return this.tracks;
  }
  getArtistName(): string {
    return this.artistName;
  }
  addTrack(newTrack: ITrack): void {
    if (this.alreadyHaveTheTrack(newTrack)) {
      throw new Error('That Track already exists');
    } else {
      this.tracks.push(newTrack);
    }
  }
  alreadyHaveTheTrack(trackToCheckName: ITrack) : boolean {
    return this.getTracks().some((tracksInAlbum: ITrack) => tracksInAlbum.getName() === trackToCheckName.getName());
  }
  hasPartOfName(albumName: string): boolean {
    return this.getName().includes(albumName);
  }
}
