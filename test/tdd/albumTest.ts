import { Album  } from '../../modelo/Album';
import { Track } from '../../modelo/Track';
import { Artist } from '../../modelo/Artist';
import { assert } from 'chai';

describe('album' , () => {
  const compararArreglos = (array1: any[], array2: any[]) =>
  array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  /*Compara el tamaño y compara cada elemento.
  Se usa para testear que el contenido de los arreglos sea el esperado.*/
  const pianoBar = new Album('Piano bar', 1984, 'Charly Garcia');

  let genres: string[];
  let demoliendoHoteles: Track;
  beforeEach(() => {
    genres = ['Rock Nacional', 'Rock de verdad'];
    demoliendoHoteles = new Track('Demoliendo Hoteles', 272, genres, 'Charly Garcia');
  });
  it('has a name and a year of creation', () => {
    const circoBeat = new Album('Circo Beat', 1994, 'Fito Paez');

    assert.equal(circoBeat.getName(), 'Circo Beat');
    assert.equal(circoBeat.getYear(), 1994);
  });
  it('can add tracks ', () => {
    const pianoBar = new Album('Piano bar', 1984, 'Charly Garcia');

    pianoBar.addTrack(demoliendoHoteles);

    assert.isOk(pianoBar.getTracks().includes(demoliendoHoteles));
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
