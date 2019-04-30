import { assert } from 'chai';
import { Playlist } from '../../modelo/Playlist';
import { Track } from '../../modelo/Track';
import { UNQfy } from '../../modelo/unqfy';
import { Artist } from '../../modelo/Artist';
import { Album } from '../../modelo/Album';

describe('playlist', () => {
  let nombre: string;
  let durationPlaylist: number;
  let nvaPlaylist: Playlist;
  let genres: string[];
  let duration: number;
  let name: string;
  let teParaTres: Track;
  let playlistGenres: string[];
  beforeEach(() => {
    nombre = 'Roses playlist';
    durationPlaylist = 1400;
    playlistGenres = ['pop'];
    nvaPlaylist = new Playlist(nombre, playlistGenres, durationPlaylist);
    genres = ['Rock Argentino', 'Calm Rock', 'Sad Rock'];
    duration = 380;
    name = 'Te Para Tres';
    teParaTres = new Track(name, duration, genres, 'Cerati');
  });
  it('tiene nombre y una lista de generos ', () => {
    assert.equal(nvaPlaylist.getName(), nombre);
    assert.equal(nvaPlaylist.getgenders(), playlistGenres);
  });
  it('tiene una duracion', () => {
    assert.equal(nvaPlaylist.duration(), durationPlaylist);
  });
  it('conoce si tiene un Track en su lista', () => {
    nvaPlaylist.addTrack(teParaTres);

    assert.isOk(nvaPlaylist.hasTrack(teParaTres));
  });
  it('si esta vacía y se le borra un elemento sólo sigue vacía', () => {
    nvaPlaylist.deleteTrack(teParaTres);

    assert.equal(nvaPlaylist.tracks.length, 0);
  });
  it('al eliminar el único Track de una playlist esta queda vacía', () => {
    nvaPlaylist.addTrack(teParaTres);
    nvaPlaylist.deleteTrack(teParaTres);

    assert.equal(nvaPlaylist.tracks.length, 0);
  });
  it('al borrar un artista tambien se borran sus track de las playlist', () => {
    const artist = new Artist('Bad Bunny', 'Puerto Rico');
    const album = new Album('BadBunny hits', 2018, 'Bad Bunny');
    const genres: string[] = ['trap', 'rap', 'hip hop'];
    const track: Track = new Track('mia', 230, genres, album.getName());
    const unqfy = new UNQfy();

    unqfy.addArtist({ name: artist.getName(), country: artist.getCountry() });
    unqfy.addAlbum(artist.getName(), { name: album.getName() , year: album.getYear() });
    unqfy.addTrack(album.getName(), { name: track.getName(), duration: track.getDuration() , genres: track.getGenders() });
    unqfy.createPlaylist('PlayList_Test', ['rap'], 800);

    unqfy.deleteArtist(unqfy.findArtistByName(artist.getName()).getId());
    assert.equal(unqfy.searchPlayListByName('PlayList_Test')[0].getTracks().length, 0);
  });

  it('al borrar un album tambien se borran sus tracks de las playlist', () => {
    const artist = new Artist('Bad Bunny', 'Puerto Rico');
    const album = new Album('BadBunny hits', 2018, 'Bad Bunny');
    const genres: string[] = ['trap', 'rap', 'hip hop'];
    const track: Track = new Track('mia', 230, genres, album.getName());
    const unqfy = new UNQfy();

    unqfy.addArtist({ name: artist.getName(), country: artist.getCountry() });
    unqfy.addAlbum(artist.getName(), { name: album.getName() , year: album.getYear() });
    unqfy.addTrack(album.getName(), { name: track.getName(), duration: track.getDuration() , genres: track.getGenders() });
    unqfy.createPlaylist('PlayList_Test', ['rap'], 800);

    unqfy.deleteAlbum(unqfy.findAlbumByName(album.getName()).getId());

    assert.equal(unqfy.searchPlayListByName('PlayList_Test')[0].getTracks().length, 0);
  });
});
