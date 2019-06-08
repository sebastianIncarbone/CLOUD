import mongoose from 'mongoose';
import { throws } from 'assert';

export class DBconection {
  private DB = mongoose.connection;
  private URL = 'mongodb://localhost/test';

  conect(): void {
    mongoose.connect(this.URL, { useNewUrlParser: true });
    this.DB.on('error', this.errorDeConeccion);
    this.DB.once('open', this.coneccionEstablecida);
  }

  coneccionEstablecida(): void {
    console.log('conected to mongo!');
  }

  errorDeConeccion(): void {
    new ErrorDeConeccion();
  }
}

class ErrorDeConeccion implements Error{
  message: string;
  name: string;
  stack: string;

  constructor() {
    this.name = 'Error de coneccion';
    this.message = 'No se pudo establecer una conecion con la base de datos';
    this.stack = '';
  }

}
