import { Album } from './Album';
import uniqid from 'uniqid';

export class Artist {
  id: string;
  name: string;
  country: string;
  albums: Album[];

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
  getAlbums() {
    return this.albums;
  }
  addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }
  deleteAlbum(indexOfAlbum: number) {
    this.albums.splice(indexOfAlbum, 1);
  }
}
