class Graphe{
     
    constructor(){
        this.arcs =[];
        this.noeuds = [];
        this.pondere = false;
        this.oriente = false;
        this.intermed = [];
        this.elementSupp = [];
        this._c = circular.register('Graphe');
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
            if(v.select === true && mouseIn()){
                line(v.vecteur.x,v.vecteur.y,mouseX,mouseY);
            } 
            
        }

    }
    /**
     * Ajoute un nouveau noeud dans le graphe
     * @param {Noeud} n le neoud à ajouter au graphe
     */
    ajouterNoeud(n){
         
       if(this.elementSupp.length !== 0){
           this.elementSupp.sort(function(a,b){return b.value - a.value});
           let nS = this.elementSupp.pop();
           nS.select = false;
           nS.vecteur = n.vecteur;
            this.noeuds.push(nS);
            return false;
       }
       else{
            this.noeuds.push(n);
            return true;
       }
        
    }
    /**
     * Ajoute un arc dans le graphe
     * @param {arc} a l'arc à ajouter au graphe
     */
    ajouterArcs(a){
       
        a.oriente = this.oriente;
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
                        let nouveauArc = new arc(n1,n);// c'est qu'on veut creer un nouveau arc
                        if(((this.arcs.filter(a =>(a.noeud1===n1 ||a.noeud1===n)&&(a.noeud2===n1 ||a.noeud2===n)).length ===0)) && n1 != n) {
                            this.ajouterArcs(nouveauArc); 
                        }//on regarde si l'arc est existe deja dans le graphe si non on l'ajoute
                        else if( this.oriente ){
                            nouveauArc.ret = this.arcs.filter(a =>(a.noeud1 === n) && (a.noeud2 === n1)).length === 1;
                            console.log(nouveauArc.ret);
                            if(this.arcs.filter(a =>(a.noeud1 === n1) && (a.noeud2 === n)).length === 0 && n1 != n){
                                this.ajouterArcs(nouveauArc);
                            }
                        }
                
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
        for (const n of this.noeuds) {
            if(n.select) this.elementSupp.push(n);
        }
        this.noeuds = this.noeuds.filter(n =>!(n.select));
        this.arcs = this.arcs.filter(a => !(a.select) );
        
    }
    /**
     * modifie le poids de tous les noeuds selectionné du graphe à partir de la valeur de entreePoid
     */
    setPoids(){
        //this.pondere = true;
        for (const arc of this.arcs) {
            if(arc.select && !isNaN(int(entreePoid.value()))){

                arc.poids = int(entreePoid.value());
                arc.select = false;
            }
            if(arc.poids === undefined){ arc.poids = 0 }
        }
    }
    getArc(n1,n2){
        for (const arc of this.arcs) {
            if((arc.noeud1 == n1 || arc.noeud1 == n2) && (arc.noeud2 == n2 || arc.noeud2 == n1)&& !this.oriente){
                //console.log(arc);
                return arc;
            }
            else if(this.oriente){
                if((arc.noeud1 == n1 || arc.noeud1 == n2) && (arc.noeud2 == n2 || arc.noeud2 == n1));
            }

        }
        return undefined;
    }
    getTrans(){
        let Transgraphe = new Graphe();
        if(!this.oriente) return false;
        for (const n of this.noeuds) {
            Transgraphe.ajouterNoeud(n.clone());
        }
        for (const a of this.arcs) {
           
            let nodes = [];
            let resa ;
            let n1 = a.noeud2.clone();
            let n2 = a.noeud1.clone();
            let cn1 =utilitaire.contientN(nodes,n1);
            let cn2 = utilitaire.contientN(nodes,n2);  
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
            Transgraphe.ajouterArcs(resa); 
        }
        
        return Transgraphe;
    }

}