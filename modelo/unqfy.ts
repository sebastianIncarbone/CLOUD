// @ts-ignore
import picklify from 'picklify'; // para cargar/guarfar unqfy
import fs from 'fs'; // para cargar/guarfar unqfy
import { Artist } from './Artist';
import { Album } from './Album';
import { Track } from './Track';
import { Playlist } from './Playlist';

// refactor para hacer, tener una funcion que te de las listas de todo y no usar el colaborador

export class UNQfy {
  artists: Artist[];
  playlists: Playlist[];
  private listeners: any[];

  constructor() {
    this.artists = [];
    this.playlists = [];
    this.listeners = [];
  }

  getAlbums(): Album[] {
    let albums: Album[] = [];
    this.artists.forEach((artist: Artist) => {
      albums = albums.concat(artist.getAlbums());
    });
    return albums;
  }

  getTracks(): Track[] {
    let tracks: Track[] = [];
    this.getAlbums().forEach((album: Album) => {
      tracks = tracks.concat(album.getTracks());
    });
    return tracks;
  }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData: {name: string, country: string}): Artist {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    const newArtist = new Artist(artistData.name, artistData.country);
    this.artists.push(newArtist);

    return newArtist;
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId: string, albumData: {name: string, year: number}): Album {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    const newAlbum = new Album(albumData.name, albumData.year);
    const artist   = this.getArtistById(artistId);
    artist.addAlbum(newAlbum);

    return newAlbum;
  }

  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId: string, trackData: {name: string, duration: number, genres: string[]}): Track {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
    const newTrack = new Track(trackData.name, trackData.duration, trackData.genres);
    const album   = this.getAlbumById(albumId);
    album.addTrack(newTrack);

    return newTrack;
  }

  getArtistById(id: string): Artist {
    const artist =  this.artists.find(artist => artist.getId() === id);
    if (artist) {
      return artist;
    }
    throw new Error('Artsit not found');

  }

  getAlbumById(id: string): Album {
    const album =  this.getAlbums().find(album => album.getId() === id);
    if (album) {
      return album;
    }
    throw new Error('Album not found');

  }

  getTrackById(id: string): Track {
    const track = this.getTracks().find(track => track.getId() === id);
    if (track) {
      return track;
    }
    throw new Error('Track not found');

  }

  getPlaylistById(id: string): Playlist {
    const playlist = this.playlists.find(playlist => playlist.getId() === id);
    if (playlist) {
      return playlist;
    }
    throw new Error('Playlist not found');

  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres: string[]): Track[] {
    return this.getTracks().filter(track => track.shareAnyGenre(genres));
  }
  findArtistByName(artistName: string): Artist {
    const artist =  this.artists.find(artist => artist.getName() === artistName);
    if (artist) {
      return artist;
    }
    throw new Error('Artist not found');

  }
  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName: string): Track[] {
     // estaria bueno que alguien revise esta funcion
    const artist = this.findArtistByName(artistName);
    let tracksOfArtist: Track[] = [];
    artist.getAlbums().forEach(album => tracksOfArtist = tracksOfArtist.concat(album.getTracks()));
    return tracksOfArtist;
  }
  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name: string, genresToInclude: string[], maxDuration: number): Playlist {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
    const playList = new Playlist(name, genresToInclude, maxDuration);
    let variableDuration = maxDuration;
    const tracksToAdd = this.getTracks().forEach((track) => {
      if (track.duration <= variableDuration && genresToInclude.some(genre => track.genres.includes(genre))) {
        playList.tracks.push(track);
        variableDuration -= track.duration;
      }
    });
    this.playlists.push(playList);
    return playList;
  }
  searchByName(name: string): {albums: Album[], artists: Artist[], playlists: Playlist[], tracks: Track[]} {
    const albumsWithString   = this.searchAlbumByName(name);
    const artistsWithString  = this.searchArtistsByName(name);
    const tracksWithstring   = this.searchTrackByName(name);
    const playListWithString = this.searchPlayListByName(name);
    return {
      albums: albumsWithString,
      artists: artistsWithString,
      playlists: playListWithString,
      tracks: tracksWithstring,
    };
  }
  filterByName(arrayList: any[], name:string) {
    return arrayList.filter(parameter => parameter.getName().includes(name));
  }
  searchAlbumByName(name: string): Album[] {
    const albums: Album[] = this.filterByName(this.getAlbums(), name);
    return albums;
  }
  searchArtistsByName(name: string): Artist[] {
    const artists: Artist[] =  this.filterByName(this.artists, name);
    return artists;
  }
  searchPlayListByName(name: string): Playlist[] {
    const playList: Playlist[] =  this.filterByName(this.playlists, name);
    return playList;
  }
  searchTrackByName(name: string): Track[] {
    const track: Track[] = this.filterByName(this.getTracks(), name);
    return track;
  }

  deleteArtist(artist: Artist) {
    const index = this.artists.indexOf(artist);
    this.artists.splice(index, 1);
  }

  save(filename: string): void {
    const serializedData = picklify.picklify(this);

    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename: string): any {
    const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
    // COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}
// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
