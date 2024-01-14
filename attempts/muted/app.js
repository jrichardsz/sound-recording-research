var socketio = io.connect('http://localhost:2105', { transports: ['websocket'] });

document
  .getElementById("startRecording")
  .addEventListener("click", initFunction);

let isRecording = document.getElementById("isRecording");

function initFunction() {
  // Display recording
  async function getUserMedia(constraints) {
    if (window.navigator.mediaDevices) {
      return window.navigator.mediaDevices.getUserMedia(constraints);
    }

    let legacyApi =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (legacyApi) {
      return new Promise(function (resolve, reject) {
        legacyApi.bind(window.navigator)(constraints, resolve, reject);
      });
    } else {
      alert("user api not supported");
    }
  }

  isRecording.textContent = "Recording...";
  //

  let audioChunks = [];
  let rec;

  async function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.start();
    rec.ondataavailable = async (e) => {
      audioChunks.push(e.data);
      if (rec.state == "inactive") {
        console.log(audioChunks[0])
        var buffer = await audioChunks[0].arrayBuffer();
        //var audioBlob = createWav(audioChunks[0])
        let newBlob = bufferToWave(buffer, 0, buffer.byteLength, 1, 16000);
        console.log(newBlob)
        document.getElementById("audioElement").src = URL.createObjectURL(newBlob);
        // socketio.emit('send-audio', audioBlob);
        socketio.emit('send-audio', newBlob);
      }
    };
  }

  function startusingBrowserMicrophone(boolean) {

    const constraints = {
      audio: {
        channelCount: 1,
        sampleRate: 16000,
        sampleSize: 16,
        volume: 1
      }
    }

    getUserMedia({audio: constraints}).then((stream) => {
      handlerFunction(stream);
    });
  }


  startusingBrowserMicrophone(true);

  // Stoping handler
  document.getElementById("stopRecording").addEventListener("click", (e) => {
    rec.stop();
    isRecording.textContent = "Click play button to start listening";
  });
}
