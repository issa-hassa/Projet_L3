class Boid {
    constructor(position){
        this.position = position
        this.acceleration = createVector(0,0)
        this.velocity = createVector(random(-1,1),random(-1,1))
        this.maxspeed = 3; 
        this.maxforce = 0.05;

    }

    run(boids,separationForce,alignForce,cohesionForce) {

        this.applyAlgo(boids,separationForce,alignForce,cohesionForce);
        this.update();
        this.borders();
        this.render();

    }


    applyAlgo(boids,separationForce,alignForce,cohesionForce) {
        let sep = this.separate(boids,separationForce);   // Separation
        let ali = this.align(boids,alignForce);      // Alignment
        let coh = this.cohesion(boids,cohesionForce);   // Cohesion
        // Arbitrarily weight these forces
        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(1.0);
        // Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
    }

    render(){
        this.drawArrow(color(255,255,255))
    }

    applyForce(force){
        this.acceleration.add(force)
    }

    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity)
        this.acceleration.mult(0);
    }

    seek(target){

        let desired = p5.Vector.sub(target,this.position);  // un vecteur qui pointe vers la cible
        // normaliser le vecteur et le mettre à l'echelle
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired moins Velocity
        let steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxforce);  // limiter stee à maxForce
        return steer;
    }

    separate(boids,desiredseparation){

       
        let steer = createVector(0, 0);
        let count = 0;
        
        for (let i = 0; i < boids.length; i++) {
          let d = p5.Vector.dist(this.position,boids[i].position);

          if ((d > 0) && (d < desiredseparation)) {
            // Calculate vector pointing away from neighbor
            let diff = p5.Vector.sub(this.position, boids[i].position);
            diff.normalize();
            diff.div(d);        // Weight by distance
            steer.add(diff);
            count++;            // Keep track of how many
          }
        }
        // Average -- divide by how many
        if (count > 0) {
          steer.div(count);
        }
      
        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
          // Implement Reynolds: Steering = Desired - Velocity
          steer.normalize();
          steer.mult(this.maxspeed);
          steer.sub(this.velocity);
          steer.limit(this.maxforce);
        }
        return steer;

    }


    align(boids,neighbordist) {


        let sum = createVector(0,0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
          let d = p5.Vector.dist(this.position,boids[i].position);
          if ((d > 0) && (d < neighbordist)) {
            sum.add(boids[i].velocity);
            count++;
          }
        }
        if (count > 0) {
          sum.div(count);
          sum.normalize();
          sum.mult(this.maxspeed);
          let steer = p5.Vector.sub(sum, this.velocity);
          steer.limit(this.maxforce);
          return steer;
        } else {
          return createVector(0, 0);
        }

    }

    cohesion(boids,neighbordist) {

        let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position,boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
            sum.add(boids[i].position); // Add location
            count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum);  // Steer towards the location
        } else {
            return createVector(0, 0);
        }

    }
    borders(){

        if (this.position.x < -10)  this.position.x = width + 10;
        if (this.position.y < -10)  this.position.y = height +10
        if (this.position.x > width +10) this.position.x = -10
        if (this.position.y > height + 10) this.position.y = -10
    }
   

    drawArrow(myColor) {
        push();
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        let arrowSize = 5;
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }
}
