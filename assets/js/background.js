class Background {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.vy = 1; //VELOCIDAD PARA COMENZAR. SI LA AUMENTAMOS (POR DIFICULTAD) NO MODIFICA EL JUEGO, PERO AYUDA VISUALMENTE.

    this.img = new Image();
    this.img.src = "/assets/images/space1.jpg";
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    this.ctx.drawImage(
      this.img,
      this.x,  //+ ó - this.ctx.canvas.width PERMITE EL CAMBIO HORIZONTAL.
      this.y - this.ctx.canvas.height, //PARA INVERTIR EL SENTIDO HAY QUE PONER +
      this.w,
      this.h,
    );
  }

  move() {
    this.y += this.vy; //VELOCIDAD DE MOVIMIENTO.

    if (this.y >= this.h) { //PARA QUE VAYA HACIA ABAJO //TAMBIÉN VALE (THIS.Y >= THIS.H)
      this.y = 0;
    }
  }
}
