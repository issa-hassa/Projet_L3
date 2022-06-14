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
let fi;
let enregisterBut;
let prof;
let j;
let oriented;
let offSet;

function setup(){
    let grapheE = localStorage.getItem("graphe");
     
    if(grapheE != null){
        
        graphe = utilitaire.jsonToGraphe(grapheE);
        nbNoeud = graphe.noeuds.length;
       
    }
    else {graphe = new Graphe();nbNoeud = 0}
   
    c = createCanvas(windowWidth*0.5,windowHeight*0.5);
    c.parent("canvas");
    oriented = createCheckbox("Orienté :",false);
    oriented.parent('p5');
    
    canvasDiv = select('#p5');
    
    oriented.changed(changeType);
    //oriented.style('position','relative');
    //oriented.position(width-50,height+50);
    
    
    
    button = false;
    element = document.getElementById('text');
    entreePoid = createInput("poids","text");
    buttonPoid = createButton("ok");
    entreePoid.parent("poids");
    buttonPoid.parent("poids");
    executer = createButton('Executer');
    enregisterBut = createButton('Enregistrer');
    enregisterBut.parent('p5');
    executer.parent('p5');
    supprimer = createButton('Supprimer');
    supprimer.mousePressed(function(){graphe.supprimer()});
    supprimer.parent('p5');
    buttonReinitialiser = createButton("Reinitialiser");
    buttonReinitialiser.parent("p5");
    offSet = 65;
    executer.position(width-offSet,height+2);
    enregisterBut.position(width-(2*offSet +20),height+2);
    supprimer.position(width-(3*offSet +35),height+2);
    buttonReinitialiser.position(width-(4*offSet +60),height+2);
    fi = new priorityQueue();
    let  i = 0;
    j = 0;
    // bpF = createButton("Parcours en profondeur");
    // bpL = createButton("Parcours en Largeur");
    // bAC = createButton("Arbre couvrant");
    
    selectMenu = createSelect();
    selectMenu.parent('p5');
    selectMenu.option('Parcours en profondeur');
    selectMenu.option('Parcours en largeur');
    selectMenu.option('Arbre couvrant');
    selectMenu.position(0,-20);

    enregisterBut.mousePressed(function(){utilitaire.enregistrerGraphe()});


    
    // bpF.parent('p5');
    // bpL.parent('p5');
    // bAC.parent('p5');
    

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
    buttonReinitialiser.mousePressed(function(){
        utilitaire.reinitialiser(graphe);
    })
    executer.mousePressed(function(){
        init();
        switch(selectMenu.value()){
            case 'Parcours en profondeur' : res = parcoursEnProfondeur(graphe,aff);prof = new laser(res);break;
            case 'Parcours en largeur' : res = parcoursEnLargeur(graphe,graphe.noeuds[0]);prof = new laser(res,'parcoursLargeur');break;
            case 'Arbre couvrant' : res = kruskal(graphe);prof = new laser(res,'Arbre couvrant'); 
        }

    })


    buttonPoid.mousePressed(function() {graphe.setPoids()});
    n = 0;
    positionCercle = new vecteur(0,0);
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
    //frameRate(1);
    background(51);
    graphe.show();
    if(res.length >0){
        if(!arbeCouvrant){
            prof.show();
            prof.update();
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
            graphe.ajouterNoeud(new Noeud(new vecteur(mouseX,mouseY),false,nbNoeud));
            nbNoeud++;
        }
        
        else if (nbNoeud > NBMAX){
            console.log("nombre de noeud max atteint");
        // alert("nombre de noeud max depassé");
        }


    }
}



 




// class GrapheOriente extends Graphe{
    

// }

function parcoursEnProfondeur(graphe,aff){ 
    element.innerHTML = "La liste des noeuds du parcours en profondeur  :";    
    n = 0;
    
    let res = [];
    for (const n of graphe.noeuds) {
        if(n.marquer === false){
          explorer(graphe,n,undefined,res,aff);
        }
       
    }
    positionCercle = new vecteur(res[0].vecteur.x,res[0].vecteur.y);
    
    res[0].changeCouleur = true;
    noeuPrecedent = res[0];
    element.innerHTML += aff[0].value ;
    //console.log(aff[0].value);
    
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

    res[0].changeCouleur = true;
    positionCercle = new vecteur(res[0].vecteur.x,res[0].vecteur.y);
    element.innerHTML += res[0].value ;
   // console.log(res[0].value);
    return res;
}




