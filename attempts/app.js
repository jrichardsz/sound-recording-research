var socketio = io.connect('http://localhost:2105', {transports: ['websocket']});

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

  function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.start();
    rec.ondataavailable = async (e) => {
      audioChunks.push(e.data);
      if (rec.state == "inactive") {
        var initialBlob = audioChunks[0];
        console.log(initialBlob)
        var buffer = await initialBlob.arrayBuffer();
        var dataview = encodeWAV(buffer, 44100);
        var audioBlob = new Blob([dataview.buffer], { type: "audio/wav" });
        console.log(audioBlob)
        document.getElementById("audioElement").src = URL.createObjectURL(audioBlob);
        socketio.emit('send-audio', audioBlob);
        //socketio.emit('send-audio', audioChunks);        
      }
    };
  }

  function startusingBrowserMicrophone(boolean) {
    getUserMedia({ audio: boolean }).then((stream) => {
      handlerFunction(stream);
    });
  }

  function encodeWAV(samples, sampleRate){
    var buffer = new ArrayBuffer(44 + samples.byteLength * 2);
    console.log(buffer)
    var view = new DataView(buffer);
  
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 32 + samples.byteLength * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, samples.byteLength * 2, true);
    floatTo16BitPCM(view, 44, samples);
  
    return view;
  }

  function floatTo16BitPCM(output, offset, input){
    for (var i = 0; i < input.length; i++, offset+=2){
      var s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }
  
  function writeString(view, offset, string){
    for (var i = 0; i < string.length; i++){
      console.log(i, string.charCodeAt(i))
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }  

  startusingBrowserMicrophone(true);

  // Stoping handler
  document.getElementById("stopRecording").addEventListener("click", (e) => {
    rec.stop();
    isRecording.textContent = "Click play button to start listening";
  });
}
