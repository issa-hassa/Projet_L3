// f
// function estBipartie(g,s){
//     r = [];
//     let couleurs = new Map();
//     couleurs.set(s,0);
//     r.push(s);
//     while(r.length > 0){
//         let n1 = r.shift();
//         let adj = n1.noudsVoisin(g);
//         console.log(adj);
//         for (const n2 of adj) {
//             if(couleurs.get(n2) === undefined){
//                 console.lo
//                 couleurs.set(n2,1 - couleurs.get(n1));
//                 r.push(n2);
//             }
//             else if(couleurs.get(n1) === couleurs.get(n2)){
//                 return false;
//             }
//         }

//         return true;
//     }

// }



// let ctp = createVector((this.noeud1.x + this.noeud2.x)/2,(this.noeud1.x + this.noeud2.x)/2)
//             let startangle = atan2(this.noeud1.y - ctp.y,this.noeud1.x - ctp.x);
//             let endangle = atan2(this.noeud2.y - ctp.y,this.noeud2.x - ctp.x);
//             arc(this.noeud1.x,this.noeud2.y,10,10,startangle,endangle);






//             /// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
// let barres = [];
// let temps = [];
// let nbBarre;
// let largeur = 20;
// let i;
// let j;
// let a;
// let b;
// let inf = [];
// function setup(){
    
//     createCanvas(400,400);
//     nbBarre =width/largeur;
//     for (let i = 0; i < nbBarre; i++) {
//         barres.push(new Barre(i*largeur,random(height)));
//         temps.push(new Barre(i*largeur,random(height)));
//     }
//     i = 1;
//     j = 1;
//     b = false;
//    // temp = barres[j];
    
    
// }   
// function draw(){
   
//     background(51);
//     for (const b of barres) {
//         b.show();
//     }
//     if(i < nbBarre ){
        
//         x = barres[i];
//         x.offSet = x.h;
       
       
        
//         if(j > 0 && barres[j-1].h > x.h ){
//            b = true; 
//            a =  barres[j-1].swap(temps[j]);   
//            if(a){
//             j --;
          
//             }
//         }
        
//         else{
            
//             if(b){

//                 if(x.swap(temps[j])){
//                     x.offSet = 0;
//                     i++;
//                     j = i;
//                 }
//            } 
//            else{
//                 x.offSet = 0;
                
//                     i++;
//                     j = i;
//             }
//             // let index = 0;
//             // for (const b of barres) {
//             //     temps[index].x = b.x + 0;
//             //     index ++;
//             // }
           

           
            
               
            
//         }

//     }
    

// }
// class Barre{
//     constructor(x,h){
//         this.x = x;
//         this.h = h;
//         this.offSet = 0;
//     }
//     show(){
//         if(this.offSet !== 0) fill(112,112,114);
//         else{fill(255)};
//         rect(this.x,height - (this.h + this.offSet),largeur,this.h);
//         text(""+ floor(this.h),this.x,height - (this.h + this.offSet));
//     }
//     swap(b){
//         let dir = createVector(this.x - b.x,0);
//         dir.normalize();
//         this.x -= dir.x;
        
//         return dir.x === 0;
//     }
//     desc(){
//         if(this.offSet > 0){
//             this.offSet--;
//         }
//         return this.offSet === 0;
//     }


// }



// /// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
// let barres = [];
// let largeur = 20;
// let n;
// let i = 0;
// let j = 0;
// let c;
// let b;
// function setup(){//Math.max(document.documentElement.clientWidth,window.innerWidth || 0),400
//   c = createCanvas(400,400);
//   n = width/largeur;
//   //c.position('0','0','fixed');
//   c.parent('canvas');
//   background(0);
//   b = createButton("recommencer");
//   b.mousePressed(init);
//   b.parent('canvas');
  


//  for (let i = 0; i <= n; i++) {
//      barres.push(random(height));
//  }
 
 

// }
// function init(){
//      for (let i = 0; i <= n; i++) {
//             barres[i] = (random(height));
//         }
//         i = 0;
//         min = i;
//         j = 1;

// }
// function draw(){
//   background(255);
//   frameRate(5);
  
