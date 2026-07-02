//Método para cerrar el menu-nav
const menuToggle = document.getElementById("menu-toggle");
const menuNav = document.querySelector(".menu-nav");
const header = document.querySelector(".site-header");

function closeMenu() {
  menuToggle.checked = false;
}

document.addEventListener("click", function (event) {
  
  if (window.matchMedia("(max-width: 768px)").matches && menuToggle.checked) {

    if (!header.contains(event.target)) {

      closeMenu();
      
    }

  }

});