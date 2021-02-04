var cols = 7;
var rows = 6;

var windowX = 100;
var windowY = 50;
var windowSize = 0;
var tileSize = 0;

var player = true;
var press = true;
var loop = true;

let matrix;
let colValues;

function setup() {
	createCanvas(1000,600);

	// Calculate size of game screen and tile:
	windowSize = min(width-2*windowX, height-2*windowY);
	tileSize = windowSize / max(cols, rows);

	matrix = new Array(rows);
	for (let i = 0; i < rows; i++) {
		matrix[i] = new Array(cols);
		for (let ii = 0; ii < cols; ii++) {
			matrix[i][ii] = 0;
		}
	}

	colValues = new Array(cols);
	for (let i = 0; i < cols; i++) {
		colValues[i] = 0;
	}

	console.log(matrix);
}

function draw() {

	if (loop) {

	drawMatrix();

	hoverCol = floor((mouseX - windowX) / tileSize);
	hoverRow = floor((mouseY - windowY) / tileSize);
	let actualRow = rows - colValues[hoverCol] - 1;
	if (hoverCol >= 0 && hoverCol < cols &&  actualRow < rows && actualRow >= 0) {
		if (player)
			fill(255,0,0,60);
		else
			fill(255,255,0,60);
		ellipse(windowX + hoverCol * tileSize, windowY + actualRow * tileSize, tileSize)
	}


	}
}

function drawMatrix() {
	background(51);

	// Draw tiles:
	ellipseMode(CORNER);
	for (let i = 0; i < cols; i++) {
		for (let ii = 0; ii < rows; ii++) {
			let value = matrix[ii][i];
			fill(0);
			if (value == 0) {
				fill(255);
			} else if (value == 1) {
				fill(255,0,0);
			} else if (value == -1) {
				fill(255,255,0);
			}
			ellipse(windowX + i * tileSize, windowY + ii * tileSize, tileSize);
		}
	}
}

function mouseReleased() {
	press = !press;
	if (press && loop) {

		// Changes boards value at the tile the user is hovering:
		hoverCol = floor((mouseX - windowX) / tileSize);
		hoverRow = floor((mouseY - windowY) / tileSize);
		let actualRow = rows - colValues[hoverCol] - 1;
		if (hoverCol >= 0 && hoverCol < cols &&  actualRow < rows && actualRow >= 0) {
			if (player) {
				matrix[actualRow][hoverCol] = 1;
			} else {
				matrix[actualRow][hoverCol] = -1;
			}
			colValues[hoverCol]++;
			checkWinner();

			player = !player;
			//console.log(player);
			return false;
		}
		//ellipse(windowX + hoverCol * tileSize, windowY + hoverRow * tileSize, tileSize);

	}
}

function checkWinner() {
	// Vertical check:
	for (let i = 0; i < cols; i++) {
		let c = 1;
		let p = matrix[0][i];
		for (let ii = 1; ii < rows; ii++) {
			// matrix[ii][i]
			if (matrix[ii][i] == p) {
				c++;
			} else {
				c = 1;
				p = matrix[ii][i];
			}

			if (c == 4 && p != 0) {
				console.log('Winner: ' + p);
				loop = false;
				drawMatrix();
			}
		}
	}

	// Horizontal check:
	for (let i = 0; i < rows; i++) {
		let c = 1;
		let p = matrix[i][0];
		for (let ii = 1; ii < cols; ii++) {
			if (matrix[i][ii] == p) {
				c++;
			} else {
				c = 1;
				p = matrix[i][ii];
			}

			if (c == 4 && p != 0) {
				console.log('Winner: ' + p);
				loop = false;
				drawMatrix();
			}
		}
	}

	// Diagonals to bottom right:
	for (let i = 0; i < cols - 3; i++) {
		for (let ii = 0; ii < rows - 3; ii++) {
			let first = matrix[ii][i];
			let second = matrix[ii+1][i+1];
			let third = matrix[ii+2][i+2];
			let fourth = matrix[ii+3][i+3];

			let s = first + second + third + fourth;
			if (s == 4 || s == -4) {
				console.log('Winner: ' + first);
				loop = false;
				drawMatrix();
			}
		}
	}

	// Diagonals to bottom left:
	for (let i = 3; i < cols; i++) {
		for (let ii = 0; ii < rows - 3; ii++) {
			let first = matrix[ii][i];
			let second = matrix[ii+1][i-1];
			let third = matrix[ii+2][i-2];
			let fourth = matrix[ii+3][i-3];

			let s = first + second + third + fourth;
			if (s == 4 || s == -4) {
				console.log('Winner: ' + first);
				loop = false;
				drawMatrix();
			}
		}
	}
}