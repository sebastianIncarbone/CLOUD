import { ITrack } from './Track.d';
import { Document } from 'mongoose';

export interface IAlbum extends Document{
  id: string;
  name: string;
  year: number;
  artistName: string;
  tracks: ITrack[];

  getId(): string;
  getName(): string;
  getYear(): number;
  getTracks() : ITrack[];
  getArtistName(): string;
  addTrack(newTrack: ITrack): void;
  alreadyHaveTheTrack(trackToCheckName: ITrack) : boolean ;
  hasPartOfName(albumName: string): boolean;
}
