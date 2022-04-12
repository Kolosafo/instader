import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/Screens/Home';
import Downloads from './src/Screens/Downloads';
import playScreen from './src/Screens/playScreen';
import {LogBox} from 'react-native';
import React, {useEffect} from "react";
import AppName from './src/Components/AppName';



LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const navigator = createStackNavigator(
  

  {
    HomePage: Home,
    DownloadsPage: Downloads,
    PlayVideoPage: playScreen,
  },
  {
    initialRouteName: 'HomePage',
    defaultNavigationOptions: {
      headerTitle: () => <AppName />,
      headerStyle: {
        backgroundColor: '#91d6e2',
      },
    },
  },
);

export default createAppContainer(navigator);
