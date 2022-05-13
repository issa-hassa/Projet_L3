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
function setup(){
    c = createCanvas(windowWidth,windowHeight);
    
    c.style('display','block');
    c.style('z-index','-1');
    c.position(0,0,'fixed');
    bg = createGraphics(windowWidth,windowHeight);
    bg.style('display','block');
    bg.style('z-index','-2');
     bg.pixelDensity(1);
    bg.position(0,0,'fixed');
   // bg.beginDraw();
    bg.background(255);
  //  bg.endDraw();
  a1=PI/2;
  a2 = PI/2;



}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //let newbg = createGraphics(windowWidth,windowHeight);
 // newbg.image(bg,0,0);
 // bg = newbg;
    bg.background(255);
}
function draw(){

   let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
   a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
   a2_a = (num1 * (num2 + num3 + num4)) / den;
    //background(255);
    //imageMode(CENTER);
    image(bg,0 ,0);
    stroke(0);
    strokeWeight(2);
    translate(width*0.7,height*0.45);

    let x1 = r1*sin(a1);
    let y1 = r1*cos(a1);

    let x2 = x1 + r2*sin(a2);
    let y2 = y1 + r2*cos(a2);
    fill(230,230,250,255);
    stroke(230,230,250,255);
    line(0,0,x1,y1);
    ellipse(x1,y1,m1,m1);

    line(x1,y1,x2,y2);
    ellipse(x2,y2,m2,m2);
    
    

   
   // bg.translate(width*0.7,height*0.35);
    let d  = dist(0,0,x2,y2);
    map(d,r1,r1 + r2,0,255);
    bg.stroke(d*0.5,d*0.5,d,255);
    
    bg.strokeWeight(4);
    bg.point(x2 + width*0.7,y2+ height*0.45);
   
    
    a1_v +=a1_a;
    a2_v += a2_a;
    a1+=a1_v;
    a2 +=a2_v;
     if (frameCount > 1) {
        bg.line(px2, py2, x2 + width*0.7 , y2+ height*0.45);
    }
     px2 = x2 +  width*0.7;
     py2 = y2 + height*0.45;



}