class Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue) {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
        this.altMax = altMax;
        this.autonomia = autonomia;
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
}

class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue, alturaVuelo) {
        super(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue);
        this.alturaVuelo = alturaVuelo; 
    }
}

class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue, tipoTraccion) {
        super(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue);
        this.tipoTraccion = tipoTraccion; 
    }
}

let vehiculos = [];

function precargarVehiculos() {
    const vehiculosPrecargados = [
        new Aereo("14", "Boeing 747", 1990, 988, 13, 13450, 0, 2, 10000),
        new Terrestre("51", "Dodge Viper", 1991, 266, null, null, 2, 4, "Trasera"),
        new Aereo("67", "Boeing CH-47", 1962, 302, 6, 1200, 0, 2, 2000),
        new Terrestre("666", "Ferrari F100", 1998, 400, null, null, 2, 4, "Delantera"),
    ];
    vehiculos = vehiculosPrecargados;
    actualizarTabla(vehiculos);
}

function validarFormulario() {
    const modelo = document.getElementById('modelo-abm').value.trim();
    const anoFab = parseInt(document.getElementById('anoFab-abm').value);
    const velMax = parseInt(document.getElementById('velMax-abm').value);
    const tipo = document.getElementById('tipo-abm').value;
    const alturaVuelo = parseInt(document.getElementById('alturaVuelo-abm').value);
    const autonomia = parseInt(document.getElementById('autonomia-abm').value);
    const cantRuedas = parseInt(document.getElementById('cantRue-abm').value);
    const cantPuertas = parseInt(document.getElementById('cantPue-abm').value);

    if (!modelo) {
        alert("El modelo no puede estar vacío.");
        return false;
    }

    if (anoFab <= 1885) {
        alert("El año de fabricación debe ser mayor a 1885.");
        return false;
    }

    if (velMax <= 0) {
        alert("La velocidad máxima debe ser mayor a 0.");
        return false;
    }

    if (tipo === 'Aéreo') {
        if (alturaVuelo <= 0) {
            alert("La altura de vuelo debe ser mayor a 0.");
            return false;
        }
        if (autonomia <= 0) {
            alert("La autonomía debe ser mayor a 0.");
            return false;
        }
    }

    if (tipo === 'Terrestre') {
        
        if (cantRuedas <= 0) {

            alert("La cantidad de ruedas debe ser mayor a 0.");
            return false;
        }
        if (cantPuertas < 0) {
            alert("La cantidad de puertas no puede ser menor a 0.");
            return false;
        }
    }

    return true; 
}

function agregarVehiculo() {
    mostrarABM();
    limpiarFormularioABM();
}

function modificarVehiculo(id) {
    const vehiculo = vehiculos.find(v => v.id === id);
    mostrarABM();
    if (vehiculo) {
        cargarFormularioABM(vehiculo);
    } else {
        console.error('Vehículo no encontrado con ID:', id);
    }
}

function eliminarVehiculo(id) {
    vehiculos = vehiculos.filter(v => v.id !== id);
    actualizarTabla(vehiculos);
}

function guardarVehiculo() {
    const id = document.getElementById('id-abm').value || generarID();
    const modelo = document.getElementById('modelo-abm').value;
    const anoFab = document.getElementById('anoFab-abm').value;
    const velMax = document.getElementById('velMax-abm').value;
    const altMax = document.getElementById('alturaVuelo-abm').value;
    const autonomia = document.getElementById('autonomia').value; 
    const cantPue = document.getElementById('cantPue').value; 
    const cantRue = document.getElementById('cantRue').value; 
    const tipo = document.getElementById('tipo-abm').value;
    
    let vehiculoExistente = vehiculos.find(v => v.id === id);

    if (!validarFormulario()) {
        return;
    }

    if (vehiculoExistente) {
        vehiculos = vehiculos.map(v => {
            if (v.id === id) {
                v.modelo = modelo;
                v.anoFab = anoFab;
                v.velMax = velMax;
                v.altMax = altMax || null;
                v.autonomia = autonomia || null;
                v.cantPue = cantPue;
                v.cantRue = cantRue;
                if (v instanceof Aereo) {
                    v.alturaVuelo = document.getElementById('alturaVuelo').value; 
                } else if (v instanceof Terrestre) {
                    v.tipoTraccion = document.getElementById('tipoTraccion').value; 
                }
            }
            return v;
        });
    } else {
        // Alta de un nuevo vehículo
        let nuevoVehiculo;
        if (tipo === 'aereo') {
            const alturaVuelo = document.getElementById('alturaVuelo').value; 
            nuevoVehiculo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue, alturaVuelo);
        } else {
            const tipoTraccion = document.getElementById('tipoTraccion').value; 
            nuevoVehiculo = new Terrestre(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue, tipoTraccion);
        }
        vehiculos.push(nuevoVehiculo);
    }

    actualizarTabla(vehiculos);
    ocultarABM();
}

