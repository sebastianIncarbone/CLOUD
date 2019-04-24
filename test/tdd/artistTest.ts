import { Artist } from '../../modelo/Artist';
import { assert } from 'chai';
import { Album } from '../../modelo/Album';

describe('artista' , () => {
  it('El artista se crea con un nombre y un pais', () => {
    const juanes = new Artist('Juanes' , 'Argentina');

    assert.equal(juanes.getCountry(), 'Argentina');
    assert.equal(juanes.getName(), 'Juanes');

  });
  it('no tiene albumes asociados', () => {
    const fitoPaez = new Artist('Fito Paez', 'Argentina');
    assert.equal(fitoPaez.getAlbums().length, 0);
  });
  it('agrega un nuevo disco a su discografia', () => {
    const fitoPaez  = new Artist('Fito Paez', 'Argentina');
    const circoBeat = new Album('CircoBeat', 1994);

    fitoPaez.addAlbum(circoBeat);
    assert.isOk(fitoPaez.getAlbums().includes(circoBeat));
  });
});
