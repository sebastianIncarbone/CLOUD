import mongoose from 'mongoose';
import { trackSchema } from '../modelo/schemas/TrackSchema';
import { ITrack, Track } from '../modelo/Track';

export class TrackService {
  private static track = mongoose.model('Track', trackSchema);

  static save(trackAGuardar: ITrack): void {
    new this.track(trackAGuardar).save(this.beforeSave);
  }

  static findById(id: string): Track {
    return this.track.findById(id, this.beforeFind);
  }

  static beforeSave(err: Error) {

  }

  static beforeFind(err: Error, req: Request) {

  }
}
