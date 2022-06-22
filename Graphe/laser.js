class laser
{
    constructor(cibles,algo){
        this.n = 0;
        this.cibles = cibles;
        this.cible = cibles[n];
        if(algo != 'Arbre couvrant') this.position = createVector(this.cible.vecteur.x,this.cible.vecteur.y);
        this.R = 40;
        this.algo = algo;
        this.i = 0;
        for (const no of cibles) {
            no.aff = false;
        }
    }
    show(){
        if(this.algo != 'Arbre couvrant' && this.n < this.cibles.length){
            push();
            fill(51);
            circle(this.position.x,this.position.y,this.R); 
            pop();
        } 
        
    }
    update(){
        if(this.algo === "parcoursLargeur"){
            
            if(this.n < this.cibles.length){
                this.cible.couleur(102,204,0);
                for(const noeud of this.cible.noeudsVoisin(graphe)){
                   if(noeud.changeCouleur === false) noeud.couleur(0,204,204);
                }
                this.R -= 0.5;
                if(this.R <=0){
                    this.R = 40;
                    element.innerHTML +=" "+this.cible.value;
                    this.n++;
                    this.cible = this.cibles[this.n];
                   if(this.n < this.cibles.length)  this.position = createVector(this.cible.vecteur.x,this.cible.vecteur.y);
                }
            }
        }
        else if(this.algo === "Arbre couvrant"){
            if(this.n < res.length){
                frameRate(2);
                if(this.i < graphe.arcs.length && this.i >=0 ){
               
                    if(graphe.arcs[this.i].selectACM === false){
                        graphe.arcs[this.i].select  = true;
                    }
                    this.i++;
                }
                else{
                    for (const a of graphe.arcs) {
                        a.select = false;
                    }
                
                    res[this.n].selectACM = true;
                    this.n++;
                    this.i = 0;
                }
        
            }
            else{
                frameRate(60);
            }
        }
        else{
            if(this.n < this.cibles.length){
            
            dir = createVector(this.position.x - this.cibles[this.n].vecteur.x,this.position.y - this.cibles[this.n].vecteur.y);
            dir.normalize();
            this.position.x -=dir.x;
            this.position.y -=dir.y;
            if(this.equaux(this.position,this.cibles[this.n].vecteur)){
                
                this.cible.changeCouleur = true;
                if(!this.cible.aff ) element.innerHTML += " "+this.cible.value;this.cible.aff = true;
                this.n++;
                this.cible = this.cibles[this.n];
                
            }
        }

        }
        
       
    }
    equaux(v1,v2){ 
        return ((round(v1.x)  == round(v2.x)||round(v1.x)+1  == round(v2.x)||
                                  round(v1.x)  == round(v2.x)+1) 
                                && (round(v1.y)== round(v2.y)||round(v1.y)+1== round(v2.y))||
                                round(v1.y)== round(v2.y) + 1) 
    }
}