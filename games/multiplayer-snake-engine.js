const // internal constants
	up = 1
	down = 2
	left = 3
	right = 4

var
	canvas = document.getElementById("Snake")
	ctx = canvas.getContext("2d")

	playerDirectionTemp = 5

	player1 = {
		inGame : false,
		startX : -unit,
		startY : 0,
		x : -unit,
		y : 0,
		direction : right,
		startDirection : right,
		length : initialPlayerLength,
		score : 0,
		bodyX : [NaN],
		bodyY : [NaN],
		color : "#00c",
		lineColor : "#22f",
		keyPressed : false,
	}

	player2 = {
		inGame : false,
		startX : canvas.width,
		startY : 0,
		x : canvas.width,
		y : 0,
		direction : left,
		startDirection : left,
		length : initialPlayerLength,
		score : 0,
		bodyX : [NaN],
		bodyY : [NaN],
		color : "#c00",
		lineColor : "#f22",
		keyPressed : false,
	}

	player3 = {
		inGame : false,
		startX : -unit,
		startY : canvas.height - unit,
		x : -unit,
		y : canvas.height - unit,
		direction : right,
		startDirection : right,
		length : initialPlayerLength,
		score : 0,
		bodyX : [NaN],
		bodyY : [NaN],
		color : "#0c0",
		lineColor : "#2f2",
		keyPressed : false,
	}

	player4 = {
		inGame : false,
		startX : canvas.width,
		startY : canvas.height - unit,
		x : canvas.width,
		y : canvas.height - unit,
		direction : left,
		startDirection : left,
		length : initialPlayerLength,
		score : 0,
		bodyX : [NaN],
		bodyY : [NaN],
		color : "#dd0",
		lineColor : "#ff2",
		keyPressed : false,
	}

	foodX = ((Math.floor(Math.random() * (canvas.width/unit))) * unit) + unit / 2
	foodY = ((Math.floor(Math.random() * (canvas.height/unit))) * unit) + unit / 2
	isPaused = false

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	alert('Are you on mobile? This game was created for PC users only, sorry!')
}

//INPUT
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
	if (player1.inGame) {// && !player1.keyPressed
		if (e.key == "w" || e.key == "W") {
			playerDirectionTemp = up;
		}
		if (e.key == "s" || e.key == "S") {
			playerDirectionTemp = down;
		}
		if (e.key == "a" || e.key == "A") {
			playerDirectionTemp = left;
		}
		if (e.key == "d" || e.key == "D") {
			playerDirectionTemp = right;
		}
		if ((playerDirectionTemp == up && player1.direction !== down) || (playerDirectionTemp == down && player1.direction !== up) || (playerDirectionTemp == left && player1.direction !== right) || (playerDirectionTemp == right && player1.direction !== left)) {
			player1.direction = playerDirectionTemp;
		}
//		player1.keyPressed = true;
	}
	playerDirectionTemp = 5;
	if (player2.inGame) {// && !player2.keyPressed
		if (e.key == "t" || e.key == "T") {
			playerDirectionTemp = up;
		}
		if (e.key == "g" || e.key == "G") {
			playerDirectionTemp = down;
		}
		if (e.key == "f" || e.key == "F") {
			playerDirectionTemp = left;
		}
		if (e.key == "h" || e.key == "H") {
			playerDirectionTemp = right;
		}
		if ((playerDirectionTemp == up && player2.direction !== down) || (playerDirectionTemp == down && player2.direction !== up) || (playerDirectionTemp == left && player2.direction !== right) || (playerDirectionTemp == right && player2.direction !== left)) {
			player2.direction = playerDirectionTemp;
		}
//		player2.keyPressed = true;
	}
	playerDirectionTemp = 5;
	if (player3.inGame) {// && !player3.keyPressed
		if (e.key == "i" || e.key == "I") {
			playerDirectionTemp = up;
		}
		if (e.key == "k" || e.key == "K") {
			playerDirectionTemp = down;
		}
		if (e.key == "j" || e.key == "J") {
			playerDirectionTemp = left;
		}
		if (e.key == "l" || e.key == "L") {
			playerDirectionTemp = right;
		}
		if ((playerDirectionTemp == up && player3.direction !== down) || (playerDirectionTemp == down && player3.direction !== up) || (playerDirectionTemp == left && player3.direction !== right) || (playerDirectionTemp == right && player3.direction !== left)) {
			player3.direction = playerDirectionTemp;
		}
//		player3.keyPressed = true;
	}
	playerDirectionTemp = 5;
	if (player4.inGame) {// && !player4.keyPressed
		if (e.key == "Up" || e.key == "ArrowUp") {
			playerDirectionTemp = up;
		}
		if (e.key == "Down" || e.key == "ArrowDown") {
			playerDirectionTemp = down;
		}
		if (e.key == "Left" || e.key == "ArrowLeft") {
			playerDirectionTemp = left;
		}
		if (e.key == "Right" || e.key == "ArrowRight") {
			playerDirectionTemp = right;
		}
		if ((playerDirectionTemp == up && player4.direction !== down) || (playerDirectionTemp == down && player4.direction !== up) || (playerDirectionTemp == left && player4.direction !== right) || (playerDirectionTemp == right && player4.direction !== left)) {
			player4.direction = playerDirectionTemp;
		}
//		player4.keyPressed = true;
	}
	playerDirectionTemp = 5;
	if (e.key == "1") {
		player1.inGame = !player1.inGame;
		gameOver(player1);
	}
	if (e.key == "2") {
		player2.inGame = !player2.inGame;
		gameOver(player2);
	}
	if (e.key == "3") {
		player3.inGame = !player3.inGame;
		gameOver(player3);
	}
	if (e.key == "4") {
		player4.inGame = !player4.inGame;
		gameOver(player4);
	}
	if (e.key == " " || e.key == "Enter") {
		isPaused = !isPaused;
	}
}


