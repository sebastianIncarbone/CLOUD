import {UNQfy} from '../modelo/unqfy';
import {Track} from '../modelo/Track';

class TrackService {

  private unqfy = new UNQfy();

  constructor(){}

  public getTrackById(id: string):Track {
    return this.unqfy.getTrackById(id);
  }
}

export const trackService = new TrackService();
