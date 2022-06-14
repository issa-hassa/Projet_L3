class arc{
    constructor(noeud1,noeud2){
        this.noeud1 = noeud1;
        this.noeud2 = noeud2;
        this.selectACM = false;
        this.select = false;
        this.poids = undefined;
        this.possible = false;
        this.oriente = false;
        this.ret  = false;
        this._c = circular.register('arc');
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
        if(this.possible) stroke(100,200,50);
        if(this.poids != undefined){
            
            let m = (this.noeud1.vecteur.y - this.noeud2.vecteur.y)/(this.noeud1.vecteur.y + this.noeud2.vecteur.y)*2;
            let x = (this.noeud1.vecteur.x + this.noeud2.vecteur.x)/2;
            let y =(this.noeud1.vecteur.y + this.noeud2.vecteur.y)/2;// m*(x - this.noeud1.vecteur.x) + this.noeud1.vecteur.y;
            textAlign(LEFT,BOTTOM);
            text(""+this.poids,x,y);
            
        }
       
        
            line(this.noeud1.vecteur.x ,this.noeud1.vecteur.y,
            this.noeud2.vecteur.x,this.noeud2.vecteur.y);
        if(this.oriente){   
            let offset = 40;
            push();
            let angle = atan2(this.noeud1.vecteur.y - this.noeud2.vecteur.y, this.noeud1.vecteur.x - this.noeud2.vecteur.x);
            translate(this.noeud2.vecteur.x,this.noeud2.vecteur.y);
            rotate(angle - HALF_PI);
            fill(51);
            triangle(-offset*0.1, offset*0.5, offset*0.1, offset*0.5, 0, 0);
            pop();
            
        }
       
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
        if(A*A > B*B + C*C && A < 5){ 
         return true;
     }
     else if(B*B > A*A + C*C && B < 5){
         return true;
     }
     else  if(H < 5){
            return true;
     }
     else {
         return false;
     }
     }
     
    }
    
}