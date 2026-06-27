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
        rubros: [
            {
            id: 1,
            name: "Exámenes",
            description: "Pruebas parciales del curso",
            percentage: 40,
            assignments: [
                {
                    id: 1,
                    name: "Examen 1",
                    description: "Primer parcial",
                    startDate: "2026-03-01",
                    dueDate: "2026-03-10",
                    percentage: 20,
                    obtainedScore: null
                }
            ]
            }
        ]
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
        rubros: [
            {
            id: 1,
            name: "Exámenes",
            description: "Pruebas parciales del curso",
            percentage: 40,
            assignments: [
                {
                    id: 1,
                    name: "Examen 1",
                    description: "Primer parcial",
                    startDate: "2026-03-01",
                    dueDate: "2026-03-10",
                    percentage: 20,
                    obtainedScore: null
                }
            ]
            }
        ]
    }
];

/*============================
Courses variables
============================*/

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

/*============================
Rubros variables
============================*/

let selectedCourseId = null;
let selectedRubroId = null;

const courseDetail = document.getElementById('courseDetail');
const detailCourseName = document.getElementById('detailCourseName');
const detailCourseDescription = document.getElementById('detailCourseDescription');
const detailPercentageUsed = document.getElementById('detailPercentageUsed');
const progressBarFill = document.getElementById('progressBarFill');
const btnCloseDetail = document.getElementById('btnCloseDetail');
const btnAddRubro = document.getElementById('btnAddRubro');
const rubrosList = document.getElementById('rubrosList');

const rubroWindowOverlay = document.getElementById('rubroWindowOverlay');
const btnCloseRubroWindow = document.getElementById('btnCloseRubroWindow');
const btnCancelRubro = document.getElementById('btnCancelRubro');
const formCreateRubro = document.getElementById('formCreateRubro');

const assignmentWindowOverlay = document.getElementById('assignmentWindowOverlay');
const btnCloseAssignmentWindow = document.getElementById('btnCloseAssignmentWindow');
const btnCancelAssignment = document.getElementById('btnCancelAssignment');
const formCreateAssignment = document.getElementById('formCreateAssignment');

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
                <span class="empty-icon">📚</span>
                <p>Aquí aparecerán los cursos creados</p>
            </div>
        `;
        return;
    }

    list.forEach(function (course) {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.setAttribute('data-course-id', course.id);

        if (course.id === selectedCourseId) {
            card.classList.add('active');
        }

        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description || 'Sin descripción'}</p>
            <small>Semestre: ${course.semester || 'N/A'}</small>
        `;

        card.addEventListener('click', function () {
            selectCourse(course.id);
        });

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

/*============================
Course detail
============================*/

function selectCourse(courseId) {
    selectedCourseId = courseId;

    renderCourses(filteredCourses);

    const course = courses.find(function (c) {
        return c.id === courseId;
    });

    if (!course) return;

    renderCourseDetail(course);
    courseDetail.classList.remove('hidden');
    courseDetail.scrollIntoView({ behavior: 'smooth' });
}

function renderCourseDetail(course) {
    detailCourseName.textContent = course.name;
    detailCourseDescription.textContent = course.description || 'Sin descripción';

    renderRubros(course);
    updateProgressBar(course);
    document.getElementById('detailFinalGrade').textContent = calculateFinalGrade(course);
}

btnCloseDetail.addEventListener('click', function () {
    selectedCourseId = null;
    courseDetail.classList.add('hidden');
    renderCourses(filteredCourses);
});

/*============================
Rubro detail
============================*/

