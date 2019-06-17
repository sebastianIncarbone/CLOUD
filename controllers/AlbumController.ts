import {app} from '../resources/App';
import { AlbumService } from '../services/AlbumService';
import {DuplicatedError} from '../modelo/Errores/DuplicatedError';
import {NotFoundError} from '../modelo/Errores/NotFoundError';

class AlbumController {
    private service = new AlbumService();

    constructor(){}

    public addAlbum(req:any, res:any):any {
        const artistID = req.body.artistId;
        const albumName = req.body.name;
        const albumRealeaseDate = req.body.year;

        if (!artistID || !albumName || !albumRealeaseDate) {
            res.status(400);
            res.send({
                         status: 400,
                         errorCode: 'BAD_REQUEST',
                     });

        }
        try {
            const album = this.service.addAlbum(artistID, albumName, albumRealeaseDate);
            res.status(201);
            res.send({
                         artistId: artistID,
                         name: albumName,
                         year: albumRealeaseDate,
                     });
        }catch (error) {
            if (error instanceof DuplicatedError) {
                res.send({
                             status: 409,
                             errorCode: 'RESOURCE_ALREADY_EXISTS',
                         });
            } else if (error instanceof NotFoundError) {
                res.status(404);
                res.send({
                             status: 404,
                             errorCode: 'RELATED_RESOURCE_NOT_FOUND',
                         });
            }
        }
    }

    public getById(req:any, res:any):any {

        try {
            const album = this.service.findById(req.params.id);
            res.status(200);
            res.send({
                         id: album.getId(),
                         name: album.getName(),
                         year: album.getYear(),
                         tracks: album.getTracks(),
                     });
        }catch (error) {
            res.status(404);
            res.send({
                         status: 404, errorCode: 'RESOURCE_NOT_FOUND',
                     });
        }
    }

    public updateYear(req:any, res:any):any {
        const newYear = req.body.year;

        if (!newYear) {
            res.status(400);
            res.send({
                         status: 400,
                         errorCode: 'BAD_REQUEST',
                     });
        }

        try {
            const album = this.service.findById(req.params.id);
            album.year = newYear;

            res.status(200);
            res.send({
                         id: album.getId(),
                         name: album.getName(),
                         year: album.getYear(),
                         tracks: album.getTracks(),

                     });
        }catch (error) {
            res.status(404);
            res.send({
                         status:404,
                         errorCode: 'RELATED_RESOURCE_NOT_FOUND',
                     });
        }
    }

    public delete(req:any, res:any):any {
        try {
            this.service.deleteAlbum(req.params.id);
            res.status(204);
        }catch (error) {
            res.status(404);
            res.send({
                         status: 404,
                         errorCode: 'RESOURCE_NOT_FOUND',
                     });

        }

    }

    public getAll(req:any, res:any):any {
        const albumName = req.query.name;
        let albums;
        if (!albumName) {
            albums = this.service.getAll();
        } else {
            albums = this.service.findArtistsByName(albumName);
        }
        res.status(200);
        res.send(albums);
    }

}

export const albumController = new AlbumController();
