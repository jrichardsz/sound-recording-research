/* Audio recording and streaming demo by Miguel Grinberg.

   Adapted from https://webaudiodemos.appspot.com/AudioRecorder
   Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    recording = false;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var socketio = io.connect("http://localhost:2105", {transports: ['websocket']});
var room_uuid;
var authorizationSample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0X2lkZW50aWZpZXIiOiJqYW5lX2RvZSIsInR5cGUiOiJhY2MiLCJpYXQiOjE2OTk1MTExMTIsImV4cCI6MTY5OTU0NzExMn0.oyBpmvDDa3he6gFusTapGYOfFEswUVpLTaPsj5tKbes";
var username = "jon_doe"
var creatureName;
var float32Array = [];

document.getElementById("start_round").addEventListener("click", onStartRoundClick);

var attackUntilPlayerIsDead = true;

const timer = ms => new Promise(res => setTimeout(res, ms))

socketio.on('match-found', function(data) {
    
    console.log("\n\nmatch-found: "+JSON.stringify(data))
    attackUntilPlayerIsDead = true;
    room_uuid = data.room_uuid;

    document.getElementById("uuid").innerHTML = `room uuid: ${room_uuid}`;
    console.log(`new round uuid ${room_uuid}`)
    
    updatePlayerInfo(data);  
    updateCreatureInfo(data);

    if(typeof data["player1_next_runes_challenge"]!== 'undefined' && 
        data["player1_next_runes_challenge"]!=""){
        document.getElementById("runes_to_cast").innerHTML = data["player1_next_runes_challenge"].join(" | ");
    }    

    setCreatureName(data["player2_name"], "creature_img_container")    
    
    creature_attack();
       
});

socketio.on('round_update', function(data) {
    console.log("\n\nround_update: "+JSON.stringify(data))
    updatePlayerInfo(data);  
    updateCreatureInfo(data);

    if(data.player1_hp < 0 && data.player2_hp > 0){
        attackUntilPlayerIsDead = false;
        setMessage("You lose!!","wizard_img_container", 0);
        setMessage("You win!!","creature_img_container", 1);
    }else if(data.player1_hp > 0 && data.player2_hp < 0){
        attackUntilPlayerIsDead = false;
        setMessage("You lose!!","creature_img_container", 0);
        setMessage("You win!!","wizard_img_container", 1);        
    }else{
        attackUntilPlayerIsDead = true;
    }

    if(typeof data["player1_next_runes_challenge"]!== 'undefined' && 
        data["player1_next_runes_challenge"]!=""){
        document.getElementById("runes_to_cast").innerHTML = data["player1_next_runes_challenge"].join(" | ");
    }

});

socketio.on('add-wavefile', function(url) {
    // add new recording to page
    audio = document.createElement('p');
    audio.innerHTML = '<audio src="' + url.url + '" controls>';
    document.getElementById('wavefiles').appendChild(audio);
});

async function creature_attack() { // We need to wrap the loop into an async function for this to work
    console.log("\n\nsending attack from creature: "+ new Date());
    socketio.emit('creature-attack', {room_uuid: room_uuid, authorization: authorizationSample,
        "spell_type" : 1,
        "spell_level" : 1,
        "rune_solved_pattern" : "****"
    });        
    await timer(4000); // then the created Promise can be awaited
    console.log("attackUntilPlayerIsDead on attack: "+attackUntilPlayerIsDead)
    if(attackUntilPlayerIsDead===true){
        creature_attack();
    }
}

async function onStartRoundClick(){
    socketio.emit('search-match', {"authorization": authorizationSample});    
    if(document.getElementById("creature_img_container_message")){
        document.getElementById("creature_img_container_message").remove()
    }
    
    if(document.getElementById("wizard_img_container_message")){
        document.getElementById("wizard_img_container_message").remove()
    }

    if(document.getElementById("creature_name")){
        document.getElementById("creature_name").remove()
    }
    
}

function updateRoundEvent(data){
    var table = document.getElementById("round_events");
    
    var player;
    var creature;
    for(key in data){
        var item = data[key];
        if(typeof item /home/this/Github/python-wav-receiver-websocket!== "object") continue;
        
        if(item.player_type === "P"){
            player = item;
        }else if(item.player_type === "C"){
            creature = item;
        }
    }
    
    var newRow = table.insertRow();
    newRow.insertCell().append(player.hp);
    newRow.insertCell().append(player.fire);
    newRow.insertCell().append(player.water);
    newRow.insertCell().append(player.plant);
    newRow.insertCell().append(player.dark);

    newRow.insertCell().append(creature.hp);
}

function toggleRecording( e ) {
    var rune_solved_pattern = document.getElementById("runes").value;
    if (e.classList.contains('recording')) {
        // stop recording
        e.classList.remove('recording');
        recording = false;
        // //socketio.emit('end-recording');
        // var dataToSend = {room_uuid: room_uuid, authorization: authorizationSample,
        //     "spell_type" : getSelectedValueById("spell_type"),
        //     "spell_level" : getSelectedValueById("spell_level"),
        //     "rune_solved_pattern" : rune_solved_pattern}
        // ;    
        // console.log("send sound from player completed:"+JSON.stringify(dataToSend));
        // socketio.emit('end-recording', dataToSend);

        // convert float audio data to 16-bit PCM
        console.log(float32Array)
        var buffer = new ArrayBuffer(float32Array.length * 2)
        var output = new DataView(buffer);
        for (var i = 0, offset = 0; i < float32Array.length; i++, offset += 2) {
            var s = Math.max(-1, Math.min(1, float32Array[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }

        let blob = new Blob([output.buffer], { type: "audio/wav" });
        console.log(blob);
        socketio.emit('send-audio', buffer);

    } else {
        // start recording
        e.classList.add('recording');
        recording = true;
        socketio.emit('start-recording', {numChannels: 1, 
            bps: 16, fps: parseInt(audioContext.sampleRate), 
            uuid: room_uuid, authorization: authorizationSample});
    }
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;

    audioInput = convertToMono( audioInput );
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    scriptNode = (audioContext.createScriptProcessor || audioContext.createJavaScriptNode).call(audioContext, 1024, 1, 1);

    scriptNode.onaudioprocess = function (audioEvent) {
        if (recording) {
            input = audioEvent.inputBuffer.getChannelData(0);
            float32Array = float32Concat(float32Array, input)
        }
    }
    inputPoint.connect(scriptNode);
    scriptNode.connect(audioContext.destination);

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
}

function float32Concat(first, second)
{
    var firstLength = first.length,
        result = new Float32Array(firstLength + second.length);

    result.set(first);
    result.set(second, firstLength);

    return result;
}


function initAudio() {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia({audio: true}, gotStream, function(e) {
        alert('Error getting audio');
        console.log(e);
    });
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function getSelectedValueById(id) {
    var e = document.getElementById(id);
    return new Number(e.value);
}

function updatePlayerInfo(data){
    var table = document.getElementById("player_information");   
    var firstRow = table.tBodies[0].children[0].children
    firstRow[0].innerText = data.player1_hp;
    firstRow[1].innerText = data.player1_fire;
    firstRow[2].innerText = data.player1_water;
    firstRow[3].innerText = data.player1_plant;
    firstRow[4].innerText = data.player1_dark;

}

function updateCreatureInfo(data){
    var table = document.getElementById("creature_information");
    var firstRow = table.tBodies[0].children[0].children
    firstRow[0].innerText = data.player2_hp;
    firstRow[1].innerText = "-";
    firstRow[2].innerText = "-";
    firstRow[3].innerText = "-";
    firstRow[4].innerText = "-";

}

function updateRoundEvent(data){
    var table = document.getElementById("round_events");
    
    var player;
    var creature;
    for(key in data){
        var item = data[key];
        if(typeof item !== "object") continue;
        
        if(item.player_type === "P"){
            player = item;
        }else if(item.player_type === "C"){
            creature = item;
        }
    }
    
    var newRow = table.insertRow();
    newRow.insertCell().append(player.round_number);
    if(player.turn_of === 0){
        newRow.insertCell().append("next");
    }else if(player.turn_of === 1){
        newRow.insertCell().append("waiting");
    }else{
        newRow.insertCell().append("computing");
    }
    newRow.insertCell().append(player.spell_type);
    newRow.insertCell().append(player.spell_level);
    newRow.insertCell().append(player.rune_solved_pattern);

    newRow.insertCell().append(creature.round_number);
    if(creature.turn_of === 0){
        newRow.insertCell().append("next");
    }else if(creature.turn_of === 1){
        newRow.insertCell().append("waiting");
    }else{
        newRow.insertCell().append("computing");
    }
}

function setMessage(message, idContainer, type){

    var container = document.getElementById(idContainer);
    var containerLocation = container.getBoundingClientRect();
    var height = container.clientHeight
    var width = container.clientWidth
    
    const para = document.createElement("p");
    para.id = idContainer+"_message"
    const node = document.createTextNode(message);
    para.appendChild(node);
    para.style.top = `${containerLocation.top+height-40}px`; 
    para.style.left = `${containerLocation.left+width/2}px`; 
    para.style.position = "absolute";
    para.style.fontSize = "xx-large";
    para.style.margin = "0px"; 
    para.style.color = type===1?"chartreuse":"red";
    para.style.backgroundColor = "black";
    
    container.appendChild(para);
}

function setCreatureName(name, idContainer){

    var container = document.getElementById(idContainer);
    var containerLocation = container.getBoundingClientRect();
    var height = container.clientHeight
    var width = container.clientWidth
    
    const para = document.createElement("p");
    para.id = "creature_name"
    const node = document.createTextNode(name);
    para.appendChild(node);
    para.style.top = `${containerLocation.top}px`; 
    para.style.left = `${containerLocation.left}px`; 
    para.style.position = "absolute";
    para.style.fontSize = "large";
    para.style.margin = "0px"; 
    
    container.appendChild(para);
}

window.addEventListener('load', initAudio );
