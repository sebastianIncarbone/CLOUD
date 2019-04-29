
import fs from 'fs'; // necesitado para guardar/cargar unqfy
import { UNQfy } from './modelo/unqfy';

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json'): UNQfy {
  let unqfy = new UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy: UNQfy, filename = 'data.json'): void {
  unqfy.save(filename);
}

// tslint:disable-next-line:max-line-length
/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function addArtist(name: string, country: string) {
  const unqfy = getUNQfy();
  unqfy.addArtist({
    name,
    country,
  });
  saveUNQfy(unqfy);
}

function writeOperation(lambda: any) {
  const unqfy = getUNQfy();
  lambda(unqfy);
  saveUNQfy(unqfy);
}

function readOperation(lambda: any) {
  const unqfy = getUNQfy();
  const result = lambda(unqfy);
  console.log(result)
}

function main(): void {
  const params = process.argv.slice(2);
  const commandName = params[0];
  const commandArgs = params.slice(1);
  if (commandName.includes('add')) {
    if (commandName === 'addArtist') {
      return writeOperation((unqfy: UNQfy) => unqfy.addArtist({ name: commandArgs[0], country: commandArgs[1] }));
    }
    if (commandName === 'addAlbum') {
      return writeOperation((unqfy: UNQfy) => unqfy.addAlbum(commandArgs[0], {name: commandArgs[1], year: parseInt(commandArgs[2], 10) }));
    }
    if (commandName === 'addTrack') {
      return writeOperation((unqfy: UNQfy) => unqfy.addTrack(commandArgs[0], {name: commandArgs[1], duration: parseInt(commandArgs[2], 10), genres: JSON.parse(commandArgs[3].replace(new RegExp("'", 'g'), '"')) }));
    }
  }
  if (commandName.includes('delete')) {
    if (commandName === 'deleteArtist') {
      return writeOperation((unqfy: UNQfy) => unqfy.deleteArtist(commandArgs[0]));
    }
    if (commandName === 'deleteAlbum') {
      return writeOperation((unqfy: UNQfy) => unqfy.deleteAlbum(commandArgs[0]));
    }
    if (commandName === 'deleteTrack') {
      return writeOperation((unqfy: UNQfy) => unqfy.deleteTrack(commandArgs[0]));
    }
  }
  if (commandName.includes('print')) {
    if (commandName === 'printArtist') {
      return readOperation((unqfy: UNQfy) => unqfy.findArtistByName(commandArgs[0]));
    }
    if (commandName === 'printAlbum') {
      return readOperation((unqfy: UNQfy) => unqfy.findAlbumByName(commandArgs[0]));
    }
    if (commandName === 'printTrack') {
      return readOperation((unqfy: UNQfy) => unqfy.findTrackByName(commandArgs[0]));
    }
    if (commandName === 'printTrackByArtist') {
      return readOperation((unqfy: UNQfy) => unqfy.getTracksMatchingArtist(commandArgs[0]));
    }
    if (commandName === 'printTrackByGenre') {
      return readOperation((unqfy: UNQfy) => unqfy.getTracksMatchingGenres([commandArgs[0]]));
    }
  }
}

main();
