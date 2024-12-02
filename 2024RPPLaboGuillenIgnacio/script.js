class Persona {
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    toString() {
        return `Id: ${this.id} - Nombre: ${this.nombre} - Apellido: ${this.apellido} - Edad: ${this.edad}`; 
    }
}

class Heroe extends Persona {
    constructor(id, nombre, apellido, edad, alterEgo, ciudad, publicado) {
        super(id, nombre, apellido, edad);
        this.alterEgo = alterEgo;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }
    toString() {
        return `${super.toString()} - AlterEgo: ${this.alterEgo} - Ciudad: ${this.ciudad} - Publicado: ${this.publicado}`;
    }
}

class Villano extends Persona {
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }
    toString() {
        return `${super.toString()} - Enemigo: ${this.enemigo} - Robos: ${this.robos} - Asesinatos: ${this.asesinatos}`;
    }
}
const personas = 
`[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterEgo":"Superman", "ciudad":"Metropolis",
"publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterEgo":"Batman", "ciudad":"Gotica",
"publicado":2012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterEgo":"Flash", "ciudad":"Central",
"publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,
"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,
"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,
"asesinatos":1}]`;

function parsearArray(array) {
    return JSON.parse(array).map((item) => {
        if (item.alterEgo !== undefined) {
            return new Heroe(item.id, item.nombre, item.apellido, item.edad, item.alterEgo, item.ciudad, item.publicado);
        } else {
            return new Villano(item.id, item.nombre, item.apellido, item.edad, item.enemigo, item.robos, item.asesinatos);
        }
    });
}

function mostrarDatos(personas) {
    const tbody = document.querySelector("#tbodyrow");
    tbody.innerHTML = '';
    let valorCelda ="";
    
    personas.forEach((persona, index) => {
        const row = document.createElement("tr");
        row.setAttribute("id", `${index}`);
        row.innerHTML = `
            <td class="id">${persona.id}</td>
            <td class="nombre">${persona.nombre}</td>
            <td class="apellido">${persona.apellido}</td>
            <td class="edad">${persona.edad}</td>
            <td class="alterego">${persona.alterEgo !== undefined ? persona.alterEgo : "--"}</td>
            <td class="ciudad">${persona.ciudad !== undefined ? persona.ciudad : "--"}</td>
            <td class="publicado">${persona.publicado !== undefined ? persona.publicado : "--"}</td>
            <td class="enemigo">${persona.enemigo !== undefined ? persona.enemigo : "--"}</td>
            <td class="robos">${persona.robos !== undefined ? persona.robos : "--"}</td>
            <td class="asesinatos">${persona.asesinatos !== undefined ? persona.asesinatos : "--"}</td>
        `;
        row.addEventListener("dblclick", () =>{
            document.querySelectorAll("tr.selected").forEach(row => row.classList.remove("selected"));
            row.classList.add("selected");
            let indice = Number(row.id);
            valorCelda = row.querySelector(".alterego").textContent;
            let modificar = valorCelda == "--"? "villano": "heroe"
            modificarPersona(indice, modificar, personas);
        });
        tbody.appendChild(row);
    });
    ocultarColumnasOcultas();
    ordenarColumnas(personas);
    eliminarPersona(personas);
}

function ocultarColumnasOcultas() {
    const columnasOcultas = [];

    document.querySelectorAll("th").forEach((th, index) => {
        if (th.style.display === "none") {
            columnasOcultas.push(index);
        }
    });

    document.querySelectorAll("#tablaPersonas tbody tr").forEach(tr => {
        columnasOcultas.forEach(index => {
            tr.children[index].style.display = "none";
        });
    });
}

function eliminarPersona(personas) {
    document.getElementById("btnEliminar").onclick = () => {
        const filaSeleccionada = document.querySelector("tr.selected");
        
        if (filaSeleccionada) 
        {
            const indice = Number(filaSeleccionada.id);
            personas.splice(indice, 1);
            mostrarDatos(personas);
            visibilidadForm("block", "none");
            limpiarFormulario();
        }
    };
}

