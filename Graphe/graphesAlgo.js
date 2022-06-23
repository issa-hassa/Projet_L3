

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
let choixAlgo;
let type;
let DFSdiv;
let DFSdivP5;
let BFSdiv;
let BFSdivP5;
let ACMdiv;
let ACMdivP5;
let butFermerDFS;
let fermerDFS;
let butFermerBFS;
let fermerBFS;
let butFermerACM;
let fermerACM;
let nbclicked;
let selectValue;
let butSuppGraphe;
function setup(){

    let grapheE = localStorage.getItem("graphe");
    fermerDFS = false;
    fermerACM = false;
    fermerBFS = false;
    if(grapheE != null){
        graphe = utilitaire.jsonToGraphe(grapheE);
        if(graphe.noeuds.length !==0) nbNoeud = utilitaire.max(graphe.noeuds) + 1
        else nbNoeud = 0;  
    }
    else {graphe = new Graphe();nbNoeud = 0}
   
    c = createCanvas(windowWidth*0.5,windowHeight*0.5);
    c.parent("canvas");
    oriented = createCheckbox("",false);
    oriented.parent('p5');
    butFermerDFS = createButton('Fermer');
    butFermerBFS = createButton('Fermer');
    butFermerACM = createButton('Fermer');
    butFermerDFS.parent("buttonFermer1");
    butFermerBFS.parent("buttonFermer2");
    butFermerACM.parent("buttonFermer3");
    butFermerDFS.position(width-130,height+350);
    butFermerBFS.position(width-130,height+350);
    butFermerACM.position(width-130,height+350);
    canvasDiv = select('#p5');
    oriented.changed(changeType);
    nbclicked = 0;
    button = false;
    element = document.getElementById('text');
    DFSdiv = document.getElementById("algoDFS");
    DFSdivP5 = select("#algoDFS");
    BFSdiv = document.getElementById("algoBFS");
    BFSdivP5 = select("#algoBFS");
    ACMdiv = document.getElementById("ACM");
    ACMdivP5 = select("#ACM");
    
    DFSdivP5.position(windowWidth/2 + 20,100);
    BFSdivP5.position(windowWidth/2 + 20,100);
    ACMdivP5.position(windowWidth/2 + 20,100);
    butFermerDFS.mouseClicked(function(){fermerDFS = true; DFSdiv.style.display = 'none'; canvasDiv.position(windowWidth/2 - width/2,100); });
    butFermerBFS.mouseClicked(function(){fermerBFS = true; BFSdiv.style.display = 'none'; canvasDiv.position(windowWidth/2 - width/2,100); });
    butFermerACM.mouseClicked(function(){fermerACM = true; ACMdiv.style.display = 'none'; canvasDiv.position(windowWidth/2 - width/2,100); });
    entreePoid = createInput("poids","text");
    buttonPoid = createButton("ok");
    entreePoid.parent("poids");
    buttonPoid.parent("poids");
    executer = createButton('Executer');
    enregisterBut = createButton('Enregistrer');
    enregisterBut.parent('p5');
    executer.parent('p5');
    supprimer = createButton('Supprimer');
    supprimer.mouseClicked(function(){graphe.supprimer()});
    butSuppGraphe = createButton('supprimer le graphe');
    butSuppGraphe.parent('p5');
    butSuppGraphe.mouseClicked(function(){graphe = new Graphe(); nbNoeud = 0;localStorage.removeItem('graphe')});
    supprimer.parent('p5');
    buttonReinitialiser = createButton("Reinitialiser");
    buttonReinitialiser.parent("p5");
    offSet = 65;
    executer.position(width-offSet,height+2);
    enregisterBut.position(width-(2*offSet +20),height+2);
    supprimer.position(width-(3*offSet +35),height+2);
    buttonReinitialiser.position(width-(4*offSet +60),height+2);
    butSuppGraphe.position(width-(6*offSet +70),height+2);
    fi = new priorityQueue();
    let  i = 0;
    j = 0;
    selectMenu = createSelect();
    selectMenu.parent('p5');
    selectMenu.option("Choisir un algorithme :");
    selectValue = "Choisir un algorithme :";
    selectMenu.option('Parcours en profondeur');
    selectMenu.option('Parcours en largeur');
    selectMenu.option('Arbre couvrant');
    selectMenu.option('Bipartie?');
    selectMenu.mousePressed(showDivs);
    choixAlgo = createP();
    choixAlgo.parent('p5'); 
    type = createP("orienté ?");
    type.parent('p5');
    oriented.position(width - 20,-20);
    selectMenu.position(0,-20);
    choixAlgo.position(0,-35);
    type.position(width - 80,-35)
    enregisterBut.mousePressed(function(){utilitaire.enregistrerGraphe()});
    buttonReinitialiser.mousePressed(function(){
        utilitaire.reinitialiser(graphe);
    })
    executer.mousePressed(function(){
        init();
        switch(selectMenu.value()){
            case 'Parcours en profondeur' : res = parcoursEnProfondeur(graphe,aff);prof = new laser(res);break;
            case 'Parcours en largeur' : res = parcoursEnLargeur(graphe,graphe.noeuds[0]);prof = new laser(res,'parcoursLargeur');break;
            case 'Arbre couvrant' : res = kruskal(graphe);prof = new laser(res,'Arbre couvrant'); break;
            case  'Bipartie?' : if(estbipatie(graphe,graphe.noeuds[0])){
                                console.log(true);
                                element.innerHTML = "Le graphe est bipartie"
                                }
                                else{
                                    console.log(false);
                                element.innerHTML = "Le graphe n'est pas bipartie"
                                }
                    
                                break;
            
        }

    })



    buttonPoid.mousePressed(function() {graphe.setPoids()});
    n = 0;
    positionCercle = new vecteur(0,0);
    naff = 1;
    c.style('display','block');   
    canvasDiv.style('position','absolute');
    canvasDiv.position(windowWidth/2 - width/2,100);


}

