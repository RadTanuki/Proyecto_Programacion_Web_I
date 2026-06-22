const botonCalcularNota = document.getElementById("calcularNota")
const botonAgregarRubro = document.getElementById("agregarRubro")
const botonEliminarRubro = document.getElementById("")
const botonLimpiar = document.getElementById("limpiar")
const cuadroResultado = document.getElementById("result")
const contenedorRubros = document.querySelector(".rubros-container");
const notaMinima = document.getElementById("notaMinima")

let cantidadRubros = 2;

function crearRubro(event) {

    event.preventDefault();

    cantidadRubros++;

    const nuevoRubro = document.createElement("div");

    nuevoRubro.classList.add("rubro-card");

    nuevoRubro.innerHTML = `
        <label>Rubro #${cantidadRubros}</label>
        <input class="btn-eliminar" type="button" value="❌">
        <input type="number" class="input-nota" placeholder="Nota" min="0" max="100">
        <input type="number" class="input-porcentaje" placeholder="%" min="1" max="100">
    `;

    const notaMinima = document.querySelector(".notaMinima-card");

    contenedorRubros.insertBefore(nuevoRubro, notaMinima);

    actualizarNumero();

}

function actualizarNumero(event) {

    const rubros = document.querySelectorAll(".rubro-card");

    
    rubros.forEach(function (rubro, numero) {

        const label = rubro.querySelector("label");

        label.textContent = `Rubro #${numero + 1}`;

    });


}


function eliminarRubro(event) {

    if (event.target.classList.contains("btn-eliminar")) {

        event.target.closest(".rubro-card").remove();

        cantidadRubros--;

        actualizarNumero();

    }

}

function mostrarErrores(input) {
  input.classList.add('input-error');
  input.classList.remove('input-success');
}

function mostrarExito(input) {
  input.classList.remove('input-error');
  input.classList.add('input-success');
}

function validarNota() {

    let esValido = true;

    const rubros = document.querySelectorAll(".rubro-card");
    
    rubros.forEach((rubro) => {

        const inputNota = rubro.querySelector(".input-nota");
        const inputporcentaje = rubro.querySelector(".input-porcentaje");

        const notaValor = inputNota.value;
        const porcentajeValor = inputporcentaje.value

        inputNota.classList.remove("input-error", "input-success");
        inputporcentaje.classList.remove("input-error", "input-success");

        if (notaValor === "") {

            mostrarErrores(inputNota);
            esValido = false;

        } else {

            mostrarExito(inputNota);

        }

        if (porcentajeValor === "") {

            mostrarErrores(inputporcentaje);
            esValido = false;

        } else {

            mostrarExito(inputporcentaje);
            
        }

    });

    return esValido;
}

function validarNotaValor() {

    let esValido = true;

    const rubros = document.querySelectorAll(".rubro-card");
    
    rubros.forEach((rubro) => {

        const inputNota = rubro.querySelector(".input-nota");
        const notaValor = Number(inputNota.value);

        inputNota.classList.remove("input-error", "input-success");

        if (notaValor > 100 || notaValor < 0) {

            mostrarErrores(inputNota);
            esValido = false;

        } else {

            mostrarExito(inputNota);

        }

        

    });

    return esValido;
}

function validarPorcentajeValor() {

    let esValido = true;

    const rubros = document.querySelectorAll(".rubro-card");
    
    rubros.forEach((rubro) => {

        const inputporcentaje = rubro.querySelector(".input-porcentaje");
        const porcentajeValor = Number(inputporcentaje.value);

        inputporcentaje.classList.remove("input-error", "input-success");

        if (porcentajeValor <= 0 || porcentajeValor > 100 ) {

            mostrarErrores(inputporcentaje);
            esValido = false;

        } else {

            mostrarExito(inputporcentaje);
            
        }

    });

    return esValido;
}