//GAME ENGINE
function drawGrid() {
	for (let i = 0; i <= canvas.width / unit; i++) {
		ctx.beginPath();
		ctx.moveTo(i * unit, 0);
		ctx.lineTo(i * unit, canvas.height);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "lightgray";
		ctx.stroke();
		ctx.closePath();
	}
	for (let i = 0; i <= canvas.height / unit; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * unit);
		ctx.lineTo(canvas.width, i * unit);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "lightgray";
		ctx.stroke();
		ctx.closePath();
	}
}

function playerLocation(playerN) {
	playerN.bodyX[0] = playerN.x;
	playerN.bodyY[0] = playerN.y;
	for (let i = playerN.length - 1; i > 0; i--) {
		playerN.bodyX[i] = playerN.bodyX[i - 1];
		playerN.bodyY[i] = playerN.bodyY[i - 1];
	}
	if (playerN.direction == up) {
		playerN.y -=  unit;
	} else if (playerN.direction == down) {
		playerN.y += unit;
	} else if (playerN.direction == left) {
		playerN.x -= unit;
	} else {
		playerN.x += unit;
	}
}

function boundsCheck(playerN) {
	if (playerN.x >= canvas.width || playerN.x < 0 || playerN.y >= canvas.height || playerN.y < 0) {
		if (!goThroughWall) {
			gameOver(playerN);
		}
		else {
			if (playerN.x >= canvas.width) {
				playerN.x = 0;
			}
			if (playerN.x < 0) {
				playerN.x = canvas.width - unit;
			}
			if (playerN.y >= canvas.height) {
				playerN.y = 0;
			}
			if (playerN.y < 0) {
				playerN.y = canvas.height - unit;
			}
		}
	}
}

function gameOver(playerN) {
	playerN.x = playerN.startX;
	playerN.y = playerN.startY;
	playerN.direction = playerN.startDirection;
	playerN.score = 0;
	playerN.length = initialPlayerLength;
	playerN.bodyX = [playerN.x];
	playerN.bodyY = [playerN.y];
	isPaused = false;
}