function draw(){
    //frameRate(1);
    background(44, 45, 66);
    graphe.show();
    if(res !== undefined && res.length >0){
        if(!arbeCouvrant){
            prof.show();
            prof.update();
        }
    }
    
    if(selectMenu.value() !== "Parcours en profondeur" ){
        DFSdiv.style.display ='none';
        
    } 
    else if(!fermerDFS){
        canvasDiv.position(0 ,100);
        
         DFSdiv.style.display ='block';
    }
    if(selectMenu.value() !== "Parcours en largeur"){
        BFSdiv.style.display ='none';

    } 
    else if(!fermerBFS){
        canvasDiv.position(0 ,100);
        BFSdiv.style.display ='block';
    }
    if(selectMenu.value() !== "Arbre couvrant"){
        
        ACMdiv.style.display ='none';
    } 
    else if(!fermerACM){
        canvasDiv.position(0 ,100);
        ACMdiv.style.display ='block';
    }
    if(selectMenu.value() =="Choisir un algorithme :"){
        ACMdiv.style.display ='none';
        BFSdiv.style.display ='none';
        DFSdiv.style.display ='none';
        canvasDiv.position(windowWidth/2 - width/2,100);
    }
    // if(selectMenu.value() != selectValue){
    //     selectValue = selectMenu.value();
    // }

}
function showDivs(){
    
    //if(selectMenu.value() == selectMenu){
    //    console.log(selectMenu.value());
    //    console.log(selectValue);
        switch (selectMenu.value()){
            case 'Parcours en profondeur' : DFSdiv.style.display ='block';canvasDiv.position(0 ,100);break;
            case 'Parcours en largeur' :BFSdiv.style.display ='block';canvasDiv.position(0 ,100);break
            case 'Arbre couvrant' : ACMdiv.style.display ='block';canvasDiv.position(0 ,100);break;
        }
        
   // }
    selectValue = selectMenu.value();
    
   
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
            
            if(graphe.ajouterNoeud(new Noeud(new vecteur(mouseX,mouseY),false,nbNoeud)))nbNoeud++;
            
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
  //  DFSdiv.style('display','block');
    
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
   // element.innerHTML += aff[0].value ;
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
        }else {
            res.push(s);
        }
        
        
    }
    if(!t && (so != undefined)) res.push(so);
   


}

function parcoursEnLargeur(g,s){
    element.innerHTML = "La liste des noeuds du parcours en largeur  : ";
    
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
    //element.innerHTML += res[0].value ;
   // console.log(res[0].value);
    return res;
}




function windowResized(){
    resizeCanvas(windowWidth*0.5,windowHeight*0.5);
    executer.position(width-offSet,height+2);
    enregisterBut.position(width-(2*offSet +20),height+2);
    supprimer.position(width-(3*offSet +35),height+2);
    buttonReinitialiser.position(width-(4*offSet +60),height+2);
    butSuppGraphe.position(width-(6*offSet +70),height+2);
    canvasDiv.position(windowWidth/2 - width/2,100);
    selectMenu.position(0,-20);
    choixAlgo.position(0,-35);
    type.position(width - 80,-35)
    oriented.position(width - 20,-20);
}



//___________KRUSKAL____________//




function kruskal(g){
    let p = parcoursEnLargeur(g,g.noeuds[0]);
    p[0].changeCouleur = false; 
    element.innerHTML = "";
     
    for (const n of g.noeuds) {
        if(!n.marquer){ alert("le graphe doit etre convexe");return}
        else{
            n.marquer = false;
        }
    }

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
    for (const n of graphe.noeuds) {
        n.cBip = undefined;
    }
    parcoursEnLargeur(g,graphe.noeuds[0]);
    element.innerHTML = "";
   
    for (const n of g.noeuds) {
        if(!n.marquer){ alert("le graphe doit etre connexe");return}
        else{
            n.marquer = false;
        }
    }
    let r = [];
    s.cBip = 0;

    r.push(s);
    while(r.length !== 0){
        let n1 = r.shift();
        for (const n2 of n1.noeudsVoisin(g)) {
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