import { app } from "../resources/App";
import { DuplicatedError } from "../modelo/Errores/DuplicatedError";
import { NotFoundError } from "../modelo/Errores/NotFoundError";

    app.post('/api/artists', (req, res) => {
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
        unqfy.addArtist({ name: nameOfArtist, country: countryOfArtist });
        res.status(201);
        res.send({
        id: unqfy.findArtistByName(nameOfArtist).getId(),
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
});

app.get('/api/artists/:id', (req, res) => {

    try {
        const artist =  unqfy.getArtistById(req.params.id);
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
});

app.patch('/api/artists/:id', (req, res) => {
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
        const artist = unqfy.getArtistById(req.params.id);
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
});

app.delete('/api/artists/:id', (req, res) => {
    try {
        unqfy.deleteArtist(req.params.id);
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
});

app.get('/api/artists', (req, res) => {
    const artistName = req.query.name;
    let artists;
    if (!artistName) {
        artists = unqfy.getArtists();
    } else {
        artists = unqfy.findArtistsByName(artistName);
    }
    res.status(200);
    res.send(artists);
});
