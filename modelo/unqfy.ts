// @ts-ignore
import picklify from 'picklify'; // para cargar/guarfar unqfy
import fs from 'fs'; // para cargar/guarfar unqfy
import { Track } from './Track';
import { Artist } from './Artist';
import { Album } from './Album';
import { Playlist } from './Playlist';
import { AdministradorSpotify } from './AdministradorSpotify';
import { DuplicatedError } from './errores/DuplicatedError';
import { NotFoundError } from './errores/NotFoundError';
import {Notificador} from "./Notificador";



export class UNQfy {
  artists: Artist[];
  playlists: Playlist[];
  private listeners: any[];
  private administradorSpotify : AdministradorSpotify;
  private notificador : Notificador;


  constructor() {
    this.artists = [];
    this.playlists = [];
    this.listeners = [];
    this.administradorSpotify = new AdministradorSpotify();
    this.notificador = new Notificador();
  }

  getArtists(): Artist[] {
    return this.artists;
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

  addArtist(artistData: { name: string, country: string }): Artist {
    /* Crea un artista y lo agrega a unqfy.
    El objeto artista creado debe soportar (al menos):
      - una propiedad name (string)
      - una propiedad country (string)
    */
    const newArtist = new Artist(artistData.name, artistData.country);
    if (this.artists.some((artist: Artist) => artist.getName() === newArtist.getName())) {
      throw new DuplicatedError('That artist already exists');
    }else {
      // @ts-ignore
      this.artists.push(newArtist);
      // @ts-ignore
      return newArtist;
    }
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado

  addAlbum(artistId: number, albumData: { name: string, year: number }): Album {
    /* Crea un album y lo agrega al artista con id artistId.
      El objeto album creado debe tener (al menos):
       - una propiedad name (string)
       - una propiedad year (number)
    */
    const artist = this.getArtistById(artistId);
    const newAlbum = new Album(albumData.name, albumData.year, artist.name);

    if (this.getAlbums().some((album: Album) => album.getName() === newAlbum.getName())) {
      throw new DuplicatedError('That album already exists');
    }else {
      artist.addAlbum(newAlbum);
      this.notificador.notificarNuevoAlbumDe(artist, newAlbum.getName());

    }

    return newAlbum;
  }

  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId: number, trackData: { name: string, duration: number, genres: string[] }): Track {
    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)
    */
    const album = this.getAlbumById(albumId);
    const newTrack = new Track(trackData.name, trackData.duration, trackData.genres, album.name);
    album.addTrack(newTrack);

    return newTrack;
  }

  getArtistById(id: number): Artist {
    const artist = this.artists.find(artist => artist.getId() === id);
    if (artist) {
      return artist;
    }
    throw new NotFoundError('Artist not found');

  }

  getAlbumById(id: number): Album {
    const album = this.getAlbums().find(album => album.getId() === id);
    if (album) {
      return album;
    }
    throw new NotFoundError('Album not found');

  }

  getTrackById(id: number): Track {
    const track = this.getTracks().find(track => track.getId() === id);
    if (track) {
      return track;
    }
    throw new NotFoundError('Track not found');

  }

  getPlaylistById(id: number): Playlist {
    const playlist = this.playlists.find(playlist => playlist.getId() === id);
    if (playlist) {
      return playlist;
    }
    throw new NotFoundError('Playlist not found');

  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres: string[]): Track[] {
    return this.getTracks().filter(track => track.shareAnyGenre(genres));
  }

  findArtistByName(artistName: string): Artist {
    const artist = this.artists.find(artist => artist.hasPartOfName(artistName));
    if (artist) {
      return artist;
    }
    throw new NotFoundError('Artist not found');
  }

  findArtistsByName(artistName: string): Artist[] {
    const artists = this.artists.filter(artist => artist.hasPartOfName(artistName));
    if (artists) {
      return artists;
    }
    throw new NotFoundError('No artist found');
  }