function windowResized(){
    resizeCanvas(windowWidth*0.5,windowHeight*0.5);
}



//___________KRUSKAL____________//




function kruskal(g){
    let U = new UnionFind(g.noeuds);
    let res = [];
    let copie = new Array(g.arcs);
    g.arcs.sort(function(a,b){return a.poids - b.poids});
    //sortedArcs.sort(function(a,b){return a.poids - b.poids});
    for (const a of g.arcs) {
        
        if(U.find(a.noeud1) != U.find(a.noeud2)){
            res.push(a);
            U.union(a.noeud1,a.noeud2);
        }
    }
   // graphe.arcs = copie;
   g.arcs.sort(function(a,b){return floor(random(-1,1))})
    return res;

}

function prims(g,s){
    let cout = new Map();
    let pred = new Map();
    
    for (const t of g.noeuds) {
        
       cout.set(t,Number.POSITIVE_INFINITY);
       pred.set(t,null);
    }
   // console.log(cout);
   // console.log(pred);
   cout.set(s,0);
    let f = new priorityQueue();
    for (const sommet of g.noeuds) {
        f.enqueue(sommet,cout.get(sommet));
    }
    let t  = f.dequeueFunction();
    while(t != null){
        
        let voisin = t.noudsVoisin(g);
        for (const u of voisin) {
           
            let tu = g.getArc(t,u);
            console.log(tu);
            if(tu !== undefined &&  f.contains(u)&& cout.get(u) >= tu.poids ){//&& f.contains(u)
                pred.set(u,t);
                cout.set(u,tu.poids);
            }
        }
        t = f.dequeueFunction();
    }
    let res = [];
    pred.forEach(function(key,value)
        {
         if(value !== null) res.push(value);
         
         if(key != null) res.push(key); 
        }
    );
    console.log(pred);
    return res;

}
function Bellman_Ford(g,s){
    if(!g.oriente){ alert("Le graphe doit étre orienté pour utiliser Bellman-Ford"); return }
    let dist = new Map();
    let pred = new Map();
    for (const u of g.noeuds) {
        dist.set(u,Number.POSITIVE_INFINITY);
    }
    dist.set(s,0);
    for(let k = 0; k < g.noeuds.length; k++){
        for(const arc of g.arcs){
            let u = arc.noeud1;
            let v = arc.noeud2;
            if(dist.get(v) > dist.get(u) + arc.poids){
                dist.set(v,dist.get(u) + arc.poids);
                pred.set(v,u);
            }

        }
    }
    return pred;

}
function kosaraju(){

}

class vecteur extends p5.Vector {
    constructor(x,y){
        super(x,y);
        this._c =  this._c = circular.register('Graphe');

    }

}



class couleur extends p5.Color{
    constructor(r,g,b){
        super(r,g,b);
        this._c = circular.register('Graphe');
    }
}

function changeType() {
    if(this.checked()){
        graphe.oriente = true;
        for (const arc of graphe.arcs) {
            arc.oriente = true;
        }
    }
    else{
        graphe.oriente = false;
        for (const arc of graphe.arcs) {
            arc.oriente = false;
            let i = 0;
            for (const acr2 of graphe.arcs) {
                if(arc.noeud1 === acr2.noeud2 && arc.noeud2 === acr2.noeud1){
                    graphe.arcs.splice(i,1);
                }
                i++;
            }
        }
    
    }
};
//red = 0
//blue = 1;
function estbipatie(g,s){
    let r = [];
    s.cBip = 0;
    r.push(s);
    while(r.length !== 0){
        let n1 = r.shift();
        for (const n2 of n1.noudsVoisin(g)) {
            if(n2.cBip === undefined){
                n2.cBip =(n1.cBip == 0)?1 : 0;
                r.push(n2);
            }
            else if(n2.cBip == n1.cBip){
                return false;
            }
        }
    }
    return true;


}