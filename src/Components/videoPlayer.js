import VideoPlayer from 'react-native-video-player';

import {View} from 'react-native';
import React from 'react';

const Video_Player = ({url}) => {

  console.log('Video Url ->', url)
  return (
    <View>
      <VideoPlayer
        video={{
          //if url does exist pass url as video uri else return Null
          uri: url 
        }}
        videoWidth={1080}
        videoHeight={1080}
        autoplay
        showDuration
        resizeMode='contain'
        pictureInPicture={false}
        playInBackground={false}
      />
    </View>
  );
};

export default Video_Player;
