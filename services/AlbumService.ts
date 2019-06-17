import {UNQfy} from '../modelo/unqfy';
import {Album} from '../modelo/Album';
import {Artist} from '../modelo/Artist';

export class AlbumService {
    private unqfy:UNQfy = new UNQfy();

    constructor(){ }

    public getAll():Album[]{
        return this.unqfy.getAlbums();
    }

    public findArtistsByName(albumName:string): Artist[] {
        return this.unqfy.findArtistsByName(albumName);
    }

    public findById(albumId:string): Album {
        return this.unqfy.getAlbumById(albumId);
    }

    public deleteAlbum(id:string):void {
        this.unqfy.deleteAlbum(id);
    }

    public addAlbum(artistID:string, albumName:string, albumRealeaseDate: number):void {
        this.unqfy.addAlbum(artistID, { name: albumName, year: albumRealeaseDate })
    }
}
