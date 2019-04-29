import uniqid from 'uniqid';

export class Track {
  genres: string[];
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
  }
  getName(): string {
    return this.name;
  }
  getDuration(): number {
    return this.duration;
  }
  getGenders(): string[] {
    return this.genres;
  }
  getId(): string {
    return this.id;
  }
  getAlbumName(): string {
    return this.albumName;
  }
  shareAnyGenre(genresP: string[]) : boolean {
    return this.genres.some(aGender => genresP.includes(aGender));
  }
}
