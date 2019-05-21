// Based on
// https://github.com/webrtc/samples/blob/gh-pages/src/content/capture/canvas-record/js/main.js
// https://mozdevs.github.io/MediaRecorder-examples/record-canvas-to-video.html
// use as reference if we want to show a video of what was recorded

import React, { useEffect } from "react";
import "./Visualisation.css";

function Start({ advanceScene }) {
  useEffect(() => {
    var canvas = document.getElementById("visualisation-canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    var width = canvas.width;
    var height = canvas.height;
    ctx.fillRect(0, 0, width, height);
    var pixels = ctx.getImageData(0, 0, width, height);
    var data = pixels.data;
    var numPixels = data.length;

    // drawing functionality
    function drawWhiteNoise() {
      var offset = 0;
      for (var i = 0; i < numPixels; i++) {
        var grey = Math.round(Math.random() * 255);
        data[offset++] = grey;
        data[offset++] = grey;
        data[offset++] = grey;
        offset++;
      }
      ctx.putImageData(pixels, 0, 0);
    }
    const draw = () => {
      requestAnimationFrame(draw);
      drawWhiteNoise();
    };
    draw();

    const stream = canvas.captureStream();

    const handleDataAvailable = event => {
      if (event.data && event.data.size) {
        recordedBlobs.push(event.data);
      }
    };

    const download = () => {
      const blob = new Blob(recordedBlobs, { type: "video/webm" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "test.webm";
      document.body.appendChild(a);
      a.click();
      setImmediate(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    };

    const recordedBlobs = [];

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(100);

    setTimeout(() => {
      mediaRecorder.stop();
      download();
    }, 1000000);

    setTimeout(() => {
      advanceScene();
    }, 2000);
  }, []);

  return (
    <div className="Visualisation">
      <canvas id="visualisation-canvas" />
    </div>
  );
}

export default Start;
