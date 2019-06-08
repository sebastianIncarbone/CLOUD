export interface ITrack {
  genres: string[];
  name: string;
  duration: number; // in seconds
  albumName: string;
  id: string;

  getName(): string;
  getDuration(): number;
  getGenders(): string[];
  getId(): string;
  getAlbumName(): string;
  shareAnyGenre(genresP: string[]) : boolean;

}
