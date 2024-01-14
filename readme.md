# Goal

Recording wav file with riff header from browser and send it to the socket io server with nodejs

More than 2 days reading about how wav file is composed or it specfication. More than 100 tabs (a lot were closed)

<img src="/vlcsnap-2024-01-13-20h49m01s410.png" with=400>

## Sucess 

media-recorder-wav folder

## Useful links

- comin soon

## Raw links

- http://localhost:8090/default/
- http://localhost:8090/media-recorder-wav/
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=nodejs+create+wav+pcm
- https://stackoverflow.com/questions/10040317/getting-raw-pcm-data-from-webaudio-mozaudio
- https://www.google.com/search?q=send+blob+to+socket+io&client=ubuntu-sn&hs=RJq&sca_esv=597969321&channel=fs&sxsrf=ACQVn0-snHt1xIlP8WZpwkHvCy0-ttLE0w%3A1705103300316&ei=xM-hZYqmC7De1sQP8dyW0Ac&ved=0ahUKEwiKmI3khNmDAxUwr5UCHXGuBXoQ4dUDCA8&uact=5&oq=send+blob+to+socket+io&gs_lp=Egxnd3Mtd2l6LXNlcnAiFnNlbmQgYmxvYiB0byBzb2NrZXQgaW8yBhAAGBYYHkj9ClDLB1jDCXABeAGQAQCYAX2gAdoCqgEDMC4zuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/34056705/how-to-send-binary-data-with-socket-io
- https://www.google.com/search?q=vosk+%22rec.acceptWaveform%22+from+blob&client=ubuntu-sn&hs=RLr&sca_esv=597969321&channel=fs&sxsrf=ACQVn08H_MhGGRJNf3tcLLWQn3x--2-xGw%3A1705107269002&ei=RN-hZZLnPMHV1sQPw-eT-AI&ved=0ahUKEwiSmcrIk9mDAxXBqpUCHcPzBC8Q4dUDCA8&uact=5&oq=vosk+%22rec.acceptWaveform%22+from+blob&gs_lp=Egxnd3Mtd2l6LXNlcnAiI3Zvc2sgInJlYy5hY2NlcHRXYXZlZm9ybSIgZnJvbSBibG9iMgcQIxiuAhgnSOwGULgFWLgFcAF4AJABAJgBgwGgAYMBqgEDMC4xuAEDyAEA-AEBwgILEAAYgAQYogQYsAPCAgsQABiJBRiiBBiwA-IDBBgBIEGIBgGQBgI&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/68175694/how-to-use-wave-file-as-input-in-vosk-speech-recognition
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=ndoejs+blob+to+wav
- https://stackoverflow.com/questions/52021331/convert-blob-to-wav-file-without-loosing-data-or-compressing
- https://stackoverflow.com/questions/71632755/creating-a-wav-file-from-a-blob
- https://stackoverflow.com/questions/71268311/how-to-convert-blob-to-wav-file-in-javascript-and-connect-python-flask
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=vosk+nodejs
- https://github.com/solyarisoftware/voskJs
- https://www.npmjs.com/package/vosk
- https://github.com/alphacep/vosk-api/blob/master/nodejs/demo/test_simple.js
- https://www.google.com/search?q=nodejs+read+wav+from+file&client=ubuntu-sn&hs=mCC&sca_esv=597969321&channel=fs&sxsrf=ACQVn08WPz7Z3TKB6o5uO_zxNvKqe7FOXw%3A1705108009094&ei=KeKhZauaBbTi1AH4qJ3ABg&ved=0ahUKEwjr0r2pltmDAxU0MTUKHXhUB2gQ4dUDCA8&uact=5&oq=nodejs+read+wav+from+file&gs_lp=Egxnd3Mtd2l6LXNlcnAiGW5vZGVqcyByZWFkIHdhdiBmcm9tIGZpbGUyCBAhGKABGMMEMggQIRigARjDBEjDClDECFiHCXABeAGQAQCYAX6gAfkBqgEDMC4yuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/21285247/reading-wav-volume-data-in-node-js
- https://stackoverflow.com/questions/58990621/how-to-read-data-as-buffer-from-an-audio-file-as-soon-as-it-is-added-to-the-file
- https://www.google.com/search?q=mediarecorder+from+OggS+to+riff+javascript&client=ubuntu-sn&hs=Lar&sca_esv=597985947&channel=fs&sxsrf=ACQVn0_hYS667QbonYRsdVW9aiWSvL5ruA%3A1705108192588&ei=4OKhZZK-I93U1sQPopac2AM&ved=0ahUKEwiSrv2Al9mDAxVdqpUCHSILBzsQ4dUDCA8&uact=5&oq=mediarecorder+from+OggS+to+riff+javascript&gs_lp=Egxnd3Mtd2l6LXNlcnAiKm1lZGlhcmVjb3JkZXIgZnJvbSBPZ2dTIHRvIHJpZmYgamF2YXNjcmlwdEiyD1D8AViLDnABeAGQAQGYAcIBoAHlDKoBBDAuMTG4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIHECEYChigAcICBBAhGBXCAgkQIRgKGKABGAriAwQYACBBiAYBkAYI&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/58785295/use-javascript-to-record-audio-as-wav-in-chrome
- https://stackoverflow.com/questions/71936308/saving-an-audio-mediastream-into-a-file
- https://stackoverflow.com/questions/7607802/how-to-pack-ogg-audio-file-to-riff-container
- https://stackoverflow.com/questions/70730368/add-riff-header-to-a-buffer
- https://stackoverflow.com/questions/47331364/record-as-ogg-using-mediarecorder-in-chrome
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=%22new+Blob%22+riff+javascript
- https://stackoverflow.com/questions/48982045/i-have-a-file-that-is-encoded-in-riff-how-can-i-send-this-file-through-an-ajax
- https://www.google.com/search?q=blo+ogg+to+riff+javascript&client=ubuntu-sn&hs=i0W&sca_esv=597985947&channel=fs&sxsrf=ACQVn0-I2AkOMnztWuu3J-VwNQcZaaozHA%3A1705108544404&ei=QOShZYqZGMzL1sQPvZiZyAQ&ved=0ahUKEwiKud6omNmDAxXMpZUCHT1MBkkQ4dUDCA8&uact=5&oq=blo+ogg+to+riff+javascript&gs_lp=Egxnd3Mtd2l6LXNlcnAiGmJsbyBvZ2cgdG8gcmlmZiBqYXZhc2NyaXB0SKUSUMwBWOwQcAF4AJABAZgBsgGgAZELqgEEMC4xMbgBA8gBAPgBAcICDhAAGIAEGIoFGIYDGLADwgIFECEYoAHCAgcQIRgKGKAB4gMEGAEgQYgGAZAGAw&sclient=gws-wiz-serp#ip=1
- https://stackoverflow.com/questions/17531435/converting-wav-file-to-ogg-in-javascript
- https://stackoverflow.com/questions/61264581/how-to-convert-audio-buffer-to-mp3-in-javascript
- https://stackoverflow.com/questions/13227250/wav-string-to-html5-blob
- https://stackoverflow.com/questions/22560413/html5-web-audio-convert-audio-buffer-into-wav-file
- https://itecnote.com/tecnote/javascript-record-audio-on-web-preset-16000hz-16bit/
- https://github.com/mattdiamond/Recorderjs
- https://mido22.github.io/MediaRecorder-sample/
- https://github.com/Mido22/MediaRecorder-sample/blob/master/script.js
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=bad+%22chunk+id%22%3A+expected+%22RIFF%22+or+%22RIFX%22%2C+got+%22OggS%22+#ip=1
- https://stackoverflow.com/questions/55399388/extract-wav-header-on-javascript-frontend-reactjs
- https://webaudio.github.io/web-audio-api/
- https://stackoverflow.com/questions/49537639/riff-icmt-tag-size-doesnt-seem-to-match-data
- https://stackoverflow.com/questions/31038721/reading-wav-header-renders-wrong-data
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=javascript+MediaRecorder+riff
- https://stackoverflow.com/questions/70603475/header-missing-error-while-playing-mp3-wav-files-recorded-using-mediarecorder-on
- https://stackoverflow.com/questions/41918946/html5-audio-recording-too-large
- https://stackoverflow.com/questions/60835968/how-to-delete-part-of-media-recorder
- https://www.google.com/search?q=javascript+add+riff+header&client=ubuntu-sn&hs=C1N&sca_esv=598151369&channel=fs&sxsrf=ACQVn0-Uqwu1brozokF9nu_ODlq4wdXWsA%3A1705153419918&ei=i5OiZbrGN8zm1sQP2LmagAU&ved=0ahUKEwj6t4a_v9qDAxVMs5UCHdicBlAQ4dUDCA8&uact=5&oq=javascript+add+riff+header&gs_lp=Egxnd3Mtd2l6LXNlcnAiGmphdmFzY3JpcHQgYWRkIHJpZmYgaGVhZGVyMgUQIRigATIFECEYoAFI1w1QuAdYzwxwAngBkAEAmAGMAaABswWqAQMwLja4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIHECEYChigAeIDBBgAIEGIBgGQBgQ&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/44157643/creating-a-wav-file-in-js-not-a-wave-file-no-riff-header
- https://stackoverflow.com/questions/55082197/how-do-you-add-a-header-to-wav-file
- http://soundfile.sapp.org/doc/WaveFormat/
- https://gist.github.com/also/900023
- https://www.google.com/search?q=wav+inspect+linux&client=ubuntu-sn&hs=Lki&sca_esv=598151369&channel=fs&sxsrf=ACQVn0_DvGrQExcLuqQX88yjFnUa84zbsw%3A1705153657402&ei=eZSiZe2zEOLf1sQPoO-V2AQ&ved=0ahUKEwit1J2wwNqDAxXir5UCHaB3BUsQ4dUDCA8&uact=5&oq=wav+inspect+linux&gs_lp=Egxnd3Mtd2l6LXNlcnAiEXdhdiBpbnNwZWN0IGxpbnV4MgQQIxgnSMoSUIQIWKIOcAJ4AZABAJgBhgGgAZIGqgEDMS42uAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICCBAhGKABGMMEwgIKECEYChigARjDBOIDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/47905083/how-to-check-number-of-channels-in-my-audio-wav-file-using-ffmpeg-command
- https://www.google.com/search?q=javascrtip+writeString%28%27RIFF%27%29+wav&client=ubuntu-sn&hs=pS3&sca_esv=598151369&channel=fs&sxsrf=ACQVn09lkXUi-U0radikZ1yHbZ4BbM1hFw%3A1705153854341&ei=PpWiZZq1FOzg1sQPlviXsAY&ved=0ahUKEwiazJmOwdqDAxVssJUCHRb8BWYQ4dUDCA8&uact=5&oq=javascrtip+writeString%28%27RIFF%27%29+wav&gs_lp=Egxnd3Mtd2l6LXNlcnAiImphdmFzY3J0aXAgd3JpdGVTdHJpbmcoJ1JJRkYnKSB3YXYyBxAhGAoYoAFI4QxQEljDC3ABeAGQAQCYAZkBoAGeBKoBAzAuNLgBA8gBAPgBAcICChAAGEcY1gQYsAPiAwQYACBBiAYBkAYI&sclient=gws-wiz-serp
- https://devtails.xyz/@adam/how-to-write-a-wav-file-in-javascript
- https://docs.fileformat.com/audio/wav/
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=offset+is+outside+the+bounds+of+the+DataView
- https://stackoverflow.com/questions/63466278/offset-is-outside-the-bounds-of-the-dataview-the-debugger-shows-it-is-inside-th
- https://www.google.com/search?q=%22MediaRecorder%22+riff+header+javascript&client=ubuntu-sn&hs=yr5&sca_esv=598179004&channel=fs&sxsrf=ACQVn0_wBFPE0guIvO3SWnkYkzA51g_faA%3A1705163101327&ei=XbmiZZbBE-3W1sQPs7yC8Ao&ved=0ahUKEwjW48DH49qDAxVtq5UCHTOeAK4Q4dUDCA8&uact=5&oq=%22MediaRecorder%22+riff+header+javascript&gs_lp=Egxnd3Mtd2l6LXNlcnAiJiJNZWRpYVJlY29yZGVyIiByaWZmIGhlYWRlciBqYXZhc2NyaXB0MgUQIRigAUiwElBRWKAQcAF4AZABAJgBnAGgAccKqgEEMC4xMbgBA8gBAPgBAcICChAAGEcY1gQYsAPCAgcQIRgKGKAB4gMEGAAgQYgGAZAGCA&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/4777181/creating-a-wav-file-from-raw-pcm-data-using-the-android-sdk
- https://stackoverflow.com/questions/5245497/how-to-record-wav-format-file-in-android
- https://stackoverflow.com/questions/28969304/record-audio-on-web-preset-16000hz-16bit
- https://github.com/ai/audio-recorder-polyfill/issues/7
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=%22Uint16Array%22+from+buffer+wav
- https://stackoverflow.com/questions/62172398/convert-audiobuffer-to-arraybuffer-blob-for-wav-download
- https://stackoverflow.com/questions/35234551/javascript-converting-from-int16-to-float32
- https://stackoverflow.com/questions/25775704/html5-audio-api-inputbuffer-getchanneldata-to-audio-array-buffer
- https://stackoverflow.com/questions/43505524/nodejs-convert-int16array-binary-buffer-to-linear16-encoded-raw-stream-for-googl
- https://stackoverflow.com/questions/61713330/is-there-a-good-way-to-play-raw-wav-data-in-the-browser
- https://github.com/node-fetch/node-fetch/issues/905
- https://www.google.com/search?q=javascript+mediarecorder+get+buffer+sound&client=ubuntu-sn&hs=Bg6&sca_esv=598187869&channel=fs&sxsrf=ACQVn0_KWyPnw2kwWxsQ6g0F03XPBQn_SQ%3A1705166214582&ei=hsWiZaiBI5yr1sQPoICkiAw&ved=0ahUKEwio3IKU79qDAxWclZUCHSAACcEQ4dUDCA8&uact=5&oq=javascript+mediarecorder+get+buffer+sound&gs_lp=Egxnd3Mtd2l6LXNlcnAiKWphdmFzY3JpcHQgbWVkaWFyZWNvcmRlciBnZXQgYnVmZmVyIHNvdW5kMggQABiABBiiBEiNIVC8Cli9HXABeAGQAQGYAZ8BoAHVCqoBBDAuMTG4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIHECMYsAIYJ-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/52775422/how-can-i-get-audio-frame-buffer-from-mediarecorder-class
- https://stackoverflow.com/questions/40363335/how-to-create-an-audiobuffer-from-a-blob
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=get+buffer+from+blob+javascript
- https://stackoverflow.com/questions/34158497/convert-blob-data-to-raw-buffer-in-javascript-or-node
- https://www.google.com/search?q=%22MediaRecorder%22+get+chanel+and+samplerate+javascript&client=ubuntu-sn&hs=506&sca_esv=598195629&channel=fs&sxsrf=ACQVn0_4DeuQ4k08a5-iaxQCIoWsNjlgLQ%3A1705167510055&ei=lsqiZdL3AvXV1sQPtpilwAY&ved=0ahUKEwjSmuD989qDAxX1qpUCHTZMCWgQ4dUDCA8&uact=5&oq=%22MediaRecorder%22+get+chanel+and+samplerate+javascript&gs_lp=Egxnd3Mtd2l6LXNlcnAiNCJNZWRpYVJlY29yZGVyIiBnZXQgY2hhbmVsIGFuZCBzYW1wbGVyYXRlIGphdmFzY3JpcHQyCRAhGAoYoAEYCjIJECEYChigARgKSMoOUMMBWJsNcAF4AJABAJgBrwGgAbEJqgEDMC45uAEDyAEA-AEBwgIHECEYChigAcICBBAhGBXiAwQYASBBiAYB&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/62392352/mediadevices-getusermedia-how-can-i-set-audio-constraints-sampling-rate-bit-d
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=javascript+encode+wav+with+riff#ip=1
- https://stackoverflow.com/questions/35828284/encoding-8-bit-wav-in-javascript-using-matt-diamonds-recorder-js
- https://itecnote.com/tecnote/converting-wav-file-to-ogg-in-javascript/
- https://www.google.com/search?q=ffprobe+get+file+info&client=ubuntu-sn&hs=xp9&sca_esv=598217727&channel=fs&sxsrf=ACQVn0-aUIke4QBDVJRb3NJm8-QuJQT_IQ%3A1705178352949&ei=8PSiZY64OcTU1sQPl5O54AY&ved=0ahUKEwiO8IWwnNuDAxVEqpUCHZdJDmwQ4dUDCA8&uact=5&oq=ffprobe+get+file+info&gs_lp=Egxnd3Mtd2l6LXNlcnAiFWZmcHJvYmUgZ2V0IGZpbGUgaW5mbzIFEAAYgAQyBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzILEAAYgAQYigUYhgNIu7MHUOwDWJOyB3ABeACQAQCYAbQBoAHWD6oBBDMuMTS4AQPIAQD4AQHCAggQABgHGB4YCsICCBAAGAcYHhgPwgIHEAAYgAQYCsICCxAAGIAEGIoFGJECwgIEEAAYHsICBhAAGAgYHsICBhAAGAcYHsICChAAGIAEGBQYhwLiAwQYASBBiAYB&sclient=gws-wiz-serp
- https://stackoverflow.com/questions/67318354/how-to-get-ffprobe-metadata-as-variable-to-parse-in-python
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=ffpmeg+get+file+details#ip=1
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=%22Float32Array%22+oush+append
- https://stackoverflow.com/questions/24410418/push-on-float32array
- https://stackoverflow.com/questions/12033354/how-can-i-efficiently-insert-a-float32array-into-a-float32array
- https://stackoverflow.com/questions/4554252/typed-arrays-in-gecko-2-float32array-concatenation-and-expansion
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=favicon+sample+
- https://www.google.com/search?q=this.mediaRecorder.onstop+javascript&client=ubuntu-sn&hs=0up&sca_esv=598228095&channel=fs&sxsrf=ACQVn0__RAmyjow67A1hrbvBIYSR3sixaw%3A1705181225591&ei=KQCjZcLgI_mq1sQPus-94A4&ved=0ahUKEwiCmeqJp9uDAxV5lZUCHbpnD-wQ4dUDCA8&uact=5&oq=this.mediaRecorder.onstop+javascript&gs_lp=Egxnd3Mtd2l6LXNlcnAiJHRoaXMubWVkaWFSZWNvcmRlci5vbnN0b3AgamF2YXNjcmlwdDIFECEYoAEyBRAhGKABSLoRUExYtBBwAXgAkAEAmAHhAqABvguqAQgwLjEwLjAuMbgBA8gBAPgBAcICCBAAGIAEGKIEwgIHECEYChigAeIDBBgBIEGIBgE&sclient=gws-wiz-serp#ip=1
- https://dev.to/ethand91/mediarecorder-api-tutorial-54n8
- https://github.com/ethand91/mediarecorder-localfile-sample/blob/master/public/main.js
- https://stackoverflow.com/questions/28874759/force-firefox-not-to-change-file-extension
- https://www.google.com/search?channel=fs&client=ubuntu-sn&q=firefox+change+to+ogx