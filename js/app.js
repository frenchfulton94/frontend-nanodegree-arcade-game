// Enemies our player must avoid
var Enemy = function (y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -104;
    this.y = y;
    this.speed = this.getSpeed();
    this.currentSpeed = this.speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var xHit = this.x + 98;
    var xHit2 = this.x + 2;
    var yHit = this.y + 115;
    var yHit2 = this.y + 140;
    var xPlayer1 = player.x + 19;
    var xPlayer2 = player.x + 80;
    var yPlayer1 = player.y + 94;
    var yPlayer2 = player.y + 140;

    if (this.x > 606) {
        this.x = -102;
        this.speed = this.getSpeed();
    }
    if (xHit >= xPlayer1 && xHit2 <= xPlayer2 && yHit > yPlayer1 && yHit < yPlayer2)
        player.resetPlayer(true);
};

Enemy.prototype.getSpeed = function () {
    return Math.floor((Math.random() * 400) + 250);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (character = 'images/char-boy.png') {
    this.sprite = character;
    this.score = 0;
    this.highsScore = 0;
    this.resetPlayer(false);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            if ((this.x - 101) >= 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if ((this.y - 80) >= -15)
                this.y -= 80;
            break;
        case 'right':
            if ((this.x + 101) <= 404) {
                this.x += 101;
            }
            break;
        case 'down':
            if ((this.y + 80) < 465) {
                this.y += 80;
            }
            break;
        default:
            console.log("There's an error!");
            break;
    }
};

Player.prototype.update = function () {
    if (isRunning) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '24px sans-serif';
        ctx.fillText('Score: ' + this.score, 1, 40);
        ctx.fillStyle = 'blue';
        ctx.fillText('High Score: ' + this.highsScore, 355, 40);
    }
};

Player.prototype.render = function () {
    if (this.y == -15)
        this.win();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.win = function () {
    this.score++;
    this.resetPlayer(false);

    if (this.score - 1 == this.highsScore) {
        this.highsScore = this.score;
    }
};

Player.prototype.resetPlayer = function (lose) {
    this.x = 202;
    this.y = 385;
    if (lose)
        this.score = 0;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(50), new Enemy(130), new Enemy(210)];
var characters = ['images/char-boy.png',
    'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
var player = new Player();
var isRunning = true; // pause state of game

// pause all actions of the game
function pause() {
    allEnemies.forEach(function (item) {
        console.log("speed " + item.speed);
        item.speed = 0;
    });
    ctx.fillStyle = 'orange';
    ctx.font = '24px sans-serif';
    ctx.fillText('Paused', 210, 40);
    isRunning = false;
}

// resume game as usual
function resume() {
    allEnemies.forEach(function (item) {
        console.log("current " + item.currentSpeed);
        item.speed = item.currentSpeed;
    });
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    isRunning = true;
}


// This listens for key presses and sends the keys to your
// Player.handleInput() meth  od. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        27: 'esc',
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (isRunning) {
        if (e.keyCode <= 40 && e.keyCode >= 37)
            player.handleInput(allowedKeys[e.keyCode]);

        if (allowedKeys[e.keyCode] == 'space')
            pause();

    } else {
        if (allowedKeys[e.keyCode] == 'space')
            resume();
    }
});