function validarNotaMinima() {

    let esValido = true;

    notaMinima.classList.remove("input-error", "input-success");

    if (notaMinima.value === "") {

        return true;

    }

    const notaMin = Number(notaMinima.value);

    if (notaMin < 0 || notaMin > 100) {

        mostrarErrores(notaMinima);
        esValido = false;

    } else {

        mostrarExito(notaMinima);

    }

    return esValido;
}

function validarSumaPorcentajes() {

    let sumaPorcentajes = 0;
    let sumaValida = true;

    const rubros = document.querySelectorAll(".rubro-card");

    rubros.forEach((rubro) => {

        const inputPorcentaje = rubro.querySelector(".input-porcentaje");

        sumaPorcentajes += Number(inputPorcentaje.value);

    });

    if (sumaPorcentajes != 100) {

        return sumaValida = false

    }

    return sumaValida
}

function calcularNota(event) {

    event.preventDefault();

    if (!validarNota()) {
        cuadroResultado.innerHTML = `<h3 class="warning">Existen campos vacios, por favor varificar</h3> 
        <br><h4>Por favor, verificar</h4>`;
        return;
    }

    if (!validarNotaValor()) {
        cuadroResultado.innerHTML = `<h3 class="warning">Las notas deben ser mayores a 0 y menores a 100</h3> 
        <br><h4>Por favor, verificar</h4>`;
        return;
    }

    if (!validarPorcentajeValor()) {
        cuadroResultado.innerHTML = `<h3 class="warning">Los porcentajes deben ser mayores a 0 y menores a 100</h3>
        <br><h4>Por favor, verificar</h4>`;
        return;
    }

    if (!validarNotaMinima()) {
        cuadroResultado.innerHTML =`<h3 class="warning">La nota mínima debe ser mayor a 0 y menor a 100</h3>
        <br><h4>Por favor, verificar</h4>`;
        return;
    }

    if (!validarSumaPorcentajes()) {

        document.querySelectorAll(".input-porcentaje")
            .forEach(input => mostrarErrores(input));

        cuadroResultado.innerHTML =
        `<h3 class="warning">La suma de los porcentajes debe ser exactamente 100%</h3>
        <br><h4>Por favor, verificar</h4>`;
        return;
}

    const rubros = document.querySelectorAll(".rubro-card");
    
    let sumaNota = 0;

    let filas = "";
    let estado = "";

    rubros.forEach((rubro, numero) => {

        let notaRubro = 0;

        const inputNota = rubro.querySelector(".input-nota");
        const inputporcentaje = rubro.querySelector(".input-porcentaje");

        const notaValor = Number(inputNota.value);
        const porcentajeValor = Number(inputporcentaje.value);

        notaRubro = notaValor * (porcentajeValor / 100)
        sumaNota += notaRubro

        filas += `
            <tr>
                <td>#${numero + 1}</td>
                <td>${notaValor}</td>
                <td>${porcentajeValor}%</td>
                <td>${notaRubro}</td>
            </tr>
        `;

    });

     if (notaMinima.value !== "") {

        const notaMin = Number(notaMinima.value);

        if (sumaNota >= notaMin) {

                estado = `<h4 class="aprobado">Aprobado</h4>`;

        } else {

                estado = `<h4 class="reprobado">Reprobado</h4>`;

        }
      
    } 

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

        ${estado}
        
    `;

}

function limpiarDatos (event) {

    event.preventDefault();

    const inputs = document.querySelectorAll("input");
    const rubros = document.querySelectorAll(".rubro-card")

    rubros.forEach((rubro, numero) => {

        if (numero >= 2) {
            rubro.remove();
        }

    });

    inputs.forEach((input) => {

        if (input.type !== "button") {

            input.value = "";
            input.classList.remove("input-error", "input-success");

        }

    });

    

    cuadroResultado.innerHTML =
        "<h3>Aquí se mostrará un detalle de la nota</h3>";

    actualizarNumero();

}

botonAgregarRubro.addEventListener("click", crearRubro);
contenedorRubros.addEventListener("click", eliminarRubro);
botonCalcularNota.addEventListener("click", calcularNota);
botonLimpiar.addEventListener("click", limpiarDatos);
