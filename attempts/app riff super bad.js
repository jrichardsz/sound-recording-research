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
    rec.ondataavailable = (e) => {
      console.log(e.data)
      audioChunks.push(e.data);
      if (rec.state == "inactive") {
        var dataview = encodeWAV(audioChunks, 44100);
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

  function encodeWAV(audioChunks, sampleRate){
    const durationSeconds = 10;
    const numChannels = 1;
    const bytesPerSample = 2 * numChannels;
    const bytesPerSecond = sampleRate * bytesPerSample;
    const dataLength = bytesPerSecond * durationSeconds;
    const headerLength = 44;
    const fileLength = dataLength + headerLength;
    const bufferData = new Uint8Array(fileLength);
    const dataView = new DataView(bufferData.buffer);
    const writer = createWriter(dataView);
    
    // HEADER
    writer.string("RIFF");
    // File Size
    writer.uint32(fileLength);
    writer.string("WAVE");
    
    writer.string("fmt ");
    // Chunk Size
    writer.uint32(16);
    // Format Tag
    writer.uint16(1);
    // Number Channels
    writer.uint16(numChannels);
    // Sample Rate
    writer.uint32(sampleRate);
    // Bytes Per Second
    writer.uint32(bytesPerSecond);
    // Bytes Per Sample
    writer.uint16(bytesPerSample);
    // Bits Per Sample
    writer.uint16(bytesPerSample * 8);
    writer.string("data");
    
    writer.uint32(dataLength);
    
    for (var i = 0, offset = 0; i < audioChunks.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, audioChunks[i]));
        writer.pcm16s(s);
    }    

    return dataView;
  }

  function createWriter(dataView) {
    let pos = 0;
  
    return {
      string(val) {
        for (let i = 0; i < val.length; i++) {
          dataView.setUint8(pos++, val.charCodeAt(i));
        }
      },
      uint16(val) {
        dataView.setUint16(pos, val, true);
        pos += 2;
      },
      uint32(val) {
        dataView.setUint32(pos, val, true);
        pos += 4;
      },
      pcm16s: function(value) {
        value = Math.round(value * 32768);
        value = Math.max(-32768, Math.min(value, 32767));
        dataView.setInt16(pos, value, true);
        pos += 2;
      },
    }
  }

  startusingBrowserMicrophone(true);

  // Stoping handler
  document.getElementById("stopRecording").addEventListener("click", (e) => {
    rec.stop();
    isRecording.textContent = "Click play button to start listening";
  });
}
