import { DuplicatedError } from "../modelo/Errores/DuplicatedError";
import { NotFoundError } from "../modelo/Errores/NotFoundError";
import { ArtistService } from '../services/ArtistService';

class ArtistController {
    private service = new ArtistService();

    constructor(){}

    public addArtist(req:any,res:any) {
        const nameOfArtist: string = req.body.name;
        const countryOfArtist: string = req.body.country;

        if (!nameOfArtist || !countryOfArtist) {
            res.status(400);
            res.send({
                         status: 400,
                         errorCode: 'BAD_REQUEST',
                     });
        }

        try {
            this.service.addArtist(nameOfArtist, countryOfArtist);
            res.status(201);
            res.send({
                         id: this.service.getArtistId(nameOfArtist),
                         name: nameOfArtist,
                         country: countryOfArtist,
                         albums: [],
                     });

        } catch (error) {
            if (error instanceof DuplicatedError) {
                res.status(409);
                res.send({
                             status: 409,
                             errorCode: 'RESOURCE_ALREADY_EXISTS',
                         });
            }
        }
    }

    public findById(req:any,res:any) {

        try {
            const artist =  this.service.getArtistById(req.params.id);
            res.send({
                         id: artist.getId(),
                         name: artist.getName(),
                         country: artist.getCountry(),
                         albums: artist.getAlbums(),
                     });

        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404);
                res.send('RESOURCE_NOT_FOUND');
            }
        }
    }

    public update(req:any,res:any) {
        const newName = req.body.name;
        const newCountry = req.body.country;

        if (!newName || !newCountry) {
            res.status(400);
            res.send({
                         status: 400,
                         errorCode: 'BAD_REQUEST',
                     });
        }

        try {
            const artist = this.service.getArtistById(req.params.id);
            artist.country = newCountry;
            artist.name = newName;

            res.send({
                         id: artist.getId(),
                         name: artist.getName(),
                         country: artist.getCountry(),
                         albums: artist.getAlbums(),

                     });
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404);
                res.send('RESOURCE_NOT_FOUND');
            }
        }
    }

    public delete(req:any,res:any) {
        try {
            this.service.deleteArtist(req.params.id);
            res.status(204);
        }catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404);
                res.send({
                             status: 404,
                             errorCode: 'RESOURCE_NOT_FOUND',
                         });
            }
        }
    }

    public getAll(req:any,res:any) {
        const artistName = req.query.name;
        let artists;
        if (!artistName) {
            artists = this.service.getAll();
        } else {
            artists = this.service.findArtistsByName(artistName);
        }
        res.status(200);
        res.send(artists);
    }

}

export const artistController = new ArtistController();
