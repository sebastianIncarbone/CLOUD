// @ts-ignore
import { IArtist } from './Artist.d';
import { IAlbum } from './Album.d';
import { ITrack } from './Track.d';
import { IPlaylist } from './Playlist.d';

export interface IUNQfy {
  artists: IArtist[];
  playlists: IPlaylist[];

  getAlbums(): IAlbum[];
  getTracks(): ITrack[];
  addArtist(artistData: { name: string, country: string }): IArtist;
  addAlbum(artistName: string, albumData: { name: string, year: number }): IAlbum;
  addTrack(albumName: string, trackData: { name: string, duration: number, genres: string[] }): ITrack;
  getArtistById(id: string): IArtist;
  getAlbumById(id: string): IAlbum;
  getTrackById(id: string): ITrack;
  getPlaylistById(id: string): IPlaylist;
  getTracksMatchingGenres(genres: string[]): ITrack[];
  findArtistByName(artistName: string): IArtist;
  findAlbumByName(albumName: string): IAlbum;
  findTrackByName(trackName: string): ITrack;
  getTracksMatchingArtist(artistName: string): ITrack[];
  createPlaylist(name: string, genresToInclude: string[], maxDuration: number): IPlaylist;
  searchByName(name: string): { albums: IAlbum[], artists: IArtist[], playlists: IPlaylist[], tracks: ITrack[] };
  filterByName(arrayList: any[], name: string) : any;
  searchAlbumByName(name: string): IAlbum[];
  searchArtistsByName(name: string): IArtist[];
  searchPlayListByName(name: string): IPlaylist[];
  searchTrackByName(name: string): ITrack[];
  deleteArtist(artistId: string): void;
  getTracksOfArtist(artist : IArtist): ITrack[];
  deleteAlbum(albumId: string): void;
  deleteTracksFromPlaylist(tracksToDelete: ITrack[]): void;
  deleteTrack(trackId: string):void;
  save(filename: string): void;

}
