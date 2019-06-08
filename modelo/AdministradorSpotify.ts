import {UNQfy} from './unqfy';
import {Album} from './Album';

var express = require('express');
var app = express();

export class AdministradorSpotify {

  realizarConsultaASpotify(unqfy: UNQfy, artistName) : void {
    const consulta = require('request-promise');
    const options = {
      url: 'https://api.spotify.com/v1/artists/{id}/albums',
      headers: { Authorization: 'Bearer' + '' },
      json: true,
    };

    consulta.get(options).then(albums => crearAlbumsParaApp(parseJSONtoAlbumList(albums), unqfy, artistName));

  }

    parseJSONtoAlbumList(albumsInJSON : void) : Album[] {
      return 0;
    }
  crearAlbumsParaApp(albums: Album[] , unqfy: UNQfy, artistName: string) : void {
    albums.forEach(anAlbum => unqfy.addAlbum(artistName, { anAlbum.getName(), anAlbum.getYear() }));
  }
}
