class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = 3;
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 60;
  }

  show() {
    // stroke(this.lifetime * 0.1, this.lifetime * 0.1, this.lifetime);
    // strokeWeight(2);
    noStroke();
    fill(250, 250, 255, this.lifetime * 0.5);


    rect(this.pos.x, this.pos.y, 1, 10);
    rect(this.pos.x - 5, this.pos.y + 5, 10, 1);
    ellipse(this.pos.x, this.pos.y + 5, this.r * 1);
  }
}

// - Attenzione - usare curve di bezier da live precedente per connettere i vari punti invece
// di rect()