//   if(i < n){
      
      
//       if(j <n){
//           if(barres[j]< barres[min]){
//              min = j;
//           }
//           if(min != i ){
//             console.log(i);
//             let tmp1 = barres[i];
//             barres[i] = barres[min];
//             barres[min] = tmp1;
//           }
//           j++;
//         }
//       else{
//         i++;
//         min = i;
//         j = i+1;
//       }
       
   
//            fill(255,255,0);
//            rect(j*largeur,height - barres[j],largeur,barres[j]);

//             fill(0,255,0);
//            rect(min*largeur,height - barres[min] ,largeur,barres[min]);
//             if(min != i ){
//             fill(255,0,0);
//             rect(min*largeur,height - barres[min] ,largeur,barres[min]);
//             }
        

//     }
//     else{
//       //  init();
       
//     }
//     for (let l = 0; l < n; l++) {
//             //fill(52,150,90);
//             noFill();
//             stroke(52,150,90);
//             if(l < i){
//                 fill(150,100,100);
                
//             }
//             rect(l*largeur,height - barres[l],largeur,barres[l]);
//         }
//   /*rect(0,height - 50,20,50);
//   rect(20,height - 50,20,50);
//   rect(40,height - 50,20,50);*/
//  }

//   function windowResized(){
//       resizeCanvas(400,400);
//   }
 

//   // /// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
// // let barres = [];
// // let temps = [];
// // let nbBarre;
// // let largeur = 20;
// // let i;
// // let j;
// // let a;
// // let b;
// // let inf = [];
// // let current;
// // let next;
// // let len ;
// // function setup(){
// //     current = undefined;
// //     next = undefined;
// //     createCanvas(400,400);
// //     nbBarre =width/largeur;
// //     for (let i = 0; i < nbBarre; i++) {
// //         barres.push(new Barre(i*largeur,random(height)));
// //         temps.push(new Barre(i*largeur,random(height)));
// //     }
// //     i = 1;
// //     j = 1;
// //     b = true;
// //     next = barres[i].x;
// //     len = 0;
// //    // temp = barres[j];
    
    
// // }   
// // function draw(){
   
// //     background(51);
// //     for (const b of barres) {
// //         b.show();
// //     }
// //     if(i < nbBarre ){
        
// //         x = barres[i];
// //         x.offSet = x.h;
// //         if(j>0 && barres[j].h > x.h){
// //             current = barres[j];
// //             if(current.swap(next)){
// //                 next = current.x + largeur;
// //                 j--;

// //             }
// //         }
// //         else{
// //             if(x.swap(barres[j].x - largeur)){
// //                 x.offSet = 0;
// //                 i++;
// //                 j = i-1;
// //             }
            
// //         }
       
// //     }
// // }
// // class Barre{
// //     constructor(x,h){
// //         this.x = x;
// //         this.h = h;
// //         this.offSet = 0;
// //     }
// //     show(){
// //         if(this.offSet !== 0) fill(112,112,114);
// //         else{fill(255)};
// //         rect(this.x,height - (this.h + this.offSet),largeur,this.h);
// //         text(""+ floor(this.h),this.x,height - (this.h + this.offSet));
// //     }
// //     swap(b){
// //         let dir = createVector(this.x - b,0);
// //         dir.normalize();
// //         this.x -= dir.x;
        
// //         return dir.x === 0;
// //     }
// //     desc(){
// //         if(this.offSet > 0){
// //             this.offSet--;
// //         }
// //         return this.offSet === 0;
// //     }


// // }
// let barres = [];
// let temps = [];
// let nbBarre;
// let largeur = 60;
// let i;
// let j;
// let a;
// let b;
// let inf = [];
// function setup(){
    
//     createCanvas(400,400);
//     nbBarre =width/largeur;
//     for (let i = 0; i < nbBarre; i++) {
//         barres.push(new Barre(i*largeur,random(height)));
//         temps.push(new Barre(i*largeur,random(height)));
//     }
//     i = 1;
//     j = 0;
//     b = false;
//    // temp = barres[j];
    
    
// }   
// function draw(){
   
//     background(51);
//     for (const b of barres) {
//         b.show();
//     }
//     if(i <= nbBarre ){
        
//         x = barres[i];
//         x.offSet = x.h;
//         if(j >= 0 && barres[j].h >= x.h ){
//            if(barres[j].swap(temps[j+1])){
//              //  console.log(i,j);
//                j --;
//             }
//         }
        
