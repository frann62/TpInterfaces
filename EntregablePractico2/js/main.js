"use strict";
document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  incrementarPorcentaje();
})

window.addEventListener("load", () => {
  setTimeout(() => {
      hideLoader();
  }, 5000);
})

const loader = document.getElementById("loader");
const home = document.getElementById("home");
const porcentajeElemento = document.getElementById("porcentaje"); // Obtener el elemento para mostrar el porcentaje
let porcentaje = 0;

const showLoader = () => {
  loader.style.display = "block";
  home.style.display = "none";
  updatePorcentaje(); // Llamar a la función para actualizar el porcentaje
}

const hideLoader = () => {
  loader.style.display = "none";
  home.style.display = "block";
  porcentaje = 0; // Reiniciar el porcentaje a 0 al ocultar el loader
  updatePorcentaje(); // Llamar a la función para actualizar el porcentaje
}

const updatePorcentaje = () => {
  porcentajeElemento.textContent = porcentaje + "%";
};

// Función para simular el incremento del porcentaje cada segundo
const incrementarPorcentaje = () => {
  const incrementoPorSegundo = 100 / 5; // Calcula el incremento necesario por segundo para llegar a 100% en 5 segundos

  if (porcentaje < 100) {
    porcentaje += incrementoPorSegundo / 20; // Incrementa gradualmente el porcentaje en cada iteración (20 iteraciones por segundo)
    updatePorcentaje();
    setTimeout(incrementarPorcentaje, 40); // Intervalo de 40 milisegundos (20 iteraciones por segundo)
  }
};

      ////////////Botones///////////////
  document.querySelectorAll(".comprar").forEach(function (element) {
    let added=0;
    element.addEventListener("click", function (){
    if (added==0) {
        element.innerHTML="Quitar del Carrito";
        element.classList.add("quitar");
        added=1;
    }
    else if (added==1) {
        element.innerHTML="Agregar al Carrito";
        element.classList.remove("quitar");
        added=0;
    }
    
})
})


///////carrusel////////

const carouselContainer = document.querySelector('.portada')
const prevButton = document.getElementById("anterior");
const nextButton = document.getElementById("siguiente");
let position = 0;

prevButton.addEventListener("click", function () {
  const slideWidth = carouselContainer.querySelector(".box-portada").offsetWidth;

  if (position > 0) {
    position--;
    carouselContainer.style.transform = `translateX(-${position * slideWidth}px)`;
  }
});

nextButton.addEventListener("click", function () {
  const slideWidth = carouselContainer.querySelector(".box-portada").offsetWidth;
  const elementos = document.querySelector(".box-portada").children;

  if (position <= elementos.length + 1) {
    position++;
    carouselContainer.style.transform = `translateX(-${position * slideWidth}px)`;
  }
  console.log(position)
  console.log(slideWidth)
  console.log(elementos.length)
});














 

