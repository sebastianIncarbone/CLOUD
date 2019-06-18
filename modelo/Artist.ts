import { Track } from './Track';
import {Album} from './Album';
import {UniqueIdGenerator} from './UniqueIdGenerator';

export class Artist{
  id: number;
  name: string;
  country: string;
  albums: Album[];

  constructor(newName: string, newCountry: string) {
    this.id = UniqueIdGenerator.get();
    this.name = newName;
    this.country = newCountry;
    this.albums = [];
  }

  getId(): number {
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
  deleteAlbum(album: Album): void {
    const index = this.getAlbums().indexOf(album);
    this.albums.splice(index, 1);
  }
  hasPartOfName(name: string): boolean {
    return this.getName().toLowerCase().includes(name.toLowerCase());
  }

  getTracks(): Track[] {
    let tracks : Track[] = [];
    this.getAlbums().forEach((album : Album) => tracks = tracks.concat(album.getTracks()));

    return tracks;
  }
}
