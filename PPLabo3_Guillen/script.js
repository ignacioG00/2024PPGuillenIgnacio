// Clase base Vehiculo
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

// Clase derivada Aereo
class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue, alturaVuelo) {
        super(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue);
        this.alturaVuelo = alturaVuelo; 
    }
}

// Clase derivada Terrestre
class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue, tipoTraccion) {
        super(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue);
        this.tipoTraccion = tipoTraccion; 
    }
}

// Array para almacenar los vehículos
let vehiculos = [];

// Función para precargar vehículos
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

// Función para agregar un nuevo vehículo
function agregarVehiculo() {
    const id = document.getElementById('id').value;
    const modelo = document.getElementById('modelo').value;
    const anoFab = document.getElementById('anoFab').value;
    const velMax = document.getElementById('velMax').value;
    const altMax = document.getElementById('altMax').value;
    const autonomia = document.getElementById('autonomia').value;
    const cantPue = document.getElementById('cantPue').value;
    const cantRue = document.getElementById('cantRue').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value; // Obtener tipo de vehículo

    let nuevoVehiculo;

    // Crear un nuevo objeto de vehículo según su tipo
    if (tipo === 'aereo') {
        const alturaVuelo = prompt("Ingrese la altura de vuelo:");
        nuevoVehiculo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue, alturaVuelo);
    } else if (tipo === 'terrestre') {
        const tipoTraccion = prompt("Ingrese el tipo de tracción:");
        nuevoVehiculo = new Terrestre(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue, tipoTraccion);
    }

    vehiculos.push(nuevoVehiculo);
    actualizarTabla(vehiculos); 
    limpiarFormulario();
}

// Función para modificar un vehículo existente
function modificarVehiculo() {
    const id = prompt("Ingrese el ID del vehículo a modificar:");
    const vehiculo = vehiculos.find(v => v.id === id);

    if (vehiculo) {
        const modelo = prompt("Ingrese el nuevo modelo:", vehiculo.modelo);
        const anoFab = prompt("Ingrese el nuevo año de fabricación:", vehiculo.anoFab);
        const velMax = prompt("Ingrese la nueva velocidad máxima:", vehiculo.velMax);
        const altMax = prompt("Ingrese la nueva altura máxima:", vehiculo.altMax);
        const autonomia = prompt("Ingrese la nueva autonomía:", vehiculo.autonomia);
        const cantPue = prompt("Ingrese la nueva cantidad de puertas:", vehiculo.cantPue);
        const cantRue = prompt("Ingrese la nueva cantidad de ruedas:", vehiculo.cantRue);
        
        // Actualizar las propiedades del vehículo
        vehiculo.modelo = modelo;
        vehiculo.anoFab = anoFab;
        vehiculo.velMax = velMax;
        vehiculo.altMax = altMax;
        vehiculo.autonomia = autonomia;
        vehiculo.cantPue = cantPue;
        vehiculo.cantRue = cantRue;

        alert("Vehículo modificado con éxito.");
        actualizarTabla(vehiculos); 
    } else {
        alert("Vehículo no encontrado.");
    }
}

// Función para eliminar un vehículo existente
function eliminarVehiculo() {
    const id = prompt("Ingrese el ID del vehículo a eliminar:");
    const index = vehiculos.findIndex(v => v.id === id);

    if (index !== -1) {
        vehiculos.splice(index, 1); // Eliminar el vehículo del array
        alert("Vehículo eliminado con éxito.");
        actualizarTabla(vehiculos); 
    } else {
        alert("Vehículo no encontrado.");
    }
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('anoFab').value = '';
    document.getElementById('velMax').value = '';
    document.getElementById('altMax').value = '';
    document.getElementById('autonomia').value = '';
    document.getElementById('cantPue').value = '';
    document.getElementById('cantRue').value = '';
    document.querySelector('input[name="tipo"]:checked').checked = false; 
}

// Función para actualizar la tabla con los vehículos
function actualizarTabla(vehiculosAMostrar) {
    const tableBody = document.getElementById('vehiculos-table');
    tableBody.innerHTML = ''; // Limpiar el contenido de la tabla antes de agregar nuevas filas

    // Recorrer el array de vehículos y agregarlos a la tabla
    vehiculosAMostrar.forEach(vehiculo => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="col-id">${vehiculo.id}</td>
            <td class="col-modelo">${vehiculo.modelo}</td>
            <td class="col-anoFab">${vehiculo.anoFab}</td>
            <td class="col-velMax">${vehiculo.velMax}</td>
            <td class="col-altMax">${vehiculo.altMax || '-'}</td>
            <td class="col-autonomia">${vehiculo.autonomia || '-'}</td>
            <td class="col-cantPue">${vehiculo.cantPue}</td>
            <td class="col-cantRue">${vehiculo.cantRue}</td>
            ${vehiculo instanceof Aereo ? `<td class="col-alturaVuelo">${vehiculo.alturaVuelo}</td>` : '<td>-</td>'}
            ${vehiculo instanceof Terrestre ? `<td class="col-tipoTraccion">${vehiculo.tipoTraccion}</td>` : '<td>-</td>'}
        `;

        tableBody.appendChild(row);
    });
}

// Función para filtrar los vehículos según el tipo seleccionado
function filtrarVehiculos() {
    const tipoFiltro = document.getElementById('filtro').value;
    let vehiculosFiltrados;

    if (tipoFiltro === 'todos') {
        vehiculosFiltrados = vehiculos; // Mostrar todos
    } else if (tipoFiltro === 'aereo') {
        vehiculosFiltrados = vehiculos.filter(v => v instanceof Aereo); // Mostrar solo aéreos
    } else if (tipoFiltro === 'terrestre') {
        vehiculosFiltrados = vehiculos.filter(v => v instanceof Terrestre); // Mostrar solo terrestres
    }

    actualizarTabla(vehiculosFiltrados); 
}

// Función para calcular la velocidad máxima promedio
function calcularVelocidadPromedio() {
    const totalVelocidad = vehiculos.reduce((acc, vehiculo) => acc + Number(vehiculo.velMax), 0);
    const promedio = totalVelocidad / vehiculos.length || 0;
    alert(`La velocidad máxima promedio es: ${promedio.toFixed(2)}`);
}

// Event listeners
document.getElementById('btn-agregar').addEventListener('click', agregarVehiculo);
document.getElementById('btn-modificar').addEventListener('click', modificarVehiculo);
document.getElementById('btn-eliminar').addEventListener('click', eliminarVehiculo);
document.getElementById('filtro').addEventListener('change', filtrarVehiculos);
document.getElementById('btn-calcular').addEventListener('click', calcularVelocidadPromedio);

// Precargar los vehículos al cargar la página
window.onload = () => {
    precargarVehiculos();
};

