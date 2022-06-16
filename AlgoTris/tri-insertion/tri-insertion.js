let tailles = [];
let nbrBarres;
let i;
let j;
let largeur = 60;
let couleur ;
let x1;
let x2;
let b1;// barre a la postion j
let b2; // barre à la position j - 1;
let p ;
let ix1;
let ix2;
let z;
function setup(){
    createCanvas(400,400);
    //frameRate(5);
    p = true;

    // nbrBarres =floor(width/(largeur2));
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
    //frameRate(1);

    e1 = false;
    e2 = false; 
    if(i <= nbrBarres ){
        background(255);
        let x;
        // if(i === nbrBarres + 1)  x = tailles[j].h;
        {x =  tailles[i].h;}



        //let c = tailles[j];

        if( (j > 0 && tailles[j-1].h > x)){
           tailles[j].h = tailles[j -1].h;



        } else {
            tailles[j].h = x;

                i++;
                j = i;
        }
         j--;








        let l = 0;
        for (let b of tailles) {
            fill(255,0,255);
            if(l === j) fill(0,255,0);
            if(l ===i) fill(255,0,0);
            b.show();
            l++;

        }





    }
    else{
        noLoop();
    }

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