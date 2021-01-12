class Parking {

    constructor(xPos, yPos, width, height) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.pickups = [];
        this.pickupListeners = [];
    }

    draw() {
        fill(100, 100, 100);
        rect(this.x, this.y, this.w, this.h);
        for(let p in this.pickups) {
            this.updatePickups(this.pickups[p], p);
        }
    }

    addPickup() {
        this.pickups.push( new Pickup(this.x+(this.w/2), 0, this.w/4,this.w/4,'heart' ) );
    }

    updatePickups(pickup, index) {
        if(pickup.y > this.h || pickup.y < 0) {
            this.pickups.splice(index, 1);
        } else {
            if(pickup.picked()) {
                for(let fn of this.pickupListeners){
                    fn(pickup);
                }
                this.pickups.splice(index, 1);
            } else {
                pickup.draw();
                pickup.incrPos(playerSpeed);
            }
        }
    }

    addPickupListener(callBackFn) {
        this.pickupListeners.push(callBackFn);
    }
}

class Pickup {
    types = {
        heart: im_heart
    }

    constructor(xPos, yPos, width, height, type) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.type = (type in Object.keys(this.types)) ? type : 'heart';
    }

    incrPos(amount) {
        this.y += amount;
    }

    draw() {
        image(this.types[this.type], this.x, this.y, this.w, this.h);
    }

    picked() {
        return collideRectRect(this.x, this.y, this.w, this.h,
                                player.x, player.y, player.w, player.h);
    }
}