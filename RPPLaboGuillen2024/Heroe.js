import { Persona } from './Persona.js';

export class Heroe extends Persona {
    constructor(id, nombre, apellido, edad, ciudad, alterEgo, publicado) {
      super(id, nombre, apellido, edad);
  
      if (!ciudad || ciudad.trim() === '') {
        throw new Error("ERROR: El ciudad no puede estar vacío");
      }
      if (!alterEgo || alterEgo.trim() === '') {
        throw new Error("ERROR: La posición no puede estar vacía");
      }
      if (publicado < 1940) {
        throw new Error("ERROR: La cantidad de goles debe ser un número mayor o igual a 0");
      }
  
      this.ciudad = ciudad;
      this.alterEgo = alterEgo;
      this.publicado = publicado;
    }
  
    toString() {
      return `${super.toString()}, Equipo: ${this.ciudad}, AlterEgo: ${this.alterEgo}, publicado: ${this.publicado}`;
    }
}  