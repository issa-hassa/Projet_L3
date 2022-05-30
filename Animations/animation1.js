/// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
const a1 = ( animation_1 ) => {
    let c;
    let particles = [];
    let NBpart;
    let mouseOut;
     animation_1.setup = () =>{
        c = animation_1.createCanvas(animation_1.windowWidth, animation_1.windowHeight);
        c.mouseOut(isout);
        c.mouseOver(isin);
        c.style('border-radius','100% 0% 0% 0%');
       // c.position(animation_1.windowWidth-400,animation_1.windowHeight - 400);
        NBpart= (animation_1.width*animation_1.height)/9000;
        //NBpart = 100;
       // console.log( (width/7)*(height/7));
        // c.style('display','block');
        //  c.style('z-index','-1');
        //  c.position(0,0,'fixed');
        for (let i = 0; i < NBpart*1.5; i++) {
            let size = animation_1.random(5,10);
            particles.push(new Particle(animation_1.random(animation_1.width - size*2) ,animation_1.random(animation_1.height - size*2),animation_1.random(-2.5,2.5),animation_1.random(-2.5,2.5),size));
            
        }
   



    }
     animation_1.windowResized =() => {
    resizeCanvas(400, 400);
    
    }
    function isout(){
        mouseOut = true;

    }
    function isin(){
        mouseOut = false;
    }
    animation_1.draw = () =>{

        //frameRate(10);
        animation_1.background(255);
        //translate(width*0.7,height*0.45);
        for (let i = 0; i < particles.length; i++) {
            for (let j = 0; j < particles.length; j++)  {
            
                //let d = dist(particles[i].x,particles[i].y,particles[i].x,p.y);
            let d = Math.sqrt((particles[i].x - particles[j].x)*(particles[i].x - particles[j].x) +(particles[i].y - particles[j].y )*(particles[i].y - particles[j].y ) ) ;
                if(d < 150){
                    animation_1.stroke(0,0,0,255 - d*2);
                    animation_1.line(particles[i].x,particles[i].y,particles[j].x,particles[j].y );
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
            animation_1.fill(51);
            animation_1.circle(this.x,this.y,this.size);

        }
        update(){
            if(this.x > c.width || this.x < 0 ){
                this.dirX = -this.dirX;
            }
            if(this.y > c.height || this.y < 0 ){
                this.dirY = -this.dirY;
            }
            let d  = animation_1.dist(animation_1.mouseX,animation_1.mouseY,this.x,this.y);
            
        

            if(!mouseOut && d < this.size + (animation_1.width/80)*(animation_1.height/80)){
                if(this.x > animation_1.mouseX){
                    this.x +=10;
                }
                if(this.x < animation_1.mouseX){
                    this.x -=10;
                }
                if(this.y < animation_1.mouseY){
                    this.y -=10;
                }
                if(this.y > animation_1.mouseY){
                    this.y +=10;
                }
            }
            this.x += this.dirX;
            this.y +=this.dirY;
        }
    }

}

let a2 = (animation_2) => {
    let r1 = 125;
    let r2 = 125;
    let m1 = 10;
    let m2 = 10;
    let c;
    let a1 = 0;
    let a2= 0;
    let a1_v = 0;
    let a2_v= 0;
    let a1_a = 0;
    let a2_a= 0;
    let g = 1;
    let bg;
    let px2 = -1;
    let py2 = -1;
     animation_2.setup =() => {
        c = animation_2.createCanvas(animation_2.windowWidth,animation_2.windowHeight);
        
        c.style('display','block');
        c.style('z-index','-1');
        c.style('position','');
      // c.position(0,0);
        c.parent('p5');
       // console.log(c);
        bg = animation_2.createGraphics(animation_2.windowWidth,animation_2.windowHeight);
        bg.parent('p5');
        bg.style('display','block');
        bg.style('z-index','-2');
        bg.pixelDensity(1);
      //  bg.position(animation_2.width/2,animation_2.height/2);
    // bg.beginDraw();
        bg.background(255);
    //  bg.endDraw();
        a1=animation_2.PI/2;
        a2 = animation_2.PI/2;
        //let s = animation_2.select('p5');
        //console.log(s);

       // s.position(animation_2.width/2,animation_2.height/2);
        



    }
     animation_2.windowResized =() => {
     animation_2.resizeCanvas(animation_2.windowWidth, animation_2.windowHeight);
    //let newbg = createGraphics(windowWidth,windowHeight);
    // newbg.image(bg,0,0);
    // bg = newbg;
        bg.background(255);
    }
    animation_2.draw =() =>{

        let num1 = -g * (2 * m1 + m2) * animation_2.sin(a1);
        let num2 = -m2 * g * animation_2.sin(a1 - 2 * a2);
        let num3 = -2 * animation_2.sin(a1 - a2) * m2;
        let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * animation_2.cos(a1 - a2);
        let den = r1 * (2 * m1 + m2 - m2 * animation_2.cos(2 * a1 - 2 * a2));
        a1_a = (num1 + num2 + num3 * num4) / den;

        num1 = 2 * animation_2.sin(a1 - a2);
        num2 = a1_v * a1_v * r1 * (m1 + m2);
        num3 = g * (m1 + m2) * animation_2.cos(a1);
        num4 = a2_v * a2_v * r2 * m2 * animation_2.cos(a1 - a2);
        den = r2 * (2 * m1 + m2 - m2 * animation_2.cos(2 * a1 - 2 * a2));
        a2_a = (num1 * (num2 + num3 + num4)) / den;
        //background(255);
        //imageMode(CENTER);
        animation_2.image(bg,0 ,0);
        animation_2.stroke(0);
        animation_2.strokeWeight(2);
        animation_2. translate(animation_2.width*0.7,animation_2.height*0.45);

        let x1 = r1*animation_2.sin(a1);
        let y1 = r1*animation_2.cos(a1);

        let x2 = x1 + r2*animation_2.sin(a2);
        let y2 = y1 + r2*animation_2.cos(a2);
        animation_2.fill(230,230,250,255);
        animation_2.stroke(230,230,250,255);
        animation_2.line(0,0,x1,y1);
        animation_2.ellipse(x1,y1,m1,m1);

        animation_2.line(x1,y1,x2,y2);
        animation_2.ellipse(x2,y2,m2,m2);
        
        

    
        //bg.translate(animation_2.width*0.7,animation_2.height*0.35);
        let d  = animation_2.dist(0,0,x2,y2);
        animation_2.map(d,r1,r1 + r2,0,51);
        bg.stroke(d,d,d,255);
        
        bg.strokeWeight(4);
        bg.point(x2 + animation_2.width*0.7,y2+ animation_2.height*0.45);//+ animation_2.width*0.7 + animation_2.height*0.45
    
        
        a1_v +=a1_a;
        a2_v += a2_a;
        a1+=a1_v;
        a2 +=a2_v;
        if (animation_2.frameCount > 1) {
            bg.line(px2, py2, x2 + animation_2.width*0.7 , y2+ animation_2.height*0.45);// + animation_2.width*0.7 + animation_2.height*0.45
        }
        px2 = x2 +  animation_2.width*0.7;
        py2 = y2 + animation_2.height*0.45;



    }
}

let r = Math.floor(Math.random() * 2);
if(r == 0){
    let animation = new p5(a2);
}
else{
    let animation = new p5(a1);
}

