class EnemyGun {
    constructor(ctx, x, y) {
        this.ctx = ctx;
    
        this.r = 6; 
        this.x = x;  
        this.y = y;  
    
        this.vy = 4; //HACIA ABAJO (PUDE MODIFICARSE CON LA DIFICULTAD).
    }
    
    draw() {
        this.ctx.fillStyle = "yellow"; 
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
    }
  
    move() {
        this.y += this.vy; 
        if (this.y > this.ctx.canvas.height) { //CUANDO SALE DE LA PANTALLA (PARTE INFERIOR) DESAPARECE.
            this.shouldRemove = true; 
        }
    }
    
    collides(el) {
        const colX = this.x + this.r >= el.x && this.x - this.r <= el.x + el.w;
        const colY = this.y + this.r >= el.y && this.y <= el.y + el.h;
  
        return colX && colY; 
    }
}
