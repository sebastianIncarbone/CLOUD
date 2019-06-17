import {UNQfy} from '../modelo/unqfy';
import {Track} from '../modelo/Track';

export class TrackService {

  private unqfy = new UNQfy();

  constructor(){}

  public getTrackById(id: string):Track {
    return this.unqfy.getTrackById(id);
  }
}

