class Player {
  constructor(ctx) {
    this.ctx = ctx;

    //GENERA LA NAVE, CON SU POSICIÓN, EN UN MODO "ORIGINAL". CADA VEZ QUE SE REINICIE EL JUEGO SE CREARÁ LA NAVE CON ESTOS PARÁMETROS.
    this.defaultX = 600; 
    this.defaultY = 480;
    this.defaultW = 60;
    this.defaultH = 120;
    this.defaultImageSrc = "/assets/images/ship.png";

    //ESTO SIRVE PARA EL MÉTODO RESTART DE MÁS ABAJO
    this.w = this.defaultW;
    this.h = this.defaultH;
    this.x = this.defaultX;
    this.y = this.defaultY;

    //VELOCIDADES Y ACELERACIONES A CERO. 
    this.vx = 0;
    this.vy = 0;

    this.ax = 0;
    this.ay = 0;

    //CREA LA IMAGEN "NORMAL" DE LA NAVE.
    this.img = new Image();
    this.img.src = this.defaultImageSrc; 

    //CAMBIA LA IMAGEN CUANDO CHOCA.
    this.imgCrash = new Image();
    this.imgCrash.src = "/assets/images/explosion.png"; 
    

    this.tick = 0;

    this.bullets = [];

    this.hitPoints = 3; //PUNTOS DE VIDA DE LA NAVE. CON CADA IMPACTO DE PROYECTIL SE QUITA 1. 

    this.score = 0;
  }

  move() {
    

    this.vy += this.ay;
    this.vx += this.ax;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) { //PARA QUE NO SE SALGA POR LA IZQUIERDA.
        this.x = 0; 
    } else if (this.x + this.w > this.ctx.canvas.width) { //PARA QUE NO SE SALGA POR LA DERECHA.
        this.x = this.ctx.canvas.width - this.w; 
    }

    if (this.y + this.h >= this.ctx.canvas.height) {
      this.vy = 0; 
      this.y = this.ctx.canvas.height - this.h; //NO DEJA PASAR A LA NAVE DE LA PARTE INFERIOR.
    } else if (this.y < 0) {
      this.vy = 0; 
      this.y = 0; //IMPIDE QUE SALGA POR LA PARTE SUPERIOR.

    }

    this.bullets.forEach(bullet => bullet.move());

    if (this.y < 0) { 
      this.shouldRemove = true;
  }
  
  }

  fire() {
    const bullet = new Gun(this.ctx, this.x + this.w / 2, this.y); 

    this.bullets.push(bullet); //AÑADE PROYECTILES AL ARRAY QUE COMIENZA VACÍO. ¿PONER CONTADOR DE BALAS?
  }

  //INCREMENTA LOS PUNTOS DEL MARCADOR.
  increaseScore(amount) {

    this.score += amount;
  }
     
  draw() {

      this.ctx.drawImage( //DIBUJA LA IMAGEN DE FORMA SIMPLONA PORQUE NECESITO UN SOLO FRAME.
          this.img,
          0,
          0,
          this.img.width,
          this.img.height,
          this.x,
          this.y,
          this.w,
          this.h
      );
  
     
      this.bullets.forEach(bullet => bullet.draw()); // REVISAR (NECESITO UNA IMAGEN )
  }

 

  //MÉTODO PARA CAMBIAR LA IMAGEN CUANDO CHOQUE. 
  changeToCrashImage() {
    this.img.src = this.imgCrash.src;
    this.w = 80; 
  }

  pause() {
    this.audio.pause();
    this.started = false;
    clearInterval(this.interval);
  }

  onKeyDown(code) {
    switch (code) { //PARA CADA MOVIMIENTO SE INCLUYEN DOS TECLAS PARA FACILITAR EL MANEJO.
      case KEY_W: 
      case KEY_UP:
        this.vy = -6; //HACIA ARRIBA.
        break;
      case KEY_S:
      case KEY_DOWN:
        this.vy = 6; //HACIA ABAJO.
        break;
      case KEY_D: 
      case KEY_RIGHT:
        this.vx = 6;
        this.img.src = "/assets/images/right.png"; //CAMBIA LA IMAGEN AL PULSAR LA TECLA.
        break;
      case KEY_A:
      case KEY_LEFT:
        this.vx = -6;
        this.img.src = "/assets/images/left.png"; //CAMBIO EN SENTIDO INVERSO.
        break;
      case MOUSEBUTTON_LEFT:
      case KEY_F: 
        this.fire();
        break;
      case KEY_SPACE:
        this.pause();
        break;
    }
  }

  onKeyUp(code) {
    switch (code) {
      case KEY_W:
      case KEY_UP:
        this.vy = 0;
          break;
      case KEY_S:
      case KEY_DOWN:
          this.vy = 0;
          break;
      case KEY_D:
      case KEY_RIGHT:
        this.vx = 0;
        this.img.src = "/assets/images/ship.png"; //LA IMAGEN VUELVE A LA POSICIÓN ORIGINAL.
        break;
      case KEY_A:
      case KEY_LEFT:
        this.vx = 0;
        this.img.src = "/assets/images/ship.png"; //LA IMAGEN VUELVE A LA POSICIÓN ORIGINAL.
        break;
      
    }
  }

  collides(el) {

    const colX = el.x <= this.x + this.w && el.x + el.w >= this.x;
    const colY = el.y <= this.y + this.h && el.y + el.h >= this.y;

    return colX && colY;
  }

  //RESETEO PARA QUE ME COLOQUE LA NAVE EN LA POSICIÓN ORIGINAL (600, 480, ...)
  reset() {
    this.w = this.defaultW;
    this.h = this.defaultH;
    this.x = this.defaultX;
    this.y = this.defaultY;

    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;

    this.img.src = this.defaultImageSrc;
    this.bullets = [];

    this.score = 0; 
  }
  
}
