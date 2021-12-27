import { validarAño, validarNumeros, validarCampos } from "./validaciones.js";
import { Nota } from "./nota.js";

let campoAño = document.getElementById("año");
let campoMateria = document.getElementById("materia");
let campoNota = document.getElementById("nota");
let campoNotaSimulacion = document.getElementById("notaSimulacion");
let formulario = document.getElementById("formNota");
let formularioSimulacion = document.getElementById("formSimularNota");
cargarInfo();

campoAño.addEventListener("blur", function () {
  validarAño(campoAño);
});
campoNota.addEventListener("blur", function () {
  validarNumeros(campoNota);
});
campoNotaSimulacion.addEventListener("change", function () {
  validarNumeros(campoNotaSimulacion);
  simular();
});

formulario.addEventListener("submit", cargarNota);
formularioSimulacion.addEventListener("submit", (e) => {e.preventDefault();});

function cargarNota(e) {
  e.preventDefault();

  if (validarCampos()) {
    guardarNota();
  }
}

function guardarNota() {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  let nuevaNota = new Nota(campoAño.value, campoMateria.value, campoNota.value);

  notas.push(nuevaNota);
  localStorage.setItem("notas", JSON.stringify(notas));

  Swal.fire({
    title: "Nota guardada",
    text: "La nota se ha guardado correctamente",
    icon: "success",
    confirmButtonText: "Joya",
  });
  limpiarFormulario();
  cargarInfo();
}

function limpiarFormulario(){
  campoAño.value = "";
  campoMateria.value = "";
  campoNota.value = "";
  campoAño.className = "form-control";
  campoMateria.className = "form-control";
  campoNota.className = "form-control";
}

function cargarInfo(){
  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  let promedioGlobal = 0;
  let promedioAñoAnterior = 0;
  let materiasAñoAnterior = 0;
  let promedioAñoActual = 0;
  let materiasAñoActual = 0;

  for (let i = 0; i < notas.length; i++) {
    let nota = notas[i];
    let año = nota.año;
    
    let añoActual = new Date().getFullYear();

    if (año == añoActual) {
      promedioAñoActual += parseFloat(nota.nota);
      materiasAñoActual++;
    } else if (año == añoActual-1) {
      promedioAñoAnterior += parseFloat(nota.nota);
      materiasAñoAnterior++;
    }

    promedioGlobal += parseFloat(nota.nota);
  }

  if(notas.length != 0) promedioGlobal = promedioGlobal / notas.length;
  else promedioGlobal = 0;
  if(materiasAñoAnterior!=0) promedioAñoAnterior = promedioAñoAnterior / materiasAñoAnterior;
  else promedioAñoAnterior = 0;
  if(materiasAñoActual!=0) promedioAñoActual = promedioAñoActual / materiasAñoActual;
  else promedioAñoActual = 0;

  document.getElementById("promedioGlobal").innerHTML = promedioGlobal.toFixed(2);
  document.getElementById("promedioAñoAnterior").innerHTML = promedioAñoAnterior.toFixed(2);
  document.getElementById("promedioAñoActual").innerHTML = promedioAñoActual.toFixed(2);

}

function simular(){
  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  let promedioGlobal = 0;
  let promedioAñoAnterior = 0;
  let materiasAñoAnterior = 0;
  let promedioAñoActual = 0;
  let materiasAñoActual = 0;

  for (let i = 0; i < notas.length; i++) {
    let nota = notas[i];
    let año = nota.año;
    
    let añoActual = new Date().getFullYear();

    if (año == añoActual) {
      promedioAñoActual += parseFloat(nota.nota);
      materiasAñoActual++;
    } else if (año == añoActual-1) {
      promedioAñoAnterior += parseFloat(nota.nota);
      materiasAñoAnterior++;
    }

    promedioGlobal += parseFloat(nota.nota);
  }

  promedioGlobal += parseFloat(campoNotaSimulacion.value);
  promedioAñoActual += parseFloat(campoNotaSimulacion.value);

  if(notas.length != 0) promedioGlobal = promedioGlobal / (notas.length+1);
  else promedioGlobal = parseFloat(campoNotaSimulacion.value);
  if(materiasAñoAnterior!=0) promedioAñoAnterior = promedioAñoAnterior / materiasAñoAnterior;
  else promedioAñoAnterior = 0;
  if(materiasAñoActual!=0) promedioAñoActual = promedioAñoActual / (materiasAñoActual+1);
  else promedioAñoActual = parseFloat(campoNotaSimulacion.value);

  document.getElementById("promedioGlobalS").innerHTML = promedioGlobal.toFixed(2);
  document.getElementById("promedioAñoAnteriorS").innerHTML = promedioAñoAnterior.toFixed(2);
  document.getElementById("promedioAñoActualS").innerHTML = promedioAñoActual.toFixed(2);
}
