import { assert } from 'chai';
import { Playlist } from '../../modelo/Playlist';
import { Track } from '../../modelo/Track';

describe('playlist', () => {
  let nombre: string;
  let durationPlaylist: number;
  let nvaPlaylist: Playlist;
  let genders: string[];
  let duration: number;
  let name: string;
  let teParaTres: Track;
  beforeEach(() => {
    nombre = 'Roses playlist';
    durationPlaylist = 1400;
    nvaPlaylist = new Playlist(nombre, ['pop'], durationPlaylist);
    genders = ['Rock Argentino', 'Calm Rock', 'Sad Rock'];
    duration = 380;
    name = 'Te Para Tres';
    teParaTres = new Track(name, duration, genders, 'Cerati');
  });
  it('tiene nombre', () => {
    assert.equal(nvaPlaylist.getName(), nombre);
  });
  it('tiene una duracion', () => {
    assert.equal(nvaPlaylist.duration(), durationPlaylist);
  });
  it('conoce si tiene un Track en su lista', () => {
    nvaPlaylist.addTrack(teParaTres);

    assert.isOk(nvaPlaylist.hasTrack(teParaTres));
  });
  it('elimina automaticamente generos duplicados mal asignados', () => {
    const otraPlaylist: Playlist = new Playlist(nombre, ['pop', 'pop', 'pop'], durationPlaylist);

    assert.equal(otraPlaylist.getgenders().length, 1);
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
});
