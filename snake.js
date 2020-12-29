//Variables
cells = 30;
cellSize = 20;
//Food position
foodX = 20;
foodY = 20;
//Gamer(snake) position
playerX = 15;
playerY = 15;
//Gamer: snake
//direction of movement
moveX = 0;
moveY = 0;
//Following the route {x:?, y:?}
trail = [];
//tail
tail = 3;

scoreBlock = document.querySelector('h2 span');

document.addEventListener("DOMContentLoaded", function (event) {

	game = document.querySelector('#snake');
	ctx = game.getContext('2d');

	start();

});

function start() {
	//Gamer(snake) position
	playerX = 15;
	playerY = 15;
	//direction of movement
	moveX = 0;
	moveY = 0;
	scoreBlock.innerText = 0;

	let bg = new Image();
	bg.src = 'img/start.png';
	bg.onload = function () {
		ctx.drawImage(bg, 0, 0);
		ctx.fillStyle = 'black';
		ctx.font = '50px monospace';
		ctx.textAlign = 'center';
		ctx.fillText('Start', 300, 500);
	}
	game.onclick = function () {
		gameTimer = setInterval(startGame, 100);
		document.addEventListener('keydown', move);
		game.onclick = null;
	}
}

// 1.Drawing the game: snake, food
// 2.Checking if the snake has eaten food
// 3.Snake movement
// 4.Checking if a collision has occurred
function startGame() {
	playerX += moveX;
	playerY += moveY;

	if (playerX < 0 || playerY < 0 || playerX > cells || playerY > cells) {
		endGame();
	}

	//playing field background
	ctx.fillStyle = '#422857';
	ctx.fillRect(0, 0, game.width, game.height);

	//food background
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(foodX * cellSize, foodY * cellSize, cellSize, cellSize);

	//snake background
	ctx.fillStyle = '#fe3c70';
	for (let i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * cellSize, trail[i].y * cellSize, cellSize, cellSize);
		if (playerX == trail[i].x || playerY == trail[i].y) {
			tail = 3;
			scoreBlock.innerText = 0;
		}
	}
	trail.push({ x: playerX, y: playerY });

	if (playerX == foodX && playerY == foodY) {
		tail++;
		scoreBlock.innerText = +scoreBlock.innerText + 10;
		foodX = Math.floor(Math.random() * cells);
		foodY = Math.floor(Math.random() * cells);
	}

	while (trail.length > tail) {
		trail.shift();
	}
}

function move(e) {
	switch (e.keyCode) {
		//arrow left
		case 37:
			moveX = -1;
			moveY = 0;
			break;
		//arrow up
		case 38:
			moveX = 0;
			moveY = -1;
			break;
		//arrow right
		case 39:
			moveX = +1;
			moveY = 0;
			break;
		//arrow down
		case 40:
			moveX = 0;
			moveY = +1;
			break;
	}
}

function endGame() {
	clearInterval(gameTimer);
	setTimeout(function () {
		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, game.width, game.height);
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '50px monospace';
		ctx.fillText('End Game', 300, 300);
	});
	game.onclick = start;
}