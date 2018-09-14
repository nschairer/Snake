const canvasMap = document.getElementById('map');
const mapCtx = canvasMap.getContext('2d');

const canvasFood = document.getElementById('food');
const foodCtx = canvasFood.getContext('2d');

const scoreLbl = document.getElementById('score');
var score = 0;

const snake = [];
var direction = 1;
var f;
var i;

document.onkeydown = checkkey;

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
		ctx.fillStyle = "orange";
		ctx.fillRect(b['x'], b['y'], 20, 20);
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
		scoreLbl.innerHTML = score;
		foodCtx.clearRect(0,0,500,500);
		f.create();
		return true;
	} else {
		return false;
	}
}

function changeDirection(input) {
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
	if(!input){
		snake.pop();
		snake.unshift(component);
	} else {
		snake.unshift(component);
	};
}

function food() {
	this.width = 20;
	this.height = 20;
	this.create = function() {
		this.x = Math.ceil(((Math.random() * 480) / 20)) * 20;
		this.y = Math.ceil(((Math.random() * 480) / 20)) * 20;
		console.log(this.x, this.y);
		ctx = foodCtx;
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}


