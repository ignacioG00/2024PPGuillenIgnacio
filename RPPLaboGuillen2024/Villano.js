import { Persona } from './Persona.js';

export class Villano extends Persona {
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
      super(id, nombre, apellido, edad);
  
      if (!enemigo || enemigo.trim() === '') {
        throw new Error("ERROR: El título no puede estar vacío");
      }
      if (!robos || robos.trim() === '') {
        throw new Error("ERROR: La robos no puede estar vacía");
      }
      if (asesinatos < 0) {
        throw new Error("ERROR: El año de graduación debe ser mayor a 1950");
      }
  
      this.enemigo = enemigo;
      this.robos = robos;
      this.asesinatos = asesinatos;
    }
  
    toString() {
      return `${super.toString()}, Título: ${this.enemigo}, robos: ${this.robos}, Asesinatos: ${this.asesinatos}`;
    }
}
  