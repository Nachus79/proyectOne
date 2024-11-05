class Gun {
    constructor(ctx, x, y) {
        this.ctx = ctx;
    
        this.r = 6; 
        this.x = x;  
        this.y = y;  
    
        this.vy = -6; 
        this.ax = 0;  
        this.ay = 0;

        this.imgCrash = new Image();
        this.imgCrash.src = "/assets/images/blast.png";
    }
    
  
    draw() {
        this.ctx.fillStyle = "red"; 
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
  
    move() {
        this.y += this.vy; 
           
        if (this.y < 0) {
          this.shouldRemove = true; 
        }
      }    
  
    collides(el, player) {
        const colX = this.x + this.r >= el.x && this.x - this.r <= el.x + el.w;
        const colY = this.y + this.r >= el.y && this.y <= el.y + el.h;
  
        if (colX && colY) {
         player.increaseScore(100);
         
            return true; 
        }
  
        return false; 
    }
  
  }
  