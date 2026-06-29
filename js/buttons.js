//Función para que los select de inicio funcionen correctamente
function useSelect (selectElement){
    selectElement.addEventListener('change', function() {
        if (this.value) {
            window.location.href = this.value;
        }
    });
}

useSelect(document.getElementById('sections'));
useSelect(document.getElementById('solutions'));

//Método para permitir el funcionamiento de los botones
function navButtons(reference) {
    if(reference.startsWith('#')) {
        const element = document.querySelector(reference);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } else {
        window.location.href = reference;
    }
}

document.addEventListener('click', function(e) {
    const button = e.target.closest('[data-href]');
    if (button) {
        e.preventDefault();
        navButtons(button.dataset.href);
    }
})

btnClearFilters = document.getElementById('btnClearFilters');

function clearFilters(){
    searchInput.value = '';
    filterOrder.value = 'name';
    filterStatus.value = 'all';
    filterSemester.value = 'all';
    applyFilters();
}

btnClearFilters.addEventListener('click', clearFilters);
