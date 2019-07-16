import { UNQfy } from './modelo/unqfy';
import express from 'express';
import bodyParser from 'body-parser';
import { DuplicatedError } from './modelo/errores/DuplicatedError';
import { NotFoundError } from './modelo/errores/NotFoundError';
import { Track } from './modelo/Track';
import { Album } from './modelo/Album';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 3030;
const unqfy = new UNQfy();
const app = express();

app.use(bodyParser());

app.use((error: Error, req: any, res: any, next: () => void) => {
  if (error instanceof SyntaxError) {
    res.status(400).send({ status: 400, errorCode: 'BAD_REQUEST' });
  } else {
    next();
  }
});

const cors = require('cors');
app.use(cors());

/*
============================= RUTAS ARTISTA ============================================
 */

app.post('/api/artists', (req:any, res:any) => {
  const nameOfArtist: string = req.body.name;
  const countryOfArtist: string = req.body.country;

  if (!nameOfArtist || !countryOfArtist) {
    res.status(400);
    res.send({
      status: 400,
      errorCode: 'BAD_REQUEST',
    });
    return;
  }

  try {
    unqfy.addArtist({ name: nameOfArtist, country: countryOfArtist });
    res.status(201);
    res.send({
      id: unqfy.findArtistByName(nameOfArtist).getId(),
      name: nameOfArtist,
      country: countryOfArtist,
      albums: [],
    });

  } catch (error) {
    if (error instanceof DuplicatedError) {
      res.status(409);
      res.send({
        status: 409,
        errorCode: 'RESOURCE_ALREADY_EXISTS',
      });
    }
  }
});

app.get('/api/artists/:id', (req:any, res:any) => {

  try {
    const artist =  unqfy.getArtistById(parseInt(req.params.id, 10));
    const albumsWithoutArtistName: Album[] = JSON.parse(JSON.stringify(artist.getAlbums()));
    albumsWithoutArtistName.forEach(album => delete album.artistName);
    res.send({
      id: artist.getId(),
      name: artist.getName(),
      country: artist.getCountry(),
      albums: albumsWithoutArtistName,
    });

  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404);
      res.send({
        status: 404,
        errorCode: 'RESOURCE_NOT_FOUND',
      });
    }
  }
});

app.put('/api/artists/:id', (req:any, res:any) => {
  const newName: string = req.body.name;
  const newCountry: string = req.body.country;

  if (!newName || !newCountry) {
    res.status(400);
    res.send({
      status: 400,
      errorCode: 'BAD_REQUEST',
    });
    return;
  }

  try {
    const artist = unqfy.getArtistById(parseInt(req.params.id, 10));
    artist.country = newCountry;
    artist.name = newName;

    res.send({
      id: artist.getId(),
      name: artist.getName(),
      country: artist.getCountry(),
      albums: artist.getAlbums(),

    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404);
      res.send({ status:'RESOURCE_NOT_FOUND', req: req.params });

    }
  }
});

app.delete('/api/artists/:id', (req:any, res:any) => {
  try {
    unqfy.deleteArtist(parseInt(req.params.id, 10));
    res.status(204);
    res.send();
  }catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404);
      res.send({
        status: 404,
        errorCode: 'RESOURCE_NOT_FOUND',
      });
    }
  }
});

app.get('/api/artists', (req:any, res:any) => {
  const artistName:string  = req.query.name;
  let artists;
  if (!artistName) {
    artists = unqfy.getArtists();
  } else {
    artists = unqfy.findArtistsByName(artistName);
  }
  res.status(200);
  res.send(artists);
});

