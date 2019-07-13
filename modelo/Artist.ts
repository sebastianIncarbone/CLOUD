import uniqid from 'uniqid';
import { Track } from './Track';
import {Album} from './Album';

export class Artist{
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
  getAlbums(): Album[] {
    return this.albums;
  }
  addAlbum(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }
  deleteAlbum(album: Album) {
    const index = this.getAlbums().indexOf(album);
    this.albums.splice(index, 1);
  }
  hasPartOfName(name: string) {
    return this.getName().includes(name);
  }

  getTracks(): Track[] {
    let tracks : Track[] = [];
    this.getAlbums().forEach((album : Album) => tracks = tracks.concat(album.getTracks()));

    return tracks;
  }
}
