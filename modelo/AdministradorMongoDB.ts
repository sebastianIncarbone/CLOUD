import { artistSchema } from './schemas/artistSchema';
import { albumSchema } from './schemas/albumSchema';
import { trackSchema } from './schemas/trackSchema';
import { playlistSchema } from './schemas/playlistSchema';

import mongoose from 'mongoose';
import { ObjectId } from 'bson';
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

  createAndSaveArtist(nameOfArtist: string, countryOfArtist: string): mongoose.Document {
    // Creación del artista como modelo de mongo.
    const artistM = new artistDB({ name: nameOfArtist, country: countryOfArtist });
    // Guardado del artista en mongo.
    artistM.save()
    .then(() => console.log('Artist added'))
    .catch(err => console.log(err));
    return artistM;
  }

  createAndSaveAlbum(albumName: string, albumRealeaseDate: number, artistID: string) {
    let newArtistName;

    newArtistName = async function (artistID: string) {
      return await artistDB.findById(artistID, (err, doc: any) => {
        if (err) throw err;
        return doc.name;
      });
    };

    // Creación del album como modelo de mongo.
    const albumM = new albumDB({ name: albumName, year: albumRealeaseDate,
      artistName: newArtistName });

    // Guarda el album en la base de mongo y luego actualiza su artista.
    albumM.save()
    .then(() => console.log('Album added'))
    .catch((err: any) => console.log(err));

    artistDB.findByIdAndUpdate(artistID, { $push: { albums: albumM } },
                               (err: any) => {
                                 if (err) { throw err; }
                                 console.log('Artist modified');
                               });
    return albumM;
  }
}

export const artistDB: mongoose.Model<mongoose.Document> = mongoose.model('Artist', artistSchema);
export const albumDB: mongoose.Model<mongoose.Document> = mongoose.model('Album', albumSchema);
export const trackDB: mongoose.Model<mongoose.Document> = mongoose.model('Track', trackSchema);
export const playlistDB: mongoose.Model<mongoose.Document> = mongoose.model('Playlist', playlistSchema);
