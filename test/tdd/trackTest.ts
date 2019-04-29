import { assert } from 'chai';
import { Track } from '../../modelo/Track';

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
  it('a track has a name, a duration and a gender', () => {
    const genders  = ['Trap'];

    const ouke = new Track(name, duration, genders, 'Catri7el');

    assert.equal(ouke.getName(), 'mariposa Multicolor');
    assert.equal(ouke.getDuration(), 200);

  });
  it('a track has only one gender in his list', () => {
      // aca le pasan un genero pero un track tiene una lista de generos
    const genders: string[] = ['Rock'];
    const mariposaMulticolor: Track = new Track(name, duration, genders, 'Circo Beat');

    assert.isOk(mariposaMulticolor.getGenders().includes('Rock'));
    assert.equal(mariposaMulticolor.getGenders().length, 1);

  });
  it('a track has many genders in his list', () => {
    const genders: string[]  = ['Rock', 'Hard Rock', 'Rock Argentino'];
    const mariposaMulticolor: Track = new Track(name, duration, genders, 'Circo Beat');

    assert.isOk(mariposaMulticolor.getGenders().includes('Rock'));
    assert.isOk(mariposaMulticolor.getGenders().includes('Hard Rock'));
    assert.isOk(mariposaMulticolor.getGenders().includes('Rock Argentino'));

    assert.equal(mariposaMulticolor.getGenders().length, 3);

  });
});
