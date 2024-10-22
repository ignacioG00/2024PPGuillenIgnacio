class Persona {
    constructor(id, nombre, apellido, edad) {
        if (!id || !nombre || !apellido || edad <= 15) {
            throw new Error("Datos inválidos para Persona.");
        }
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    toString() {
        return `Id: ${this.id} - Nombre: ${this.nombre} - Apellido: ${this.apellido} - Edad: ${this.edad}`; 
    }
}

// Clase derivada Futbolista
class Futbolista extends Persona {
    constructor(id, nombre, apellido, edad, equipo, posicion, cantGoles) {
        super(id, nombre, apellido, edad);
        if (!equipo || !posicion || cantGoles <= 1) {
            throw new Error("Datos inválidos para Futbolista.");
        }
        this.equipo = equipo;
        this.posicion = posicion;
        this.cantGoles = cantGoles;
    }
    toString() {
        return `${super.toString()} - Equipo: ${this.equipo} - Posición: ${this.posicion} - Cantidad de Goles: ${this.cantidadGoles}`;
    }
}

// Clase derivada Profesional
class Profesional extends Persona {
    constructor(id, nombre, apellido, edad, titulo, facultad, añoGraduacion) {
        super(id, nombre, apellido, edad);
        if (!titulo || !facultad || añoGraduacion <= 1950) {
            throw new Error("Datos inválidos para Profesional.");
        }
        this.titulo = titulo;
        this.facultad = facultad;
        this.añoGraduacion = añoGraduacion;
    }
    toString() {
        return `${super.toString()} - Título: ${this.titulo} - Facultad: ${this.facultad} - Año de Graduación: ${this.añoGraduacion}`;
    }
}
function parsearArray() {
    const personas = 
    `[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN", "añoGraduacion":2002},
      {"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico", "facultad":"UBA", "añoGraduacion":20012},
      {"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "titulo":"Abogado", "facultad":"UCA", "añoGraduacion":2017},
      {"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},
      {"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},
      {"id":6, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]`;

    return JSON.parse(personas).map((item) => {
        if (item.titulo !== undefined) {
            return new Profesional(item.id, item.nombre, item.apellido, item.edad, item.titulo, item.facultad, item.añoGraduacion);
        } else {
            return new Futbolista(item.id, item.nombre, item.apellido, item.edad, item.equipo, item.posicion, item.cantidadGoles);
        }
    });
}

let ordenAscendente = true; 

function precargarPersonas() {
    const personasPrecargadas = [
        new Futbolista(1, "Lionel", "Messi", 36, "Inter Miami", "Delantero", 800),
        new Profesional(2, "Ana", "Gómez", 40, "Ingeniera Civil", "UBA", 2005),
        new Futbolista(3, "Cristiano", "Ronaldo", 38, "Al Nassr", "Delantero", 700),
        new Profesional(4, "Carlos", "Pérez", 45, "Abogado", "UNLP", 1998)
    ];
    personas = personasPrecargadas;
    actualizarTabla(personas);
}

document.addEventListener("DOMContentLoaded", () => {
    precargarPersonas();
});

function validarFormularioPersona() {
    const id = document.getElementById('id-abm').value.trim();
    const nombre = document.getElementById('nombre-abm').value.trim();
    const apellido = document.getElementById('apellido-abm').value.trim();
    const edad = parseInt(document.getElementById('edad-abm').value);
    const equipo = document.getElementById('equipo-abm')?.value.trim();
    const posicion = document.getElementById('posicion-abm')?.value.trim();
    const cantGoles = parseInt(document.getElementById('cantGoles-abm')?.value);
    const titulo = document.getElementById('titulo-abm')?.value.trim();
    const facultad = document.getElementById('facultad-abm')?.value.trim();
    const añoGraduacion = parseInt(document.getElementById('añoGraduacion-abm')?.value);

    if (!id || isNaN(id) || id <= 0) {
        alert("El ID debe ser un número válido y mayor que 0.");
        return false;
    }

    if (!nombre) {
        alert("El nombre no puede estar vacío.");
        return false;
    }

    if (!apellido) {
        alert("El apellido no puede estar vacío.");
        return false;
    }

    if (isNaN(edad) || edad <= 15) {
        alert("La edad debe ser un número mayor que 15.");
        return false;
    }

    if (equipo && posicion && (isNaN(cantGoles) || cantGoles <= 1)) {
        alert("La cantidad de goles debe ser un número mayor a 1 para un futbolista.");
        return false;
    }

    if (titulo && facultad && (isNaN(añoGraduacion) || añoGraduacion <= 1950)) {
        alert("El año de graduación debe ser un número mayor a 1950 para un profesional.");
        return false;
    }

    return true; 
}

function agregarPersona() {
    mostrarABM();
    limpiarFormularioABM();
}

function modificarPersona(id) {
    const persona = personas.find(p => p.id == id);
    if (persona) {
        cargarFormularioABM(persona); 
        mostrarABM();
    } else {
        console.error('Persona no encontrada con ID:', id);
    }
}

function eliminarPersona(id) {
    personas = personas.filter(p => p.id != id); 
    actualizarTabla(personas); 
}

function guardarPersona() {
    const id = document.getElementById('id-abm').value.trim();
    const nombre = document.getElementById('nombre-abm').value.trim();
    const apellido = document.getElementById('apellido-abm').value.trim();
    const edad = parseInt(document.getElementById('edad-abm').value.trim());
    const tipo = document.getElementById('tipo-abm').value;

    let nuevaPersona;

    if (!validarFormularioPersona()) {
        return;
    }

    if (tipo === 'futbolista') {
        const equipo = document.getElementById('equipo-abm').value.trim();
        const posicion = document.getElementById('posicion-abm').value.trim();
        const cantGoles = parseInt(document.getElementById('cantGoles-abm').value.trim());

        nuevaPersona = new Futbolista(id, nombre, apellido, edad, equipo, posicion, cantGoles);
    } else if (tipo === 'profesional') {
        const titulo = document.getElementById('titulo-abm').value.trim();
        const facultad = document.getElementById('facultad-abm').value.trim();
        const añoGraduacion = parseInt(document.getElementById('añoGraduacion-abm').value.trim());

        nuevaPersona = new Profesional(id, nombre, apellido, edad, titulo, facultad, añoGraduacion);
    }

    const index = personas.findIndex(p => p.id == id);
    if (index !== -1) {
        personas[index] = nuevaPersona; 
    } else {
        personas.push(nuevaPersona); 
    }

    ocultarABM();
    limpiarFormularioABM();
    actualizarTabla(personas); 
}

function actualizarTabla(personasAMostrar) {
    const tableBody = document.getElementById('personas-table');
    tableBody.innerHTML = ''; 

    personasAMostrar.forEach(persona => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.edad}</td>
            <td>${persona instanceof Futbolista ? persona.equipo : ''}</td>
            <td>${persona instanceof Futbolista ? persona.posicion : ''}</td>
            <td>${persona instanceof Futbolista ? persona.cantGoles : ''}</td>
            <td>${persona instanceof Profesional ? persona.titulo : ''}</td>
            <td>${persona instanceof Profesional ? persona.facultad : ''}</td>
            <td>${persona instanceof Profesional ? persona.añoGraduacion : ''}</td>
            <td>
                <button onclick="modificarPersona(${persona.id})">Modificar</button>
                <button onclick="eliminarPersona(${persona.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filtrarPersonas() {
    const filtro = document.getElementById('filtro').value;
    let personasFiltradas;

    if (filtro === 'todos') {
        personasFiltradas = personas;
        mostrarTodosLosTitulos();
    } else if (filtro === 'futbolistas') {
        personasFiltradas = personas.filter(p => p instanceof Futbolista);
        ocultarTitulosProfesionales();
    } else if (filtro === 'profesionales') {
        personasFiltradas = personas.filter(p => p instanceof Profesional);
        mostrarTodosLosTitulos();
        ocultarTitulosFutbolistas();
    }

    actualizarTabla(personasFiltradas);
}

document.getElementById('filtro').addEventListener('change', () => {
    filtrarPersonas(); 
});

function ocultarTitulosFutbolistas() {
    const titulosFutbolistas = [
        'equipo',
        'posicion',
        'cantGoles'
    ];
    titulosFutbolistas.forEach(titulo => {
        const th = document.querySelector(`th[data-column="${titulo}"]`);
        if (th) {
            th.style.visibility = 'hidden'; 
        }
    });
}


function ocultarTitulosProfesionales() {
    const titulosProfesionales = [
        'titulo',
        'facultad',
        'añoGraduacion'
    ];
    titulosProfesionales.forEach(titulo => {
        const th = document.querySelector(`th[data-column="${titulo}"]`);
        if (th) {
            th.style.visibility = 'hidden'; 

        }
    });
}

function mostrarTodosLosTitulos() {
    const titulos = [
        'equipo',
        'posicion',
        'cantGoles',
        'titulo',
        'facultad',
        'añoGraduacion'
    ];
    titulos.forEach(titulo => {
        const th = document.querySelector(`th[data-column="${titulo}"]`);
        if (th) {
            th.style.visibility = 'visible'; 
        }
    });
}

function actualizarFormularioABM() {
    const tipoPersona = document.getElementById('tipo-abm').value;

    // Ocultar todos los campos
    document.getElementById('futbolista-fields').style.display = 'none';
    document.getElementById('profesional-fields').style.display = 'none';

    // Mostrar campos según el tipo seleccionado
    if (tipoPersona === 'futbolista') {
        document.getElementById('futbolista-fields').style.display = 'block';
    } else if (tipoPersona === 'profesional') {
        document.getElementById('profesional-fields').style.display = 'block';
    }
}

function mostrarABM() {
    document.getElementById('form-abm').style.display = 'block';
    document.getElementById('form-datos').style.display = 'none';
}

function ocultarABM() {
    document.getElementById('form-abm').style.display = 'none';
    document.getElementById('form-datos').style.display = 'block';
}

function limpiarFormularioABM() {
    document.getElementById('id-abm').value = '';
    document.getElementById('nombre-abm').value = '';
    document.getElementById('apellido-abm').value = '';
    document.getElementById('edad-abm').value = '';
    document.getElementById('tipo-abm').value = ''; 
    actualizarFormularioABM(); 
}

function cargarFormularioABM(persona) {
    document.getElementById('id-abm').value = persona.id;
    document.getElementById('nombre-abm').value = persona.nombre;
    document.getElementById('apellido-abm').value = persona.apellido;
    document.getElementById('edad-abm').value = persona.edad;

    if (persona instanceof Futbolista) {
        document.getElementById('equipo-abm').value = persona.equipo;
        document.getElementById('posicion-abm').value = persona.posicion;
        document.getElementById('cantGoles-abm').value = persona.cantGoles;
    } else if (persona instanceof Profesional) {
        document.getElementById('titulo-abm').value = persona.titulo;
        document.getElementById('facultad-abm').value = persona.facultad;
        document.getElementById('añoGraduacion-abm').value = persona.añoGraduacion;
    }

    mostrarABM();
}

document.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
        const column = th.getAttribute('data-column');
        
        let personasAMostrar;

        const filtro = document.getElementById('filtro').value;
        if (filtro === 'todos') {
            personasAMostrar = personas; 
        } else if (filtro === 'futbolistas') {
            personasAMostrar = personas.filter(p => p instanceof Futbolista); 
        } else if (filtro === 'profesionales') {
            personasAMostrar = personas.filter(p => p instanceof Profesional); 
        }

        let personasOrdenadas = personasAMostrar
            .map(p => p)
            .filter(p => p[column] !== undefined)
            .sort((a, b) => {
                let aValue = a[column];
                let bValue = b[column];

                if (!isNaN(aValue) && !isNaN(bValue)) {
                    return ordenAscendente ? aValue - bValue : bValue - aValue;
                }

                return ordenAscendente 
                    ? aValue.toString().localeCompare(bValue.toString()) 
                    : bValue.toString().localeCompare(aValue.toString());
            });

        ordenAscendente = !ordenAscendente; 

        actualizarTabla(personasOrdenadas);
    });
});

function calcularEdadProm() {
    const filtro = document.getElementById('filtro').value;

    let personasFiltradas;
    if (filtro === 'todos') {
        personasFiltradas = personas;
    } else if (filtro === 'futbolistas') {
        personasFiltradas = personas.filter(p => p instanceof Futbolista);
    } else if (filtro === 'profesionales') {
        personasFiltradas = personas.filter(p => p instanceof Profesional);
    }

    const edades = personasFiltradas.map(p => p.edad);
    const edadPromedio = edades.length > 0 
        ? edades.reduce((sum, edad) => sum + edad, 0) / edades.length 
        : 0;

    document.getElementById('edad-promedio').value = edadPromedio.toFixed(2);
}

document.getElementById('btn-calcular').addEventListener('click', calcularEdadProm);
document.getElementById('tipo-abm').addEventListener('change', actualizarFormularioABM);
document.getElementById('btn-agregar').addEventListener('click', agregarPersona);
document.getElementById('btn-guardar-abm').addEventListener('click', guardarPersona);
document.getElementById('btn-cancelar-abm').addEventListener('click', ocultarABM);
document.getElementById('filtro').addEventListener('change', filtrarPersonas);


