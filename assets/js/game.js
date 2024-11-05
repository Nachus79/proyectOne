class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.player = new Player(ctx);
    this.background = new Background(ctx);
    this.enemies = [new Enemy(ctx)];
    this.finalEnemyCreated = false;
    this.finalEnemy = null; 
    this.interval = null;
    this.started = false;

    this.setListeners();

    this.audio = new Audio("/assets/audio/futurama.mp3");
    this.audio.volume = 0.04;

    this.gameOverImage = new Image();
    this.gameOverImage.src = "/assets/images/desktop2b.jpg"; 

    this.victoryImage = new Image();
    this.victoryImage.src = "/assets/images/victory.png"; 

    this.pauseImage = new Image(); 
    this.pauseImage.src = "/assets/images/pause.png";

    this.paused = false; 

    
  }

  start() {
    this.audio.play();
    this.started = true;
    let tick = 0;

    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.checkCollisions();
      this.move();

      tick++;

      if (tick >= 100) {
        tick = 0;
        this.addEnemy();
      }

      if (this.player.score >= 200) {
        this.addFinalEnemy();
      }

    }, 1000 / 60);
  }

  restart() {
    this.pause(); 
    this.clear(); 
    this.player.reset(); 
    this.enemies = []; 
    this.finalEnemyCreated = false; 
    this.score = 0; 
    this.audio.currentTime = 0; 
    this.start(); 
  }


  gameOver() {
    const audio = new Audio("/assets/audio/metalButt.mp3");
    audio.play();
    audio.volume = 0.04;

    this.player.changeToCrashImage();

    this.player.score = 0; 
 
    this.pause();

    this.ctx.drawImage(this.gameOverImage, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

 
  victory() {
      const audio = new Audio("/assets/audio/muerteHumanos.mp3");
      audio.volume = 0.04;
      audio.play();
  
      this.pause(); 
      
      
      this.ctx.drawImage(this.victoryImage, 100 , 100, this.ctx.canvas.width/1.3, this.ctx.canvas.height/1.3);
  
  }
  


  addEnemy() {
    const newEnemy = new Enemy(this.ctx);
    this.enemies.push(newEnemy);
  }

  addFinalEnemy() {
    if (this.player.score >= 200 && !this.finalEnemyCreated) {
      this.finalEnemy = new FinalEnemy(this.ctx);
      this.finalEnemyCreated = true; 
    }
  }

  pause() {
    this.audio.pause();
    this.started = false;
    clearInterval(this.interval);
    this.pauseImage.src = "/assets/images/pause.png";
  }

  draw() {
    this.background.draw();
    this.enemies.forEach((e) => e.draw());
    this.player.draw();
    this.ctx.fillStyle = "white"; 
    this.ctx.font = "20px Arial"; 
    this.ctx.fillText(`Score: ${this.player.score}`, 10, 20); 
    this.ctx.fillText(`Hit Points: ${this.player.hitPoints}`, 10, 40);     

    if (this.finalEnemyCreated && this.finalEnemy) {
      this.finalEnemy.draw();
      this.ctx.fillStyle = "red"; 
      this.ctx.font = "20px Arial";
      this.ctx.fillText("Omicronian mothership", 780, 20);
      this.ctx.fillText(`Hit Points: ${this.finalEnemy.hitPoints}`, 880, 40);  

    }
  }

  move() {
    this.background.move();
    this.enemies.forEach((e) => e.move());
    this.player.move();

    if (this.finalEnemy) { 
      this.finalEnemy.move(this.player); 
    }
    
    this.player.bullets = this.player.bullets.filter(bullet => !bullet.shouldRemove);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

   checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.player.collides(enemy)) {
        this.player.changeToCrashImage();
        setTimeout(() => {
          this.gameOver(); 
        }, 100);
    }
  });

    if (this.finalEnemyCreated && this.finalEnemy) {
      this.finalEnemy.bullets.forEach((bullet) => {
        if (bullet.collides(this.player)) {
          this.player.hitPoints--; 
          this.player.impacts++;
          bullet.shouldRemove = true;
          if (this.player.hitPoints <= 0) {
            this.player.changeToCrashImage();
            setTimeout(() => {
              this.gameOver();
            }, 1000);
          }
        }
      });

      this.player.bullets.forEach((b) => {
        if (b.collides(this.finalEnemy, this.player)) {
            b.shouldRemove = true; 
            this.finalEnemy.hitPoints--;
            this.finalEnemy.impacts++; 
            if (this.finalEnemy.hitPoints <= 0) {
              this.finalEnemy.changeToCrashImage();
              this.player.increaseScore(1000);
              setTimeout(() => {
                this.victory();
              }, 50);
            }
        }
      });
    }

    this.player.bullets.forEach((b) => {
      this.enemies.forEach((enemy) => {
        if (b.collides(enemy, this.player)) {
          this.enemies = this.enemies.filter((e) => e !== enemy);
          b.shouldRemove = true;
        }
      });
    });
  }

  setListeners() {
    //PARA EL MOVIMIENTO, LA PAUSA Y EL DISPARO CON LA TECLA F.
    document.addEventListener("keydown", (event) => {
      this.player.onKeyDown(event.keyCode);
      if (event.keyCode === KEY_SPACE || event.keyCode === KEY_P) {
          this.paused = !this.paused; 
          if (this.paused) {
              this.pause();
          } else {
              this.start();
          }
      } else {
          this.player.onKeyDown(event.keyCode);
      }
  });
  //ACTIVA CAMBIOS AL DEJAR DE PULSAR LA TECLA. 
    document.addEventListener("keyup", (event) => {
      this.player.onKeyUp(event.keyCode);
    });
  //PERMITE DISPARAR CON EL BOTÓN IZQUIERDO DEL RATÓN. 
    document.addEventListener("click", () => { 
      this.player.fire();
    });
    //AL COMENZAR EL JUEGO LA NAVE COMIENZA EN EL PUNTO ORIGINAL. 
    document.getElementById("start").addEventListener('click', () => {
      this.player.defaultX = 600;  
      this.player.defaultY = 480; 
      this.player.vy = 0;       
      paused = false; 
    });

    document.getElementById("restart").addEventListener('click', () => {
      this.restart(); 
    });
  }
  
}
