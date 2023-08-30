p5.disableFriendlyErrors = true; 
let c ;
const MAX_ITERATION = 200
const REAL_SET = {start : -2, end:2}
const IMG_SET = {start : -2, end:2}


let scale = 1
let prevscale = 1
let scaleChange = 0;

let increaseButton;
let decreaseButton;


let inputX
let inputY 
let buttChange

let ctx = 0
let cty = 0


let constante
let update  = true
function setup() {

   
   colorMode(HSB)


   c =  createCanvas(500,500,WEBGL);
   c.parent("canvas");

   constante = {
      x: -0.7,
      y: 0.27015
   }

   

   inputX = createInput("X")
   inputX.parent("canvasFooter")
   inputX.input(updateConstanteX)


   inputY = createInput("Yi")
   inputY.parent("canvasFooter")
   inputY.input(updateConstanteY)


   buttChange = createButton("update")
   buttChange.parent("canvasFooter")
   buttChange.mousePressed(updateConstante)


  increaseButton = createButton("+");
  increaseButton.parent("canvasFooter")
  increaseButton.mousePressed(increaseScale);

  decreaseButton = createButton("-");
  decreaseButton.mousePressed(decreaseScale);
  decreaseButton.parent("canvasFooter")


   pixelDensity(1);
}
function drawBort(){
   if(update){
      // on charge les pixels
      loadPixels();
    for (let i = 0; i < width; i++) {
       for (let j = 0; j < height; j++) {
         //  conversion du pixel a la position i,j en un nombre complexe : x + yi 
         // avec ( x <= REAL_SET.start & x>= REAL_SET.end ) et (y <= IMG_SET.start & y>= IMG_SET.end)
        let  complex = {
            x: map(i, 0, width, REAL_SET.start, REAL_SET.end)/scale + ctx,
            y: map(j, 0, height, IMG_SET.start, IMG_SET.end)/scale + cty
         }
         
         const [m, isMandelbrotSet] = mandelbrot(complex)
         
         

         // Changement de la couleur en fonction du nombre d'itérations  
         //let fillColor;
         let hue,saturation,brightness

         console.log(m===MAX_ITERATION)
         if ( m ===  MAX_ITERATION ) saturation = 0
         else {
            
            hue = map(m,0,MAX_ITERATION,270,180)
            saturation =100
            brightness = 100

         }
         //
        
         
         let index = (i + j*width)*4;   
         pixels[index + 0] = hue
         pixels[index + 1] = saturation
         pixels[index + 2] = brightness
         pixels[index + 3] = 255;
         }
    }

      updatePixels();
      update = false;
   
    }
   
}
function draw(){

 
   if (scaleChange !== 0) {
      update = true;
      scale *= 1 + scaleChange * 0.1; // Ajuster la valeur de scale
      scaleChange = 0; // Réinitialiser le changement de scale
      
    }
   if(keyIsDown(LEFT_ARROW)){
      ctx -= 0.5*1/scale
      update = true
    }
    if(keyIsDown(RIGHT_ARROW)){
      ctx += 0.5*1/scale
      update = true
    }
    if(keyIsDown(UP_ARROW)){
      cty -= 0.5*1/scale
      update = true
    }
    if(keyIsDown(DOWN_ARROW)){
      cty += 0.5*1/scale
      update = true
    }
   drawBort()
    
    
}

function mandelbrot(c) {
   
   // la fonction z
   let z = { x:c.x , y:c.y }
   //le nombre d'iteration
   let n=0
   // z au carré
   let zCarre
   // le module de z
   let d

   do {
      // calcule de Z au carré
      let xCarre =z.x * z.x 
      let yCarre =   z.y*z.y
      zCarre = {
         x: xCarre - yCarre,
         y : 2*z.x*z.y
      }
      // caclule de Zn + 1 
      z = {
         x: zCarre.x +constante.x,
         y: zCarre.y + constante.y,
     }
     //calcule du module de Z
     d = xCarre + yCarre
     if(d > 16) break
     
     n +=1
   } while( n < MAX_ITERATION)
   
   return [n, d <=2]

}





function updateConstante() {
   if(constante.x != NaN && constante.y != NaN ){
      console.log(constante)
      update = true
   }
   else{
      constante = {
         x: -0.7,
         y: 0.27015
      }
      alert("Entrez des données valide pour la constante")
   }
}
function updateConstanteX() {
   constante.x = parseFloat(this.value())
}
function updateConstanteY() {
   constante.y = parseFloat(this.value())
}

function increaseScale() {
   scaleChange = 1; // Augmenter la valeur de scale
 }
 
 function decreaseScale() {
   scaleChange = -1; // Diminuer la valeur de scale
 }
