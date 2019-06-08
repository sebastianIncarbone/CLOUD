import { IAlbum } from './Album.d';

export interface IArtist {
  id: string;
  name: string;
  country: string;
  albums: IAlbum[];

  getId(): string;
  getName(): string;
  getCountry(): string;
  getAlbums(): IAlbum[];
  addAlbum(newAlbum: IAlbum): void;
  deleteAlbum(indexOfAlbum: number): void;

}
