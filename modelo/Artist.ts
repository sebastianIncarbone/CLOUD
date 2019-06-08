import { IAlbum } from './Album.d';
import { IArtist } from './Artist.d';
import uniqid from 'uniqid';
import {Track} from './Track';

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
  deleteAlbum(album: IAlbum) {
    const index = this.getAlbums().indexOf(album);
    this.albums.splice(index, 1);
  }
  hasPartOfName(name: string) {
    return this.getName().includes(name);
  }

  getTracks(): ITrack[] {
    let tracks : Track[] = [];
    this.getAlbums().forEach((album : Album) => tracks = tracks.concat(album.getTracks()));

    return tracks;
  }
}
