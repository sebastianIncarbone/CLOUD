
import picklify from '../node_modules/picklify'; // para cargar/guarfar unqfy
import fs from 'fs'; // para cargar/guarfar unqfy
import { Artist } from './Artist';
import { Album } from './Album';
import { Track } from './Track';
import { Playlist } from './Playlist';

//refactor para hacer, tener una funcion que te de las listas de todo y no usar el colaborador

export class UNQfy {
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
  tracks: Track[]

  constructor(){
    this.artists = [];
    this.albums = [];
    this.playlists = [];
    this.tracks = [];
  }

  getAlbums() :Album[] {
    return this.albums;
  }
  getArtists(): Artist[]{
    return this.artists;
  }
  getPlaysLists(): Playlist[]{
    return this.playlists;
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
    const newArtist = new Artist(artistData.name, artistData.country);
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
    this.tracks.push(newTrack); 

    return newTrack;
  }

  getArtistById(id: number): Artist {
    const artist =  this.artists.find(artist => artist.getId() == id);
      if(artist){
        return artist;
      }else{
        throw new Error("The artist does not exist in the application");
      }
  }

  getAlbumById(id: number): Album {
    const album =  this.albums.find(album => album.getId() == id);
      if(album){
        return album;
      }else{
        throw new Error("The album does not exist in the application");
      }
  }

  getTrackById(id: number): Track{
    const track = this.tracks.find(track => track.getId() == id);
      if(track){
        return track;
      }else{
        throw new Error("The track does not exist in the application");
      }
  }

  getPlaylistById(id: number): Playlist {
    const playlist = this.playlists.find(playlist => playlist.getId() == id);
      if(playlist){
        return playlist;
      }else{
        throw new Error("The playlist does not exist in the aplication");
      }
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres: string[]): Track[] {
      return this.tracks.filter(track => track.shareAnyGenre(genres));  
  }
  findArtistByName(artistName: string): Artist{
    return this.artists.find(artist => artist.getName() == artistName)! 
  }
  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName: string): Track[] {
    x //estaria bueno que alguien revise esta funcion 
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
    this.playlists.push(playList);

    return playList;
  }
  searchByName(name: string): UNQfy{
    const albumsWithString   = this.searchAlbumByName(name);
    const artistsWithString  = this.searchArtistsByName(name);
    const tracksWithstring   = this.searchTrackByName(name);
    const playListWithString = this.searchPlayListByName(name);
   
    const unqfyResult = new UNQfy();
    unqfyResult.setAlbums(albumsWithString);
    unqfyResult.setArtists(artistsWithString);
    unqfyResult.setTracks(tracksWithstring);
    unqfyResult.setPlayList(playListWithString);

    return unqfyResult;
  }
  filterByName(arrayList: any[], name:string){
    return arrayList.filter(parameter => parameter.getName().includes(name))
  }
  searchAlbumByName(name: string): Album[] {
    const albums: Album[] = this.filterByName(this.albums, name);
    return albums;
  }
  searchArtistsByName(name: string): Artist[] {
    const artists: Artist[]=  this.filterByName(this.artists, name);
    return artists;
  }
  searchPlayListByName(name: string): Playlist[] {
    const playList: Playlist[] =  this.filterByName(this.playlists, name);
    return playList;
  }
  searchTrackByName(name: string): Track[] {
    const track: Track[]= this.filterByName(this.tracks, name);
    return track;
  }
  setAlbums(newAlbums: Album[]): void{
    this.albums = newAlbums;
  }
  setArtists(newArtists: Artist[]): void{
    this.artists = newArtists;
  }
  setTracks(newTracks: Track[]): void{
    this.tracks = newTracks;
  }
  setPlayList(newPlaylists: Playlist[]): void{
    this.playlists = newPlaylists
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

