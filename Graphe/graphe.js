/// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />

let noeuds = [];
let arcs = [];
const NBMAX = 10;
let nbNoeud;
const R = 20;
let b;
let f;
let nc;//noeud courant;
let graphe;
let bp;
let res = [];
let n;
let x;
let y;
let positionCercle;
let dir;
let supNoeudBut //bouton pour supprimer un noeud
let button;
function setup(){
 createCanvas(windowWidth*0.5,windowHeight*0.7);
 nbNoeud =0;
 graphe = new Graphe();
 button = false;
 bp = createButton("Parcours en profondeur");
 supNoeudBut = createButton('Supprimer');
 supNoeudBut.mousePressed(function(){supprimerNoeud(graphe)});
 bp.mousePressed(function(){for (const n of graphe.noeuds) {
                          n.marquer = false;
                          n.changeCouleur = false;
                            }
                        res = parcoursEnProfondeur(graphe)} );
 n = 0;
 positionCercle = createVector(0,0);

}

function draw(){
 // frameRate(1);
  background(51);
  graphe.show();
 
  
  if(n < res.length - 1 && res.length >0){
    //   circle(res[0].vecteur.x,res[0].vecteur.y,40);
      circle(positionCercle.x,positionCercle.y,R*2); 
      dir = createVector(positionCercle.x - res[n+1].vecteur.x,positionCercle.y - res[n+1].vecteur.y);
      dir.normalize();
      //if(positionCercle.x <res[n+1].vecteur.x)
       positionCercle.x -=dir.x;
     // if(positionCercle.y <res[n+1].vecteur.y)
       positionCercle.y -=dir.y;
      if(equaux(positionCercle,res[n+1].vecteur)){
           res[n + 1].changeCouleur = true;
             n++;
             
      }
      
   }
 

 }
 function equaux(v1,v2){ return (round(v1.x)== round(v2.x) && round(v1.y)== round(v2.y)) }

 function mouseIn(){
     return (mouseX < width && mouseX > 0 )&& (mouseY < height && mouseY > 0);
 }
 function mouseClicked(){
     if(mouseIn()){
         let nonSelect = graphe.selectNoeuds(); // on selectionne un noeud si la souris est positionnée sur un noeuds existant
  
   let nSelect =  graphe.noeuds.filter(a => a.select === true);
   if(nSelect.length ===1 && nonSelect ) nSelect[0].select = false; 
    else if((nbNoeud <= NBMAX ) && nonSelect && mouseIn() ){

        graphe.ajouterNoeud(new Noeud(createVector(mouseX,mouseY),false,nbNoeud));
        nbNoeud++;
    }
    else if (nbNoeud > NBMAX){
        console.log("nombre de noeud max atteint");
       // alert("nombre de noeud max depassé");
    }

     }
    
   
    

}



 
class Noeud{
    

    constructor(vecteur,select,value){
        this.vecteur = vecteur;
        this.select = select;
        this.value = value;
        this.marquer = false;
        this.changeCouleur = false;
        
    }
    show(){
       
        fill(51);
        stroke(255);
        if(this.changeCouleur) fill(0,255,0);
        if(this.select) fill(0,0,255);
        circle(this.vecteur.x,this.vecteur.y,R);
        fill(255);
        textAlign(CENTER,CENTER);
        text(this.value+"",this.vecteur.x,this.vecteur.y);

    }
    
    
}
class arc{
    constructor(noeud1,noeud2){
        this.noeud1 = noeud1;
        this.noeud2 = noeud2;
    }
    show(){
        
        line(this.noeud1.vecteur.x ,this.noeud1.vecteur.y,
            this.noeud2.vecteur.x,this.noeud2.vecteur.y);
        
    }
    
}

class Graphe{
    constructor(){
        this.arcs =[]
        this.noeuds = [];
    }
    show(){
        for (const a of this.arcs) {
            a.show();   
        }
        for (const v of this.noeuds) {
            v.show();
            if(v.select === true && mouseIn()) line(v.vecteur.x,v.vecteur.y,mouseX,mouseY);
        }

    }
    
    ajouterNoeud(n){
        this.noeuds.push(n);
    }
    ajouterArcs(a){
        this.arcs.push(a);
    }
    selectNoeuds(){
        let res = true;
        for (const n of this.noeuds) {
            let d = dist(n.vecteur.x,n.vecteur.y,mouseX,mouseY);
            if(d < R){
                n.select = true;
                res  = false;
                for(const n1 of this.noeuds){
                    if(n1.select && n1 != n){
                        let nouveauArc = new arc(n,n1);
                        if(((this.arcs.filter(a =>(a.noeud1===n1 ||a.noeud1===n)&&(a.noeud2===n1 ||a.noeud2===n)).length ===0)) && n1 != n) {
                            this.arcs.push(new arc(n,n1)); 
                        }
                
                        n.select = false;
                        n1.select = false;
                        
                    }

                }          
            }    
        }
        return res;

    }
}

function parcoursEnProfondeur(graphe){
    let res = [];
    for (const n of graphe.noeuds) {
        if(n.marquer === false){
            explorer(graphe,n,undefined,res);
        }
    }
    positionCercle = createVector(res[0].vecteur.x,res[0].vecteur.y);
    res[n].changeCouleur = true;
    
    return res;

}
function parcoursEnLargeur(g,s){
    let file = [];
    let resultat = [];
    file.push(s);
    s.marquer = true;
    while(file.length > 0){
        let n = resultat.pop();
        resultat.push(n);
        for (const a of g.arcs) {
            if(a.noeud1 == s && a.noeud2.marquer == false){
                file.push(a.noeud2);
                a.marquer = true;
            } 
            else  if(a.noeud2 == s && a.noeud1.marquer == false){
                file.push(a.noeud1);
                a.marquer = true;
            }
        
    }
    }
    return resultat;

}
let so;
function explorer(graphe,s,so,res){
    let t = false;
    s.marquer = true;
    res.push(s);
    for (const a of graphe.arcs) {
        if(a.noeud1 == s && a.noeud2.marquer == false){
            t =true;
            explorer(graphe,a.noeud2,s,res);
        } 
        else  if(a.noeud2 == s && a.noeud1.marquer == false){
            t = true;
            explorer(graphe,a.noeud1,s,res);
            

        }
        
        
    }
    if(!t) res.push(so);
   


}

function parcoursEnLargeurIteratif(){

}

function supprimerNoeud(g){
        let index = 0;
       
     for (let i = 0; i < g.noeuds.length; i++) {
         if(g.noeuds[i].select) g.noeuds.splice(i,1);
         
     }
      for (let i = 0; i < g.arcs.length; i++) {
          if(g.arcs[i].noeud1.select || g.arcs[i].noeud2.select) g.arcs.splice(i,1);
          
      }
    }
function windowResized(){
    resizeCanvas(windowWidth*0.5,windowHeight*0.7);
}
//idee : faire le traitement avoir le resultat sous la forme d'un tableau d'arcs et faire l'animation avec ce tableau
   

  




