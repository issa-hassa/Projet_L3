let angle;
let slider;
let c;
function setup() {
   c = createCanvas(500,500);
   
   c.parent("canvas");
    slider = createSlider(0,TWO_PI,PI/4, 0.01);
    slider.parent("canvasFooter");


}


function draw() {
    background(51);
    angle = slider.value();
    stroke(255);
    translate(width/2, height); 
    branche(100,10);
}

function branche(taille,i){

    stroke(150,85 + i*1.75,i+=2)
    line(0,0,0,-taille);
    translate(0,-taille);
    if(taille > 2){
    push();
    rotate(angle);
    branche(0.67*taille,i+=2);
    pop();
    push() ;
    rotate(-angle);
    branche(0.67*taille, i+=2);
    pop();
    }
    
     
}
