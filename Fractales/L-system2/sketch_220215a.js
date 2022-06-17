let axiome = "X";
let phrase = axiome;
let button;
let angle;
let len = 50;
let colore = 10;
let c;
function setup() {
    //lsys(phrase, 50);
    c = createCanvas(500,500);
    c.parent("canvas");
    button = createButton("generer");
    button.parent("canvas")
    button.mousePressed(genere);
    angle = radians(25);
}
//non terminal F
//terminal + -
//axiome F
//regle : F → F+F−F−F+F


function genere(){
    let nouvelPhrase ="";
    for(let i = 0; i<phrase.length;i++){
        if(phrase.charAt(i) == "F"){
            nouvelPhrase +=regle.b;
        }
        else if( phrase.charAt(i) == "X"){
            nouvelPhrase +=regle.a;
        }
        else {
            nouvelPhrase +=phrase.charAt(i);
        }
        }
     
    phrase =  nouvelPhrase;
    
    let p = createP(phrase);
    p.parent("textL");
    lsys(phrase, len,(150,85 + colore*1.75,colore+=2));
    len *=0.55; 

}
function lsys(phrase, len,color){
    background(51);
    resetMatrix();
    translate(width/2,height);
    stroke(color);
    for(let i = 0; i< phrase.length;i++){
        
        let lettreCourant = phrase.charAt(i);
        if(lettreCourant == "F"){
            
            line(0,0,0,-len);
            translate(0,-len);
        }

        else if (lettreCourant == "+"){
           rotate(angle);
           
        }
        else if (lettreCourant == "-"){
            rotate(-angle);
            
         }
         else if (lettreCourant == "["){
            push();
         }
         else if (lettreCourant == "]"){
           pop();
            
         }


    }

}
let regle =  {
    
   a: "F+[[X]-X]-F[-FX]+X",
   b : "FF"

}
function draw(){
    
    
}