//         else{
            
           

//             if(x.swap(temps[j+1])){
//                 x.offSet = 0;
//                 i++;
//                 j = i-1;
//               //  arrayCopy(barres,temps,barres.length);
//             }
        
           
            
           

           
            
               
            
//         }

//     }
    

// }
// class Barre{
//     constructor(x,h){
//         this.x = x;
//         this.h = h;
//         this.offSet = 0;
//     }
//     show(){
//         if(this.offSet !== 0) fill(112,112,114);
//         else{fill(255)};
//         rect(this.x,height - (this.h + this.offSet),largeur,this.h);
//         text(""+ floor(this.h),this.x,height - (this.h + this.offSet));
//     }
//     swap(b){
//         let dir = createVector(this.x - b.x,0);
//         dir.normalize();
//         this.x -= dir.x;
//         console.log(dir.x === 0);
//         return dir.x === 0;
//     }
//     desc(){
//         if(this.offSet > 0){
//             this.offSet--;
//         }
//         return this.offSet === 0;
//     }


// }

   

  




// /**
//  * let barres = [];
// let temps = [];
// let nbBarre;
// let largeur = 60;
// let i;
// let j;
// let a;
// let b;
// let inf = [];
// let key;
// let current;
// function setup(){
    
//     createCanvas(400,400);
//     nbBarre =width/largeur;
//     for (let i = 0; i < nbBarre; i++) {
//         barres.push(new Barre(i*largeur,random(height)));
//         temps.push(new Barre(i*largeur,random(height)));
//     }
//     i = 1;
//     j = 0;
//     b = false;
//     key = barres[i];
//     current = barres[j + 1];
//    // temp = barres[j];
    
    
// }   
// function draw(){
   
//     background(51);
//     for (const b of barres) {
//         b.show();
//     }
     
//     if(i<barres.length){
//         barres[i].offSet = barres[i].h;
//         if( j >= 0 && barres[j].h > key.h ){
//             if(barres[j].swap(current)){
//                 current = barres[j];
//                 j--;
//             }
           
//         }
//         else{
//             if(key.swap(temps[j+1])){
//                 barres[i].offSet = 0;
//                 i++;
//                 key = barres[i];
//                 j = i-1;
               
//             }
            
//         } 
//     }
    

// }
// class Barre{
//     constructor(x,h){
//         this.x = x;
//         this.h = h;
//         this.offSet = 0;
//     }
//     show(){
//         if(this.offSet !== 0) fill(112,112,114);
//         else{fill(255)};
//         rect(this.x,height - (this.h + this.offSet),largeur,this.h);
//         text(""+ floor(this.h),this.x,height - (this.h + this.offSet));
//     }
//     swap(b){
//         let dir = createVector(this.x - b.x,0);
//         dir.normalize();
//         this.x -= dir.x;
//         console.log(dir.x === 0);
//         return dir.x === 0;
//     }
//     desc(){
//         if(this.offSet > 0){
//             this.offSet--;
//         }
//         return this.offSet === 0;
//     }


// }
//  */




/**
 * /// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />
let barres = [];
let temps = [];
let nbBarre;
let largeur = 20;
let i;
let j;
let a;
let b;
let inf = [];
let current;
let next;
let len ;
function setup(){
    current = undefined;
    next = undefined;
    createCanvas(400,400);
    nbBarre =width/largeur;
    for (let i = 0; i < nbBarre; i++) {
        barres.push(new Barre(i*largeur,random(height)));
        temps.push(new Barre(i*largeur,random(height)));
    }
    i = 1;
    j = 1;
    b = true;
    next = barres[i].x;
    len = 0;
   // temp = barres[j];
    
    
}   
function draw(){
   
    background(51);
    for (const b of barres) {
        b.show();
    }
    if(i < nbBarre ){
        
        x = barres[i];
       // x.offSet = x.h;
        if(j>0 && barres[j].h > x.h){
            barres[j+1].h = barres[j].h
            
                
            j--;

            
        }
        else{
            
            x.h = barres[j+1].h;
            x = barres[j + 1];
            i++;
            j = i-1;
            
            
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
        let dir = createVector(this.x - b,0);
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


 */
