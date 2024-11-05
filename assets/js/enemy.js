class Enemy {
  constructor(ctx) {
    this.ctx = ctx;

    this.w = 50;
    this.h = 75;

    
    this.x = Math.random() * (this.ctx.canvas.width - this.w); //GENERA ENEMIGOS ALEATORIOS PERO DENTRO DEL ANCHO DEL CANVAS. 
    this.y = 0; // COMIENZAN EN LA PARTE SUPERIOR
    this.vy = 3; 

    this.img = new Image();
    this.img.src = "/assets/images/asteroid.jpg"; 
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  move() {
    this.y += this.vy;
  }
}
