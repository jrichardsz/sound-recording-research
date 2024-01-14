const localVideo = document.getElementById('localVideo');
let chunks = [];
let mediaRecorder;

const startRecord = async () => {
 
  const mediaStream = await getLocalMediaStream();

  mediaRecorder = new MediaRecorder(mediaStream);

  setListeners();

  mediaRecorder.start();
};

const stopRecord = async () => {
  if (!mediaRecorder) return;

  mediaRecorder.stop();
};

const getLocalMediaStream = async () => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });  
  return mediaStream;
};

const setListeners = () => {
  mediaRecorder.ondataavailable = handleOnDataAvailable;
  mediaRecorder.onstop = handleOnStop;
};

const handleOnStop = () => {
  saveFile();

  destroyListeners();
  mediaRecorder = undefined;
};

const destroyListeners = () => {
  mediaRecorder.ondataavailable = undefined;
  mediaRecorder.onstop = undefined;
};

const handleOnDataAvailable = ({ data }) => {
  if (data.size > 0) {
    chunks.push(data);
  }
};

const saveFile = async () => {
  console.log(chunks)
  // const blob = new Blob(chunks,{ type: "audio/wav" });
  // console.log(blob)
  // var buffer = await chunks[0].arrayBuffer();
  // let blob = bufferToWave(buffer, 0, buffer.length, 1, 41000);
  // console.log(blob)

  // document.getElementById("localVideo").src = URL.createObjectURL(blob);


  // const blobUrl = URL.createObjectURL(blob);
  // const link = document.createElement('a');

  // link.style = 'display: none';
  // link.href = blobUrl;
  // link.download = 'recorded_file.mp3';

  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

  // window.URL.revokeObjectURL(blobUrl);
  // chunks = [];

  var blob = chunks[0]

  const audioContext = new AudioContext();
  const fileReader = new FileReader();

  // Set up file reader on loaded end event
  fileReader.onloadend = () => {
    const arrayBuffer = fileReader.result; // as ArrayBuffer;

    // Convert array buffer into audio buffer
    audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
      // Do something with audioBuffer
      console.log(audioBuffer);
      var wavBlob = audioBufferToWav(audioBuffer);
      console.log(wavBlob)
      document.getElementById("localVideo").src = URL.createObjectURL(wavBlob);

      const blobUrl = URL.createObjectURL(wavBlob);
      const link = document.createElement('a');

      link.style = 'display: none';
      link.href = blobUrl;
      link.download = 'recorded_file.mp3';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
      chunks = [];

    });
  };

  //Load blob
  fileReader.readAsArrayBuffer(blob);

};

function audioBufferToWav(aBuffer) {
  let numOfChan = aBuffer.numberOfChannels,
    btwLength = aBuffer.length * numOfChan * 2 + 44,
    btwArrBuff = new ArrayBuffer(btwLength),
    btwView = new DataView(btwArrBuff),
    btwChnls = [],
    btwIndex,
    btwSample,
    btwOffset = 0,
    btwPos = 0;
  setUint32(0x46464952); // "RIFF"
  setUint32(btwLength - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"
  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(aBuffer.sampleRate);
  setUint32(aBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit
  setUint32(0x61746164); // "data" - chunk
  setUint32(btwLength - btwPos - 4); // chunk length

  for (btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++)
    btwChnls.push(aBuffer.getChannelData(btwIndex));

  while (btwPos < btwLength) {
    for (btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
      // interleave btwChnls
      btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])); // clamp
      btwSample =
        (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) | 0; // scale to 16-bit signed int
      btwView.setInt16(btwPos, btwSample, true); // write 16-bit sample
      btwPos += 2;
    }
    btwOffset++; // next source sample
  }

  return new Blob([btwArrBuff], { type: "audio/wav" })

  function setUint16(data) {
    btwView.setUint16(btwPos, data, true);
    btwPos += 2;
  }

  function setUint32(data) {
    btwView.setUint32(btwPos, data, true);
    btwPos += 4;
  }
}