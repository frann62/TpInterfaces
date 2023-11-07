"use strict";

let canvas=document.querySelector('#canvas');
let ctx= canvas.getContext('2d');
let btnModo = document.querySelectorAll(".btn-modo");
let table = document.querySelector('#table');
let finishGame = document.querySelector('#finish-game');
let chooseMode = document.querySelector('#choosemode');
let gamemode = document.querySelector('#gamemode');
let reset = document.querySelector('#reset');
let timeInterval;
let winner;
let turn;
let mode;
let tablero;
let cell;
let timer;
let players = [];
let p1Ficha;
let p2Ficha;
let Btnficha1 = document.querySelector('#Btnficha1');
let img1 = document.querySelector('#ficha1');
let Btnficha2 = document.querySelector('#Btnficha2');
let img2 = document.querySelector('#ficha2');
let fichaSeleccionada = null;
let player1;
let Btnficha3 = document.querySelector('#Btnficha3');
let img3 = document.querySelector('#ficha3');
let Btnficha4 = document.querySelector('#Btnficha4');
let img4 = document.querySelector('#ficha4');
let fichaSeleccionada2 = null;
let player2;

// ELije con que Img de ficha va a jugar el jugador 1
Btnficha1.addEventListener('click', function() {
    fichaSeleccionada = img1.src; // Establecer la ficha seleccionada como la imagen del primer botón
    img1.classList.add("selected");
    img2.classList.remove("selected");
    createPlayerUno(fichaSeleccionada, 'Jugador 1');

});

Btnficha2.addEventListener('click', function() {
    img1.classList.remove("selected");
    img2.classList.add("selected");
    fichaSeleccionada = img2.src; // Establecer la ficha seleccionada como la imagen del segundo botón
    createPlayerUno();
});

//Setea la img y le da el turno al jugador 1
function createPlayerUno() {
    if (fichaSeleccionada) {
        let player1Img = new Image();
        player1Img.src = fichaSeleccionada; // Establecer la imagen del jugador 1
        player1 = new GamePlayer("Jugador 1", player1Img);
        player1.turno = true; // Establecer el turno del jugador 1
        players.push(player1); // Agregar al jugador 1 al arreglo de jugadores
    } 
}

// ELije con que Img de ficha va a jugar el jugador 2
Btnficha3.addEventListener('click', function() {
    fichaSeleccionada2 = img3.src; // Establecer la ficha seleccionada como la imagen del primer botón
    img4.classList.remove("selected");
    img3.classList.add("selected");
    createPlayerDos();
});

Btnficha4.addEventListener('click', function() {
    fichaSeleccionada2 = img4.src; // Establecer la ficha seleccionada como la imagen del segundo botón
    img3.classList.remove("selected");
    img4.classList.add("selected");
    createPlayerDos();
});

//Setea la img y le da el turno al jugador 2
function createPlayerDos() {
    if (fichaSeleccionada2) {
        let player2Img = new Image();
        player2Img.src = fichaSeleccionada2; 
        player2 = new GamePlayer("Jugador 2", player2Img);
    }
}

 //Ajusto el juego para que se vea en pantalla
function ajustarGame(){
    table.style='display:none';
    canvas.style='display:block';
    chooseMode.style='display:none';
    gamemode.style='display:none';
    reset.style='display:flex';
    finishGame.style= 'display:none';
}

// Dibujo el background
let backgroundGame = new Image();
   backgroundGame.src = "./img/background4enlinea.jpg";
   backgroundGame.onload = function(){
    ctx.drawImage(backgroundGame,0,0,canvas.width,canvas.height)
 }

//Muestra una cuenta atrás y un mensaje relacionado a la historia
function showTimer(){
    if(timer>0){
       let timeLeft = timer % 180;
       timeLeft = timeLeft < 10 ? "0" + timeLeft : timeLeft;
       ctx.font = "bold 28px roboto";
       ctx.fillStyle = "rgba(213, 18, 18, 0.8)";
       ctx.strokeStyle = "Black 1px solid";
       ctx.fillText(`Los villanos llegaran en ${timeLeft} segundos`, 360, 60); 
}}

//Funcion para recargar el juego y dibujar el juego devuelta 
function reloadGame() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(backgroundGame,0,0,canvas.width,canvas.height)
    tablero.draw();
    drawFichas();
    showTimer();
}

//Funcion para disminuir el tiempo en le juego
 function disminuirTiempo(){
    if (timer>0) {
        timer--;
        reloadGame();
    }else{
        reloadGame();
        youWin();
    }
}

