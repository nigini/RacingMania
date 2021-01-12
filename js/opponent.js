class Opponent {
    constructor(posX, speed) {
        this.speed = speed;
        this.w = Math.floor(width/5);
        this.h = Math.floor(height/5.5);
        this.x = posX;
        if (this.speed < playerSpeed) {
            this.y = 0;
        } else {
            this.y = height;
        }
        this.overtakenFlag = false;
    }


    show() {
        image(im_car_green, this.x, this.y);
    }

    update() {
        if (this.speed <= playerSpeed) {
            this.y += this.speed;
        } else {
            this.y -= this.speed;
        }
    }

    offscreen() {
        return (this.y > height || this.y < 0);
    }

    wasOvertaken() {
        if (this.speed < playerSpeed) {
            return player.y > this.y;
        }
        return false;
    }

    hits(player) {
        return collideRectRect(this.x, this.y, this.w, this.h,
                                player.x, player.y, player.w, player.h);
    }

    boom() {
        image(im_boom, this.x-50, this.y);
    }
}
