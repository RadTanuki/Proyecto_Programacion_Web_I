const coursesData = [
    {
        id: 1,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 2,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 3,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 4,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 5,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 6,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 7,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 8,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 9,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    },
    {
        id: 10,
        name: "Programación en Ambiente Web I",
        category: "it",
        description: "Curso introductorio a HTML, CSS y JavaScript para construir sitios interactivos.",
        semester: "II",
        status: "approved",
        creationDate: "2026-01-15",
        lastUpdate: "2026-02-10",
        rubros: []
    }
];

let courses = [];
let filteredCourses = [];

const coursesContainer = document.getElementById('coursesContainer');
const coursesCounter = document.getElementById('coursesCounter');
const searchInput = document.getElementById('searchCourses');
const filterOrder = document.getElementById('filterOrder');
const filterStatus = document.getElementById('filterStatus');
const filterSemester = document.getElementById('filterSemester');
const btnCreateCourse = document.getElementById('btnCreateCourse');

const windowOverlay = document.getElementById('windowOverlay');
const btnCloseWindow = document.getElementById('btnCloseWindow');
const btnCancelCreate = document.getElementById('btnCancelCreate');
const formCreateCourse = document.getElementById('formCreateCourse');

// function loadCourses() {
//     fetch('../data/coursesData.js')
//         .then(function (answer) {
//             return answer.json();
//         })
//         .then(function (error) {
//             console.log('Cant load the courses', error);
//         })
// }

function loadCourses() {
    courses = coursesData;
    applyFilters();
}

function applyFilters() {
    const text = searchInput.value.toLowerCase().trim();
    const status = filterStatus.value;
    const semester = filterSemester.value;
    const order = filterOrder.value;

    let result = courses.filter(function (course) {
        const textMatch = course.name.toLowerCase().includes(text);
        const statusMatch = (status === 'all') || (course.status === status);
        const semesterMatch = (semester === 'all') || (course.semester === semester);

        return (textMatch && statusMatch && semesterMatch);
    });

    result = orderCourses(result, order);

    filteredCourses = result;
    renderCourses(filteredCourses);
    updateCounter(filteredCourses.length, courses.length);
}

function orderCourses(list, criteria) {
    const temp = list.slice();

    if (criteria === 'name') {
        temp.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    } else if (criteria === 'creationDate') {
        temp.sort(function (a, b) {
            return new Date(b.creationDate) - new Date(a.creationDate);
        });
    } else if (criteria === 'lastUpdate') {
        temp.sort(function (a, b) {
            return new Date(b.lastUpdate) - new Date(a.lastUpdate);
        });
    }

    return temp;
}

function renderCourses(list) {
    coursesContainer.innerHTML = '';

    if (list.length === 0) {
        coursesContainer.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">Cursos</span>
                <p>Aquí aparecerán los cursos creados</p>
            </div>
        `;
        return;
    }

    list.forEach(function (course) {
        const card = document.createElement('div');
        card.classList.add('course-card');

        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description || 'Sin descripción'}</p>
            <small>Semestre: ${course.semester || 'N/A'}</small>
        `;

        coursesContainer.appendChild(card);
    });
}

function updateCounter(shown, total) {
    coursesCounter.textContent = `Mostrando ${shown} de ${total} Cursos`;
}

function openWindow() {
    windowOverlay.classList.remove('hidden');
}

function closeWindow() {
    windowOverlay.classList.add('hidden');
    formCreateCourse.reset();
    document.getElementById('errorName').classList.remove('visible');
}

function manageCourseCreation(event) {
    event.preventDefault();

    const name = document.getElementById('inputCourseName').value.trim();
    const description = document.getElementById('inputCourseDescription').value.trim();
    const category = document.getElementById('CourseCategory').value;
    const semester = document.getElementById('inputCourseSemester').value.trim();
    const errorName = document.getElementById('errorName');

    if (name === '') {
        errorName.textContent = 'El nombre del curso es obligatorio';
        errorName.classList.add('visible');
        return;
    }

    errorName.classList.remove('visible');

    const newCourse = {
        id: Date.now(),
        name: name,
        description: description,
        category: category,
        semester: semester,
        status: 'pending',
        creationDate: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        rubros: []
    };

    courses.push(newCourse);

    closeWindow();
    applyFilters();
}

searchInput.addEventListener('input', applyFilters);
filterOrder.addEventListener('change', applyFilters);
filterStatus.addEventListener('change', applyFilters);
filterSemester.addEventListener('change', applyFilters);
btnCreateCourse.addEventListener('click', openWindow);
btnCloseWindow.addEventListener('click', closeWindow);
btnCancelCreate.addEventListener('click', closeWindow);

windowOverlay.addEventListener('click', function (event) {
    if (event.target === windowOverlay) {
        closeWindow();
    }
});

formCreateCourse.addEventListener('submit', manageCourseCreation);

loadCourses();


