class FinalEnemy {
    constructor(ctx) {
        this.ctx = ctx;
  
        this.w = 150;
        this.h = 100;
      
        this.x = 500;
        this.y = 10; // COMIENZAN EN LA PARTE SUPERIOR
  
        this.vx = 3; // VELOCIDAD HORIZONTAL. 
  
        this.img = new Image();
        this.img.src = "/assets/images/omicronian3.png";

        this.imgCrash = new Image();
        this.imgCrash.src = "/assets/images/explosion.png";

        this.bullets = [];

        this.hitPoints = 10;

        this.impacts = 0;
    }
  
    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.bullets.forEach(bullet => bullet.draw()); // HAY QUE BUSCAR UNA IMAGEN. 
    }

    changeToCrashImage() {
        this.img.src = this.imgCrash.src; //PARA CAMBIAR LA IMAGEN CUANDO ES DESTRUIDO. 
        this.w = 80; 
      }
  
    move(player) {
        //MOVIMIENTO PARA QUE SIGA AL JUGADOR (MEJOR A MENOR VELOCIDAD)
        if (this.x < player.x) {
            this.x += this.vx;
        } else if (this.x > player.x) {
            this.x -= this.vx;
        }

        //CON ESTO DISPARA ALEATORIAMENTE. 
        if (Math.random() < 0.02) { //0.02 = 2% DE PROBABILIDADES CON CADA TICK. REVISAR.
            this.fire();
        }

        
        this.bullets.forEach(bullet => bullet.move());
        //ELIMINA LAS BALAS QUE SALEN DE LA PANTALLA. 
        this.bullets = this.bullets.filter(bullet => !bullet.shouldRemove);
    }

    fire() {
        const bullet = new EnemyGun(this.ctx, this.x + this.w / 2, this.y + this.h); 
        this.bullets.push(bullet); 
    }

}
