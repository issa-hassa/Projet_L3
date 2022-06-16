/// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
let barres = [];
let largeur = 20;
let n;
let i ;
let j;
let c;
let b;
let index;
function setup(){//Math.max(document.documentElement.clientWidth,window.innerWidth || 0),400
  c = createCanvas(400,400);
  n = width/largeur;
  //c.position('0','0','fixed');
  c.parent('canvas');
  background(0);
  b = createButton("recommencer");
  b.mousePressed(init);
  b.parent('canvas');

 for (let i = 0; i <= n; i++) {
    barres.push(new Barre(i*largeur,random(height)));
 }
  i = 0;
  j = 1;
  index = 0;
}

function draw(){
  background(255);
  frameRate(5);
  let c = 0;
  for (const b of barres) {
    if(c ===j){
      fill(255,0,0);
     // b.show();
    }
    else if(c === i){
      fill(112,112,114);
      
    }
    else if (c === index){
      fill(0,255,0);
    }
    else{
      fill(51,100,100);
    }
    b.show();
    c++;
    
  }
  if(i<barres.length -1){
    barres[i].current = true;
    
    if(j < barres.length){
      barres[j].j = true;
      if(barres[index].h > barres[j].h){
        index = j;
        
      }
      
      j++;
    }
    else{
      console.log(barres[i]);
      let temp =  barres[i].h;
      barres[i].h = barres[index].h;
      barres[index].h= temp;
      barres[i].current = false;
      i++;
      j = i+1;
      index = i;
    }
   
     

    
  }
}
class Barre{
    constructor(x,h){
        this.x = x;
        this.h = h;
        this.offSet = 0;
        this.current = false;
        this.j = false;
    }
    show(){
       // if(this.current) fill(112,112,114);
       // else if(this.j)fill(255,0,0);
        //{fill(51,100,100)};
        rect(this.x,height - (this.h + this.offSet),largeur,this.h);
        text(""+ floor(this.h),this.x,height - (this.h + this.offSet));
    }
    swap(b){
        let dir = createVector(this.x - b.x,0);
        dir.normalize();
        this.x -= dir.x;
        console.log(dir.x === 0);
        return dir.x === 0;
    }
    desc(){
        if(this.offSet > 0){
            this.offSet--;
        }
        return this.offSet === 0;
    }


}
  function windowResized(){
      resizeCanvas(400,400);
  }
 
   
   

  




function init(){
     for (let i = 0; i <= n; i++) {
            barres[i] = (random(height));
        }
        i = 0;
        index = i;
        j = 1;

}