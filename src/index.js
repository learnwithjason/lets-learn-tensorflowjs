import 'regenerator-runtime/runtime.js';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import imgSrc from '../images/restaurant.jpg';

function drawImage(predictions, image) {
  const canvas = document.querySelector('#canvas');
  const context = canvas.getContext('2d');

  context.drawImage(image, 0, 0);
  context.font = '12px arial';

  predictions.forEach((prediction) => {
    context.beginPath();
    context.rect(...prediction.bbox);
    context.lineWidth = 1;
    context.strokeStyle = 'green';
    context.fillStyle = 'white';
    context.stroke();

    context.fillText(
      `${prediction.class} (${prediction.score.toFixed(3)})`,
      prediction.bbox[0],
      prediction.bbox[1],
    );
  });
}

async function getPredictions() {
  // const img = document.querySelector('#image');
  const img = new Image();
  img.src = imgSrc;

  cocoSsd.load().then((model) => {
    model.detect(img).then((predictions) => {
      console.log(predictions);
      drawImage(predictions, img);
    });
  });
}

getPredictions();
