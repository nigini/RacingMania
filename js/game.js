let im_car_green, im_car_red, im_boom, im_heart, font;
let playerSpeed = 7;
let opponents = [];
let score = 0;
let lives = 5;
let difficulty = 3;
let player, road, parking;

function preload() {
    im_car_green = loadImage('assets/Car_Green.png');
    im_car_red = loadImage('assets/Car_Red.png');
    im_boom = loadImage('assets/boom.png');
    im_heart = loadImage('assets/heart.png');
    font = loadFont('assets/8-bit.ttf');
}

function setup() {
    // collideDebug(true);
    createCanvas(400, 800);
    let laneWidth = width/3;
    opponents.push(new Opponent());
    player = new Player();
    road = new Road(0,0,2*laneWidth, height);
    parking = new Parking(2*laneWidth, 0, laneWidth, height);
    parking.addPickupListener(processPickup);
}

function draw() {
    road.draw();
    parking.draw();

    // New opponents appear after certain number of frames and up to a certain number
    if (frameCount % 150 === 0) {
        if (opponents.length <= difficulty) {
            opponents.push(new Opponent(road.getWidth()));
        }
    }
    // New pickup appear after certain random number of frames
    //let pickup = Math.floor(Math.random()*100);
    if (frameCount % 300  === 0) {
        parking.addPickup();
    }

    // Show opponents
    for (var i = opponents.length-1 ; i >= 0 ; i--) {
        opponents[i].show();
        opponents[i].update();

        if (opponents[i].overtakenBy(player) && opponents[i].isOvertakenBy === false) {
            score += 5;
            opponents[i].isOvertakenBy = true;
        }

        // If opponents collide with the player, they get destroyed
        if (opponents[i].hits(player)) {
            opponents[i].boom();
            opponents.splice(i, 1);

            // Penalty for collision is -10, and you loose one life
            score = (score >= 10)?(score-10):0;
            lives--;
        }
        // Remove opponents once the are off the screen
        else if (opponents[i].offscreen()) {
            opponents.splice(i, 1);
        }
    }

    // Show the player
    player.show();

    // Game controls
    if (keyIsDown(LEFT_ARROW)) {
        player.turnLeft();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.turnRight();
    }
    if (keyIsDown(UP_ARROW)) {
        if (frameCount % 20 === 0) {
            playerSpeed++;
            console.log('SPEED UP: ' + playerSpeed);
        }
    }
    if (keyIsDown(DOWN_ARROW)) {
        if (frameCount % 20 === 0) {
            playerSpeed--;
            console.log('SPEED DOWN: ' + playerSpeed);
        }
    }

    // Show player stats
    textSize(40);
    textFont(font);
    textAlign(LEFT);
    fill(255);
    text('Score: ' + score, 30, 60);

    for (var i = 0 ; i < lives ; i++) {
        image(im_heart, 30 + (i*70), height-60);
    }

    // Check if game is over
    if (lives === 0) {
        noLoop();

        textSize(60);
        textFont(font);
        textStyle(BOLD);
        textAlign(CENTER);
        fill(255);
        text('GAME OVER', width/2, height/2);
    }
}

function processPickup(pickup) {
    if(pickup.type === 'heart' && lives<5) {
        lives++;
    }
}
