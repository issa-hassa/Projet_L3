/// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
let barres = [];
let largeur = 20;
let n;
let i = 0;
let j = 0;
let c;
let b;
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
     barres.push(random(height));
 }
 
 

}
function init(){
     for (let i = 0; i <= n; i++) {
            barres[i] = (random(height));
        }
        i = 0;
        j = 0;

}
function draw(){
  background(255);
  frameRate(5);
  let min = i;
  if(i < n){
      
      j ++;
      if(j >=n){
          if(min != i ){
            let tmp1 = barres[i];
            barres[i] = barres[min];
            barres[min] = tmp1;
            }
          j = i+1;
          i++;
          min = i;
      }
     // for (let j = 0; j < width; j++) {
           
          
           fill(255,255,0);
           rect(j*largeur,height - barres[j],largeur,barres[j]);
            if(barres[j] < barres[min]){
                min = j;
                
            }
            fill(0,255,0);
           rect(min*largeur,height - barres[min] ,largeur,barres[min]);
            if(min != i ){
            fill(255,0,0);
            rect(min*largeur,height - barres[min] ,largeur,barres[min]);
            }
       // }
      //  i++;
        


    }
    else{
      //  init();
       
    }
    for (let l = 0; l < n; l++) {
            //fill(52,150,90);
            noFill();
            stroke(52,150,90);
            if(l < i){
                fill(150,100,100);
                
            }
            rect(l*largeur,height - barres[l],largeur,barres[l]);
        }
  /*rect(0,height - 50,20,50);
  rect(20,height - 50,20,50);
  rect(40,height - 50,20,50);*/
 }

  function windowResized(){
      resizeCanvas(400,400);
  }
 
   
   

  




