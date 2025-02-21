import React, {useState, useRef} from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import YTMusic from "ytmusic-api"

// import YoutubeMusicApicAll from './src/youtube_music';



const App = () => {
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [audioPath, setAudioPath] = useState('');
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

  async function youtubeSearchApi(payload)
  {
    console.log(payload);
    YoutubeMusicApicAll()
    
    // const ytmusic = new YTMusic()
    // await ytmusic.initialize(/* Optional: Custom cookies */)

    // ytmusic.search("Never gonna give you up").then(songs => {
    //   console.log(songs)
    // })

  }
  function timeToMilliseconds(timeString) {
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);

    const totalMilliseconds = 
      (minutes * 60 * 1000) + 
      (seconds * 1000) + 
      milliseconds;
  
    return totalMilliseconds;
  }

  const startRecording = async () => {
    setRecording(true);
    const path = 'sound.mp4'; // File name
    // const audioSet = {
    //   AudioEncoderAndroid: AudioRecorderPlayer.AudioEncoderAndroidType.AAC,
    //   AudioSourceAndroid: AudioRecorderPlayer.AudioSourceAndroidType.MIC,
    //   AVModeIOS: AudioRecorderPlayer.AVModeIOS.playAndRecord,
    // };
    const result = await audioRecorderPlayer.startRecorder();
    console.log("This is log for stop recording :"+result); 
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
  };

  const stopRecording = async () => {
    console.log("stop recording function called");    
    setRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    console.log("This is log for stop recording :"+result);    
    audioRecorderPlayer.removeRecordBackListener();
    setAudioPath(result);
  };

  const playRecording = async () => {
    console.log("in the play record");
    
    if (audioPath) {
      console.log("received audio path"+audioPath);
      await audioRecorderPlayer.startPlayer(audioPath);
      playBackGroundMusic()
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
          audioRecorderPlayer.stopPlayer();
          audioRecorderPlayer.removePlayBackListener();
        }
      });
    }
    else
    {
        console.log("There is no audio path to play the music");
        
    }
  };

  async function playBackGroundMusic() {

    console.log("This is play time "+recordTime);
    
    // Import the react-native-sound module
    var Sound = require('react-native-sound');

    // Enable playback in silence mode
    Sound.setCategory('Playback');

    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var whoosh = new Sound('vlog_music.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

     // Reduce the volume by half
     whoosh.setVolume(0.2);

     // Position the sound to the full right in a stereo field
     whoosh.setPan(0.5);
 
    // Play the sound with an onEnd callback
    whoosh.play((success) => {
        if (success) {
        console.log('successfully finished playing');
        } else {
        console.log('playback failed due to audio decoding errors');
        }
    });
    });

    const milliseconds = timeToMilliseconds(recordTime);
    console.log("it will stop after this time in ms"+milliseconds);

    setTimeout(()=>{
        console.log("time out function started");
        
        whoosh.stop()
    },milliseconds)

    // Reduce the volume by half
    whoosh.setVolume(0.2);

    // Position the sound to the full right in a stereo field
    whoosh.setPan(0.5);

    // // Loop indefinitely until stop() is called
    // whoosh.setNumberOfLoops(-1);

    // // Get properties of the player instance
    // console.log('volume: ' + whoosh.getVolume());
    // console.log('pan: ' + whoosh.getPan());
    // console.log('loops: ' + whoosh.getNumberOfLoops());

    // // Seek to a specific point in seconds
    // whoosh.setCurrentTime(2.5);

    // // Get the current playback point in seconds
    // whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));

    // // Pause the sound
    // whoosh.pause();

    // // Stop the sound and rewind to the beginning
    // whoosh.stop(() => {
    // // Note: If you want to play a sound after stopping and rewinding it,
    // // it is important to call play() in a callback.
    // whoosh.play();
    // });

    // // Release the audio player resource
    // whoosh.release();
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{'recordTime'}</Text>
      {/* {!recording ? (
        <Pressable style={styles.btnStyle}  onPress={startRecording}><Text>"Start Recording"</Text></Pressable>
      ) : (
        <Pressable style={styles.btnStyle} onPress={stopRecording}><Text>"Stop Recording"</Text></Pressable>
      )}
      {audioPath && <Pressable style={styles.btnStyle} onPress={playRecording} ><Text>"Play Recording"</Text></Pressable>}
      <View style={{width:'100%',height:100,bottom:50, position:'absolute'}}>
        <Pressable style={styles.btnStyle} onPress={()=>{youtubeSearchApi("searched song")}}><Text>search song on</Text></Pressable>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  btnStyle: {
    margin:10,
    backgroundColor:'lightgray',
    borderRadius:10,
    padding:10
  }
});

export default App;
