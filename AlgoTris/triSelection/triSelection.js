let barres = [];
let largeur = 20;
let n;
let i = 0;
let j = 0;
function setup(){//Math.max(document.documentElement.clientWidth,window.innerWidth || 0),400
 createCanvas(400,400);
  n = width/largeur;
 background(0);

 for (let i = 0; i <= n; i++) {
     barres.push(random(height));
 }
 

}

function draw(){
  background(255);
  frameRate(5);
  if(i < n){
      let min;
      j ++;
      if(j >=n){
          j = i+1;
          i++;
      }
     // for (let j = 0; j < width; j++) {
           min = i;
           fill(0,255,0);
           rect(min*largeur,height - barres[min] ,largeur,barres[min]);
           fill(255,255,0);
            rect(j*largeur,height - barres[j],largeur,barres[j]);
            if(barres[j] < barres[min]){
                min = j;
                
            }
            if(min != i){
            fill(255,0,0);
            rect(min*largeur,height - barres[min] ,largeur,barres[min]);
            let tmp1 = barres[i];
            barres[i] = barres[min];
            barres[min] = tmp1;

            }
       // }
      //  i++;
        


    }
    else{
        noLoop();
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
      resizeCanvas(Math.max(document.documentElement.clientWidth,window.innerWidth || 0),400);
  }
 
   
   

  




