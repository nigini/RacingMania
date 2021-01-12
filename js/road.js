class Road {
    constructor(xPos, yPos, roadWidth, roadHeight) {
        this.x = xPos;
        this.y = yPos;
        this.w = roadWidth;
        this.h = roadHeight;
        this.roadMarkings = [];
    }

    draw() {
        strokeWeight(3);
        fill(44, 44, 44);
        rect(0, 0, this.w, this.h);
        // New road markings appear after certain number of frames
        if (frameCount % 25 === 0) { //TODO: Fix to account for car speed variation!
            this.roadMarkings.push(new RoadMarking(this.w));
        }

        // Show road markings
        for (var i = this.roadMarkings.length-1 ; i >= 0 ; i--) {
            this.roadMarkings[i].update();

            // Remove road markings once the are off the screen
            if (this.roadMarkings[i].offscreen()) {
                this.roadMarkings.splice(i, 1);
            }
        }
    }

    getWidth() {
        return this.w;
    }

}

class RoadMarking {
    constructor(roadWidth, roadHeight) {
        this.roadH = roadHeight;
        this.w = Math.floor(roadWidth/12);
        this.h = 4*this.w;
        this.x = Math.floor(roadWidth/2 - this.w/2);
        if(playerSpeed > 0) {
            this.y = 0;
        } else {
            this.y = this.roadH;
        }
    }

    update() {
        fill(255, 255, 255);
        rect(this.x, this.y, this.w, this.h);
        this.y += playerSpeed;
    }

    offscreen() {
        return (this.y > this.roadH || this.y < 0);
    }
}
