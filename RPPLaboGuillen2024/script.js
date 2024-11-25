import { Heroe } from "Clases/Heroe.js";
import { Villano } from "Clases/Villano.js";
import * as funciones from 'funciones.js';

document.addEventListener('DOMContentLoaded', function () {
  let personas = []; // Lista completa de personas (Heroes, Profesionales)
  let personaSeleccionada = null; // Persona seleccionada para editar
  let ordenAscendente = true; // Control para alternar el orden ascendente y descendente
  let filtroSeleccionado = 'todos'; // Filtro inicial (todas las personas)

  // Hacemos una solicitud fetch para obtener el archivo JSON
  fetch('./Registros/personas.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("ERROR: Error al cargar el archivo JSON\n");
      }
      return response.json(); // Convertimos la respuesta a formato JSON
    })
    .then(data => {
      const jsonString = JSON.stringify(data);

      // Generamos las instancias de las personas
      personas = funciones.generarPersonasDesdeJSON(jsonString);

      // Mostrar las personas en la tabla
      funciones.mostrarPersonasEnTabla(personas);

      // Agregar event listener de doble clic para editar cada fila
      document.querySelectorAll('tbody tr').forEach(fila => {
        fila.addEventListener('dblclick', function () {
          const id = this.querySelector('td:first-child').textContent; // Obtener el ID de la fila
          personaSeleccionada = personas.find(p => p.id == id); // Buscar la persona por ID
          mostrarFormularioABM(personaSeleccionada); // Mostrar el formulario con los datos de la persona
        });
      });
    })
    .catch(error => {
      console.error("ERROR: Hubo un problema al cargar el archivo JSON:\n", error);
    });

  // Calcular el promedio de edades al hacer clic en "Calcular"
  document.getElementById('btn-calcular').addEventListener('click', function () {
    const personasFiltradas = aplicarFiltro(); // Obtenemos las personas filtradas
    const promedioEdades = calcularPromedioEdades(personasFiltradas); // Calculamos el promedio de las edades
    document.getElementById('prom-vel-max').value = promedioEdades; // Mostramos el promedio en el campo correspondiente
  });

  // Modificar una persona existente
  document.getElementById('btn-modificar').addEventListener('click', function () {
    if (personaSeleccionada && validarFormularioABM()) {
      actualizarPersonaDesdeFormulario(personaSeleccionada);
      actualizarTablaPersonas(); // Actualizar la tabla con los cambios
      ocultarFormularioABM(); // Ocultar el formulario ABM
    }
  });

  // Eliminar una persona
  document.getElementById('btn-eliminar').addEventListener('click', function () {
    if (personaSeleccionada) {
      personas = personas.filter(p => p.id !== personaSeleccionada.id); // Filtrar para eliminar la persona
      actualizarTablaPersonas(); // Actualizar la tabla
      ocultarFormularioABM(); // Ocultar el formulario ABM
    }
  });

  // Mostrar el formulario ABM al hacer clic en el botón "Agregar" desde el Form Datos
  document.getElementById('btn-agregar-form-datos').addEventListener('click', function () {
    mostrarFormularioABM(null); // Mostrar el formulario vacío para agregar un nuevo objeto
  });

  // Ocultar el "Formulario ABM" y mostrar el "Form Datos" al hacer clic en "Cancelar"
  document.getElementById('btn-cancelar').addEventListener('click', function () {
    ocultarFormularioABM(); // Ocultar el formulario ABM
  });

  // Filtrar las personas según el valor seleccionado
  document.getElementById('filtro').addEventListener('change', function () {
    filtroSeleccionado = this.value; // Actualizamos el filtro seleccionado
    actualizarTablaPersonas(); // Actualizamos la tabla con las personas filtradas
  });

  // Capturar los clics en los encabezados de la tabla para ordenar
  document.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', function () {
      const columna = this.textContent.toLowerCase().replace(" ", ""); // Obtener el nombre de la columna
      ordenarTablaPorColumna(columna);
    });
  });

  // Mostrar/ocultar campos según el tipo de persona seleccionado
  document.getElementById('tipoPersona').addEventListener('change', function () {
    const tipo = this.value;
    if (tipo === 'heroe') {
      document.querySelector('.heroe-fields').style.display = 'block';
      document.querySelector('.profesional-fields').style.display = 'none';
    } else {
      document.querySelector('.heroe-fields').style.display = 'none';
      document.querySelector('.profesional-fields').style.display = 'block';
    }
  });

  // Agregar una nueva persona
  document.getElementById('btn-agregar-abm').addEventListener('click', function () {
    const tipoPersona = document.getElementById('tipoPersona').value;
    const nuevaPersona = crearPersonaDesdeFormulario(tipoPersona);
    personas.push(nuevaPersona); // Agregar la persona a la lista
    actualizarTablaPersonas(); // Actualizar la tabla con la nueva persona
    ocultarFormularioABM(); // Ocultar el formulario ABM
  });

  // Manejar los checkboxes para mostrar/ocultar columnas
  document.querySelectorAll('.checkboxes input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const columna = this.getAttribute('data-column'); // Obtener el nombre de la columna asociada
      const mostrar = this.checked; // Verificar si el checkbox está marcado o no
      mostrarOcultarColumna(columna, mostrar); // Llamamos a la función para mostrar u ocultar la columna
    });
  });

  // Función para mostrar el formulario ABM
  function mostrarFormularioABM(persona) {
    document.querySelector('.form-filtros').style.display = 'none';
    const formABM = document.getElementById('form-abm');
    formABM.style.display = 'block';

    // Si estamos editando
    if (persona) {
      document.getElementById('id').value = persona.id;
      document.getElementById('nombre').value = persona.nombre;
      document.getElementById('apellido').value = persona.apellido;
      document.getElementById('edad').value = persona.edad;

      // Mostrar los campos correspondientes
      if (persona instanceof Heroe) {
        document.getElementById('tipoPersona').value = 'heroe';
        document.querySelector('.heroe-fields').style.display = 'block';
        document.querySelector('.profesional-fields').style.display = 'none';
        document.getElementById('ciudad').value = persona.ciudad;
        document.getElementById('alterEgo').value = persona.alterEgo;
        document.getElementById('publicado').value = persona.publicado;
      } else if (persona instanceof Villano) {
        document.getElementById('tipoPersona').value = 'profesional';
        document.querySelector('.heroe-fields').style.display = 'none';
        document.querySelector('.profesional-fields').style.display = 'block';
        document.getElementById('titulo').value = persona.titulo;
        document.getElementById('robos').value = persona.robos;
        document.getElementById('asesinatos').value = persona.asesinatos;
      }

      // Ocultar botón de agregar y mostrar botones de modificar/eliminar
      document.getElementById('btn-agregar-abm').style.display = 'none';
      document.getElementById('btn-modificar').style.display = 'inline-block';
      document.getElementById('btn-eliminar').style.display = 'inline-block';

    } else {
      // Si es una nueva persona (Agregar)
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

      // Ocultar los campos específicos hasta que se seleccione el tipo de persona
      document.querySelector('.heroe-fields').style.display = 'none';
      document.querySelector('.profesional-fields').style.display = 'none';

      // Mostrar el botón de agregar y ocultar los de modificar/eliminar
      document.getElementById('btn-agregar-abm').style.display = 'inline-block';
      document.getElementById('btn-modificar').style.display = 'none';
      document.getElementById('btn-eliminar').style.display = 'none';
    }
  }

  // Función para crear una nueva persona desde el formulario
  function crearPersonaDesdeFormulario(tipoPersona) {
    const nuevoId = generarIdUnico(); // Generar un nuevo ID
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = parseInt(document.getElementById('edad').value);

    if (tipoPersona === 'heroe') {
      const ciudad = document.getElementById('ciudad').value;
      const alterEgo = document.getElementById('alterEgo').value;
      const publicado = parseInt(document.getElementById('publicado').value);
      return new Heroe(nuevoId, nombre, apellido, edad, ciudad, alterEgo, publicado);
    } else if (tipoPersona === 'profesional') {
      const titulo = document.getElementById('titulo').value;
      const robos = document.getElementById('robos').value;
      const asesinatos = parseInt(document.getElementById('asesinatos').value);
      return new Villano(nuevoId, nombre, apellido, edad, titulo, robos, asesinatos);
    }
  }

  // Función para actualizar los datos de una persona desde el formulario
  function actualizarPersonaDesdeFormulario(persona) {
    persona.nombre = document.getElementById('nombre').value;
    persona.apellido = document.getElementById('apellido').value;
    persona.edad = parseInt(document.getElementById('edad').value);

    if (persona instanceof Heroe) {
      persona.ciudad = document.getElementById('ciudad').value;
      persona.alterEgo = document.getElementById('alterEgo').value;
      persona.publicado = parseInt(document.getElementById('publicado').value);
    } else if (persona instanceof Villano) {
      persona.titulo = document.getElementById('titulo').value;
      persona.robos = document.getElementById('robos').value;
      persona.asesinatos = parseInt(document.getElementById('asesinatos').value);
    }
  }

  // Función para generar un ID único para una nueva persona
  function generarIdUnico() {
    if (personas.length === 0) {
      return 1;
    }
    const maxId = personas.reduce((max, persona) => Math.max(max, persona.id), 0);
    return maxId + 1;
  }

  // Función para actualizar la tabla con las personas actuales
  function actualizarTablaPersonas() {
    const personasFiltradas = aplicarFiltro(); // Aplicamos el filtro actual
    funciones.mostrarPersonasEnTabla(personasFiltradas); // Mostrar solo las personas filtradas
  
    // Re-agregamos los event listeners de doble clic en las filas
    document.querySelectorAll('tbody tr').forEach(fila => {
      fila.addEventListener('dblclick', function () {
        const id = this.querySelector('td:first-child').textContent; // Obtener el ID de la fila
        personaSeleccionada = personas.find(p => p.id == id); // Buscar la persona por ID
        mostrarFormularioABM(personaSeleccionada); // Mostrar el formulario con los datos de la persona
      });
    });
  
    // Aplicar la visibilidad de las columnas según el estado de los checkboxes
    document.querySelectorAll('.checkboxes input[type="checkbox"]').forEach(checkbox => {
      const columna = checkbox.getAttribute('data-column');
      const mostrar = checkbox.checked;
      mostrarOcultarColumna(columna, mostrar);
    });
  }

  // Función para ocultar el formulario ABM y mostrar el "Form Datos"
  function ocultarFormularioABM() {
    document.querySelector('.form-filtros').style.display = 'block';
    document.getElementById('form-abm').style.display = 'none';
  }

  // Función para ordenar la tabla según la columna clickeada
  function ordenarTablaPorColumna(columna) {
    const personasFiltradas = aplicarFiltro(); // Obtener las personas filtradas
    personasFiltradas.sort((a, b) => {
      let valorA = a[columna];
      let valorB = b[columna];

      // Si los valores son strings, hacer la comparación de forma alfabética
      if (typeof valorA === 'string') {
        valorA = valorA.toLowerCase();
        valorB = valorB.toLowerCase();
        if (ordenAscendente) {
          return valorA.localeCompare(valorB);
        } else {
          return valorB.localeCompare(valorA);
        }
      } else { 
        // Para números
        if (ordenAscendente) {
          return valorA - valorB;
        } else {
          return valorB - valorA;
        }
      }
    });

    ordenAscendente = !ordenAscendente; // Alternar el orden en cada clic

    // Actualizar la tabla con los datos ordenados
    funciones.mostrarPersonasEnTabla(personasFiltradas); // Mostramos las personas filtradas y ordenadas
  }

  // Función para aplicar el filtro actual a las personas
  function aplicarFiltro() {
    if (filtroSeleccionado === 'heroe') {
      return personas.filter(p => p instanceof Heroe);
    } else if (filtroSeleccionado === 'profesional') {
      return personas.filter(p => p instanceof Villano);
    } else {
      return personas; // Si el filtro es 'todos', devolvemos todos los elementos
    }
  }

  // Función para calcular el promedio de las edades de las personas filtradas
  function calcularPromedioEdades(personas) {
    // Si no hay personas en la lista, devolvemos 'N/A'
    if (personas.length === 0) return 'N/A';

    // Usamos map para extraer las edades y reduce para sumarlas
    const totalEdades = personas
      .map(persona => persona.edad)  // Extraemos las edades
      .reduce((suma, edad) => suma + edad, 0);  // Sumamos todas las edades

    // Calculamos el promedio de las edades
    const promedioEdades = totalEdades / personas.length;
    return promedioEdades.toFixed(2); // Devolvemos el promedio con dos decimales
  }

  // Función para mostrar u ocultar columnas
  function mostrarOcultarColumna(columna, mostrar) {
    // Encontramos el índice de la columna a partir del atributo 'data-column'
    const index = Array.from(document.querySelectorAll('th')).findIndex(th => th.textContent.toLowerCase().replace(" ", "") === columna);

    if (index !== -1) {
      // Mostrar u ocultar la columna en el encabezado
      document.querySelectorAll(`th:nth-child(${index + 1})`).forEach(th => {
        th.style.display = mostrar ? '' : 'none';
      });
      // Mostrar u ocultar la columna en todas las filas
      document.querySelectorAll(`td:nth-child(${index + 1})`).forEach(td => {
        td.style.display = mostrar ? '' : 'none';
      });
    }
  }

  // Función para validar los campos del formulario ABM
  function validarFormularioABM() {
    let valido = true;
    let errores = [];
  
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const edad = parseInt(document.getElementById('edad').value.trim());
  
    if (nombre === '') {
      errores.push("El nombre no puede estar vacío.");
      valido = false;
    }
  
    if (apellido === '') {
      errores.push("El apellido no puede estar vacío.");
      valido = false;
    }
  
    if (isNaN(edad) || edad <= 15) {
      errores.push("La edad debe ser mayor a 15.");
      valido = false;
    }
  
    const tipoPersona = document.getElementById('tipoPersona').value;
  
    if (tipoPersona === 'heroe') {
      const ciudad = document.getElementById('ciudad').value.trim();
      const alterEgo = document.getElementById('alterEgo').value.trim();
      const publicado = parseInt(document.getElementById('publicado').value.trim());
        if (ciudad === '') {
        errores.push("El ciudad no puede estar vacío.");
        valido = false;
      }
  
      if (alterEgo === '') {
        errores.push("La alterEgo no puede estar vacía.");
        valido = false;
      }
  
      if (isNaN(publicado) || publicado < 0) {
        errores.push("La cantidad de goles debe ser mayor o igual a 0.");
        valido = false;
      }
  
    } else if (tipoPersona === 'profesional') {
      const titulo = document.getElementById('titulo').value.trim();
      const robos = document.getElementById('robos').value.trim();
      const asesinatos = parseInt(document.getElementById('asesinatos').value.trim());
  
      if (titulo === '') {
        errores.push("El título no puede estar vacío.");
        valido = false;
      }
  
      if (robos === '') {
        errores.push("La robos no puede estar vacía.");
        valido = false;
      }
  
      if (isNaN(asesinatos) || asesinatos <= 1950) {
        errores.push("El año de graduación debe ser mayor a 1950.");
        valido = false;
      }
    }
  
    // Mostrar mensajes de error si hay algún problema
    if (!valido) {
      alert(errores.join('\n'));
    }
  
    return valido; // Retornar si el formulario es válido o no
  }
});