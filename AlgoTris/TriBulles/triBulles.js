let barres = [];
let largeur = 20;
let n;
let i = n;
let j = 0;
let couleur;
let p;
let m ;
let b;
let c;


function setup(){
  c = createCanvas(400,400);
  c.parent("canvas");
  n = width/largeur;

  background(0);
  i = n;

 init();
 couleur = color(0,255,0);
 p = false;
 b.mousePressed(init);
}
function init(){
    barres = [];
 for (let i = 0; i <= n; i++) {
     barres.push(random(height));
 }
  i = n;
  j = 0;
}

function draw(){
  background(255);
  frameRate(1);
  if(i > 1){
      
      j ++;
      if(j >i + 1){
          j = 0;
          i--;
      }
     
            if(barres[j + 1] <= barres[j]){
                let tmp1 = barres[j + 1];
                barres[j + 1] = barres[j];
                barres[j] = tmp1;
                p = true;

                
            }


    }
    else init();
    for (let l = 0; l < n; l++) {
            
            fill(51,100,100);
            if(l == j+1  ) fill(255,0,0);
            rect(l*largeur,height - barres[l],largeur,barres[l]);
           
        }
}

  function windowResized(){
      resizeCanvas(Math.max(document.documentElement.clientWidth,window.innerWidth || 0),400);
  }
 
   
   

  




