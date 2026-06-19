    function showTab(event, tabId) {
    //Evitar que el botón recargue la página si está dentro de un form
    event.preventDefault();

    //Oculta los formularios
    const forms = document.querySelectorAll('.login-form');
    forms.forEach(form => form.classList.remove('active'));

    //Quita la clase active de todos los botones
    const tabs = document.querySelectorAll('.login-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    //Muestra el formulario seleccionado y activa el botón
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}