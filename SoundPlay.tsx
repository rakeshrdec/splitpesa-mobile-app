import React, {useState, useRef} from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [audioPath, setAudioPath] = useState('');
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

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

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{recordTime}</Text>
      {!recording ? (
        <Pressable style={styles.btnStyle}  onPress={startRecording}><Text>"Start Recording"</Text></Pressable>
      ) : (
        <Pressable style={styles.btnStyle} onPress={stopRecording}><Text>"Stop Recording"</Text></Pressable>
      )}
      {audioPath && <Pressable style={styles.btnStyle} onPress={playRecording} ><Text>"Play Recording"</Text></Pressable>}
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
