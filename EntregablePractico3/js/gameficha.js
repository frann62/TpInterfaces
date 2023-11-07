"use strict";

class GameFicha  {
    
    constructor(x,y,player){
        this.posx= x;
        this.posy= y;
        this.startx= x;
        this.starty= y;
        this.player= player;
        this.selected= false;
        this.diametro=45;
        this.adentroTablero=false;
        this.turno = false;
    }

    start(){
        this.posx=this.startx;
        this.posy=this.starty;
    }

    getPosx(){
        return this.posx;
    }

    getPosY(){
        return this.posy;
    }

    draw(ctx){
        let img= this.player.img
        let x = this.posx;
        let y = this.posy;
        ctx.drawImage(img, x, y, this.diametro, this.diametro);
    }

    select(xM,yM){
        if(!this.selected && xM>this.posx && xM< this.posx+this.diametro && yM> this.posy && yM<this.posy + this.diametro){
            this.selected = true;
        }    
    }

    moverFicha(x,y){
        if(this.selected && !this.adentroTablero){
            this.posx= x-(22);
            this.posy= y-this.diametro/2;
        }
    }
}