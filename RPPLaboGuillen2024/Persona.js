export class Persona {
    constructor(id, nombre, apellido, edad) {
      if (!id || id <= 0) {
        throw new Error("ERROR: El ID debe ser un número mayor a 0");
      }
      if (!nombre || nombre.trim() === '') {
        throw new Error("ERROR: El nombre no puede estar vacío");
      }
      if (!apellido || apellido.trim() === '') {
        throw new Error("ERROR: El apellido no puede estar vacío");
      }
      if (!edad || edad <= 15) {
        throw new Error("ERROR: La edad debe ser mayor a 15");
      }
  
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
    }
  
    toString() {
      return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}`;
    }
}  