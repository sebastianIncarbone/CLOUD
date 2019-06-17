import {app} from '../resources/App';
import {TrackService} from '../services/TrackService';

class TrackController {
    private servive = new TrackService();

    constructor() {}

    public async getLyrics(req: any, res: any) {
        const trackId = req.params.id;
        const track = this.servive.getTrackById(trackId);
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
        res.send({name: track.getName(), lyrics});
    }

}

export const trackController = new TrackController();
