/// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
let x;
let y;
let sx;
let sy;
let largeur = 20;
let h;
let b1;
let b2;
let ix1;
let ix2;
function setup(){
 createCanvas(400,400);
 
 h = 30;
 b1 = new Barre(largeur,h)
 b2 = new Barre(largeur*10,h + 10);
 x = largeur;
 y = height - h;
 y = 
 sx = 1;
 sy = 1;
 ix1  = b1.x;
 ix2 = b2.x;
}
function draw(){
    //frameRate(1);
    background(51);
    fill(255);
    //rect(x+=sx,y,largeur,h);
    b1.show();
    b2.show();

    if(b1.x < ix2){
        b1.x +=sx;

    }
    if(b2.x > ix1){
        b2.x -=sx;

    }
    



}
class Barre{
    constructor(x,h){
        this.x = x;
        this.h = h;
    }
    show(){
        rect(this.x,height - this.h,largeur,this.h);
        text(""+ floor(this.h),this.x,height - this.h);
    }
    
    


}