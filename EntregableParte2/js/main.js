"use strict";
document.addEventListener("DOMContentLoaded", () => {
  showLoader();
})

window.addEventListener("load", () => {
  setTimeout(() => {
      hideLoader();
  }, 5000);
})

const loader = document.getElementById("loader");
const home = document.getElementById("home");

const showLoader = () => {
  loader.style.display = "block";
  home.style.display = "none";
}

const hideLoader = () => {
  loader.style.display = "none";
  home.style.display = "block";
}


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

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carrusel");
  const carouselContainer = carousel.querySelector(".portada");
  const prevButton = document.getElementById("anterior");
  const nextButton = document.getElementById("siguiente");
  let position = 0;

  prevButton.addEventListener("click", function () {
    const slideWidth = carouselContainer.querySelector(".box-portada").offsetWidth;

    if (position > 0) {
      position--;

      carouselContainer.style.transform = `translateX(-${position * slideWidth}px)`;
      carouselContainer.classList.add("slide-anim");
      setTimeout(function() {
        carouselContainer.classList.remove("slide-anim");
      }, 300);
    }
  });

  nextButton.addEventListener("click", function () {
    const slideWidth = carouselContainer.querySelector(".box-portada").offsetWidth;
    const elementos = carouselContainer.children;

    if (position < elementos.length - 1) {
      position++;

      carouselContainer.style.transform = `translateX(-${position * slideWidth}px)`;
      carouselContainer.classList.add("slide-anim");
      setTimeout(function() {
        carouselContainer.classList.remove("slide-anim");
      }, 300);
    }
  });
  
});
  
  








 

