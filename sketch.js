// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/-ONzIaEe6/";

// Video
let video;
let flippedVideo;
// To store the classification
// Almacena las etiquetas de los nombres que creamos (Esmalte, Tubo de ensayo, Fondo)
let label = "";
let confianza = 0;

// Load the model first
// Esta función debe ejecutarse antes de que se inicie function setup
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  // flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  textSize(8);
  textAlign(LEFT);
  text(confianza, 10, height - 4);

  if ((label = "Stitch Rosa")) {
    background(221, 27, 189);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  // flippedVideo = ml5.flipImage(video);
  classifier.classify(video, gotResult);
  // flippedVideo.remove();
}

// When we get a result
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confianza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
