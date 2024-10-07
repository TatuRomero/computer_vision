// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/-ONzIaEe6/";

// Video
let video;
let flippedVideo;
// To store the classification
// Almacena las etiquetas de los nombres que creamos (Fondo, Stitch rosa, Esmalte)
let label = "";
let confianza = 0;

// Emojis
let emojis = ["✨", "💖", "🌟", "💫"];

// Load the model first
// Esta función debe ejecutarse antes de que se inicie function setup
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(680, 500);
  // Create the video
  video = createCapture(VIDEO);
  video.size(680, 500);
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
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);

  // textSize(8);
  // textAlign(LEFT);
  // text(confianza, 10, height - 4);

  if (label == "Fondo" && confianza > 0.9) {
    background(150, random(50, 150), 200, 150);
    let emoji = random(emojis);
    let x = random(width);
    let y = random(height);
    textSize(80);
    fill(255);
    text(emoji, x, y);
  }

  if (label == "Stitch rosa" && confianza > 0.9) {
    background(255, 182, 193);
    textSize(25);
    fill(0, 0, 139);
    text(
      "Ohana significa familia y tu familia nunca te abandona",
      width / 2,
      height / 2
    );
    textAlign(CENTER);
  }

  if (label == "Esmalte" && confianza > 0.9) {
    filter(POSTERIZE);
    textSize(35);
    fill(255);
    text("Esmalte 💅🏻", 50, 480);
    textAlign(LEFT);
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
