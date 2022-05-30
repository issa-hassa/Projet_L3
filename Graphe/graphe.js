/// <reference path="/Users/ahmed-korom/Desktop/TSDef/p5.global-mode.d.ts" />

let noeuds = [];
let arcs = [];
const NBMAX = 20;
let nbNoeud;
const R = 20;
let b;
let f;
let noeuCourant;//noeud courant;
let noeuPrecedent; // noeud precedent
let graphe;
let bpF; // button parcours en pronfondeur
let bpL;// button parcours en largeur
let bAC // button arbre couvrant 
let res = [];
let n;
let x;
let y;
let positionCercle;
let dir;
let supprimer; //bouton de suppression
let button;
let c;
let aff = [];
let naff;
let listAff;
let element;
let arcsACM = []; // les arcs de l'arbre couvrant
let arbeCouvrant;
let entreePoid; // l'input pour le poids
let buttonPoid; 
let buttonReinitialiser;
let canvasDiv;
let selectMenu;
let executer;
function setup(){
    c = createCanvas(windowWidth*0.5,windowHeight*0.5);
    c.parent("canvas");
    
    canvasDiv = select('#p5');
   
    
    nbNoeud =0;
    graphe = new Graphe();
    button = false;
    element = document.getElementById('text');
    entreePoid = createInput("poids","text");
    buttonPoid = createButton("ok");
    entreePoid.parent("poids");
    buttonPoid.parent("poids");
    executer = createButton('Executer');
    executer.parent('p5');
    
    // bpF = createButton("Parcours en profondeur");
    // bpL = createButton("Parcours en Largeur");
    // bAC = createButton("Arbre couvrant");
    // buttonReinitialiser = createButton("Reinitialiser");
    selectMenu = createSelect();
    selectMenu.parent('p5');
    selectMenu.option('Parcours en profondeur');
    selectMenu.option('Parcours en largeur');
    selectMenu.option('Arbre couvrant');


    // buttonReinitialiser.parent("p5");
    // bpF.parent('p5');
    // bpL.parent('p5');
    // bAC.parent('p5');
    supprimer = createButton('Supprimer');
    supprimer.mousePressed(function(){graphe.supprimer()});
    supprimer.parent('p5');

    // bpF.mousePressed(function(){
    //                     init();
    //                     res = parcoursEnProfondeur(graphe,aff)} );
    // bpL.mousePressed(function(){
    //                     init();
    //                     res = parcoursEnLargeur(graphe,graphe.noeuds[0])} );
    // bAC.mousePressed(function(){
    //                     init();
    //                     res = parcoursEnProfondeur(graphe,aff)
    //                     arbeCouvrant = true;

    //                  });
    // buttonReinitialiser.mousePressed(function(){
    //     reinitialiser(graphe);
    // })
    executer.mousePressed(function(){
        init();
        switch(selectMenu.value()){
            case 'Parcours en profondeur' : res = parcoursEnProfondeur(graphe,aff);break;
            case 'Parcours en largeur' : res = parcoursEnLargeur(graphe,graphe.noeuds[0]);break;
            case 'Arbre couvrant' : res = parcoursEnProfondeur(graphe,aff);arbeCouvrant = true;
        }

    })


    buttonPoid.mousePressed(function() {graphe.setPoids()});
    n = 0;
    positionCercle = createVector(0,0);
    naff = 1;
     //______________________Style___________________________________//
    c.style('display','block');
   
   // c.style('border-style','groove');
   // c.style('border','10px');
 
   
    canvasDiv.style('position','absolute');
    canvasDiv.position(windowWidth/2 - width/2,100);
   // c.position(windowWidth/2,0);
    //check = createCheckbox('Arbre couvrant',false);
    //_______________________________________________________________//

}

