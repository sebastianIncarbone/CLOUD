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
    const circoBeat = new Album('CircoBeat', 1994, 'Fito Paez');

    fitoPaez.addAlbum(circoBeat);
    assert.isOk(fitoPaez.getAlbums().includes(circoBeat));
  });
  it('agrega varios discos a su discografía', () => {
    const callejeros: Artist = new Artist('Callejeros', 'Argentina');
    const presion: Album = new Album('Presión', 2003, 'Callejeros');
    const roncanrolesSinDestino: Album = new Album('Roncanroles Sin Destino', 2004, 'Callejeros');
    const senhales: Album = new Album('Señales', 2006, 'Callejeros');

    callejeros.addAlbum(presion);
    callejeros.addAlbum(roncanrolesSinDestino);
    callejeros.addAlbum(senhales);

    assert.equal(callejeros.getAlbums().length, 3);
  });
  it('no tiene discos duplicados en su discografía', () => {
    const callejeros: Artist = new Artist('Callejeros', 'Argentina');
    const presion: Album = new Album('Presión', 2003, 'Callejeros');
    const roncanrolesSinDestino: Album = new Album('Roncanroles Sin Destino', 2004, 'Callejeros');
    const senhales: Album = new Album('Señales', 2006, 'Callejeros');

    callejeros.addAlbum(presion);
    callejeros.addAlbum(roncanrolesSinDestino);
    callejeros.addAlbum(senhales);
    callejeros.addAlbum(presion);
    callejeros.addAlbum(roncanrolesSinDestino);
    callejeros.addAlbum(senhales);

    assert.equal(callejeros.getAlbums().length, 3);
  });
});
