import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const VideoCard = props => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('PlayVideoPage', {
            paramKey: props.uris,
          });
        }}
        style={styles.PlayBTN}>
        <View style={styles.Container}>
          <View style={styles.BTNStyle}>
            <Icon name="play" size={60} color={'green'} />
          </View>
          <Text style={styles.TextStyle}> {props.fileName}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  PlayBTN: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    flex: 1,
    height: 100,
    width: '90%',
    borderRadius: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  BTNStyle: {
    marginLeft: '8%',

  },

  TextStyle: {
    marginRight: '8%',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },

});
export default VideoCard;