function renderRubros(course) {
    rubrosList.innerHTML = '';

    if (course.rubros.length === 0) {
        rubrosList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📋</span>
                <p>Este curso aún no tiene rubros.</p>
            </div>
        `;
        return;
    }

    course.rubros.forEach(function (rubro) {
        const rubroCard = document.createElement('div');
        rubroCard.classList.add('rubro-card');

        rubroCard.innerHTML = `
            <div class="rubro-header">
                <h4>${rubro.name} — ${rubro.percentage}% del curso (${calculateRubroEarned(rubro)} obtenido)</h4>
                <div class="rubro-actions">
                    <button class="btn-small btn-add-assignment" data-rubro-id="${rubro.id}">+ Asignación</button>
                    <button class="btn-small btn-delete-rubro" data-rubro-id="${rubro.id}">Eliminar</button>
                </div>
            </div>
            <p class="rubro-description">${rubro.description || ''}</p>
            <div class="assignments-list">
                ${renderAssignmentsHtml(rubro)}
            </div>
        `;

        rubrosList.appendChild(rubroCard);
    });
}

function calculateRubroEarned(rubro) {
    const total = rubro.assignments.reduce(function (sum, assignment) {
        if (assignment.obtainedScore === null || assignment.obtainedScore === undefined) {
            return sum;
        }
        return sum + (assignment.percentage * (assignment.obtainedScore / 100));
    }, 0);

    return Math.round(total * 100) / 100;
}

function calculateFinalGrade(course) {
    const total = course.rubros.reduce(function (sum, rubro) {
        return sum + calculateRubroEarned(rubro);
    }, 0);

    return Math.round(total * 100) / 100;
}

function showScoreFeedback(message, type) {
    const feedback = document.getElementById('scoreFeedback');
    feedback.textContent = message;
    feedback.classList.remove('success', 'error');
    feedback.classList.add(type, 'visible');

    setTimeout(function () {
        feedback.classList.remove('visible');
    }, 3000);
}

/*============================
Assignment detail
============================*/

function renderAssignmentsHtml(rubro) {
    if (rubro.assignments.length === 0) {
        return `<p class="assignments-empty">Sin asignaciones todavía.</p>`;
    }

    return rubro.assignments.map(function (assignment) {
        const scoreValue = (assignment.obtainedScore === null || assignment.obtainedScore === undefined)
            ? ''
            : assignment.obtainedScore;

        return `
            <div class="assignment-card">
                <span class="assignment-name">${assignment.name} (${assignment.percentage}%)</span>
                <span class="assignment-dates">${assignment.startDate || '—'} → ${assignment.dueDate || '—'}</span>
                <input
                    type="number"
                    class="assignment-score-input"
                    placeholder="Nota"
                    min="0"
                    max="100"
                    value="${scoreValue}"
                    data-rubro-id="${rubro.id}"
                    data-assignment-id="${assignment.id}">
                <button class="btn-small btn-delete-assignment" data-rubro-id="${rubro.id}" data-assignment-id="${assignment.id}">Eliminar</button>
            </div>
        `;
    }).join('');
}

function updateAssignmentScore(rubroId, assignmentId, rawValue) {
    const course = courses.find(function (c) {
        return c.id === selectedCourseId;
    });
    if (!course) return;

    const rubro = course.rubros.find(function (r) {
        return r.id === rubroId;
    });
    if (!rubro) return;

    const assignment = rubro.assignments.find(function (a) {
        return a.id === assignmentId;
    });
    if (!assignment) return;

    if (rawValue.trim() === '') {
        assignment.obtainedScore = null;
        renderCourseDetail(course);
        return;
    }

    const score = Number(rawValue);

    if (score < 0 || score > 100) {
        showScoreFeedback('La nota debe estar entre 0 y 100.', 'error');
        renderCourseDetail(course); // vuelve a pintar con el valor anterior
        return;
    }

    assignment.obtainedScore = score;
    course.lastUpdate = new Date().toISOString();

    showScoreFeedback(`Nota guardada para "${assignment.name}".`, 'success');
    renderCourseDetail(course);
}

/*============================
Progress bar
============================*/

function calculatePercentageUsed(course) {
    return course.rubros.reduce(function (total, rubro) {
        return total + rubro.percentage;
    }, 0);
}

function updateProgressBar(course) {
    const used = calculatePercentageUsed(course);

    detailPercentageUsed.textContent = used + '%';
    progressBarFill.style.width = Math.min(used, 100) + '%';
}

/*============================
Course percentage validations
============================*/

function canAddRubro(course, newPercentage) {
    const currentSum = calculatePercentageUsed(course);
    return (currentSum + newPercentage) <= 100;
}

function canAddAssignment(rubro, newPercentage) {
    const currentSum = rubro.assignments.reduce(function (total, assignment) {
        return total + assignment.percentage;
    }, 0);
    return (currentSum + newPercentage) <= rubro.percentage;
}

/*============================
Rubro Window
============================*/

function openRubroWindow() {
    rubroWindowOverlay.classList.remove('hidden');
}

function closeRubroWindow() {
    rubroWindowOverlay.classList.add('hidden');
    formCreateRubro.reset();
    document.getElementById('errorRubroName').classList.remove('visible');
    document.getElementById('errorRubroPercentage').classList.remove('visible');
}

function manageRubroCreation(event) {
    event.preventDefault();

    const course = courses.find(function (c) {
        return c.id === selectedCourseId;
    });

    if (!course) return;

    const name = document.getElementById('inputRubroName').value.trim();
    const description = document.getElementById('inputRubroDescription').value.trim();
    const percentage = Number(document.getElementById('inputRubroPercentage').value);

    const errorName = document.getElementById('errorRubroName');
    const errorPercentage = document.getElementById('errorRubroPercentage');

    errorName.classList.remove('visible');
    errorPercentage.classList.remove('visible');

    if (name === '') {
        errorName.textContent = 'El nombre del rubro es obligatorio.';
        errorName.classList.add('visible');
        return;
    }

    if (!percentage || percentage <= 0) {
        errorPercentage.textContent = 'Ingrese un porcentaje válido.';
        errorPercentage.classList.add('visible');
        return;
    }

    if (!canAddRubro(course, percentage)) {
        const currentSum = calculatePercentageUsed(course);
        errorPercentage.textContent = `
                                        Los rubros ya suman ${currentSum}%. 
                                        El rubro no puede superar ${100 - currentSum}%.
                                        `;
        errorPercentage.classList.add('visible');
        return;
    }

    const newRubro = {
        id: Date.now(),
        name: name,
        description: description,
        percentage: percentage,
        assignments: []
    };

    course.rubros.push(newRubro);
    course.lastUpdate = new Date().toISOString();

    closeRubroWindow();
    renderCourseDetail(course);
}

/*============================
Assignment Window
============================*/

function openAssignmentWindow(rubroId) {
    selectedRubroId = rubroId;
    assignmentWindowOverlay.classList.remove('hidden');
}

function closeAssignmentWindow() {
    assignmentWindowOverlay.classList.add('hidden');
    formCreateAssignment.reset();
    selectedRubroId = null;
    document.getElementById('errorAssignmentName').classList.remove('visible');
    document.getElementById('errorAssignmentPercentage').classList.remove('visible');
}

function manageAssignmentCreation(event) {
    event.preventDefault();

    const course = courses.find(function (c) {
        return c.id === selectedCourseId;
    });

    if (!course) return;

    const rubro = course.rubros.find(function (r) {
        return r.id === selectedRubroId;
    });

    if (!rubro) return;

    const name = document.getElementById('inputAssignmentName').value.trim();
    const description = document.getElementById('inputAssignmentDescription').value.trim();
    const startDate = document.getElementById('inputAssignmentStartDate').value;
    const dueDate = document.getElementById('inputAssignmentDueDate').value;
    const percentage = Number(document.getElementById('inputAssignmentPercentage').value);

    const errorName = document.getElementById('errorAssignmentName');
    const errorPercentage = document.getElementById('errorAssignmentPercentage');

    errorName.classList.remove('visible');
    errorPercentage.classList.remove('visible');

    if (name === '') {
        errorName.textContent = 'El nombre de la asignación es obligatorio.';
        errorName.classList.add('visible');
        return;
    }

    if (!percentage || percentage <= 0) {
        errorPercentage.textContent = 'Ingrese un porcentaje válido.';
        errorPercentage.classList.add('visible');
        return;
    }

    if (!canAddAssignment(rubro, percentage)) {
        const currentSum = rubro.assignments.reduce(function (total, a) {
            return total + a.percentage;
        }, 0);

        errorPercentage.textContent = `
                                        Las asignaciones ya suman ${currentSum}% de 
                                        ${rubro.percentage}%. Esta no puede superar 
                                        ${rubro.percentage - currentSum}%.
                                    `;
        errorPercentage.classList.add('visible');
        return;
    }

    const newAssignment = {
        id: Date.now(),
        name: name,
        description: description,
        startDate: startDate,
        dueDate: dueDate,
        percentage: percentage,
        obtainedScore: null
    };


    rubro.assignments.push(newAssignment);
    course.lastUpdate = new Date().toISOString();

    closeAssignmentWindow();
    renderCourseDetail(course);
}

/*============================
Delete Rubros and Assignments
============================*/
rubrosList.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('btn-add-assignment')) {
        const rubroId = Number(target.getAttribute('data-rubro-id'));
        openAssignmentWindow(rubroId);
    }

    if (target.classList.contains('btn-delete-rubro')) {
        const rubroId = Number(target.getAttribute('data-rubro-id'));
        deleteRubro(rubroId);
    }

    if (target.classList.contains('btn-delete-assignment')) {
        const rubroId = Number(target.getAttribute('data-rubro-id'));
        const assignmentId = Number(target.getAttribute('data-assignment-id'));
        deleteAssignment(rubroId, assignmentId);
    }
});

rubrosList.addEventListener('change', function (event) {
    const target = event.target;

    if (target.classList.contains('assignment-score-input')) {
        const rubroId = Number(target.getAttribute('data-rubro-id'));
        const assignmentId = Number(target.getAttribute('data-assignment-id'));
        updateAssignmentScore(rubroId, assignmentId, target.value);
    }
});

function deleteRubro(rubroId) {
    const course = courses.find(function (c) {
        return c.id === selectedCourseId;
    });

    if (!course) return;

    course.rubros = course.rubros.filter(function (rubro) {
        return rubro.id !== rubroId;
    });

    course.lastUpdate = new Date().toISOString();
    renderCourseDetail(course);
}

function deleteAssignment(rubroId, assignmentId) {
    const course = courses.find(function (c) {
        return c.id === selectedCourseId;
    });

    if (!course) return;

    const rubro = course.rubros.find(function (r) {
        return r.id === rubroId;
    });

    if (!rubro) return;

    rubro.assignments = rubro.assignments.filter(function (assignment) {
        return assignment.id !== assignmentId;
    });

    course.lastUpdate = new Date().toISOString();
    renderCourseDetail(course);
}

/*============================
Course eventListeners
============================*/

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

/*========================================
Rubros and assignments eventListeners
==========================================*/
btnAddRubro.addEventListener('click', function () {
    if (selectedCourseId === null) return;
    openRubroWindow();
});

btnCloseRubroWindow.addEventListener('click', closeRubroWindow);
btnCancelRubro.addEventListener('click', closeRubroWindow);
rubroWindowOverlay.addEventListener('click', function (event) {
    if (event.target === rubroWindowOverlay) closeRubroWindow();
});
formCreateRubro.addEventListener('submit', manageRubroCreation);

btnCloseAssignmentWindow.addEventListener('click', closeAssignmentWindow);
btnCancelAssignment.addEventListener('click', closeAssignmentWindow);
assignmentWindowOverlay.addEventListener('click', function (event) {
    if (event.target === assignmentWindowOverlay) closeAssignmentWindow();
});
formCreateAssignment.addEventListener('submit', manageAssignmentCreation);