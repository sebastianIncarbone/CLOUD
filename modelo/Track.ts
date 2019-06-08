import { ITrack } from './Track.d';
import uniqid from 'uniqid';
// @ts-ignore
import { AdministradorDeMusixmatch } from 'AdministradorDeMusixmatch';

export class Track implements ITrack{
  genres: string[];
  lyric: string;
  administradorConMusicmatch: AdministradorDeMusixmatch;
  name: string;
  duration: number; // in seconds
  albumName: string;
  id: string;

  constructor(newName: string, newDuration:number, newGenres: string[], newAlbumName: string) {
    this.genres = newGenres;
    this.name = newName;
    this.duration = newDuration;
    this.albumName = newAlbumName;
    this.id = uniqid();
    this.administradorConMusicmatch = new AdministradorDeMusixmatch();
    this.lyric = '';
  }

  setLyric(lyric: string): void {
    this.lyric = lyric;
  }
  getLyrics(): string {
    if (this.lyric !== '') {
      return this.lyric;
    }

    return this.administradorConMusicmatch.searchtrack(this.name);
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
    return this.getName().includes(trackName);
  }
  getGenders(): string[] {
    return [];
  }
}
