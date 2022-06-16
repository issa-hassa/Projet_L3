class Cell{
    
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.visited = false;
        this.mur = [true,true,true,true];
    }
    index(x,y,cols,lig){
        if(x<0 || y<0 || x> cols-1 || y>lig - 1){return -1}
        return x + y*cols;
    }
    nextCell(grid,cols,lig){
       let voisin = [];
       let top = null;
       let right = null;
       let bottom = null;
       let left = null;
        if(this.index(this.i,this.j-1,cols,lig) != - 1)    top = grid[this.index(this.i,this.j-1,cols,lig)] ;
        if(this.index(this.i+1 , (this.j),cols,lig) !=-1)    right = grid[ this.index(this.i + 1 , this.j,cols,lig)];
        if(this.index(this.i ,(this.j+1),cols,lig) !=-1)    bottom = grid[ this.index(this.i ,(this.j+1),cols,lig)];
        if(this.index(this.i-1,(this.j),cols,lig) != -1)    left = grid[ this.index(this.i-1,(this.j),cols,lig)];

          if(top != null && !top.visited){
            voisin.push(top);
          }
          if(right != null && !right.visited){
            voisin.push(right);
          }
          if(bottom != null && !bottom.visited){
            voisin.push(bottom);
          }
          if(left != null && !left.visited){
            voisin.push(left);
          }
          if(voisin.length > 0){
            let r = int(random(0,voisin.length));
            return voisin[r];
          }
          return null;


    }
    show(c){
      stroke(51);
       let x =  this.i*c;
       let y = this.j*c;
       if (this.mur[0]) {
              line(x+c, y,x, y );
        }
       if (this.mur[1]) {
        line( x+c, y,x+c, y+c);
        }
       if (this.mur[2]) {
        line( x+c, y+c,x, y+c);
        }
       if (this.mur[3]) {
        line(x, y+c,x, y );
        }
      if(this.visited){
       push();  
       noStroke();
       fill(101,101,101,100);   
       rect(x,y,c,c);
       pop();
    }
    }
     Current( c){
        let  x = this.i*c;
        let  y = this.j*c;
        push();  
        noStroke();
        fill(0,200,0,100);   
        rect(x,y,c,c);
        pop();
      }
     
    
}