class Flock {

    constructor(){
        this.boids = []
    }

    addBoid(b){
        this.boids.push(b)
    }

    render(separationForce,alignForce,cohesionForce){
       this.boids.forEach(boid => {
            boid.run(this.boids,separationForce,alignForce,cohesionForce)
       });
    }

}