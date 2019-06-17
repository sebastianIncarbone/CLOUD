import uniqid from 'uniqid';
import { AdministradorMusixmatch } from './AdministradorMusixmatch';

export class Track {
  genres: string[];
  name: string;
  duration: number; // in seconds
  albumName: string;
  id: string;
  lyrics: string;
  administradorMusixmatch: AdministradorMusixmatch;

  constructor(newName: string, newDuration:number, newGenres: string[], newAlbumName: string) {
    this.genres = newGenres;
    this.name = newName;
    this.duration = newDuration;
    this.albumName = newAlbumName;
    this.id = uniqid();
    this.lyrics = '';
    this.administradorMusixmatch = new AdministradorMusixmatch();
  }

  getName(): string {
    return this.name;
  }
  getDuration(): number {
    return this.duration;
  }
  getGenres(): string[] {
    return this.genres;
  }
  getId(): string {
    return this.id;
  }
  getAlbumName(): string {
    return this.albumName;
  }
  async getLyrics(): Promise<string> {
    if (this.lyrics) {
      return this.lyrics;
    }
    const lyricsResponse = await this.administradorMusixmatch.getLyrics(this.getName());
    this.lyrics = lyricsResponse.lyrics.lyrics_body;
    return this.lyrics;
  }
  shareAnyGenre(genres: string[]) : boolean {
    return this.genres.some(aGenre => genres.includes(aGenre));
  }
  fitsIntoDuration(variableDuration: number): boolean {
    return this.getDuration() <= variableDuration;
  }
  hasSomeOfGenders(genresToInclude: string[]): boolean {
    return genresToInclude.some(genre => this.getGenres().includes(genre));
  }
  hasPartOfName(trackName: string): boolean {
    return this.getName().toLowerCase().includes(trackName.toLowerCase());
  }
}
