import {UNQfy} from '../modelo/unqfy';
import {Artist} from '../modelo/Artist';

export class ArtistService {

    private unqfy:UNQfy = new UNQfy();

    constructor(){}

    public addArtist(nameOfArtist: string, countryOfArtist: string) {
        this.unqfy.addArtist({ name: nameOfArtist, country: countryOfArtist });
    }

    public getArtistId(nameOfArtist:string):string {
        return this.unqfy.findArtistByName(nameOfArtist).getId();
    }

    public getArtistById(id: string): Artist {
        return this.unqfy.getArtistById(id);
    }

    public deleteArtist(id: string) {
        this.unqfy.deleteArtist(id);
    }

    public getAll(): Artist[] {
        return this.unqfy.getArtists();
    }

    public findArtistsByName(artistName: string):Artist {
        return this.unqfy.findArtistByName(artistName);
    }
}

