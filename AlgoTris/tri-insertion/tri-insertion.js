/// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
let barres = [];
let temps = [];
let nbBarre;
let largeur = 20;
let i;
let j;
let a;
let b;
function setup(){
    
    createCanvas(400,400);
    nbBarre =width/largeur;
    for (let i = 0; i < nbBarre; i++) {
        barres.push(new Barre(i*largeur,random(height)));
        temps.push(new Barre(i*largeur,random(height)));
    }
    i = 1;
    j = 1;
    b = false;
   // temp = barres[j];
    
    
}   
function draw(){
   
    background(51);
    for (const b of barres) {
        b.show();
    }
    if(i < nbBarre ){
        
        x = barres[i];
        x.offSet = x.h;
       
       
        
        if(j > 0 && barres[j-1].h > x.h ){
           b = true; 
           a =  barres[j-1].swap(temps[j]);   
           if(a){
            j --;
          
            }
        }
        
        else{
            
            if(b){

                if(x.swap(temps[j])){
                    x.offSet = 0;
                    i++;
                    j = i;
                }
           } 
           else{
                x.offSet = 0;
                
                    i++;
                    j = i;
            }
            // let index = 0;
            // for (const b of barres) {
            //     temps[index].x = b.x + 0;
            //     index ++;
            // }
           

           
            
               
            
        }

    }
    

}
class Barre{
    constructor(x,h){
        this.x = x;
        this.h = h;
        this.offSet = 0;
    }
    show(){
        if(this.offSet !== 0) fill(112,112,114);
        else{fill(255)};
        rect(this.x,height - (this.h + this.offSet),largeur,this.h);
        text(""+ floor(this.h),this.x,height - (this.h + this.offSet));
    }
    swap(b){
        let dir = createVector(this.x - b.x,0);
        dir.normalize();
        this.x -= dir.x;
        
        return dir.x === 0;
    }
    desc(){
        if(this.offSet > 0){
            this.offSet--;
        }
        return this.offSet === 0;
    }


}