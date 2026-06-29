const botonDark = document.getElementById("botonDark");

botonDark.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        botonDark.textContent = "\u{2600}";

    } else {

        botonDark.textContent = "\u{1F319}";

    }

});