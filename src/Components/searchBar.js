import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import IconSearch from 'react-native-vector-icons/FontAwesome';


const SearchBar = ({term, onTermChange, onTermSubmit}) => {

  //function to immediately unclear it for paste to work
  return (
    <View style={styles.backgroundStyle}>
      <IconSearch name="search" size={24} style={styles.iconStyle} />

      <TextInput
        style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        value={term}
        onChangeText={newTerm => {
          onTermChange(newTerm), console.log(newTerm);
        }}
        onEndEditing={setTerm => onTermSubmit(setTerm)}
        returnKeyLabel="Search"
      />
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
