const botonDark = document.getElementById("botonDark");
const themeSaved = localStorage.getItem("theme");

if (themeSaved === "dark") {

    document.body.classList.add("dark");
    botonDark.textContent = "\u{2600}";

} else {

    botonDark.textContent = "\u{1F319}";

}

botonDark.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        botonDark.textContent = "\u{2600}";
        localStorage.setItem("theme", "dark");

    } else {

        botonDark.textContent = "\u{1F319}";
        localStorage.setItem("theme", "normal");

    }

});