app.post('/api/populate', async (req:any, res:any) => {
  try {
    const artistName = req.query.name;
    await unqfy.populateAlbumsForArtist(artistName);
    res.status(200);
    res.send();
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

/*
============================= RUTAS ALBUM ============================================
 */

app.post('/api/albums', (req:any, res:any) => {
  const artistID: number = parseInt(req.body.artistId, 10);
  const albumName: string = req.body.name;
  const albumRealeaseDate: number = parseInt(req.body.year, 10);

  if (!artistID || !albumName || !albumRealeaseDate) {
    res.status(400);
    res.send({
      status: 400,
      errorCode: 'BAD_REQUEST',
    });
    return;
  }

  try {
    const album = unqfy.addAlbum(artistID, { name: albumName, year: albumRealeaseDate });
    res.status(201);
    res.send({
      id: album.getId(),
      name: album.getName(),
      year: album.getYear(),
      tracks: album.getTracks(),
    });
  } catch (error) {
    if (error instanceof DuplicatedError) {
      res.status(409);
      res.send({
        status: 409,
        errorCode: 'RESOURCE_ALREADY_EXISTS',
      });
    } else if (error instanceof NotFoundError) {
      res.status(404);
      res.send({
        status: 404,
        errorCode: 'RELATED_RESOURCE_NOT_FOUND',
      });
    }
  }
});

app.get('/api/albums/:id', (req: any, res: any) => {

  try {
    const album = unqfy.getAlbumById(parseInt(req.params.id, 10));
    res.status(200);
    res.send({
      id: album.getId(),
      name: album.getName(),
      year: album.getYear(),
      tracks: album.getTracks(),
    });
  } catch (error) {
    res.status(404);
    res.send({
      status: 404,
      errorCode: 'RESOURCE_NOT_FOUND',
    });
  }
});

app.patch('/api/albums/:id', (req: any, res: any) => {
  const newYear = parseInt(req.body.year, 10);

  if (!newYear) {
    res.status(400);
    res.send({
      status: 400,
      errorCode: 'BAD_REQUEST',
    });
    return;
  }

  try {
    const album = unqfy.getAlbumById(parseInt(req.params.id, 10));
    album.year = newYear;

    res.status(200);
    res.send({
      id: album.getId(),
      name: album.getName(),
      year: album.getYear(),
      tracks: album.getTracks(),

    });
  } catch (error) {
    res.status(404);
    res.send({
      status: 404,
      errorCode: 'RELATED_RESOURCE_NOT_FOUND',
    });
  }
});

app.delete('/api/albums/:id', (req: any, res: any) => {
  try {
    unqfy.deleteAlbum(parseInt(req.params.id, 10));
    res.status(204);
    res.send();
  } catch (error) {
    res.status(404);
    res.send({
      status: 404,
      errorCode: 'RESOURCE_NOT_FOUND',
    });

  }

});

app.get('/api/albums', (req: any, res: any) => {
  const albumName = req.query.name;
  let albums: Album[];
  if (!albumName) {
    albums = unqfy.getAlbums();
  } else {
    albums = unqfy.findAlbumsByName(albumName);
  }
  albums = JSON.parse(JSON.stringify(albums));
  albums.forEach(album => delete album.artistName);
  res.status(200);
  res.send(albums);
});

  /*
  ============================= RUTAS TRACK ============================================
  */

app.get('/api/tracks/:id/lyrics', async (req: any, res: any) => {
  const trackId = parseInt(req.params.id, 10);
  let track: Track;
  let lyrics: any;

  try {
    track = unqfy.getTrackById(trackId);
    lyrics = await track!.getLyrics();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404);
      res.send({
        status: 404,
        errorCode: 'RESOURCE_NOT_FOUND',
      });
      return;
    }
  }

  if (!lyrics) {
    res.status(404);
    res.send({
      status: 404,
      errorCode: 'RESOURCE_NOT_FOUND',
    });
    return;
  }

  res.status(200);
    // tslint:disable-next-line:object-shorthand-properties-first
  res.send({ name: track!.getName(), lyrics });
});

  /*
  ============================= RUTA SPOTIFY ============================================
  */

app.post('/api/spotify', async (req:any, res:any) => {
  try {
    const artistName: string = req.body.name;
    await unqfy.populateAlbumsForArtist(artistName);
    res.status(200);
    res.send();
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

  /*
  ======================================================================================
  */

app.all('*', (req: any, res: any) => {
  res.status(404);
  res.send({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND',
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
