import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';

// import CircularProgress from "react-native-circular-progress-indicator";

const Footer = ({progress, navigation}) => {
  //DOWNLOADD PROGRESS
  const checkProgress = progress;
  return (
    <View style={styles.footerStyle}>
      <View style={styles.navStyle}>
        <TouchableOpacity
          style={styles.homeStyle}
          onPress={() => navigation.navigate('HomePage')}>
          <Icon style={styles.homeIconStyle} name="home" size={24} color='black'/>
          <Text style={{color: 'black'}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.progressIconStyle}>
          {checkProgress === false ? (
            <View>
              <Icon2
                style={styles.progressIconStyle}
                name="progress-download"
                size={24}
                color="black"
              />

              <Text style={{color: 'black'}}> Progress </Text>
            </View>
          ) : checkProgress === true ? (
            <View style={styles.iconView}>
              <Icon2 name="progress-clock" size={30} color="red" />
              <Text style={{color: 'black'}}>   Saving...</Text>
            </View>
          ) : checkProgress === undefined ? (
            <View style={styles.iconView}>
              <Icon2 name="progress-check" size={28} color="green" />
              <Text style={{color: 'black'}}> Saved!</Text>

            </View>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DownloadsPage')}>
          <Icon3
            style={styles.downloadsIconStyle}
            name="clouddownload"
            size={24}
            color="black"
          />
          <Text style={{color: 'black'}}>Downloads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerStyle: {
    height: 54,
    width: 350,
    marginHorizontal: 16,
    alignSelf: 'center',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: '#e8e8e8',
    borderColor: 'black',

  },
  navStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 4,
  },
  homeIconStyle: {
    marginLeft: 10,
  },
  progressIconStyle: {
    marginLeft: 19,
  },
  downloadsIconStyle: {
    marginLeft: 26,
  },
  iconView: {
    alignItems: 'center',
  },
});
export default Footer;