function draw(){
 // frameRate(1);
  background(51);
  graphe.show();

  
  if(n < res.length - 1 && res.length >0){
    //   circle(res[0].vecteur.x,res[0].vecteur.y,40);
     
     push();
     fill(51);
     circle(positionCercle.x,positionCercle.y,R*2); 
     pop();
      
      dir = createVector(positionCercle.x - res[n+1].vecteur.x,positionCercle.y - res[n+1].vecteur.y);
      dir.normalize();
      //if(positionCercle.x <res[n+1].vecteur.x)
       positionCercle.x -=dir.x;
     // if(positionCercle.y <res[n+1].vecteur.y)
       positionCercle.y -=dir.y;
      if(equaux(positionCercle,res[n+1].vecteur)){
        if(!res[n+1].changeCouleur ){
            arcsACM.push(new arc(res[n],res[n+1]));
            console.log(res[n+1].value);

            element.innerHTML += " "+res[n+1].value;
            

        }
        res[n + 1].changeCouleur = true;
        noeuPrecedent = res[n+1];
        n++;
             
    }
     
     
   
      
   }
   if(arbeCouvrant){
       for (const arc of graphe.arcs) {
            for (const arc1 of arcsACM) {
                if(memeArcNonOriente(arc,arc1)) {
                    arc.selectACM = true;

                }
            }  
        }
    }
   

 

 }
 /**
  * initialisation des valeurs pour les animations
  */
 function init(){
     arcsACM = [];
     arbeCouvrant = false;
     naff = 1;
     aff = [];
     n = 0;
     for (const n of graphe.noeuds) {
        n.marquer = false;
        n.changeCouleur = false;
    }
    for (const arc of graphe.arcs) {
        arc.select = false;
        
    }

 }
/**
 * 
 * @param {arc} a1 
 * @param {arc} a2 
 * @returns vrai si a1 et a2 sont equax sans tenir compte de leur orientation
 */
 function memeArcNonOriente(a1,a2){
     return (a1.noeud1 == a2.noeud1 || a1.noeud1 == a2.noeud2) &&(a1.noeud2 == a2.noeud2 || a1.noeud2 == a2.noeud1);
 }
/**
 * 
 * @param {Array} tab 
 * @param {*} val 
 * @returns vrai si val est present dans tab
 */

 function contient(tab,val){
     for (let i = 0; i < tab.length; i++) {
          if(tab[i] === val) return true;
        }
        return false;
 }
