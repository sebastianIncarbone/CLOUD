export class ErrorDeBusqueda implements Error{
  message: string;
  name: string;
  stack: string;

  constructor() {
    this.name = 'Error de coneccion';
    this.message = 'No se pudo establecer una conecion con la base de datos';
    this.stack = '';
  }

}
