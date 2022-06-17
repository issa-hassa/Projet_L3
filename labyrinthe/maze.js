let cols, lig, c;
let stack ;
let grid;
let current;
let but;
let butRes;
let on;

function setup() {
    createCanvas(400, 400);
    but = createButton('Start/Stop');
    on = true;
    reset();
    but.mousePressed(start);
    butRes = createButton('reset');
    butRes.mousePressed(reset);

}
function reset(){
  background(255);
  on = false;
  stack = [];
  grid = [];
  c = 20;
  cols = floor(width/c);
  lig = floor(height/c);


  for (let j = 0; j<lig; j++) {
      for (let i = 0; i<cols; i++) {
        let c = new Cell(i, j);
        grid.push(c);
      }
  }
  current = grid[0];

}

function start(){
  on = !on;
  
}

function draw() {
    frameRate(10);
   
    if(on){
      background(51);
      for (let i = 0; i<grid.length; i++) {
        grid[i].show(c);
      } 
      current.visited = true;
      current.Current(c);
      let next = current.nextCell(grid, floor(cols), floor(lig));
      if (next != null) {
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
      }
      else if(stack.length > 0) {
          let x = current.i*c;
          let y = current.j*c;
          push();
          fill(0,150,255,100); 
          rect(x,y,c,c);
          current = stack.pop();
          pop();
       }
       function removeWalls( current,  next) {
           //gauche droite
          let gd = current.i - next.i;
          // haut bas
          let hb = current.j - next.j;
          switch(gd) {
          case -1 :
            current.mur[1] = false;
            next.mur[3] = false;
            break;
          case 1 :
            current.mur[3] = false;
            next.mur[1] = false;
            break;
          }
          switch(hb) {
          case -1 :
            current.mur[2] = false;
            next.mur[0] = false;
        
          case 1 :
            current.mur[0] = false;
            next.mur[2] = false;
          }
        } 
    }
   
    
}
