let facemesh;
let video;
let predictions = [];
let emitter;

function setup() {
	createCanvas(width, height);
	video = createCapture(VIDEO);
	video.size(335, 667);

	emitter = new Emitter(width / 2, height / 2);

	facemesh = ml5.facemesh(video, modelReady);

	// This sets up an event that fills the global variable "predictions"
	// with an array every time new predictions are made
	facemesh.on("predict", results => {
		predictions = results;
	});

	// Hide the video element, and just show the canvas
	video.hide();
	background(0);
}

function modelReady() {
	console.log("Model ready!");
}

function draw() {
	clear();
	background(0);
	// image(video, 0, 0, width, height);
	blendMode(ADD);

	emitter.show();
	emitter.update();
	// We can call both functions to draw all keypoints
	drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	for (let i = 0; i < predictions.length; i += 1) {
		const keypoints = predictions[i].scaledMesh;

		// Draw facial keypoints.
		for (let j = 0; j < keypoints.length; j += 1) {
			const [x, y] = keypoints[j];
			if (random(1) < 0.8) {
				emitter.updatePosition(x, y);
				emitter.emit(1);
			}

			// noStroke();
			// fill(0, 0, 220);
			// ellipse(x, y, 2, 2);
		}
	}
}

// - Attenzione - usare curve di bezier da live precedente per connettere i vari punti invece
// di rect()