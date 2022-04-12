import {StyleSheet, View} from 'react-native';
import React from 'react';
import VideoPlayer from 'react-native-video-player';

const playScreen = ({navigation}) => {
  const uri = navigation.getParam('paramKey');
  //   console.log(uri);
  return (
    <View style={styles.Container}>
      <VideoPlayer
        video={{
          //if url does exist pass url as video uri else return Null
          uri: uri,
        }}
        autoplay
        showDuration
        resizeMode="contain"
        fullscreen
        style={styles.videoStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoStyle: {
    height: '100%',
  },
  Container: {
    flex: 1,
  },
});

export default playScreen;
