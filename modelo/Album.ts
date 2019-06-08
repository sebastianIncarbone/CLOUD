import { Track } from './Track';
import uniqid from 'uniqid';

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

  getName(): string {
    return this.name;
  }

  getYear(): number {
    return this.year;
  }
  getTracks() : Track[] {
    return this.tracks;
  }

  getArtistName(): string {
    return this.artistName;
  }
  addTrack(newTrack: Track): void {
    if (this.alreadyHaveTheTrack(newTrack)) {
      throw new Error('That Track already exists');
    } else {
      this.tracks.push(newTrack);
    }
  }
  alreadyHaveTheTrack(trackToCheckName: Track) : boolean {
    return this.getTracks().some((tracksInAlbum: Track) => tracksInAlbum.getName() === trackToCheckName.getName());
  }

  deleteTrack(track: Track): void {
    const index = this.tracks.indexOf(track);
    this.tracks.splice(index, 1);
  }

  hasPartOfName(albumName: string): boolean {
    return this.getName().includes(albumName);
  }
}

