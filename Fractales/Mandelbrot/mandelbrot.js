let c ;
const MAX_ITERATION = 500
const REAL_SET = {start : -4, end:4}
const IMG_SET = {start : -4, end:4}


let scale = 1
let prevscale = 1
let ctx = 0
let cty = 0

let update  = true
function setup() {

   colorMode(HSB)


   c =  createCanvas(500,500);
   c.parent("canvas");

   zoomSlider = createSlider(0.1, 100, 1, 0.000000001);
   zoomSlider.parent("canvasFooter");
   zoomSlider.style('width', '500px');


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
         let index = (i + j*width)*4;

         // Change color based on iteration count
         let fillColor;
         if (m === MAX_ITERATION) {
             fillColor = color(0); // Set to black for points in the Mandelbrot set
         } else {
             // Create a gradient color between blue and red
             let lerpedColor = lerpColor(color(100, 255, 255), color(255, 200, 100), norm);
             fillColor = color(lerpedColor);
         }

         pixels[index + 0] = red(fillColor);
         pixels[index + 1] = green(fillColor);
         pixels[index + 2] = blue(fillColor);
         pixels[index + 3] = 255;
         }
    }
   // noLoop();
    updatePixels();
    update = false;
   
   }
   
}
function draw(){
   prevscale = scale
   scale = zoomSlider.value();
   console.log(scale)
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