function actualizarTabla(vehiculosAMostrar) {
    const tableBody = document.getElementById('vehiculos-table');
    tableBody.innerHTML = '';
    vehiculosAMostrar.forEach(vehiculo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehiculo.id}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.anoFab}</td>
            <td>${vehiculo.velMax}</td>
            <td>${vehiculo.altMax || '-'}</td>
            <td>${vehiculo.autonomia || '-'}</td>
            <td>${vehiculo.cantPue}</td>
            <td>${vehiculo.cantRue}</td>
            <td>${vehiculo.alturaVuelo || '-'}</td>
            <td>${vehiculo.tipoTraccion || '-'}</td>
            <td><button onclick="modificarVehiculo('${vehiculo.id}')">Modificar</button></td>
            <td><button onclick="eliminarVehiculo('${vehiculo.id}')">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function filtrarVehiculos() {
    const filtro = document.getElementById('filtro').value;
    let vehiculosFiltrados;
    if (filtro === 'todos') {
        vehiculosFiltrados = vehiculos;
    } else if (filtro === 'aereo') {
        vehiculosFiltrados = vehiculos.filter(v => v instanceof Aereo);
    } else if (filtro === 'terrestre') {
        vehiculosFiltrados = vehiculos.filter(v => v instanceof Terrestre);
    }
    actualizarTabla(vehiculosFiltrados);
}
function calcularVelocidadPromedio() {
    const filtro = document.getElementById('filtro').value;
    let vehiculosFiltrados = vehiculos;

    if (filtro !== 'todos') {
        vehiculosFiltrados = vehiculos.filter(v => 
            (filtro === 'aereo' && v instanceof Aereo) || 
            (filtro === 'terrestre' && v instanceof Terrestre)
        );
    }

    const totalVelocidad = vehiculosFiltrados.reduce((acc, v) => acc + Number(v.velMax), 0);
    const promedio = vehiculosFiltrados.length ? (totalVelocidad / vehiculosFiltrados.length) : 0;

    const promedioInput = document.getElementById('velocidad-promedio');
    promedioInput.value = promedio.toFixed(2);
}

function generarID() {
    return (vehiculos.length + 1).toString();
}

function actualizarFormularioABM() {
    const tipoVehiculo = document.getElementById('tipo-abm').value;
    
    const tipoTraccionField = document.getElementById('tipoTraccion-abm');
    const cantPueField = document.getElementById('cantPue-abm');
    const cantRueField = document.getElementById('cantRue-abm');
    const alturaVueloField = document.getElementById('alturaVuelo-abm');
    const autonomiaField = document.getElementById('autonomia-abm');

    if (tipoVehiculo === 'aereo') {
        alturaVueloField.style.display = 'block'; 
        autonomiaField.style.display = 'block'; 
        tipoTraccionField.style.display = 'none'; 
        cantPueField.style.display = 'none'; 
        cantRueField.style.display = 'none'; 
    } else if (tipoVehiculo === 'terrestre') {
        alturaVueloField.style.display = 'none'; 
        autonomiaField.style.display = 'none'; 
        tipoTraccionField.style.display = 'block'; 
        cantPueField.style.display = 'block'; 
        cantRueField.style.display = 'block'; 
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
    document.getElementById('modelo-abm').value = '';
    document.getElementById('anoFab-abm').value = '';
    document.getElementById('velMax-abm').value = '';
    document.getElementById('tipo-abm').value = ''; 
    actualizarFormularioABM(); 
}

function cargarFormularioABM(vehiculo) {
    document.getElementById('id-abm').value = vehiculo.id;
    document.getElementById('modelo-abm').value = vehiculo.modelo;
    document.getElementById('anoFab-abm').value = vehiculo.anoFab;
    document.getElementById('velMax-abm').value = vehiculo.velMax;

    if (vehiculo instanceof Aereo) {
        document.getElementById('tipo-abm').value = 'aereo';
        document.getElementById('alturaVuelo-abm').value = vehiculo.alturaVuelo;
        document.getElementById('autonomia-abm').value = vehiculo.autonomia; 
    } else {
        document.getElementById('tipo-abm').value = 'terrestre';
        document.getElementById('tipoTraccion-abm').value = vehiculo.tipoTraccion;
        document.getElementById('cantPue-abm').value = vehiculo.cantPue;
        document.getElementById('cantRue-abm').value = vehiculo.cantRue;
    }
}
document.getElementById('btn-agregar').addEventListener('click', agregarVehiculo);
document.getElementById('btn-guardar-abm').addEventListener('click', guardarVehiculo);
document.getElementById('btn-cancelar-abm').addEventListener('click', ocultarABM);
document.getElementById('filtro').addEventListener('change', filtrarVehiculos);
document.getElementById('btn-calcular').addEventListener('click', calcularVelocidadPromedio);
document.getElementById('tipo-abm').addEventListener('change', actualizarFormularioABM);

precargarVehiculos();

