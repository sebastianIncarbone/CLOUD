import {app} from '../resources/App';

app.get('/api/tracks/:id/lyrics', async (req, res) => {
    const trackId = req.params.id;
    const track = unqfy.getTrackById(trackId);
    const lyrics = await track.getLyrics();

    if (!lyrics) {
        res.status(404);
        res.send({
                     status: 404,
                     errorCode: 'RESOURCE_NOT_FOUND',
                 });
    }

    res.status(200);
    // tslint:disable-next-line:object-shorthand-properties-first
    res.send({ name: track.getName(), lyrics });
});
