/* 
const por defecto
let cuando el valor cambia
var es código antiguo
*/

const nombreEvento = "React Summit Alajuela" //string
const cuposTotales = 50 //number
const activo  = true //boolean
let organizador = null //null
let observacion //undefined

let cuposDisponibles = 35
cuposDisponibles--
console.log("Cupos disponibles: ", cuposDisponibles)

let prueba = nombreEvento + " " + cuposTotales

console.log("Prueba:",prueba)
console.log(typeof nombreEvento)
console.log(typeof cuposTotales)
console.log(typeof cuposDisponibles)
console.log(typeof activo)
console.log(typeof organizador)
console.log(typeof observacion)

let x = "3"
let y = "3"

let prueba2 = x + y
console.log(prueba2)
x = "Nuevo"
console.log("El evento " + nombreEvento + " tiene " + 
            cuposDisponibles + " cupos disponibles") 
    
console.log(`El evento ${nombreEvento} tiene ${cuposDisponibles} cupos disponibles`)
/* 
Operadores matemáticos
*/

let inscritos = 15
cuposDisponibles = cuposTotales - inscritos
console.log(cuposDisponibles)
console.log("Operadores lógicos")
const modalidad = "Presencial"
if (cuposDisponibles > 0 && activo) 
    console.log("El evento permite inscrición") 

//Compara igualdad de datos y de tipo de datos
if (modalidad === "Virtual" || modalidad === "Híbrido"){
    console.log("El evento permite participación en línea")
}

console.log("Condición simple")
if (cuposDisponibles > 0){
    console.log("Inscripción disponible")
}
console.log("Condición doble")
if (cuposDisponibles > 0){
    console.log("Inscripción disponible")
} else {
    console.log("Condición doble")
}

console.log("Condición múltiple")
if (cuposDisponibles > 10){
    console.log("Disponible")
} else if (cuposDisponibles > 0){
    console.log("Pocos cupos")
} else {
    console.log("Evento lleno")
}

const evento ={
    id: 1,
    nombre: "React Summit Alajuela",
    categoria: "Desarrollo Web",
    modalidad: "Presencial",
    cuposTotales: 50,
    inscritos: 15,
    activo: true
}

const eventos = [
    {
        id: 2,
        nombre: "Foro de Inteligencia Artificial Aplicada",
        categoria: "Inteligencia Artificial",
        modalidad: "Híbrido",
        cuposTotales: 50,
        inscritos: 42,
        activo: true
    },
    {
        id: 3,
    nombre: "Introducción a la Ciberseguridad",
    categoria: "Ciberseguridad",
    modalidad: "Presencial",
    cuposTotales: 25,
    inscritos: 25,
    activo: true
    }
]

console.log(eventos[1].nombre)

for (let i = 0; i < eventos.length; i++) {
    console.log(eventos[i].nombre)
}
for (const item of eventos) {
    console.log(item.nombre)
}

for (const letra of nombreEvento){
    console.log(letra)
}