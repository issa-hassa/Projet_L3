let c ;
const MAX_ITERATION = 500
const REAL_SET = {start : -2, end:2}
const IMG_SET = {start : -2, end:2}


let scale = 1
let prevscale = 1
let scaleChange = 0;


let ctx = 0
let cty = 0

let increaseButton;
let decreaseButton;


let update  = true
function setup() {
  
   colorMode(HSB)


   c =  createCanvas(500,500);
   c.parent("canvas");
   // let context = c.getContext('2d')
   // context.willReadFrequently = true; 
   const canvas = document.getElementById('defaultCanvas0');
   const context = canvas.getContext('2d');
   context.canvas.willReadFrequently = true; // Set the attribute
   zoomSlider = createSlider(0.1, 100, 1, 0.000000001);
   zoomSlider.parent("canvasFooter");
   zoomSlider.style('width', '500px');

   increaseButton = createButton("+");
   increaseButton.parent("canvasFooter")
   increaseButton.mousePressed(increaseScale);

   decreaseButton = createButton("-");
   decreaseButton.mousePressed(decreaseScale);
   decreaseButton.parent("canvasFooter")
   

    pixelDensity(1);
    //noLoop();
}
function drawBort(){
   if(update){
      loadPixels();
    for (let i = 0; i < width; i++) {
       for (let j = 0; j < height; j++) {
         // conversion du pixel a la position i,j en un nombre complexe : x + yi
        let  complex = {
            x: map(i, 0, width, REAL_SET.start, REAL_SET.end)/scale + ctx,
            y: map(j, 0, height, IMG_SET.start, IMG_SET.end)/scale + cty
         }
         const [m, isMandelbrotSet] = mandelbrot(complex)
         const norm = map(m, 0, MAX_ITERATION, 0, 1);

         // Change color based on iteration count
        let hue,saturation,brightness


         if ( m ===  MAX_ITERATION ) saturation = 0
         else {
            
            hue = map(m,0,MAX_ITERATION,0,255)
            saturation =map(m, 0, MAX_ITERATION, 100, 1000);
            brightness = map(m, 0, MAX_ITERATION, 50, 255);

         }
         //
        
         
         let index = (i + j*width)*4;   
         pixels[index + 0] = hue
         pixels[index + 1] = saturation
         pixels[index + 2] = brightness
         pixels[index + 3] = 255;
         }
    }
   // noLoop();
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
   if(prevscale !== scale){
      update = true
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
   let z = { x:0 , y:0 }
   //le nombre d'iteration
   let n=0
   // z au carré
   let zCarre
   // le module de z
   let d

   do {
      zCarre = {
         x: Math.pow(z.x,2) - Math.pow(z.y, 2),
         y : 2*z.x*z.y
      }
      z = {
         x: zCarre.x + c.x,
         y: zCarre.y + c.y
     }
     d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2))
     if(d > 16 ) break
      n +=1
   } while( n < MAX_ITERATION)
   
   return [n, d <=2]

}
function increaseScale() {
   scaleChange = 1; // Augmenter la valeur de scale
 }
 
 function decreaseScale() {
   scaleChange = -1; // Diminuer la valeur de scale
 }