function ordenarColumnas(personas) 
{
    document.querySelectorAll("th.ordenar").forEach(th => {
        th.addEventListener("dblclick", function () {
            const columna = th.getAttribute("data-column");

            personas.sort((a, b) => {
                let aValue = a[columna];
                let bValue = b[columna];

                if (aValue === undefined) aValue = 0; 
                if (bValue === undefined) bValue = 0;

                if (typeof aValue === "string") {
                    return aValue.localeCompare(bValue);
                } else {
                    return aValue - bValue;
                }
            });
            mostrarDatos(personas);
        });
    });
}
function modificarPersona(indice, tipoDePersona, personas)
{
    let persona = personas[indice];

    ocultarDatosAbm("abmTipo", "none");
    visibilidadForm("none", "block");
    visibilidadBotones("none", "block", "block");
 
    document.getElementById("txtNombre").value = persona.nombre;
    document.getElementById("txtApellido").value = persona.apellido;
    document.getElementById("txtEdad").value = persona.edad;

    if(tipoDePersona == "villano")
    {
        ocultarDatosAbm("abmVillano", "block");
        ocultarDatosAbm("abmHeroe", "none");
        document.getElementById("txtEnemigo").value = persona.enemigo;
        document.getElementById("txtRobos").value = persona.robos;
        document.getElementById("txtAsesinatos").value = persona.asesinatos;
    }
    else if(tipoDePersona == "heroe")
    {
        ocultarDatosAbm("abmVillano", "none");
        ocultarDatosAbm("abmHeroe", "block");
        document.getElementById("txtAlterEgo").value = persona.alterEgo;
        document.getElementById("txtCiudad").value = persona.ciudad;
        document.getElementById("txtPublicado").value = persona.publicado; 
    }
    document.getElementById("btnModificar").onclick = ()=>
        {

            let nombre = document.getElementById("txtNombre").value; 
            let apellido = document.getElementById("txtApellido").value;
            let edad = document.getElementById("txtEdad").value;
            
            if(tipoDePersona == "villano")
            {
                let enemigo = document.getElementById("txtEnemigo").value;
                let robos = document.getElementById("txtRobos").value;
                let asesinatos = document.getElementById("txtAsesinatos").value;

                if (!validarDatosVillano(nombre, apellido, edad, enemigo, robos, asesinatos)) 
                {
                    alert("Por favor, completa todos los campos correctamente.");
                    return;
                }
                persona.enemigo = enemigo;
                persona.robos = robos;
                persona.asesinatos = asesinatos;
            }
            else if(tipoDePersona == "heroe")
            {
                let alterEgo = document.getElementById("txtAlterEgo").value;
                let ciudad = document.getElementById("txtCiudad").value;
                let publicado = document.getElementById("txtPublicado").value; 

                if (!validarDatosHeroe(nombre, apellido, edad, alterEgo, ciudad, publicado)) 
                {
                    alert("Por favor, completa todos los campos correctamente.");
                    return;
                }
                persona.alterEgo = alterEgo;
                persona.ciudad = ciudad;
                persona.publicado = publicado;
            }
            persona.nombre = nombre;
            persona.apellido = apellido;
            persona.edad = edad;

            personas[indice] = persona;
            mostrarDatos(personas);
            visibilidadForm("block", "none");
            limpiarFormulario();
        }
}

function filtrarPorTipo(personas) 
{
    const selects = document.getElementById("tiposDePersona");
    const botonPromedio = document.getElementById("btnCalcular");
    const textPromedio = document.getElementById("txtPromedio");
    textPromedio.value =0;
    let personasFiltrados = personas;
    
    mostrarColumnas();
    
    selects.addEventListener("change", ()=>{
        textPromedio.value =0;
        
        if (selects.value == "Heroe") 
        {
            personasFiltrados = personas.filter(persona => persona instanceof Heroe);
        } 
        else if (selects.value == "Villano") 
        {
            personasFiltrados = personas.filter(persona => persona instanceof Villano);
        } 
        else
        {
            personasFiltrados = personas;
        }
            mostrarDatos(personasFiltrados);
        });
        botonPromedio.addEventListener("click", () => {
            const totalEdad = personasFiltrados.reduce((sum, v) => sum + parseFloat(v.edad), 0);
            const promedioEdad = personasFiltrados.length ? (totalEdad / personasFiltrados.length).toFixed(2) : 0;
            textPromedio.value = promedioEdad;
        });
        return personasFiltrados;
}

function ocultarColumnasOcultas() {
    const columnasOcultas = [];
    document.querySelectorAll("th").forEach((th, index) => {
        if (th.style.display === "none") {
            columnasOcultas.push(index);
        }
    });
    
    document.querySelectorAll("#tbodyrow tr").forEach(tr => {
        columnasOcultas.forEach(index => {
            tr.children[index].style.display = "none";
        });
    });
}

function mostrarColumnas() {
    const groupCheck = document.getElementsByName("checkTable");
    
    for(let i=0; i<groupCheck.length;i++) {
        groupCheck[i].checked = true;
        
        groupCheck[i].addEventListener("change",() => {
            let labelCheck = document.querySelector(`label[for='${groupCheck[i].id}']`);
            let columnaName = labelCheck.innerHTML.toLowerCase().replace(/ /g, '');
            let columna = document.getElementsByClassName(columnaName);
            
            for(let j=0; j<columna.length;j++) {  
                if(groupCheck[i].checked) {
                    columna[j].style.display ='table-cell';
                } else {
                    columna[j].style.display = 'none';
                }  
            }
        });
    }
}

