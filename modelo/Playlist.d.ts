import { ITrack } from './Track.d';

export interface IPlaylist {

  name: string;
  genders: string[];
  maxDuration: number;
  tracks: ITrack[];
  id: string;

  getName(): string;
  getgenders(): string[];
  getTracks(): ITrack[];
  duration(): number;
  addTrack(newTrack: ITrack): void;
  getId(): string;
  hasTrack(aTrack: ITrack): boolean;
  deleteTrack(aTrack: ITrack): void;
  deleteTracks(tracksToDelete: ITrack[]) : void;

}
