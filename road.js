function Road() {
    this.w = 2*width/3;
    this.h = height;
    this.roadMarkings = [];

    this.update = function() {
        //strokeWeight(3);
        fill(44, 44, 44);
        rect(0, 0, this.w, this.h);
        // New road markings appear after certain number of frames
        if (frameCount % 25 === 0) {
            this.roadMarkings.push(new RoadMarking(this.w));
        }

        // Show road markings
        for (var i = this.roadMarkings.length-1 ; i >= 0 ; i--) {
            this.roadMarkings[i].show();
            this.roadMarkings[i].update();

            // Remove road markings once the are off the screen
            if (this.roadMarkings[i].offscreen()) {
                this.roadMarkings.splice(i, 1);
            }
        }
    }

    this.getWidth = function (){
        return this.w;
    }

}

function RoadMarking(roadWidth) {
    this.w = 10;
    this.h = 30;
    this.x = floor(roadWidth/2 - this.w/2);

    if(playerSpeed > 0) {
        this.y = 0;
    } else {
        this.y = height;
    }

    this.show = function() {
        strokeWeight(3);
        fill(255, 255, 255);
        rect(this.x, this.y, this.w, this.h);
    }

    this.update = function() {
        this.y += playerSpeed;
    }

    this.offscreen = function() {
        return (this.y > height || this.y < 0);
    }
}
