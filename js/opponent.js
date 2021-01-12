function Opponent(roadWidth) {
    this.speed = floor(random(3, 7));
    this.w = 80;
    this.h = 144;
    this.x = floor(random(0, roadWidth-this.w));
    if (this.speed < playerSpeed) {
        this.y = -this.h;
    } else {
        this.y = height;
    }

    this.isOvertakenBy = false;

    this.show = function() {
        image(im_car_green, this.x, this.y);
    }

    this.update = function() {
        if (this.speed < playerSpeed) {
            this.y += this.speed;
        } else {
            this.y -= this.speed;
        }
    }

    this.offscreen = function() {
        return (this.y > height || this.y < -this.h);
    }

    this.overtakenBy = function(player) {
        if (player.y < this.y) {
            return true;
        }
    }

    this.hits = function(player) {
        if (player.y < this.y+this.h && player.y+player.h > this.y) {
            if (player.x < this.x+this.w && player.x+player.w > this.x) {
                return true;
            }
        }
    }

    this.boom = function() {
        image(im_boom, this.x-50, this.y);
    }
}