function suicideCheck() {
//HEADS
	if (player1.x == player2.x && player1.y == player2.y) {
		gameOver(player1);
		gameOver(player2);
	}
	if (player1.x == player3.x && player1.y == player3.y) {
		gameOver(player1);
		gameOver(player3);
	}
	if (player1.x == player4.x && player1.y == player4.y) {
		gameOver(player1);
		gameOver(player4);
	}
	if (player2.x == player3.x && player2.y == player3.y) {
		gameOver(player2);
		gameOver(player3);
	}
	if (player2.x == player4.x && player2.y == player4.y) {
		gameOver(player2);
		gameOver(player4);
	}
	if (player3.x == player4.x && player3.y == player4.y) {
		gameOver(player3);
		gameOver(player4);
	}

//PLAYER 1
	if (player1.inGame) {
		for (let i = 1; i < player1.length; i++) {
			if (player1.bodyX[i] == player1.x && player1.bodyY[i] == player1.y) {
				gameOver(player1);
			}
		}
		for (let i = 1; i < player1.length; i++) {
			if (player1.bodyX[i] == player2.x && player1.bodyY[i] == player2.y) {
				player1.length += 5 * (Math.ceil(player2.length / 10));
				gameOver(player2);
			}
		}
		for (let i = 1; i < player1.length; i++) {
			if (player1.bodyX[i] == player3.x && player1.bodyY[i] == player3.y) {
				player1.length += 5 * (Math.ceil(player3.length / 10));
				gameOver(player3);
			}
		}
		for (let i = 1; i < player1.length; i++) {
			if (player1.bodyX[i] == player4.x && player1.bodyY[i] == player4.y) {
				player1.length += 5 * (Math.ceil(player4.length / 10));
				gameOver(player4);
			}
		}
	}

//PLAYER 2
	if (player2.inGame) {
		for (let i = 1; i < player2.length; i++) {
			if (player2.bodyX[i] == player2.x && player2.bodyY[i] == player2.y) {
				gameOver(player2);
			}
		}
		for (let i = 1; i < player2.length; i++) {
			if (player2.bodyX[i] == player1.x && player2.bodyY[i] == player1.y) {
				player2.length += 5 * (Math.ceil(player1.length / 10));
				gameOver(player1);
			}
		}
		for (let i = 1; i < player2.length; i++) {
			if (player2.bodyX[i] == player3.x && player2.bodyY[i] == player3.y) {
				player2.length += 5 * (Math.ceil(player3.length / 10));
				gameOver(player3);
			}
		}
		for (let i = 1; i < player2.length; i++) {
			if (player2.bodyX[i] == player4.x && player2.bodyY[i] == player4.y) {
				player2.length += 5 * (Math.ceil(player4.length / 10));
				gameOver(player4);
			}
		}
	}

//PLAYER 3
	if (player3.inGame) {
		for (let i = 1; i < player3.length; i++) {
			if (player3.bodyX[i] == player3.x && player3.bodyY[i] == player3.y) {
				gameOver(player3);
			}
		}
		for (let i = 1; i < player3.length; i++) {
			if (player3.bodyX[i] == player1.x && player3.bodyY[i] == player1.y) {
				player3.length += 5 * (Math.ceil(player1.length / 10));
				gameOver(player1);
			}
		}
		for (let i = 1; i < player3.length; i++) {
			if (player3.bodyX[i] == player2.x && player3.bodyY[i] == player2.y) {
				player3.length += 5 * (Math.ceil(player2.length / 10));
				gameOver(player2);
			}
		}
		for (let i = 1; i < player3.length; i++) {
			if (player3.bodyX[i] == player4.x && player3.bodyY[i] == player4.y) {
				player3.length += 5 * (Math.ceil(player4.length / 10));
				gameOver(player4);
			}
		}
	}

//PLAYER 4
	if (player4.inGame) {
		for (let i = 1; i < player4.length; i++) {
			if (player4.bodyX[i] == player4.x && player4.bodyY[i] == player4.y) {
				gameOver(player4);
			}
		}
		for (let i = 1; i < player4.length; i++) {
			if (player4.bodyX[i] == player1.x && player4.bodyY[i] == player1.y) {
				gameOver(player1);
				player4.length += 5;
			}
		}
		for (let i = 1; i < player4.length; i++) {
			if (player4.bodyX[i] == player2.x && player4.bodyY[i] == player2.y) {
				gameOver(player2);
				player4.length += 5;
			}
		}
		for (let i = 1; i < player4.length; i++) {
			if (player4.bodyX[i] == player3.x && player4.bodyY[i] == player3.y) {
				gameOver(player3);
				player4.length += 5;
			}
		}
	}
}

