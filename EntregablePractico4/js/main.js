"use strict";

document.addEventListener("DOMContentLoaded", function () {

//Logo sticky y header achiable
window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var logo = document.getElementById("logo");
    var navbar = document.getElementById("navbar");
    var lblmenu = document.getElementById("lblmenu");

    /// Agarro el scrolltop de la pagina y remuevo y agrego las clases segun el scroll
    if (scrollPosition > 150) {
        logo.classList.add("logo");
        navbar.classList.add("navlogo")
        lblmenu.classList.add("lbl-logo")
    } else {
        logo.classList.remove("logo");
        navbar.classList.remove("navlogo")
        lblmenu.classList.remove("lbl-logo")
    }

    // Cards se mueven a destiempo con el scroll y cambia la perspectiva en mouse over y sale en mouse out
    const cards = document.querySelectorAll(".card");

    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      cards.forEach((card) => {
        card.style.transform = `translateY(${scrollPosition * 0.027}px)`;
      });
    });
    
    cards.forEach((card) => {
      card.addEventListener("mouseover", function () {
        card.style.transform = "scale(1.1)";
        card.style.transform = "perspective(1000px) rotateY(-5deg)";
      });
    
      card.addEventListener("mouseout", function () {
        card.style.transform = "none";
      });
    });
    
});

    ///Fade in cards
  document.addEventListener("scroll", () => {
      var cardmm = document.getElementById('cardmm');
      var cardpp = document.getElementById('cardpp');
      var cardgw = document.getElementById('cardgw');

      if (window.scrollY > 1375) {
        cardpp.classList.add("fade-in");// Segun el scroll se les agrega la clases para lograr el efecto de fade-in y luego los remueve
        cardmm.classList.add("fade-in");
        cardgw.classList.add("fade-in");
      }
      else{
        cardmm.classList.remove("fade-in");
        cardpp.classList.remove("fade-in");
        cardgw.classList.remove("fade-in");
      }
    });

    //Img sticky con transicion suave
    window.addEventListener("scroll", function () {
    let imgs = document.querySelectorAll(".img-sticky");    
    let scrollY = this.scrollY;

    imgs.forEach(function (t) {
      t.classList.add("oculto");///Recorro todas las imagenes
    });

    if (scrollY < 4300) {
      imgs[0].classList.remove("oculto");
    }

    else if (scrollY > 4490 && scrollY < 4890) { /// Segun su posicion de scrollY e imagen, se remueve la class "oculto" para logras esa transicion
      imgs[1].classList.remove("oculto");

    } else if (scrollY > 4890 && scrollY < 5240) {
      imgs[2].classList.remove("oculto");
    } 

  else {
      imgs[3].classList.remove("oculto");
    }
  })

  //Parallax

  window.addEventListener("scroll", scrollParallax);

    const paralx0 = document.getElementById("backgrParallax");
    const paralx1 = document.getElementById("edifIzq");
    const paralx2 = document.getElementById("edifMed");
    const paralx3 = document.getElementById("edifDer");
    const paralx4 = document.getElementById("spideygw");
    const paralx5 = document.getElementById("spideypp");
    const paralx6 = document.getElementById("telaraniapp");
    const paralx7 = document.getElementById("spideymm");
    const paralx8 = document.getElementById("telaraniamm");
    
/// Agarro el scrolltop de la pagina y aplico un translateX o Y, para lograr el efecto de parallax
    function scrollParallax(){
      let y = document.documentElement.scrollTop;
      paralx0.style.transform = 'translateY(' + y * 0.3 + 'px)';
      paralx1.style.transform = 'translateX(' + y * 0.15 + 'px)';
      paralx2.style.transform = 'translateY(' + y * 0.25 + 'px)';
      paralx3.style.transform = 'translateX(' + y * -0.25 + 'px)' ;
      paralx4.style.transform = 'translateY(' + y * -0.25 + 'px) translateX(' + y * -0.3 + 'px)';
      paralx5.style.transform = 'translateY(' + y * -0.25 + 'px)';
      paralx6.style.transform = 'translateY(' + y * -0.25 + 'px)';
      paralx7.style.transform = 'translateY(' + y * -0.3 + 'px) translateX(' + y * 0.15+ 'px)';
      paralx8.style.transform = 'translateY(' + y * -0.3 + 'px) translateX(' + y * 0.15 + 'px)';
      
    };

    //Scroll duende
    window.addEventListener("scroll", scrollDuende);

    function scrollDuende(){
      const duende = document.getElementById('duendeverde');
      let y = duende.getBoundingClientRect().top;

       duende.style.transform = 'translateY(' + y * -0.020 + 'px)';// Similar al parallax para lograr scroll lento
    }
   

console.log(scrollY);
});



