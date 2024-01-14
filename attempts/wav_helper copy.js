function writeString(s, a, offset) {
    for (let i = 0; i < s.length; ++i) {
        a[offset + i] = s.charCodeAt(i);
    }
}

function writeInt16(n, a, offset) {
    n = Math.floor(n);

    let b1 = n & 255;
    let b2 = (n >> 8) & 255;

    a[offset + 0] = b1;
    a[offset + 1] = b2;
}

function writeInt32(n, a, offset) {
    n = Math.floor(n);
    let b1 = n & 255;
    let b2 = (n >> 8) & 255;
    let b3 = (n >> 16) & 255;
    let b4 = (n >> 24) & 255;

    a[offset + 0] = b1;
    a[offset + 1] = b2;
    a[offset + 2] = b3;
    a[offset + 3] = b4;
}

// Return the bits of the float as a 32-bit integer value.  This
// produces the raw bits; no intepretation of the value is done.
function floatBits(f) {
    let buf = new ArrayBuffer(4);
    new Float32Array(buf)[0] = f;
    let bits = new Uint32Array(buf)[0];
    // Return as a signed integer.
    return bits | 0;
}

function writeAudioBuffer(audioBuffer, a, offset, asFloat) {
    let n = audioBuffer.length;
    // let n = audioBuffer.reduce((a, b) => a + b.length, 0);
    let channels = audioBuffer.numberOfChannels;
    // let channels = audioBuffer.length;

    for (let i = 0; i < n; ++i) {
        for (let k = 0; k < channels; ++k) {
            let buffer = audioBuffer.getChannelData(k);
            // let buffer = audioBuffer[k];
            if (asFloat) {
                let sample = floatBits(buffer[i]);
                writeInt32(sample, a, offset);
                offset += 4;
            } else {
                let sample = buffer[i] * 32768.0;

                // Clip samples to the limitations of 16-bit.
                // If we don't do this then we'll get nasty wrap-around distortion.
                if (sample < -32768) sample = -32768;
                if (sample > 32767) sample = 32767;

                writeInt16(sample, a, offset);
                offset += 2;
            }
        }
    }
}

// See http://soundfile.sapp.org/doc/WaveFormat/ and
// http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html
// for a quick introduction to the WAVE PCM format.
function createWaveFileData(audioBuffer, asFloat) {
    let bytesPerSample = asFloat ? 4 : 2;
    let frameLength = audioBuffer.length; // audioBuffer[0].length
    let numberOfChannels = audioBuffer.numberOfChannels; // audioBuffer.length
    let sampleRate = audioBuffer.sampleRate; // ac.sampleRate; sampleRate
    let bitsPerSample = 8 * bytesPerSample;
    let byteRate = (sampleRate * numberOfChannels * bitsPerSample) / 8;
    let blockAlign = (numberOfChannels * bitsPerSample) / 8;
    let wavDataByteLength = frameLength * numberOfChannels * bytesPerSample;
    let headerByteLength = 44;
    let totalLength = headerByteLength + wavDataByteLength;

    let waveFileData = new Uint8Array(totalLength);

    let subChunk1Size = 16; // for linear PCM
    let subChunk2Size = wavDataByteLength;
    let chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);

    writeString('RIFF', waveFileData, 0);
    writeInt32(chunkSize, waveFileData, 4);
    writeString('WAVE', waveFileData, 8);
    writeString('fmt ', waveFileData, 12);

    writeInt32(subChunk1Size, waveFileData, 16); // SubChunk1Size (4)
    // The format tag value is 1 for integer PCM data and 3 for IEEE
    // float data.
    writeInt16(asFloat ? 3 : 1, waveFileData, 20); // AudioFormat (2)
    writeInt16(numberOfChannels, waveFileData, 22); // NumChannels (2)
    writeInt32(sampleRate, waveFileData, 24); // SampleRate (4)
    writeInt32(byteRate, waveFileData, 28); // ByteRate (4)
    writeInt16(blockAlign, waveFileData, 32); // BlockAlign (2)
    writeInt32(bitsPerSample, waveFileData, 34); // BitsPerSample (4)

    writeString('data', waveFileData, 36);
    writeInt32(subChunk2Size, waveFileData, 40); // SubChunk2Size (4)

    // Write actual audio data starting at offset 44.
    writeAudioBuffer(audioBuffer, waveFileData, 44, asFloat);

    return waveFileData;
}

function int16ToFloat32(inputArray) {
    const output = new Float32Array(inputArray.length);
    for (let i = 0; i < output.length; i++) {
        const int = inputArray[i];
        // If the high bit is on, then it is a negative number, and actually counts backwards.
        const float =
            int >= 0x8000 ? -(0x10000 - int) / 0x8000 : int / 0x7fff;
        output[i] = float;
    }
    return output;
}

function createWav(chunks) {
    const ac = new AudioContext({
        sampleRate: 22050,
        latencyHint: 1,
    });

    const uint16 = new Uint16Array(chunks);
    const floats = int16ToFloat32(uint16);

    const buffer = new AudioBuffer({
        numberOfChannels: 1,
        length: floats.byteLength,
        sampleRate: ac.sampleRate,
    });

    buffer.getChannelData(0).set(floats);

    let wavData = createWaveFileData(buffer, false);

    let blob = new Blob([wavData], { type: 'audio/wav' });

    ac.close();

    return blob;
}