  findAlbumByName(albumName: string): Album {
    const album = this.getAlbums().find(album => album.hasPartOfName(albumName));
    if (album) {
      return album;
    }
    throw new NotFoundError('Album not found');
  }

  findAlbumsByName(albumName: string): Album[] {
    const albums = this.getAlbums().filter(album => album.hasPartOfName(albumName));
    if (albums) {
      return albums;
    }
    throw new NotFoundError('No album found');
  }

  findTrackByName(trackName: string): Track {
    const track = this.getTracks().find(track => track.hasPartOfName(trackName));
    if (track) {
      return track;
    }
    throw new NotFoundError('Track not found');
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
    // @ts-ignore
    this.getTracks().forEach((track: Track) => {
      if (track.fitsIntoDuration(variableDuration) && track.hasSomeOfGenders(genresToInclude)) {
        playList.addTrack(track);
        variableDuration -= track.getDuration();
      }
    });
    this.addPlaylist(playList);
    return playList;
  }

  searchByName(name: string): { albums: Album[], artists: Artist[], playlists: Playlist[], tracks: Track[] } {
    const albumsWithString = this.searchAlbumByName(name);
    const artistsWithString = this.searchArtistsByName(name);
    const tracksWithstring = this.searchTrackByName(name);
    const playListWithString = this.searchPlayListByName(name);
    return {
      albums: albumsWithString,
      artists: artistsWithString,
      playlists: playListWithString,
      tracks: tracksWithstring,
    };
  }

  filterByName(arrayList: any[], name: string) : any {
    return arrayList.filter(parameter => parameter.getName().includes(name));
  }

  searchAlbumByName(name: string): Album[] {
    return this.filterByName(this.getAlbums(), name);
  }

  searchArtistsByName(name: string): Artist[] {
    return  this.filterByName(this.artists, name);
  }

  searchPlayListByName(name: string): Playlist[] {
    return this.filterByName(this.playlists, name);
  }

  searchTrackByName(name: string): Track[] {
    return this.filterByName(this.getTracks(), name);
  }

  deleteArtist(artistId: number): void  {
    const artist = this.getArtistById(artistId);
    const index = this.artists.indexOf(artist);
    const tracksToDeleteFromArtist = this.getTracksOfArtist(artist);
    this.artists.splice(index, 1);
    this.deleteTracksFromPlaylist(tracksToDeleteFromArtist);
  }

  getTracksOfArtist(artist : Artist): Track[] {
    return artist.getTracks();
  }
  deleteAlbum(albumId: number): void {
    const album = this.getAlbumById(albumId);
    const artist = this.findArtistByName(album.getArtistName());
    artist.deleteAlbum(album);
    this.deleteTracksFromPlaylist(album.getTracks());
  }
  deleteTracksFromPlaylist(tracksToDelete: Track[]): void  {
    this.playlists.forEach((playList : Playlist) => playList.deleteTracks(tracksToDelete));
  }

  deleteTrack(trackId: number):void  {
    const track = this.getTrackById(trackId);
    const album = this.findAlbumByName(track.getAlbumName());
    // @ts-ignore
    album.deleteTrack(track);
    this.playlists.forEach((playlist: Playlist) => {
      if (playlist.hasTrack(track)) {
        playlist.deleteTrack(track);
      }
    });
  }

  getAlbumsForArtist(artistName: String): Album[] {
    const albums: Album[] = this.getAlbums().filter(album => album.getArtistName() === artistName);
    return albums;
  }

  save(filename: string): void {
    const serializedData = picklify.picklify(this);

    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename: string): any {
    const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
    // COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Album, Track, Playlist];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }

  private addPlaylist(playList: Playlist) {
    this.playlists.push(playList);
  }

  async populateAlbumsForArtist(artistName: string): Promise<void> {
    const albumsData: Album[] = await this.administradorSpotify.getAlbumsDataForArtist(artistName);
    const artist = this.findArtistByName(artistName);
    albumsData.forEach(albumData => artist.addAlbum(albumData));
  }

}
