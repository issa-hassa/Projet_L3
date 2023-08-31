/** This function redraws the sketch multiple times a second. */

/** This function sets up our sketch. */
let flock;
let alignSlider,sepSlider,cohSlider
let nbBoidInput
let nbBoid;
function setup() {
    let c = createCanvas(500, 500);
    c.parent('canvas')
    nbBoid = 100
    let alignDiv = createDiv("Align")
    let sepDiv = createDiv('Separate')
    let cohDiv =createDiv('Cohesion')
    let nbBoidDiv = createDiv('Nombre des boids')

    alignDiv.parent('canvasFooter')
    sepDiv.parent('canvasFooter')
    cohDiv.parent('canvasFooter')
    nbBoidDiv.parent('canvasFooter')

    //nbBoidInput = createInput('100');
    //nbBoidInput.parent(nbBoidDiv)

    alignSlider = createSlider(0,nbBoid,50,1)
    alignSlider.parent(alignDiv)

    sepSlider = createSlider(0,nbBoid,50,1)
    sepSlider.parent(sepDiv)

    cohSlider = createSlider(0,1000,10,1)
    cohSlider.parent(cohDiv)

    //separationForce,alignForce,cohesionForce
    frameRate(60)
    flock = new Flock()
    for (let i = 0; i < nbBoid; i++) {
        let b = new Boid(createVector(width / 2,height / 2));
        flock.addBoid(b);
    }
}

function draw() {
    background(0)
   // nbBoid = parseInt(nbBoidInput.value())
    flock.render(parseInt(sepSlider.value()),parseInt(alignSlider.value()),parseInt(cohSlider.value()))

    
}
