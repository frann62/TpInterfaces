"use strict"

class GameCell{
    constructor(x, y,img, ctx,){
        this.x=x;
        this.y=y;
        this.ctx=ctx;
        this.disponible = false;
        this.img= img; 
        this.player;
    }

    draw(load){
    let ctx=this.ctx;
    let x=this.x;
    let y=this.y;
    let img=this.img;

    if (load) {
        this.img.onload = function (){
         ctx.drawImage(img,x,y,50,50);
        }
    }
        
    else{
        ctx.drawImage(img,x,y,50,50);
    }      
}
}