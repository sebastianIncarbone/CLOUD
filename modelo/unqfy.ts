
import picklify from '../node_modules/picklify'; // para cargar/guarfar unqfy
import fs from 'fs'; // para cargar/guarfar unqfy
import { Artist } from './Artist';
import { Album } from './Album';
import { Track } from './Track';
import { Playlist } from './Playlist';



export class UNQfy {
  artists: Artist[];
  albums: Album[];
  playsLists: Playlist[];

  constructor(){
    this.artists = [];
    this.albums = [];
    this.playsLists = [];
  }

  getAlbums() :Album[] {
    return this.albums;
  }
  getArtists(): Artist[]{
    return this.artists;
  }
  getPlaysLists(): Playlist[]{
    return this.playsLists;
  }
  private listeners: any[]

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
    const newArtist = new Artist(artistData.name, artistData.country)
    this.artists.push(newArtist);

    return newArtist;
  }


  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId: number, albumData: {name: string, year: number}): Album {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    const newAlbum = new Album(albumData.name, albumData.year)
    const artist   = this.getArtistById(artistId);
    artist.addAlbum(newAlbum);
    this.albums.push(newAlbum);

    return newAlbum;
  }


  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId: number, trackData: {name: string, duration: number, genres: string[]}): Track {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
 const newTrack = new Track(trackData.name, trackData.duration, trackData.genres);
    const album   = this.getAlbumById(albumId);
    album.addTrack(newTrack);
    //this.Tracks.push(newTrack); ??????????????????¿¿¿¿¿¿¿¿¿¿¿¿¿¿

    return newTrack;
  }

  getArtistById(id: number): Artist {
    const index = this.artists.findIndex(Artist => Artist.getId() == id);
    return this.artists[index];
  }

  getAlbumById(id: number): Album {
    const index = this.albums.findIndex(album => album.getId() == id);
    return this.albums[index];
  }

  getTrackById(id: number): Track{
    //tenemos que tener los tracks en una lista o recorrer todos los albums?
  }

  getPlaylistById(id: number): Playlist {
    const index = this.playsLists.findIndex(Playlist => Playlist.getId() == id);
    return this.playsLists[index];
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres: string[]): Track[] {
      const tracks: Track[] = [] 
      this.albums.forEach(albums => tracks.concat(albums.getTracks()))

      return tracks.filter(track => track.shareAnyGenre(genres)); //Nose estoy muy quemado 
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName: string): Track[] {
      
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

  }

  save(filename: string): void {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename: string): any {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente

