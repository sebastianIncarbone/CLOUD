import { assert } from 'chai';
import { Track } from '../../modelo/Track';
import { UNQfy } from '../../modelo/unqfy';
import  { Album } from '../../modelo/Album';
import {Artist } from '../../modelo/Artist';

describe('track' , () => {
  const compararArreglos = (array1: any[], array2: any[]) =>
  array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  /*Compara el tamaño y compara cada elemento.
  Se usa para testear que el contenido de los arreglos sea el esperado.*/
  let duration: number;
  let name: string;
  beforeEach(() => {
    duration = 200;
    name = 'mariposa Multicolor';
  });
  it('has a name, a duration and a gender', () => {
    const genders  = ['Trap'];

    const ouke = new Track(name, duration, genders, 'Catri7el');

    assert.equal(ouke.getName(), 'mariposa Multicolor');
    assert.equal(ouke.getDuration(), 200);

  });
  it('has only one gender in his list', () => {
      // aca le pasan un genero pero un track tiene una lista de generos
    const genders: string[] = ['Rock'];
    const mariposaMulticolor: Track = new Track(name, duration, genders, 'Circo Beat');

    assert.isOk(mariposaMulticolor.getGenders().includes('Rock'));
    assert.equal(mariposaMulticolor.getGenders().length, 1);

  });
  it('has many genders in his list', () => {
    const genders: string[]  = ['Rock', 'Hard Rock', 'Rock Argentino'];
    const mariposaMulticolor: Track = new Track(name, duration, genders, 'Circo Beat');

    assert.isOk(mariposaMulticolor.getGenders().includes('Rock'));
    assert.isOk(mariposaMulticolor.getGenders().includes('Hard Rock'));
    assert.isOk(mariposaMulticolor.getGenders().includes('Rock Argentino'));

    assert.equal(mariposaMulticolor.getGenders().length, 3);

  });
  it('can not be erase if it does not belongs in an application', () => {
    const genres: string[] = ['trap', 'rap', 'hip hop'];
    const track: Track = new Track('mia', 230, genres, 'BadBunny hits');
    const unqfy = new UNQfy();

    unqfy.deleteTrack(track.getId());

    // @ts-ignore
    assert.throws(unqfy.getTrackById(track.getId()), Error, 'Track not found');
  });
  it('can be erase from the application', () => {
    const artist = new Artist('Bad Bunny', 'Puerto Rico');
    const album = new Album('BadBunny hits', 2018, 'Bad Bunny');
    const genres: string[] = ['trap', 'rap', 'hip hop'];
    const track: Track = new Track('mia', 230, genres, album.getName());
    const unqfy = new UNQfy();

    unqfy.addArtist({ name: artist.getName(), country: artist.getCountry() });
    unqfy.addAlbum(unqfy.findArtistByName(artist.getName()).getId(), { name: album.getName() , year: album.getYear() });
    unqfy.addTrack(unqfy.findAlbumByName(album.getName()).getId(), { name: track.getName(), duration: track.getDuration() , genres: track.getGenders() });
    unqfy.deleteTrack(unqfy.findTrackByName(track.getName()).getId());

    assert.equal(unqfy.getTracks().length, 0);
  });
});
