import {app} from '../resources/App';
import { trackController } from '../controllers/TrackController';

app.get('/api/tracks/:id/lyrics', async (req, res) => {
    trackController.getLyrics(req, res);
});
