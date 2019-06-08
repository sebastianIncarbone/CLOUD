import { Album } from './Album';

export interface IArtist {
  hasPartOfName(artistName: string): boolean;
  id: string;
  name: string;
  country: string;
  albums: Album[];

  getId(): string;
  getName(): string;
  getCountry(): string;
  getAlbums(): Album[];
  addAlbum(newAlbum: Album): void;
  deleteAlbum(indexOfAlbum: number): void;

}
