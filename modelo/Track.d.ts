import { AdministradorDeMusixmatch } from './AdministradorDeMusixmatch';

export interface ITrack {
    hasPartOfName(trackName: string): boolean;
  genres: string[];
  lyric: string;
  administradorConMusicmatch: AdministradorDeMusixmatch;
  name: string;
  duration: number; // in seconds
  albumName: string;
  id: string;

  setLyric(lyric: string): void;
  getLyrics(): string;
  getName(): string;
  getDuration(): number;
  getGenders(): string[];
  getId(): string;
  getAlbumName(): string;
  shareAnyGenre(genresP: string[]) : boolean;

}
