let personas = JSON.parse('[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterEgo":"Superman", "ciudad":"Metropolis", "publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterEgo":"Batman", "ciudad":"Gotica", "publicado":2012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterEgo":"Flash", "ciudad":"Central", "publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500, "asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750, "asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25, "asesinatos":1}]');
let personaEditando = null;

function mostrarDatos() {
    const tbody = document.querySelector("#tabla-personas tbody");
    tbody.innerHTML = '';
    document.getElementById("filter").value = "todos";

    personas.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.id || '--'}</td>
            <td>${p.nombre || '--'}</td>
            <td>${p.apellido || '--'}</td>
            <td>${p.edad || '--'}</td>
            <td>${p.enemigo || '--'}</td>
            <td>${p.asesinatos || '--'}</td>
            <td>${p.robos || '--'}</td>
            <td>${p.alterEgo || '--'}</td>
            <td>${p.ciudad || '--'}</td>
            <td>${p.publicado || '--'}</td>`;
        row.ondblclick = () => mostrarABM(p);
        tbody.appendChild(row);
    });

    mostrarColumnas();
}

function filtrarDatos() {
    const filtro = document.getElementById("filter").value;
    let filtrados = personas;

    if (filtro === 'villanos') {
        filtrados = personas.filter(p => p.enemigo);
    } else if (filtro === 'heroes') {
        filtrados = personas.filter(p => p.alterEgo);
    }

    mostrarDatosFiltrados(filtrados);
}

function mostrarDatosFiltrados(lista) {
    const tbody = document.querySelector("#tabla-personas tbody");
    tbody.innerHTML = '';
    lista.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.id || '--'}</td>
            <td>${p.nombre || '--'}</td>
            <td>${p.apellido || '--'}</td>
            <td>${p.edad || '--'}</td>
            <td>${p.enemigo || '--'}</td>
            <td>${p.asesinatos || '--'}</td>
            <td>${p.robos || '--'}</td>
            <td>${p.alterEgo || '--'}</td>
            <td>${p.ciudad || '--'}</td>
            <td>${p.publicado || '--'}</td>`;
        row.ondblclick = () => mostrarABM(p);
        tbody.appendChild(row);
    });

    mostrarColumnas();
}

function calcularEdadPromedio() {
    const filtro = document.getElementById("filter").value;
    let filtrados = personas;
    if (filtro === 'Heroe') {
        filtrados = personas.filter(p => p.enemigo);
    } else if (filtro === 'Villano') {
        filtrados = personas.filter(p => p.alterEgo);
    }
    const promedio = filtrados.reduce((acc, p) => acc + p.edad, 0) / filtrados.length;
    document.getElementById("edad-promedio").value = `${promedio.toFixed(2)}`;
}

function mostrarABM(persona = {}) {
    document.getElementById("form-datos").style.display = "none";
    document.getElementById("form-abm").style.display = "block";
    personaEditando = persona.id;
    document.getElementById("id").value = persona.id || '';
    document.getElementById("nombre").value = persona.nombre || '';
    document.getElementById("apellido").value = persona.apellido || '';
    document.getElementById("edad").value = persona.edad || '';
    document.getElementById("enemigo").value = persona.enemigo || '';
    document.getElementById("asesinatos").value = persona.asesinatos || '';
    document.getElementById("robos").value = persona.robos != null ? persona.robos : 0;
    document.getElementById("alterEgo").value = persona.alterEgo || '';
    document.getElementById("ciudad").value = persona.ciudad || '';
    document.getElementById("publicado").value = persona.publicado || '';

    if (persona.enemigo) {
        document.getElementById("tipo").value = 'tipo_villanos';
    } else if (persona.alterEgo) {
        document.getElementById("tipo").value = 'tipo_heroes';
    } else {
        document.getElementById("tipo").value = 'tipo_heroes';
    }

    mostrarCamposPorTipo();
}

