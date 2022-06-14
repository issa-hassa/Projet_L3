f
function estBipartie(g,s){
    r = [];
    let couleurs = new Map();
    couleurs.set(s,0);
    r.push(s);
    while(r.length > 0){
        let n1 = r.shift();
        let adj = n1.noudsVoisin(g);
        console.log(adj);
        for (const n2 of adj) {
            if(couleurs.get(n2) === undefined){
                console.lo
                couleurs.set(n2,1 - couleurs.get(n1));
                r.push(n2);
            }
            else if(couleurs.get(n1) === couleurs.get(n2)){
                return false;
            }
        }

        return true;
    }

}



let ctp = createVector((this.noeud1.x + this.noeud2.x)/2,(this.noeud1.x + this.noeud2.x)/2)
            let startangle = atan2(this.noeud1.y - ctp.y,this.noeud1.x - ctp.x);
            let endangle = atan2(this.noeud2.y - ctp.y,this.noeud2.x - ctp.x);
            arc(this.noeud1.x,this.noeud2.y,10,10,startangle,endangle);