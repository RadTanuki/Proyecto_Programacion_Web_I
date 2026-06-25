let beneficios = []

const aboutGrid = document.getElementById("about-grid")

async function cargarBeneficios() {

    try {
        
        const respuesta = await fetch("data/beneficios.json")

        beneficios = await respuesta.json();

    } catch (error) {

        console.error("Error al cargar los beneficios", error)

    }

}

function cargarAboutCards() {

    aboutGrid.innerHTML = "";

    for (const beneficio of beneficios) {

        aboutGrid.innerHTML += `
            <article class="about-card">
                <h2>${beneficio.titulo}</h2>
                <p>${beneficio.descripcion}</p>
                <img src="${beneficio.imagen}" alt="${beneficio.titulo}">
            </article>
        `;

    }

}

document.addEventListener("DOMContentLoaded", async function () {

    await cargarBeneficios()
    cargarAboutCards()
   
})