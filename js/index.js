const canvasMap = document.getElementById('map');
const mapCtx = canvasMap.getContext('2d');

const canvasFood = document.getElementById('food');
const foodCtx = canvasFood.getContext('2d');

const scoreLbl = document.getElementById('score');
const highscorelbl = document.getElementById('highscore');

var score = 0;
var highscore;

const snake = [];
var direction = 1;
var lastColor = 0;
var f;
var i;

document.onkeydown = checkkey;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function checkkey(e) {
	switch(e.keyCode) {
		case 37:
			//left
			direction != 1 ? direction = -1 : null;
			break;
		case 38:
			//up
			direction != 2 ? direction = -2 : null;
			break;
		case 39:
			//right
			direction != -1 ? direction = 1 : null;
			break;
		case 40:
			//down
			direction != -2 ? direction = 2 : null;
			break;
		default:
			break;
	}
}

window.onload  = function() {
	highscore = localStorage.getItem('highscore') || 0;
	highscorelbl.innerHTML = `Highscore: ` + highscore;

	snake.push({'x': 20, 'y': 20});
	f = new food();
	f.create();
	i = setInterval(updateGameArea, 80);
}

function updateGameArea() {
	mapCtx.clearRect(0,0,500,500);
	changeDirection(checkCollision());
	for(let b of snake) {
		var ctx = mapCtx;
		ctx.fillStyle = color(score);
		ctx.fillRect(b['x'], b['y'], 18, 18);
	}
}

function color(score) {
	if(score >= 100) {
		return "gold";
	} else if(score >= 75) {
		return "silver";
	} else if(score >= 50) {
		return "green";
	} else if(score >= 25) {
		return "red"
	} else if(score >= 10) {
		return "blue"
	} else {
		return "orange"
	}
}

function checkCollision() {
	for(let x = 1; x < snake.length; x++) {
		if(snake[0]['x'] === snake[x]['x'] && snake[0]['y'] === snake[x]['y']) {
			mapCtx.fillStyle = 'white';
			mapCtx.fillText('LOSER', 250, 250);
			clearInterval(i);
		}
	}

	if(snake[0]['x'] >= 500 || snake[0]['x'] < 0 || snake[0]['y'] >= 500 || snake[0]['y'] < 0) {
		mapCtx.fillStyle = 'white';
		mapCtx.fillText('LOSER', 250, 250);
		clearInterval(i);
	}
	if(f.x === snake[0]['x'] && f.y === snake[0]['y']) {
		score++;		
		if(f.color === "purple") {
			lastColor = 1;
			score++;
		}

		scoreLbl.innerHTML = 'Score: ' + score;

		if(score > highscore) {
			highscorelbl.innerHTML = 'Highscore: ' + score;
			localStorage.setItem('highscore', score);
		}
		
		foodCtx.clearRect(0,0,500,500);
		f.create();
		return true;
	} else {
		return false;
	}
}

function changeDirection(input) {
	var component = directionSwitch();
	if(!input){
		snake.pop();
		snake.unshift(component);
	} else {
		if(lastColor === 0) {
			snake.unshift(component);
		} else {
			snake.unshift(component);
			component = directionSwitch();
			snake.unshift(component);
			lastColor = 0;
		}
	};
}

function directionSwitch() {
	var component;
	switch(direction) {
			case -1:
				//left
				component = {'x': snake[0]['x'] - 20, 'y': snake[0]['y']};
				break;
			case 1:
				//right
				component = {'x': snake[0]['x'] + 20, 'y': snake[0]['y']};
				break;
			case -2:
				//up
				component = {'x': snake[0]['x'], 'y': snake[0]['y'] - 20};
				break;
			case 2:
				//down
				component = {'x': snake[0]['x'], 'y': snake[0]['y'] + 20};
				break;
			default:
				break;
	}
	return component;
}


function food() {
	this.width = 18;
	this.height = 18;
	this.create = function() {
		this.x = Math.ceil(((Math.random() * 480) / 20)) * 20;
		this.y = Math.ceil(((Math.random() * 480) / 20)) * 20;
		ctx = foodCtx;
		random = Math.floor(Math.random() * 10);
		if(random != 7) {
			ctx.fillStyle = "yellow";
			this.color = "yellow";
		} else {
			ctx.fillStyle = "purple";
			this.color = "purple";
		}
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}