class UnionFind{
    constructor(noeuds){
        this.taille = noeuds.length;
        this.parents = new Map();
        noeuds.forEach(e =>(this.parents.set(e,e)));


    }
    union(a,b){
        let rootA = this.find(a);
        let rootB = this.find(b);

        if(rootA === rootB ) return;

        if (rootA < rootB) {
         if (this.parents.get(b) != b) this.union(this.parents.get(b), a);
         this.parents.set(b,this.parent.get(a));
        } else {
         if (this.parents.get(a) != a) this.union(this.parents.get(a), b);
         this.parents.set(a,this.parents.get(b));
      }
    }
    find(a){
        let res = a;
        while(this.parents.get(res)!==res ){
            res = this.parents.get(res);
        }
        return res;
    }
    connecter(a,b){return this.find(a) == this.find(b)}
}