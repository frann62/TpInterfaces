"use strict";
document.addEventListener("DOMContentLoaded", function () {

let burger=0;
let burgerMenu=document.querySelector("#menu");
document.querySelector("#botonburger").addEventListener("click", function () {
    
    if (burger==0) {

        burgerMenu.classList.add("menu-show");
        burgerMenu.classList.remove("menu-hiden");
        burger=1;
    }
    
    else if (burger==1) {
        burgerMenu.classList.remove("menu-show");
        burgerMenu.classList.add("menu-hiden");
        burger=0;
    }
})

});