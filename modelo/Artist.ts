import { IAlbum } from './Album.d';
import { IArtist } from './Artist.d';
import uniqid from 'uniqid';

export class Artist implements IArtist{
  id: string;
  name: string;
  country: string;
  albums: IAlbum[];

  constructor(newName: string, newCountry: string) {
    this.id = uniqid();
    this.name = newName;
    this.country = newCountry;
    this.albums = [];
  }

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getCountry(): string {
    return this.country;
  }
  getAlbums(): IAlbum[] {
    return this.albums;
  }
  addAlbum(newAlbum: IAlbum): void {
    this.albums.push(newAlbum);
  }
  deleteAlbum(indexOfAlbum: number): void {
    this.albums.splice(indexOfAlbum, 1);
  }
}
