import express from 'express';
import bodyParser from 'body-parser';
import { AlbumRoutes } from '../routes/AlbumRoutes';
import { ArtistRoutes } from '../routes/ArtistRoutes';
import { TrackRoutes } from '../routes/TrackRoutes';
//import { DBconection } from './DBconection';

class App {

  public app: express.Application = express();
  //private mongoConector: any = new DBconection();

  constructor() {
    this.config();
    //this.mongoConector().conect();
    new AlbumRoutes(this.app);
    new ArtistRoutes(this.app);
    new TrackRoutes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
  }
}

export const app = new App().app;