function foodCheck(playerN) {
	if (playerN.x + unit / 2 == foodX && playerN.y + unit / 2 == foodY) {
		playerN.score++;
		playerN.length += growthRate;
		foodX = ((Math.floor(Math.random() * (canvas.width/unit))) * unit) + unit / 2
		foodY = ((Math.floor(Math.random() * (canvas.height/unit))) * unit) + unit / 2
	}
	drawFood();
}

function drawFood() {
	ctx.beginPath();
	ctx.arc(foodX, foodY, (unit / 2) - 1, 0, Math.PI * 2, false);
	ctx.fillStyle = foodColor;
	ctx.fill();
	ctx.closePath();
}

function drawScore(playerN) {
	ctx.font = "bolder "+((unit / 2) + 4)+"px Arial";
	ctx.fillStyle = scoreColor;
	ctx.textAlign = "center";
	ctx.fillText(playerN.length, playerN.x + unit / 2, playerN.y + (unit / 2) + (unit / 12));
}

function drawLine(playerN) {
	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.moveTo(playerN.x + unit / 2, playerN.y + unit / 2);
	for (let i = 1; i < playerN.length; i++) {
		ctx.lineTo(playerN.bodyX[i] + unit / 2, playerN.bodyY[i] + unit / 2);
		ctx.lineWidth = unit - 2;
		ctx.strokeStyle = playerN.color;
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.lineCap = "round";
		ctx.moveTo(playerN.bodyX[i] + unit / 2, playerN.bodyY[i] + unit / 2);
	}
	ctx.lineWidth = unit - 1;
	ctx.strokeStyle = playerN.color;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.moveTo(playerN.x + unit / 2, playerN.y + unit / 2);
	for (let i = 1; i < playerN.length; i++) {
		ctx.lineTo(playerN.bodyX[i] + unit / 2, playerN.bodyY[i] + unit / 2);
		ctx.lineWidth = unit / 3;
		ctx.strokeStyle = playerN.lineColor;
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.lineCap = "round";
		ctx.moveTo(playerN.bodyX[i] + unit / 2, playerN.bodyY[i] + unit / 2);
	}
	ctx.lineWidth = unit / 3;
	ctx.strokeStyle = playerN.color;
	ctx.stroke();
	ctx.closePath();
}

function calculate() {
	if (!isPaused) {
		if (player1.inGame) {
			playerLocation(player1);
			boundsCheck(player1);
			foodCheck(player1);
		}
		if (player2.inGame) {
			playerLocation(player2);
			boundsCheck(player2);
			foodCheck(player2);
		}
		if (player3.inGame) {
			playerLocation(player3);
			boundsCheck(player3);
			foodCheck(player3);
		}
		if (player4.inGame) {
			playerLocation(player4);
			boundsCheck(player4);
			foodCheck(player4);
		}
		suicideCheck();
	}
}

function draw() {
	drawGrid();
	drawFood();
	if (!isPaused) {
		if (player1.inGame) {
			drawLine(player1);
			drawScore(player1);
		}
		if (player2.inGame) {
			drawLine(player2);
			drawScore(player2);
		}
		if (player3.inGame) {
			drawLine(player3);
			drawScore(player3);
		}
		if (player4.inGame) {
			drawLine(player4);
			drawScore(player4);
		}
	}
	else {
		if (player1.inGame) {
			drawLine(player1);
		}
		if (player2.inGame) {
			drawLine(player2);
		}
		if (player3.inGame) {
			drawLine(player3);
		}
		if (player4.inGame) {
			drawLine(player4);
		}
	}
//	player1.keyPressed = false;
//	player2.keyPressed = false;
//	player3.keyPressed = false;
//	player4.keyPressed = false;
}

function doGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	calculate();
	draw();
}

var interval = setInterval(doGame, gameSpeed);
