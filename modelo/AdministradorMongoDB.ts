import { artistSchema } from './schemas/artistSchema';
import { albumSchema } from './schemas/albumSchema';
import { trackSchema } from './schemas/trackSchema';
import { playlistSchema } from './schemas/playlistSchema';

import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);

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
  saveAlbum(albumM: any, artistID: number) {
    // Guarda el album en la base de mongo y luego actualiza su artista.
    albumM.save()
    .then(console.log('Album added'))
    .catch((err: any) => console.log(err));

    artistDB.findByIdAndUpdate(artistID, { albums: [albumM] },
                               (err: any) => {
                                 if (err) throw err;
                                 console.log('Artist modified');
                               });
  }
}

export const artistDB = mongoose.model('Artist', artistSchema);
export const albumDB = mongoose.model('Album', albumSchema);
export const trackDB = mongoose.model('Track', trackSchema);
export const playlistDB = mongoose.model('Playlist', playlistSchema);
