import express from 'express';
import bodyParser from 'body-parser';
//import { DBconection } from './DBconection';

class App {

  public app: express.Application = express();
  //private mongoConector: any = new DBconection();

  constructor() {
    this.config();
    //this.mongoConector().conect();
    // Add rutes

  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
  }
}

export const app = new App().app;


