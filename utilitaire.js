var utilitaire = {

};
utilitaire.jsonToGraphe = function(g){
    let res = new Graphe();
    g = circular.parse(g);
    res.arcs = g.arcs;
    //res.noeuds = g.noeuds;
    let nodes = [];
    for(let i = 0 ; i< res.arcs.length;i++ ){
        let a  = res.arcs[i];
        let n1 = new Noeud(new vecteur(a.noeud1.vecteur.x,a.noeud1.vecteur.y) , a.noeud1.select,floor(a.noeud1.value));
        console.log(n1);
        n1.changeCouleur = a.noeud1.changeCouleur;
        n1.color = a.noeud1.color; 
        let n2 = new Noeud(new vecteur(a.noeud2.vecteur.x,a.noeud2.vecteur.y), a.noeud2.select, floor(a.noeud2.value));
        console.log(n2);
        n2.changeCouleur = a.noeud2.changeCouleur;
        n2.color = a.noeud2.color;
        let resa ;
        let cn1 =this.contientN(nodes,n1);
        let cn2 = this.contientN(nodes,n2);  
        if(cn1 === undefined){
            nodes.push(n1);
            if(cn2 === undefined){
                nodes.push(n2);
                resa = new arc(n1,n2);
            }
            else{
                resa = new arc(n1,cn2);
            }
        }
        else{
            if(cn2 === undefined){
                nodes.push(n2);
                resa = new arc(cn1,n2);
            }
            else{
                resa = new arc(cn1,cn2);
            }
        }
        
        
        resa.selectACM = a.selectACM;
        resa.oriente = a.oriente;
        resa.possible = a.possible;
        res.arcs[i] = resa;  
    }
    for (const arc of res.arcs) {
        if(this.contientN(res.noeuds,arc.noeud2) === undefined){ res.noeuds.push(arc.noeud2) }
        if(this.contientN(res.noeuds,arc.noeud1) === undefined){ res.noeuds.push(arc.noeud1) }
        
    }
    
    for (let i = 0; i < g.elementSupp.length; i++) {
        let nJSON = g.elementSupp[i];
        let n1 = new Noeud(new vecteur(nJSON.vecteur.x,nJSON.vecteur.y) , nJSON.select,floor(nJSON.value));
        res.elementSupp.push(n1);
        
    }
    res.noeuds.sort(function(a,b){return a.value - b.value});
    return res;

};
utilitaire.contientN = function(tab,val){
    for (let i = 0; i < tab.length; i++) {
        if(tab[i].value == val.value) return tab[i];
    }
    return undefined;
};
utilitaire.doublon = function(a1,a2){
    return a1.noeud1 === a2.noeud2 && a1.noeud2 === a2.noeud1;
};
utilitaire.enregistrerGraphe = function(){
    let serializedGraphe = circular.serialize(graphe);

    save('graphe.png');
    localStorage.setItem('graphe', serializedGraphe);

};

utilitaire.reinitialiser = function(g){
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
};
/**
 * 
 * @param {p5.Vector} v1 
 * @param {p5.Vector} v2 
 * @returns retourne vrai si v1 et v2 sont equax avec un facteur prés
 */
utilitaire.equaux = function(v1,v2){ return ((round(v1.x)  == round(v2.x)||round(v1.x)+1  == round(v2.x)||
                                round(v1.x)  == round(v2.x)+1) 
                                && (round(v1.y)== round(v2.y)||round(v1.y)+1== round(v2.y))||
                                round(v1.y)== round(v2.y) + 1) };

/**
 * 
 * @param {Array} tab 
 * @param {*} val 
 * @returns vrai si val est present dans tab
 */

utilitaire.contient= function(tab,val){
    for (let i = 0; i < tab.length; i++) {
        if(tab[i] === val) return true;
        }
    return false;
};
/**
 * 
 * @param {arc} a1 
 * @param {arc} a2 
 * @returns vrai si a1 et a2 sont equax sans tenir compte de leur orientation
 */
utilitaire.memeArcNonOriente = function(a1,a2){
    return (a1.noeud1 == a2.noeud1 || a1.noeud1 == a2.noeud2) &&(a1.noeud2 == a2.noeud2 || a1.noeud2 == a2.noeud1);
};
utilitaire.max = function(tab){
   return  tab.reduce(function(a,b){
            return (a.value > b.value ? a.value : b.value)
    })
}

