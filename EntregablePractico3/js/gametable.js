"use strict"

class GameTable{
   constructor(canvas, ctx, cell, mode){
    this.canvas = canvas;
    this.ctx = ctx;
    this.cell = cell;
    this.mode = mode;
   }
   
   createTable(){
    let yInit;
    let xInit;
    switch(this.mode){
        case 4:
            xInit = 425;
            yInit = 120;
        break;
        case 5:
            xInit = 400;
            yInit = 120;
        break;
        case 6:  
            xInit = 375;
            yInit = 120;
        break;
        case 7:
            xInit = 350;
            yInit = 120;
        break;
    }

    for (let i = this.mode+2; i >= 0; i--) {
        this.cell[i] = [];
       for(let j= this.mode+2; j>=0; j--){
        let img= new Image();
        img.src="./img/4enlineacasillero.png"
            let y = yInit + (i-1)*50;
            let x = xInit + j*50;
            this.cell[i][j] = new GameCell(x, y,img, ctx);
            }
        }
    }

    //La primera fila queda invisible asi se usa para tirar la ficha
    draw(load) {
        for (let i = this.mode+2; i > 0; i--) {
           for(let j = this.mode+2; j>=0; j--){
                this.cell[i][j].draw(load)
            }    
        }
    }

    //Determina si la posición donde fue soltada la ficha es válida para colocarla en el tablero
    posFichaValida(ficha){
        if(!ficha.adentroTablero && ficha.selected){
            ficha.selected = false;
            let fila = this.cell[0];
            for (let i = 0; i < fila.length; i++) {
                let j = fila[i];
                if (ficha.posx+22>j.x && j.x+40>ficha.posx+22 && ficha.posy+22>j.y && j.y+40>ficha.posy+22) {
                    ficha.adentroTablero = true;
                    this.fichaPosCol(ficha, i);
                    break;
                }  
            }
            ficha.posx = ficha.startx;
            ficha.posy = ficha.starty;           
        }
    }

    //Sirve para calcular donde debe ser colocada la ficha
    fichaPosCol(ficha, col){
        for (let i = this.cell.length-1; i >=0 ; i--) {
            const fila = this.cell[i];
            if(fila[col].disponible == false){
                [ficha.posx, ficha.startx] = [fila[col].x + 2, fila[col].x + 2];
                [ficha.posy, ficha.starty] = [fila[col].y + 2, fila[col].y + 2];
                fila[col].disponible = true;
                fila[col].player = ficha.player.name;
                this.verifyWinner(i,col);
                nextTurn();
                break;

            }else{
                ficha.adentroTablero=false;
            }
        }
    }
    

    //Verifica si el hay ganador segun el modo que se elija 
    verifyWinner(i,n){
        if(this.verifyWinnerHorizontal(i,n) || this.verifyWinnerVertical(i,n) || this.verifyWinnerDiagonal(i,n)){
            winner = turn.name;
            timer = 0;
           /* console.log(`Horizontal Win: ${this.verifyWinnerHorizontal}`);
            console.log(`Vertical Win: ${this.verifyWinnerVertical}`);
            console.log(`Diagonal Win: ${this.verifyWinnerDiagonal}`);*/
        }
    }

  
    //Recorre de manera horizontal si el jugador gano, hacia izquierda y derecha a partir de la posición de la ficha
    verifyWinnerHorizontal(i,n){
        let enLinea = 1;
        let fila = this.cell[i];
        for (let index = n+1; index < fila.length; index++) {
            if(fila[index].player == turn.name){
                enLinea++;
            }else{
                break;
            }  
        }
        console.log(`Horizontal Win - Player: ${fila[n].player}, enLinea: ${enLinea}`);


        for (let index = n-1; index >= 0 ; index--) {
            if(fila[index].player == turn.name){
                enLinea++;
            }else{
                break;
            }
        }
        console.log(`Horizontal Win - Player: ${fila[n].player}, enLinea: ${enLinea}`);


        if(enLinea >= this.mode){
            return true;
            
        }else{      
            return false;
        }
    }

    
    //Recorre de manera horizontal si el jugador gano, hacia arriba y abajo a partir de la posición de la ficha
    verifyWinnerVertical(i,n){
        let enLinea = 1;
        for (let index = i+1; index < cell.length; index++) {
            if(this.cell[index][n].player == turn.name){
                enLinea++;
            }else{
                break;
            }   
        }
    
        for (let index = i-1; index >=0 ; index--) {
            if(this.cell[index][n].player == turn.name){
                enLinea++;
            }else{
                break;
            }
        }
        
        if(enLinea>=this.mode){
            console.log('ganoVert')
            return true;

        }else{
            return false;
        }
    }

    
    //Recorre las diagonales si el jugador
    verifyWinnerDiagonal(i,n){
        let enLinea = 1;
        enLinea+= this.verifyDiagonalA(i,n);

        if(enLinea>=this.mode){
            
           return true;
           

        }else{
            enLinea = 1;
            enLinea+= this.verifyDiagonalB(i,n);

        if(enLinea>=this.mode){
                return true;
            }
        }
    }

    
   //Recorre la diagonal A, suma las fichas iguales hacia abajo-derecha y hacia arriba-izquierda a partir de la posición de la ficha
    verifyDiagonalA(i,n){
        let fichas = this.verifyDeAbajoADer(i+1,n+1);
        fichas += this.verifDeArribaAIzq(i-1,n-1);
        return fichas;
    }

    verifyDeAbajoADer(i,n){
        if(i >= this.cell.length || n >= this.cell[0].length){
            return 0;

        }else if(this.cell[i][n].player != turn.name){
            return 0;

        }else{
            return 1 + this.verifyDeAbajoADer(i+1,n+1)
        }   
    }

    verifDeArribaAIzq(i,n){
        if(i < 0 || n < 0){
            return 0;

        }else if(this.cell[i][n].player != turn.name){
            return 0;

        }else{
            return 1 + this.verifDeArribaAIzq(i-1,n-1)
        }
    }

   
    //Recorre la diagonal B, suma las fichas iguales hacia arriba-derecha y hacia abajo-izquierda a partir de la posición de la ficha
    verifyDiagonalB(i,n){
        let fichas = this.verifDeArribaBder(i-1,n+1);
        fichas += this.verifDeAbajoBizq(i+1,n-1);
        return fichas; 
    }

    verifDeArribaBder(i,n){
        if(i < 0 || n >= this.cell[0].length){
            return 0;

        }else if(this.cell[i][n].player != turn.name){
            return 0;

        }else{
            return 1 + this.verifDeArribaBder(i-1,n+1)
        }
    }

    verifDeAbajoBizq(i,n){
        if(i >= this.cell.length || n < 0){
            return 0;

        }else if(this.cell[i][n].player != turn.name){
            return 0;

        }else{
            return 1 + this.verifDeAbajoBizq(i+1,n-1)
        } 
    } 
    
}
