import express from 'express';
import bodyParser from 'body-parser';


class App {

  public app: express.Application = express();


  constructor() {
    this.config();

  }
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
  }
}

export const app = new App().app;


