import { artistSchema } from './modelo/schemas/artistSchema';
import { albumSchema } from './modelo/schemas/albumSchema';
import { trackSchema } from './modelo/schemas/trackSchema';
import { playlistSchema } from './modelo/schemas/playlistSchema';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export class DBConection {
  private puerto: string = '27017';
  // tslint:disable-next-line: prefer-template
  private URL: string = 'mongodb://localhost:' + this.puerto + '/unqfy';

  connect(): void {

    mongoose.connect(this.URL, { useNewUrlParser: true })
    .then(() => console.log('Connection with mongodb started in port', this.puerto))
    .catch(error => console.log(error));

  }
}

export const artistDB = mongoose.model('Artist', artistSchema);
export const albumDB = mongoose.model('Album', albumSchema);
export const trackDB = mongoose.model('Track', trackSchema);
export const playlistDB = mongoose.model('Playlist', playlistSchema);
