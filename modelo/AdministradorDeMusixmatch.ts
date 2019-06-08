import * as rp from 'request-promise';
import express from 'express';
import bodyParser from 'body-parser';

export class AdministradorDeMusixmatch {
  private BASE_URL = 'http://api.musixmatch.com/ws/1.1';

  async getId(nombreTrack:any): Promise<any> {
    const response = await rp.get(
        {
                  uri: this.BASE_URL + '/track.search',
                  qs: {
                    apikey: '7c39a5da5c1469cbdad26d22dd903e5c',
                    q_track: nombreTrack
                  },
                  json: true
                });
    console.log(response.message.body.track_list[0].track)
    return response.message.body.track_list[0].track.commontrack_id;
  }

  async getAlgo(): Promise<any> {
    const firstResponse = await this.getId('Crazy Train')
    console.log('FIRST RISPONS', firstResponse)

    const response = await rp.get( {
                      uri: this.BASE_URL + '/track.lyrics.get',
                      qs: {
                        apikey: '7c39a5da5c1469cbdad26d22dd903e5c',
                        commontrack_id: firstResponse
                      },
                      json: true
                    });

    console.log('LA RISPONSE', response)

    const body = response.message.body;

    console.log(body);

  }
}

function ejample(){
  let music: AdministradorDeMusixmatch = new AdministradorDeMusixmatch();
  music.getAlgo();
}

class App {

  public app: express.Application = express();

  constructor() {
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
    this.app.use('/', (req:any,res:any):any => ejample());
  }
}

const PORT = 3030;
let app = new App();
app.app.listen(PORT, () => console.log('Server satarted'));
