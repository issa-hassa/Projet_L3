class Noeud{
    

    constructor(vecteur,select,value){
        this._c = circular.register('Neoud');
        this.vecteur = vecteur;
        this.select = select;
        this.value = value;
        this.marquer = false;
        this.changeCouleur = false;
        this.vistieApartirDe = undefined;
        this.r = 204;
        this.g = 204;
        this.b = 204;
        this.cBip = undefined;
        this.aff = false;
        this.numComp = 0;
        
        
       // this.couleur = undefined;
        
    }
    /**
     * dessine un cercel representant le  noeud 
     */
    show(){
       
        fill(51);
        stroke(255);
        if(this.changeCouleur)fill(this.r,this.g,this.b);
        if(this.select) fill(0,0,255);
        if(this.cBip === 0) fill(255,0,0);
        if(this.cBip === 1) fill(0,255,0);
        circle(this.vecteur.x,this.vecteur.y,R);
        fill(255);
        textAlign(CENTER,CENTER);
        text(this.value+"",this.vecteur.x,this.vecteur.y);

    }
    /**
     * 
     * @param {Noeud} n le neoud à partir du quel ce neoud à été visité
     */
    // parent(n){
    //     this.visteApartirDe = n;
    // }
    /**
     * 
     * @param {Graphe} g 
     * @returns l'ensemble des voisins du noeud dans le graphe g
     */
    noeudsVoisin(g){
        let voisins = [];
        for (const a of g.arcs) {

            if(a.noeud1 === this  ) voisins.push(a.noeud2);
            else if(!g.oriente && a.noeud2 === this) voisins.push(a.noeud1);
        }
        return voisins;
    }
    couleur(r,g,b){
        this.changeCouleur = true;
        this.r = r;
        this.g = g;
        this.b = b;
       
    }
    clone(){
        let n = new Noeud(this.vecteur,this.select,this.value);

       
        n.marquer  = this.marquer ;
        n.changeCouleur= this.changeCouleur;
        n.vistieApartirDethis =this.vistieApartirDe;
        n.color=this.color;
        n.cBip = this.cBip;
        return n;    
    }
    
    
    
}