/**
 * 
 * @param {p5.Vector} v1 
 * @param {p5.Vector} v2 
 * @returns retourne vrai si v1 et v2 sont equax avec un facteur prés
 */
 function equaux(v1,v2){ return ((round(v1.x)  == round(v2.x)||round(v1.x)+1  == round(v2.x)||
                                  round(v1.x)  == round(v2.x)+1) 
                                && (round(v1.y)== round(v2.y)||round(v1.y)+1== round(v2.y))||
                                round(v1.y)== round(v2.y) + 1) }
 /**
  * 
  * @returns vrai si la souris et à l'interieur du canvas
  */
 function mouseIn(){
     return (mouseX < width && mouseX > 0 )&& (mouseY < height && mouseY > 0);
 }
 function mouseClicked(){
    if(mouseIn()){
        let nonSelect = graphe.selectNoeuds(); // on selectionne un noeud si la souris est positionnée sur un noeuds existant
    
        let nSelect =  graphe.noeuds.filter(a => a.select === true);
        let arcSelectionne; // l'arc selectionné s'il existe
        for (const arc of graphe.arcs) {
            if(arc.selectArc()){ 

                arcSelectionne = arc}
        }
        if(arcSelectionne != undefined){ arcSelectionne.select = !arcSelectionne.select;}
        else if(nSelect.length ===1 && nonSelect ) { //deselectionner en cliquant sur une partie vide
            nSelect[0].select = false;
            for (const arc of graphe.arcs) {
                arc.select = false;
            }
        } 


        else if((nbNoeud <= NBMAX ) && nonSelect && mouseIn() ){
            for (const arc of graphe.arcs) {
                arc.select = false;
            }
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
        this.vistieApartirDe = undefined;
        
    }
    /**
     * dessine un cercel representant le  noeud 
     */
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
    /**
     * 
     * @param {Noeud} n le neoud à partir du quel ce neoud à été visité
     */
    parent(n){
        this.visteApartirDe = n;
    }
    /**
     * 
     * @param {Graphe} g 
     * @returns l'ensemble des voisins du noeud dans le graphe g
     */
    noudsVoisin(g){
        let voisins = [];
        for (const a of g.arcs) {
            if(a.noeud1 === this  ) voisins.push(a.noeud2);
            else if(a.noeud2 === this) voisins.push(a.noeud1);
        }
        return voisins;
    }
    
    
    
}
class arc{
    constructor(noeud1,noeud2){
        this.noeud1 = noeud1;
        this.noeud2 = noeud2;
        this.selectACM = false;
        this.select = false;
        this.poids = undefined;
    }
    /**
     * dessine l'arc
     */
    show(){
        push();
       // console.log(this.selectionee());
        if(this.selectACM){stroke(0,255,0)}
        if(this.selectArc()){stroke(0,0,255)}
        if(this.select) stroke(255,0,0);
        if(this.poids != undefined){
            
            let m = (this.noeud1.vecteur.y - this.noeud2.vecteur.y)/(this.noeud1.vecteur.y + this.noeud2.vecteur.y)*2;
            let x = (this.noeud1.vecteur.x + this.noeud2.vecteur.x)/2;
            let y =(this.noeud1.vecteur.y + this.noeud2.vecteur.y)/2;// m*(x - this.noeud1.vecteur.x) + this.noeud1.vecteur.y;
            textAlign(LEFT,BOTTOM);
            text(""+this.poids,x,y);
            
        }
        line(this.noeud1.vecteur.x ,this.noeud1.vecteur.y,
            this.noeud2.vecteur.x,this.noeud2.vecteur.y);
        pop();
       
        
    }
    /**
     * 
     * @returns vraie si l'arc est selectionné 
     */
   selectArc(){
       /* utilistaion de la formule de Héron et celle de l'air d'un triangle pour calculer la 
          la diste entre la souris et l'arc 
       */
     let A = dist(this.noeud1.vecteur.x,this.noeud1.vecteur.y,mouseX,mouseY);
     let B = dist(this.noeud2.vecteur.x,this.noeud2.vecteur.y,mouseX,mouseY);   
     let C =  dist(this.noeud2.vecteur.x,this.noeud2.vecteur.y,this.noeud1.vecteur.x,this.noeud1.vecteur.y); 
     let s = (A+B+C)/2;
     let H = 2/C * Math.sqrt(s*(s-A)*(s-B)*(s-C)); 
     if(A < C - R && B < C - R){
        if(A*A > B*B + C*C && A < 10){ 
         return true;
     }
     else if(B*B > A*A + C*C && B < 10){
         return true;
     }
     else  if(H < 20){
            return true;
     }
     else {
         return false;
     }
     }
     
    }
    
}

class Graphe{
    constructor(){
        this.arcs =[]
        this.noeuds = [];
    }
    /**
     * dessine tous les noeuds et arcs du graphe
     */
    show(){
        for (const a of this.arcs) {
            a.show();   
        }
        for (const v of this.noeuds) {
            v.show();
            if(v.select === true && mouseIn()) line(v.vecteur.x,v.vecteur.y,mouseX,mouseY);
        }

    }
    /**
     * Ajoute un nouveau noeud dans le graphe
     * @param {Noeud} n le neoud à ajouter au graphe
     */
    ajouterNoeud(n){
        this.noeuds.push(n);
    }
    /**
     * Ajoute un arc dans le graphe
     * @param {arc} a l'arc à ajouter au graphe
     */
    ajouterArcs(a){
        this.arcs.push(a);
    }
    /**
     * 
     * @param {Noeud} s 
     * @returns les voisins du noeud dans un graphe non-orienté
     */
    voisins(s){
        let res = [];
        for (const a of graphe.arcs) {
            if(a.noeud1 == s ){
                res.push(a.noeud2);
            } 
            else  if(a.noeud2 == s ){
                res.push(a.noeud1);
            }
        }
        return res;

    }
    /**
     * Selection d'un noeud avec la souris
     * @returns si un neoud à bien été selectionné ou pas
     */
    
    selectNoeuds(){
        let res = true;
        for (const n of this.noeuds) {//on parcours tous les noeuds 
            let d = dist(n.vecteur.x,n.vecteur.y,mouseX,mouseY);// on regarde la distance entre la souris et le noeud
            if(d < R){// si cette distace est inferieure au rayon du noeud c'est qu'on l'a selectionne
                n.select = true;
                res  = false;
                for(const n1 of this.noeuds){//on regarde tous les autre noeuds
                    if(n1.select && n1 != n){// si on a un autre noeud selectionné qui est pas le noeud courant 
                        let nouveauArc = new arc(n,n1);// c'est qu'on veut creer un nouveau arc
                        if(((this.arcs.filter(a =>(a.noeud1===n1 ||a.noeud1===n)&&(a.noeud2===n1 ||a.noeud2===n)).length ===0)) && n1 != n) {
                            this.arcs.push(new arc(n,n1)); 
                        }//on regarde si l'arc est existe deja dans le graphe si non on l'ajoute
                
                        n.select = false;//on deselectionne les deux  noeuds
                        n1.select = false;
                        
                    }

                }          
            }    
        }
        return res;

    }
    /**
     * supprime tous les noeuds selectionnés du graphe
     */
    supprimer(){
        this.arcs = this.arcs.filter(a => !(a.noeud1.select || a.noeud2.select));
        this.noeuds = this.noeuds.filter(n =>!(n.select));
        this.arcs = this.arcs.filter(a => !(a.select) );
    }
    /**
     * modifie le poids de tous les noeuds selectionné du graphe à partir de la valeur de entreePoid
     */
    setPoids(){
        for (const arc of this.arcs) {
            if(arc.select && !isNaN(int(entreePoid.value()))){

                arc.poids = int(entreePoid.value());
                arc.select = false;
            }
        }
    }
}

function parcoursEnProfondeur(graphe,aff){ 
    element.innerHTML = "La liste des noeuds du parcours en profondeur  :";    
    n = 0;
    
    let res = [];
    for (const n of graphe.noeuds) {
        if(n.marquer === false){
          explorer(graphe,n,undefined,res,aff);
        }
       
    }
    positionCercle = createVector(res[0].vecteur.x,res[0].vecteur.y);
    
    res[0].changeCouleur = true;
    noeuPrecedent = res[0];
    element.innerHTML += aff[0].value ;
    console.log(aff[0].value);
    
    return res;

}

let so;
function explorer(graphe,s,so,res,aff){
    let t = false;
    s.marquer = true;
    aff.push(s);
    //s.parent(so);
    for (const a of graphe.arcs) {
        if(a.noeud1 == s && a.noeud2.marquer == false){
            t =true;
            res.push(s);
            res.push(a.noeud2);
            explorer(graphe,a.noeud2,s,res,aff);
        } 
        else  if(a.noeud2 == s && a.noeud1.marquer == false){
            t = true;
            res.push(s);
            res.push(a.noeud1);
            explorer(graphe,a.noeud1,s,res,aff);
            

        }
        
        
    }
    if(!t) res.push(so);
   


}
function parcoursEnLargeur(g,s){
    element.innerHTML = "La liste des noeuds du parcours en largeur  :";
    
    let file = [];
    let res = [];
    file.push(s);
    s.marquer = true;
    s = file.shift();
    while(s != undefined){
       
        res.push(s);
        let voisins =g.voisins(s);
        for (const t of voisins) {
           if(!t.marquer) {
               file.push(t);
               t.marquer = true;
            }
        } 
        s = file.shift();
    }
    // for (let i = 0; i < file.length; i++) {
    //    s = file.shift();
    //    res.push(s);
    //    let voisins =g.voisins(s);
    //    for (const t of voisins) {
    //        if(!t.marquer) {
    //            file.push(t);
    //            t.marquer = true;
    //         }
    //     } 

        
    // }
    res[0].changeCouleur = true;
    positionCercle = createVector(res[0].vecteur.x,res[0].vecteur.y);
    element.innerHTML += res[0].value ;
    console.log(res[0].value);
    return res;
}

function parcoursEnLargeurIteratif(){

}
let arccSup = [];

function windowResized(){
    resizeCanvas(windowWidth*0.5,windowHeight*0.5);
}

function kruskal(arcs){
   let res = [];
   let index = 0;
   while(index < arcs.length ){
       let cycle = false;
       for (const arc of arcs) {
           
       }
   }
}  

function reinitialiser(g){
    for (const arc of g.arcs) {
        arc.selectACM = false;
        arc.select = false;
        arc.poids = undefined;
    }
    for (const noeud of g.noeuds) {
        noeud.marquer = false;
        noeud.changeCouleur = false;
        noeud.visteApartirDe = undefined;
    }
}

  




