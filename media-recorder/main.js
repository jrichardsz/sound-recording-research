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

const saveFile = () => {
  console.log(chunks)
  const blob = new Blob(chunks,{ type: "audio/wav" });
  console.log(blob)
  document.getElementById("localVideo").src = URL.createObjectURL(blob);


  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.style = 'display: none';
  link.href = blobUrl;
  link.download = 'recorded_file.mp3';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(blobUrl);
  chunks = [];

};
