/** This function redraws the sketch multiple times a second. */

/** This function sets up our sketch. */
let flock;
let alignSlider,sepSlider,cohSlider
function setup() {
    let c = createCanvas(500, 500);
    c.parent('canvas')
    let alignDiv = createDiv("Align")
    let sepDiv = createDiv('Separate')
    let cohDiv =createDiv('Cohesion')

    alignDiv.parent('canvasFooter')
    sepDiv.parent('canvasFooter')
    cohDiv.parent('canvasFooter')


    alignSlider = createSlider(0,100,50,1)
    alignSlider.parent(alignDiv)
    sepSlider = createSlider(0,100,50,1)
    sepSlider.parent(sepDiv)
    cohSlider = createSlider(0,100,10,1)
    cohSlider.parent(cohDiv)
    //separationForce,alignForce,cohesionForce
    frameRate(60)
    flock = new Flock()
    for (let i = 0; i < 100; i++) {
        let b = new Boid(createVector(width / 2,height / 2));
        flock.addBoid(b);
      }
}

function draw() {
    background(51)
    flock.render(parseInt(sepSlider.value()),parseInt(alignSlider.value()),parseInt(cohSlider.value()))

    
}
