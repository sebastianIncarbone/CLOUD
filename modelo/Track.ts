import uniqid from 'uniqid';

export class Track {
  genres: string[];
  name: string;
  duration: number; // in seconds
  id: string;

  constructor(newName: string, newDuration:number, newGender: string[]) {
    this.genres = newGender;
    this.name = newName;
    this.duration = newDuration;
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
  shareAnyGenre(genresP: string[]) : boolean {
    return this.genres.some(aGender => genresP.includes(aGender));
  }
}
