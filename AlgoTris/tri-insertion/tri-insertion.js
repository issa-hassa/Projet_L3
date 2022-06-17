let tailles = [];
let nbrBarres;
let i;
let j;
let largeur = 20;
let couleur ;
let x1;
let x2;
let b1;// barre a la postion j
let b2; // barre à la position j - 1;
let p ;
let ix1;
let ix2;
let z;
let c;
function setup(){
    c= createCanvas(400,380);
    p = true;
    c.parent("canvas");
    nbrBarres = width/largeur;
    let xoffSet = 2;
    for (let i = 0; i <= nbrBarres; i++) {
        tailles.push(new Barre((i)*largeur,random(height)));
        xoffSet++;
    }
    i = 0;
    j = i + 1;
}
function draw(){
    frameRate(2);
    e1 = false;
    e2 = false; 
    if(i <= nbrBarres ){
        background(255);
        let x;
        {x =  tailles[i].h;}
        if( (j > 0 && tailles[j-1].h > x)) tailles[j].h = tailles[j -1].h;
        else {
            tailles[j].h = x;
            i++;
            j = i;
        }
        j--;
        let l = 0;
        for (let b of tailles) {
            fill(51,100,100);
            if(l === j) fill(255,0,0);
            if(l ===i) fill(112,112,114);
            b.show();
            l++;
        }
    }
    else noLoop();
}
class Barre{
    constructor(x,h){
        this.x = x;
        this.h = h;
    }
    show(){
        rect(this.x,height - this.h,largeur,this.h);
        text(""+ floor(this.h),this.x,height - this.h);
    }
}