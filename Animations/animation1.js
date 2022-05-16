/// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
let c;
let particles = [];
let NBpart;
let mouseOut;
function setup(){
    c = createCanvas(windowWidth, windowHeight);
    c.mouseOut(isout);
    c.mouseOver(isin);
    NBpart= (width*height)/9000;
  //NBpart = 100;
    console.log( (width/7)*(height/7));
   // c.style('display','block');
  //  c.style('z-index','-1');
  //  c.position(0,0,'fixed');
    for (let i = 0; i < NBpart*1.5; i++) {
        let size = random(5,10);
       particles.push(new Particle(random(width - size*2) ,random(height - size*2),random(-2.5,2.5),random(-2.5,2.5),size));
        
    }
   



}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
 
}
function isout(){
    mouseOut = true;

}
function isin(){
    mouseOut = false;
}
function draw(){

  // frameRate(10);
    background(51);
    //translate(width*0.7,height*0.45);
    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++)  {
        
            //let d = dist(particles[i].x,particles[i].y,particles[i].x,p.y);
           let d = Math.sqrt((particles[i].x - particles[j].x)*(particles[i].x - particles[j].x) +(particles[i].y - particles[j].y )*(particles[i].y - particles[j].y ) ) ;
            if(d < 150){
               stroke(0,0,0,255 - d*2);
                line(particles[i].x,particles[i].y,particles[j].x,particles[j].y );
            }
           

        }
        particles[i].show();
        particles[i].update();
        
        
    }

  



}
class Particle {
    
    constructor(x,y,dirX,dirY,size){
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
    }
    show(){
        circle(this.x,this.y,this.size);

    }
    update(){
        if(this.x > c.width || this.x < 0 ){
            this.dirX = -this.dirX;
        }
         if(this.y > c.height || this.y < 0 ){
            this.dirY = -this.dirY;
        }
        let d  = dist(mouseX,mouseY,this.x,this.y);
        
       

        if(!mouseOut && d < this.size + (width/80)*(height/80)){
            if(this.x > mouseX){
                this.x +=10;
            }
            if(this.x < mouseX){
                this.x -=10;
            }
            if(this.y < mouseY){
                this.y -=10;
            }
            if(this.y > mouseY){
                this.y +=10;
            }
        }
        this.x += this.dirX;
        this.y +=this.dirY;
    }
}