let barres = [];
let largeur = 20;
let n;
let i = n;
let j = 0;
let couleur;
let p;
let m ;
let b;
//let couleur1;

function setup(){//Math.max(document.documentElement.clientWidth,window.innerWidth || 0),400
 createCanvas(400,400);
  n = width/largeur;
  b = createButton("Recommencer");
  b.mousePressed(init);
  b.style("background-color",'#4CAF50');
  //b.style()
  background(0);
  i = n;

 init();
 couleur = color(0,255,0);
 //couleur1 = color(52,150,90);
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
                // let tmp = couleur1
                // couleur1 = couleur;
                // couleur = tmp;
                
               
                
            }
            
            
            

            
       // }
      //  i++;
        


    }
    else{
        
        
       
       
        
         
       
    }
    for (let l = 0; l < n; l++) {
            //fill(52,150,90);
           
            stroke(52,150,90);
            fill(51);
            if(l == j && !p ) fill(couleur);
            else if(l == j + 1 && p) fill(couleur);
            rect(l*largeur,height - barres[l],largeur,barres[l]);
           
        }
  /*rect(0,height - 50,20,50);
  rect(20,height - 50,20,50);
  rect(40,height - 50,20,50);*/
}

  function windowResized(){
      resizeCanvas(Math.max(document.documentElement.clientWidth,window.innerWidth || 0),400);
  }
 
   
   

  