function validarDatosVillano(nombre, apellido, edad, opcion1, opcion2, opcion3) {
    if (!nombre || !apellido || !opcion1 || !opcion2 || !opcion3) return false;
    if (edad <= 0 || isNaN(edad)) return false;
    if(opcion3 < 1 || opcion2 < 1 || opcion1 === null) return false;
    return true;
}

function validarDatosHeroe(nombre, apellido, edad, opcion1, opcion2, opcion3) {
    if (!nombre || !apellido || !opcion1 || !opcion2 || !opcion3) return false;
    if (edad <= 0 || isNaN(edad)) return false;
    if(opcion3 <= 1940 || isNaN(opcion3) || opcion2 === null || opcion1 === null) return false;
    return true;
}


function agregarPersona(arrayPersona)
{
    document.getElementById("btnAgregar").addEventListener("click", ()=>
        {
            visibilidadBotones("block", "none", "none");
            ocultarDatosAbm("abmTipo", "block");
            visibilidadForm("none", "block");
            ocultarDatosAbm("abmVillano", "none");
            ocultarDatosAbm("abmHeroe", "block");
        });
    let flag = "heroe";
    const selPersona = document.getElementById("tipoPersona");
            ocultarDatosAbm("abmVillano", "none");
            ocultarDatosAbm("abmHeroe", "block");
            flag ="heroe"

    selPersona.addEventListener("change", ()=>
        {
            if(selPersona.value == "Villano")
            {
                ocultarDatosAbm("abmVillano", "block");
                ocultarDatosAbm("abmHeroe", "none");
                flag = "villano";
            }else if(selPersona.value == "Heroe")
            {
                ocultarDatosAbm("abmVillano", "none");
                ocultarDatosAbm("abmHeroe", "block");
                flag ="heroe"
            }
        });

    document.getElementById("btnAlta").addEventListener("click", function()
        {
            let nuevaPersona;
            const id = verificarId(arrayPersona);
            const nombre = document.getElementById("txtNombre").value;
            const apellido = document.getElementById("txtApellido").value;
            const edad = document.getElementById("txtEdad").value;
            
            if(flag == "villano")
            {
                const enemigo = document.getElementById("txtEnemigo").value;
                const robos = document.getElementById("txtRobos").value;
                const asesinatos = document.getElementById("txtAsesinatos").value;

                if (!validarDatosVillano(nombre, apellido, edad, enemigo, robos, asesinatos)) 
                {
                    alert("Por favor, completa todos los campos correctamente.");
                    return;
                }
                nuevaPersona = new Villano(id, nombre, apellido, edad, enemigo, robos, asesinatos);
            }else if(flag == "heroe"){
                const alterEgo = document.getElementById("txtAlterEgo").value;
                const ciudad = document.getElementById("txtCiudad").value; 
                const publicado = document.getElementById("txtPublicado").value; 
                
                if (!validarDatosHeroe(nombre, apellido, edad, alterEgo, ciudad, publicado)) {
                    alert("Por favor, completa todos los campos correctamente.");
                    return;
                }
                nuevaPersona = new Heroe(id, nombre, apellido, edad, alterEgo, ciudad, publicado);
            }
            
            arrayPersona.push(nuevaPersona);
            visibilidadForm("block", "none");
            limpiarFormulario();
            mostrarDatos(arrayPersona);
        });

    document.getElementById("btnCancelar").addEventListener("click", ()=>
        {
            visibilidadForm("block", "none");
            limpiarFormulario();
        });
        filtrarPorTipo(arrayPersona);
}


function visibilidadForm(visMain, visAbm) {
    document.getElementById("main").style.display = visMain;
    document.getElementById("abm").style.display = visAbm;
}
function visibilidadBotones(visAcept, visMod, visElim)
{
    document.getElementById("btnAlta").style.display = visAcept;
    document.getElementById("btnModificar").style.display = visMod;
    document.getElementById("btnEliminar").style.display = visElim;
}

function limpiarFormulario() {
    document.getElementById("txtNombre").value = '';
    document.getElementById("txtApellido").value = '';
    document.getElementById("txtEdad").value = '';
    document.getElementById("txtAlterEgo").value = '';
    document.getElementById("txtCiudad").value = '';
    document.getElementById("txtPublicado").value = '';
    document.getElementById("txtEnemigo").value = '';
    document.getElementById("txtRobos").value = '';
    document.getElementById("txtAsesinatos").value = '';
}

function ocultarDatosAbm(classname, visibilidad) {
    const labelText = document.getElementsByClassName(classname);
    for(let i=0; i< labelText.length; i++) {
        labelText[i].style.display = visibilidad;
    }
}

function verificarId(personas) {
    let id = 1;
    
    for(let i=0; i<personas.length; i++) {
        let idExistente = Number(personas[i].id);
        if(idExistente === id) {
            id++;
        }
    }
    return id;
}

function main(personas) {
    mostrarDatos(personas);
    agregarPersona(personas);
    visibilidadForm("block", "none");
}

main(parsearArray(personas));
