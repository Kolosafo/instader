import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const AppName = () => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>INSTADER</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 0,
    borderWidth: 0
  },
  textStyle: {
    fontSize: 44,
    color: 'white',
    alignSelf: 'center',
    marginVertical: 0,
    fontFamily:'Bungee-Regular'
  },

});
export default AppName;
