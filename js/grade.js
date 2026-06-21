const botonCalcularNota = document.getElementById("calcularNota")
const botonAgregarRubro = document.getElementById("agregarRubro")
const botonEliminarRubro = document.getElementById("")
const botonLimpiar = document.getElementById("limpiar")
const cuadroResultado = document.getElementById("result")
const contenedorRubros = document.querySelector(".rubros-container");

let cantidadRubros = 2;

function crearRubro() {

    event.preventDefault();

    cantidadRubros++;

    const nuevoRubro = document.createElement("div");

    nuevoRubro.classList.add("rubro-card");

    nuevoRubro.innerHTML = `
        <label>Rubro #${cantidadRubros}</label>
        <input class="btn-eliminar" type="button" value="❌">
        <input type="number" class="input-nota" placeholder="Nota" min="0" max="100">
        <input type="number" class="input-porcentaje" placeholder="%" min="0" max="100">
    `;

    const acciones = document.querySelector(".acciones");

    contenedorRubros.insertBefore(nuevoRubro, acciones);

    actualizarNumero();

}

function actualizarNumero() {

    const rubros = document.querySelectorAll(".rubro-card");

    rubros.forEach(function (rubro, numero) {

        const label = rubro.querySelector("label");

        label.textContent = `Rubro #${numero + 1}`;

    });


}


function eliminarRubro(event) {

    if (event.target.classList.contains("btn-eliminar")) {



        event.target.closest(".rubro-card").remove();

        actualizarNumero();



    }

}

function calcularNota() {

    event.preventDefault();

    const rubros = document.querySelectorAll(".rubro-card");
    let sumaNota = 0;

    let filas = "";

    rubros.forEach((rubro, numero) => {

        let notaRubro = 0;

        const inputNota = rubro.querySelector(".input-nota");
        const inputporcentaje = rubro.querySelector(".input-porcentaje");

        const notaValor = inputNota.value;
        const porcentajeValor = inputporcentaje.value

        if (inputNota && inputporcentaje) {

            notaRubro = notaValor * (porcentajeValor / 100)

            sumaNota += notaRubro

        } else {

            console.log("No hay input en este rubro");

        }

        filas += `
            <tr>
                <td>Rubro ${numero + 1}</td>
                <td>${notaValor}</td>
                <td>${porcentajeValor}%</td>
                <td>${notaRubro}</td>
            </tr>
        `;

    });

    /*cuadroResultado.textContent = "Su nota final es de: " + sumaNota;*/

    cuadroResultado.innerHTML = `
        
        <h2>Detalle de la nota</h2>

        <table class="table-detalleNota">
            <tr>
                <th>Rubro</th>
                <th>Nota</th>
                <th>Porcentaje</th>
                <th>Nota obtenida</th>
            </tr>
            ${filas}
        </table>

        <h3>Resultado final: ${sumaNota}</h3>
        
    `;

}

botonAgregarRubro.addEventListener("click", crearRubro);
contenedorRubros.addEventListener("click", eliminarRubro);
botonCalcularNota.addEventListener("click", calcularNota);

