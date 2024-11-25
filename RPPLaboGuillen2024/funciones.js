import { Heroe } from "Clases/Heroe.js";
import { Villano } from "Clases/Villano.js";

console.log("El archivo funciones.js se ha cargado correctamente.");

/**
 * Función para generar un array de objetos de las clases Heroe y Villano desde una cadena JSON.
 * @param {string} jsonString - La cadena JSON con los datos de las personas.
 * @returns {Array} - Un array con las instancias creadas (Heroe o Villano).
 */
export function generarPersonasDesdeJSON(jsonString) {
  const personasArray = JSON.parse(jsonString); // Parsear JSON
  const personas = []; // Array para almacenar las instancias

  personasArray.forEach((personaData) => {
    if (personaData.ciudad && personaData.alterEgo && personaData.publicado !== undefined) {
      // Es un Heroe
      const heroe = new Heroe(
        personaData.id,
        personaData.nombre,
        personaData.apellido,
        personaData.edad,
        personaData.ciudad,
        personaData.alterEgo,
        personaData.publicado
      );
      personas.push(heroe);
    } else if (personaData.titulo && personaData.robos && personaData.asesinatos) {
      // Es un Villano
      const villano = new Villano(
        personaData.id,
        personaData.nombre,
        personaData.apellido,
        personaData.edad,
        personaData.titulo,
        personaData.robos,
        personaData.asesinatos
      );
      personas.push(villano);
    }
  });

  return personas; // Devuelve el array de personas creadas
}

/**
 * Muestra las personas en la tabla de "Form Datos".
 * @param {Array} personas - Array de objetos (instancias de Heroe o Villano).
 */
export function mostrarPersonasEnTabla(personas) {
  const tbody = document.querySelector("tbody");

  // Limpiamos cualquier fila existente en la tabla antes de agregar nuevos datos
  tbody.innerHTML = "";

  // Iteramos sobre las personas y creamos filas en la tabla
  personas.forEach((persona) => {
    const fila = document.createElement("tr");

    // Crear celdas con la información de la persona
    fila.innerHTML = `
      <td>${persona.id}</td>
      <td>${persona.nombre}</td>
      <td>${persona.apellido}</td>
      <td>${persona.edad}</td>
      <td>${persona.ciudad || "--"}</td>
      <td>${persona.alterEgo || "--"}</td>
      <td>${persona.publicado !== undefined ? persona.publicado : "--"}</td>
      <td>${persona.titulo || "--"}</td>
      <td>${persona.robos || "--"}</td>
      <td>${persona.asesinatos !== undefined ? persona.asesinatos : "--"}</td>
    `;

    // Agregamos la fila al cuerpo de la tabla
    tbody.appendChild(fila);
  });
}

/**
 * Filtra las personas y las muestra en la tabla según el tipo seleccionado.
 * @param {Array} personas - Array de personas.
 * @param {string} filtro - Valor del filtro ('todos', 'heroe', 'villano').
 */
export function filtrarPersonas(personas, filtro) {
  let personasFiltradas = [];

  if (filtro === 'heroe') {
    personasFiltradas = personas.filter(persona => persona instanceof Heroe);
  } else if (filtro === 'villano') {
    personasFiltradas = personas.filter(persona => persona instanceof Villano);
  } else {
    personasFiltradas = personas; // Mostrar todos si el filtro es 'todos'
  }

  mostrarPersonasEnTabla(personasFiltradas); // Mostramos las personas filtradas
}

/**
 * Calcula el promedio de goles (Heroes) o el promedio de año de graduación (Villanoes).
 * @param {Array} personas - Array de objetos (instancias de Heroe o Villano).
 * @returns {number} - El promedio calculado.
 */
export function calcularPromedio(personas) {
  if (personas.length === 0) return 0;

  const sumaValores = personas
    .map(persona => persona.publicado !== undefined ? persona.publicado : persona.alterEgo)
    .reduce((suma, valor) => suma + valor, 0);  // Sumamos los goles o los años de graduación

  return sumaValores / personas.length; // Calculamos el promedio
}

/**
 * Muestra el formulario ABM con los datos de la persona (Heroe o Villano) o vacío.
 * @param {Object|null} persona - El objeto persona a editar, o null si se va a agregar una nueva.
 */
export function mostrarFormularioABM(persona) {
  console.log("mostrarFormularioABM llamada con persona:", persona); // Para verificar que se llama
  // Ocultamos el "Form Datos"
  document.querySelector('.form-filtros').style.display = 'none';

  // Mostramos el "Formulario ABM"
  const formABM = document.getElementById('form-abm');
  formABM.style.display = 'block';

  if (persona) {
    // Si estamos editando, llenamos los campos con los datos de la persona
    document.getElementById('id').value = persona.id;
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido').value = persona.apellido;
    document.getElementById('edad').value = persona.edad;
    document.getElementById('ciudad').value = persona.ciudad || '';
    document.getElementById('alterEgo').value = persona.alterEgo || '';
    document.getElementById('publicado').value = persona.publicado !== undefined ? persona.publicado : '';
    document.getElementById('titulo').value = persona.titulo || '';
    document.getElementById('robos').value = persona.robos || '';
    document.getElementById('asesinatos').value = persona.asesinatos || '';

    // Mostramos el botón "Modificar" y ocultamos "Agregar"
    document.getElementById('btn-alta').style.display = 'none';
    document.getElementById('btn-modificar').style.display = 'inline-block';
  } else {
    // Si es un nuevo registro, vaciamos los campos
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('ciudad').value = '';
    document.getElementById('alterEgo').value = '';
    document.getElementById('publicado').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('robos').value = '';
    document.getElementById('asesinatos').value = '';

    // Mostramos el botón "Agregar" y ocultamos "Modificar"
    document.getElementById('btn-alta').style.display = 'inline-block';
    document.getElementById('btn-modificar').style.display = 'none';
  }
}