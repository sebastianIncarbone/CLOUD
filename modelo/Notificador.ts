import {Artist} from "./Artist";
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
            await axios.post(`${process.env.URL_NOTIFICADOR}/api/notify`, mailDelBody);
        }
        catch (error) {
            console.log(error);
        }

    }
}
