import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconSearch from 'react-native-vector-icons/FontAwesome';


const SearchBar = ({term, onTermChange, onTermSubmit}) => {
  const [clearText, setClear] = useState(false);

  //function to immediately unclear it for paste to work
  return (
    <View style={styles.backgroundStyle}>
      <IconSearch name="search" size={24} style={styles.iconStyle} />

      <TextInput
        style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        value={clearText ? (term = '') : term}
        onChangeText={newTerm => {
          onTermChange(newTerm), setClear(false), console.log(newTerm);
        }}
        onEndEditing={setTerm => onTermSubmit(setTerm)}
        returnKeyLabel="Search"
      />
      <TouchableOpacity
        onPress={() => setClear(true)}
        style={styles.clearStyle}>
        <Icon name="closecircle" size={22} style={{color:'black'}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    height: 50,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 5,
    flexDirection: 'row',
    marginBottom: 10,
    alignContent: 'center',
    width: '85%',
    backgroundColor:'#ccd4d5'

  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  iconStyle: {
    marginVertical: 9,
    marginHorizontal: 10,
    fontSize: 30,
    alignSelf: 'center',
    color:'gray'

  },
  clearStyle: {
    borderRadius: 100,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});
export default SearchBar;
