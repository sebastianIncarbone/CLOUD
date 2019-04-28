import { Album  } from '../../modelo/Album';
import { Track } from '../../modelo/Track';
import { Artist } from '../../modelo/Artist';
import { assert } from 'chai';

describe('album' , () => {
  const compararArreglos = (array1: any[], array2: any[]) =>
  array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  /*Compara el tamaño y compara cada elemento.
  Se usa para testear que el contenido de los arreglos sea el esperado.*/
  const pianoBar = new Album('Piano bar', 1984);

  let genres: string[];
  let demoliendoHoteles: Track;
  beforeEach(() => {
    genres = ['Rock Nacional', 'Rock de verdad'];
    demoliendoHoteles = new Track('Demoliendo Hoteles', 272, genres);
  });
  it('has a name and a year of creation', () => {
    const circoBeat = new Album('Circo Beat', 1994);

    assert.equal(circoBeat.getName(), 'Circo Beat');
    assert.equal(circoBeat.getYear(), 1994);
  });
  it('can add tracks ', () => {
    const pianoBar = new Album('Piano bar', 1984);

    pianoBar.addTrack(demoliendoHoteles);

    assert.isOk(pianoBar.getTracks().includes(demoliendoHoteles));
  });
  it('doesnt have repeated tracks even if you add twice', () => {
    const signos: Album = new Album('Signos', 1986);

    const persianaAmericana: Track = new Track('Persiana Americana', 292, ['New wave', 'post-punk']);
    const profugos: Track = new Track('Profugos', 321, ['New wave', 'post-punk']); // Generos según la wiki.

    signos.addTrack(persianaAmericana);
    signos.addTrack(profugos);
    signos.addTrack(persianaAmericana);
    signos.addTrack(profugos);

    const expected: Track[] = [persianaAmericana, profugos];
    const result: boolean = compararArreglos(signos.getTracks(), expected);

    assert.isTrue(result);
  });
  it('to which a Track is deleted is returned empty', () => {
    pianoBar.deleteTrack(demoliendoHoteles);

    assert.equal(pianoBar.getTracks().length, 0);
  });
  it('with just a Track returns empty when this is deleted', () => {
    pianoBar.addTrack(demoliendoHoteles);
    pianoBar.deleteTrack(demoliendoHoteles);

    assert.equal(pianoBar.getTracks().length, 0);
  });
});