function guardarPersona() {
    const id = personaEditando || (personas.length ? Math.max(...personas.map(p => p.id)) + 1 : 1);
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = parseInt(document.getElementById("edad").value);
    const tipo = document.getElementById("tipo").value;
    const enemigo = document.getElementById("enemigo").value;
    const asesinatos = document.getElementById("asesinatos").value;
    const robos = parseInt(document.getElementById("robos").value) || 0;
    const alterEgo = document.getElementById("alterEgo").value;
    const ciudad = document.getElementById("ciudad").value;
    const publicado = parseInt(document.getElementById("publicado").value) || null;
    const existeJugador = personas.some(p => p.id === id);
    
    if (existeJugador) {
        alert("La persona ingresada ya existe. Presione 'Modificar' para guardar los cambios.");
        return;
    }

    if (!nombre) {
        alert("El campo 'Nombre' es requerido.");
        return;
    } else if (!apellido) {
        alert("El campo 'Apellido' es requerido.");
        return;
    } else if (isNaN(edad)) {
        alert("El campo 'Edad' es requerido.");
        return;
    } else if (tipo === 'tipo_heroes' && enemigo.trim() === '' && publicado < 1940) {
        alert("Error en los campos de tipo heroe.");
        return;
    } else if (tipo === 'tipo_villanos' && alterEgo.trim() === '' && robos < 1 && asesinatos < 1) {
        alert("Error en los campos de tipo villano.");
        return;
    }

    const nuevaPersona = { id, nombre, apellido, edad, enemigo, asesinatos, robos, alterEgo, ciudad, publicado, tipo };
    
    if (personaEditando) {
        personas = personas.map(p => p.id === personaEditando ? nuevaPersona : p);
    } else {
        personas.push(nuevaPersona);
    }

    cancelarABM();
    mostrarDatos();
}

function modificarPersona() {
    const id = personaEditando;

    if (!id) {
        alert("La persona ingresada no existe. Presione 'Alta' para continuar.");
        return;
    }

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = parseInt(document.getElementById("edad").value);
    const enemigo = document.getElementById("enemigo").value;
    const asesinatos = document.getElementById("asesinatos").value;
    const robos = parseInt(document.getElementById("robos").value) || 0;
    const alterEgo = document.getElementById("alterEgo").value;
    const ciudad = document.getElementById("ciudad").value;
    const publicado = parseInt(document.getElementById("publicado").value) || null;
    const tipo = document.getElementById("tipo").value;
    const personaExistente = personas.find(p => p.id === id);

    if (!personaExistente) {
        alert("La persona ingresada no existe. Presione 'Alta' para continuar.");
        return;
    }

    personaExistente.nombre = nombre;
    personaExistente.apellido = apellido;
    personaExistente.edad = edad;
    personaExistente.enemigo = enemigo;
    personaExistente.asesinatos = asesinatos;
    personaExistente.robos = robos;
    personaExistente.alterEgo = alterEgo;
    personaExistente.ciudad = ciudad;
    personaExistente.publicado = publicado;
    personaExistente.tipo = tipo;

    cancelarABM();
    mostrarDatos();
}

function eliminarPersona() {
    if (!personaEditando) {
        cancelarABM();
        return;
    }

    personas = personas.filter(p => p.id !== personaEditando);
    personaEditando = null;

    mostrarDatos();
    cancelarABM();
}

function cancelarABM() {
    document.getElementById("form-abm").style.display = "none";
    document.getElementById("form-datos").style.display = "block";
}

function ordenarTabla(columna) {
    personas.sort((a, b) => (a[columna] > b[columna]) ? 1 : -1);
    mostrarDatos();
}

function mostrarColumnas() {
    const checkboxes = document.querySelectorAll('[data-column]');
    checkboxes.forEach(cb => {
        const columnName = cb.dataset.column;
        const columnIndex = Array.from(document.querySelectorAll("#tabla-personas th"))
            .findIndex(th => th.getAttribute("onclick")?.includes(columnName));
        if (columnIndex !== -1) {
            const displayStyle = cb.checked ? '' : 'none';
            document.querySelectorAll(`#tabla-personas th`)[columnIndex].style.display = displayStyle;
            document.querySelectorAll(`#tabla-personas tbody tr`).forEach(row => {
                if (row.cells[columnIndex]) {
                    row.cells[columnIndex].style.display = displayStyle;
                }
            });
        }
    });
}

function mostrarCamposPorTipo() {
    const tipo = document.getElementById("tipo").value;
    const camposVillano = ['enemigo', 'asesinatos', 'robos'];
    const camposHeroe = ['alterEgo', 'ciudad', 'publicado'];

    camposVillano.concat(camposHeroe).map(id => {
        document.getElementById(id).style.display = 'inline-block';
        document.querySelector(`label[for="${id}"]`).style.display = 'inline-block';
    });

    if (tipo === 'tipo_heroes') {
        camposHeroe.map(id => {
            document.getElementById(id).style.display = 'none';
            document.querySelector(`label[for="${id}"]`).style.display = 'none';
        });
    } else if (tipo === 'tipo_villanos') {
        camposVillano.map(id => {
            document.getElementById(id).style.display = 'none';
            document.querySelector(`label[for="${id}"]`).style.display = 'none';
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos();
    filtrarDatos();
});
