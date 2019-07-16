import {Artist} from "./Artist";
import requestPromise from "request-promise";
import axios from 'axios';


export class Notificador {

    async notificarNuevoAlbumDe(artist: Artist, albumName: string) {
        const mailDelBody = {
            artistID: `${artist.getId()}`,
            subject: `nuevo album del artista ${artist.getName()}`,
            message: `se ha agregado el album ${albumName} al artista ${artist.getName()}`,
            from: 'UNQfy <UNQfy.notifications@gmail.com'
        };

        try{
            await axios.post('http://localhost:3032/api/notify', mailDelBody);
        }
        catch (error) {
            console.log(error);
        }

    }
}
