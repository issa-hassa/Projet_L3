let c ;
function setup() {
   c =  createCanvas(500,500);
   c.parent("canvas");
    pixelDensity(1);
    loadPixels();
    for (let i = 0; i < width; i++) {
       for (let j = 0; j < height; j++) {
        let a = map(i,width,-2,2);
        let b = map(j,height,-2,2);
        let index = (i + j*width)*4;
        pixels[index + 0] = 51;
        pixels[index + 1] = 51;
        pixels[index + 2] = 51;
        pixels[index + 3] = 255;
       }
    }
    updatePixels();
}
function draw(){

    
}