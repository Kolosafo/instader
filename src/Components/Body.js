import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import bodyImage from '../assets/bodyImage.png'
import Icon from 'react-native-vector-icons/Ionicons';

const Body = () => {
  return (
    <View style={styles.bodyStyle}>
      <Image source={bodyImage} style={styles.imageStyles} />
      <View style={styles.InfoStyle}>
        <Text style={styles.textStyle}>
          <Icon name="information-circle-sharp" size={24} /> Open Instagram App
        </Text>
        <Text style={styles.textStyle}>
          <Icon name="information-circle-sharp" size={24} /> Find The Reel or Video
          You'd Like To Download
        </Text>
        <Text style={styles.textStyle}>
          <Icon name="information-circle-sharp" size={24} /> Click Share
        </Text>
        <Text style={styles.textStyle}>
          <Icon name="information-circle-sharp" size={24} /> "Copy Link"
        </Text>
        <Text style={styles.textStyle}>
          <Icon name="information-circle-sharp" size={24} /> Paste the link on
          the search bar above
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageStyles: {
    width: 305,
    height: 340,
    // borderColor:'red',
    // borderWidth: 3,
    alignSelf: 'center',
  },
  bodyStyle: {
    borderColor: 'red',
    borderWidth: 0,
    backgroundColor: '#1b3c42',
  },
  InfoStyle: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default Body;