//Reload del jeugo
reset.addEventListener("click", reloadGame=>{
    chooseMode.style='display:flex';
    gamemode.style='display:flex';
    reset.style='display:none'
    canvas.style='display:none';
    table.style='display:flex';
});

//Cargar el juego segun la opcion del modo que se elija
btnModo.forEach(btn => {
    btn.addEventListener("click", loadGame=>{
        clearInterval(timeInterval);
        ajustarGame();
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(backgroundGame,0,0,canvas.width,canvas.height)
        winner= null;
        mode= Number(btn.value);
        p1Ficha=[]; 
        p2Ficha=[]; 
        cell=[];
        tablero= new GameTable(canvas, ctx, cell, mode);
        tablero.createTable();
        tablero.draw(true);
        generateFichas(mode);
        drawFichas();
        initEvents();
        timer = 120;
        timeInterval = setInterval(disminuirTiempo, 1000);
        player1.turno = true;
        player2.turno = false;
        turn = player1;
    })
});

//Genera las fichas de los jugadores dependiendo el modo
function generateFichas(mode){

    let modes=((mode+2)*(mode+3))/2
    for (let i = 0; i < modes; i++) {
        let x;
        let y;
        if(i<11){
            x = 15;
            y = i*50 + 80;
           
        }else if(i<22){
            x = 65;
            y = (i - 11) * 50 + 80;
           
        }else if(i<33){
           x = 115;
           y = (i-22) * 50 + 80;
        }else if(i<44){
           x = 165;
           y = (i-33) * 50 + 80;
        }
        else{
            x = 215;
            y = (i-39) * 50 + 80;
        }
        p1Ficha[i]= new GameFicha(x, y, player1)
    }

    for (let i = 0; i < modes; i++) {
        let x;
        let y;
        if(i<11){
            x = canvas.offsetWidth - 55;
            y = i* 50 + 80;
           
        }else if(i<22){
            x = canvas.offsetWidth - 105;
            y = (i - 11)* 50 + 80;
           
        }else if(i<33){
           x = canvas.offsetWidth - 155;
           y = (i-22)*50 + 80;
        }else if(i<44){
           x = canvas.offsetWidth - 205;
           y = (i-33) * 50 + 80;
        }
        else {
            x = canvas.offsetWidth - 255;
            y = (i-39) * 50 + 80;
         }
        p2Ficha[i]= new GameFicha(x, y, player2)
    }
}

//Sirve para dibujar las fichas de los jugadores
function drawFichas() {
    p1Ficha.forEach(e=>e.draw(ctx));
    p2Ficha.forEach(e=>e.draw(ctx));
}

//Sirve para pasar de turno entre los jugadores
function nextTurn() {
    if (winner === null) {
        if (turn === player1) {
            player1.turno = false;
            player2.turno = true;
            turn = player2;
        } else {
            player1.turno = true;
            player2.turno = false;
            turn = player1;
        }
    }
}

//Sirve para inicializar los eventos
function initEvents() {
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;
 }
 
 //Sirve para mover la ficha 
 function mouseMove(e) {
    let x = e.pageX-canvas.offsetLeft;
    let y = e.pageY-canvas.offsetTop;
    p1Ficha.forEach(ficha=>ficha.moverFicha(x,y));
    p2Ficha.forEach(ficha=>ficha.moverFicha(x,y));
    if(winner == null){
    reloadGame();
    } 
 }

 //Sirve para saber si la ficha puede caer cuando se dejo de hacer click
 function mouseUp() {
    p1Ficha.forEach(ficha=>tablero.posFichaValida(ficha));
    p2Ficha.forEach(ficha=>tablero.posFichaValida(ficha)); 
 }
 
  //Sirve para saber si la ficha se clickeo 
 function mouseDown(e) {
    let x = e.pageX-canvas.offsetLeft;
    let y = e.pageY-canvas.offsetTop;

    if (turn==player1) {
        p1Ficha.forEach(ficha=>ficha.select(x,y));
    }else{
        p2Ficha.forEach(ficha=>ficha.select(x,y));
    }
}
 
//Declarar el ganador o empate
function youWin() {
    ctx.font = "bold 28px roboto";
    ctx.fillStyle = "rgba(213, 18, 18, 0.8)";
        if(winner != null){
        player1.turno = false;
        player2.turno = false;
        ctx.fillText(`Juego Finalizado ${winner} ha ganado`,350,80);
        }
    else{
        ctx.fillStyle = "rgba(213, 18, 18, 0.8)";
        ctx.fillText('Se ha declarado empate',350,80);
    }
}

