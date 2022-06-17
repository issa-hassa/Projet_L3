let axiome = "A";
let phrase = axiome;
let button;
let angle;
let len = 50;
let colore = 10;
let c;


function setup() {
    //lsys(phrase, 50);

   c =  createCanvas(500,500);
   background(51);
    button = createButton("generer");
    c.parent("canvas");
    button.parent("canvas");
    

    button.mousePressed(genere);
    angle = (PI/3);
}
//non terminal F
//terminal + -
//axiome F
//regle : F → F+F−F−F+F


function genere(){
    let nouvelPhrase ="";
    for(let i = 0; i<phrase.length;i++){
        if(phrase.charAt(i) == "A"){
            nouvelPhrase +=regle.a;
        }
        else if( phrase.charAt(i) == "B"){
            nouvelPhrase +=regle.b;
        }
        else {
            nouvelPhrase +=phrase.charAt(i);
        }
        }
     
    phrase =  nouvelPhrase;
    
    let p = createP(phrase);
    p.parent("textL");
    lsys(phrase, len);
     len*=0.6;   

}
function lsys(phrase, len){
    background(51);
    resetMatrix();
    translate(width,height);
    stroke(255);
    rotate(-PI/2);
    for(let i = 0; i< phrase.length;i++){
        
        let lettreCourant = phrase.charAt(i);
        if(lettreCourant === "A" || lettreCourant === "B" ){
            
            line(0,0,0,-len);
            translate(0,-len);
        }

        else if (lettreCourant == "+"){
           rotate(angle);
           
        }
        else if (lettreCourant == "-"){
            rotate(-angle);
            
         }
         
            
         


    }

}
//rules  : (A → B−A−B), (B → A+B+A)
let regle =  {
    
   a: " B-A-B",
   b : "A+B+A"

}
function draw(){
    
    
}