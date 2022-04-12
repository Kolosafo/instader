import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {videoApi} from '../functions/videoApi';
import SearchBar from '../Components/searchBar';
import Video_Player from '../Components/videoPlayer';
import RNFetchBlob from 'rn-fetch-blob';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getUniqueId} from 'react-native-device-info';
import {addSaved} from '../functions/saveToDatabase';
import Body from '../Components/Body';
import Footer from '../Components/Footer';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4   <---- Sample Video
const Home = ({navigation}) => {
  const [data, setData] = useState('');
  const [inputUrl, setUrl] = useState('');
  const [downloading, setDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log('TESTING DATA ->', data);
  const IDENTIFIER = 'Insta-' + getUniqueId();
  console.log(IDENTIFIER);
  const VIDEO_URL =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';

    useEffect(() => {
      SplashScreen.hide();
    }, [])
  const checkPermission = async url => {
    setDownload(true);
    if (Platform.OS === 'ios') {
      downloadVideo();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Media',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted!');
          downloadVideo(url);
        } else {
          alert('Storage Permission Not Granted!');
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const instader = RNFetchBlob.fs.dirs.DCIMDir + '/Instader';
  RNFetchBlob.fs
    .mkdir(instader)
    .then(res => {
      console.log('res ->', res);
      setFolder(res);
    })
    .catch(err => {
      console.log('error!!', err);
    });

  const downloadVideo = url => {
    // let date = Date.now();
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    const date = month + '-' + day + '-' + year
    let video_url = url;

    //get config and fs from RNFetchBlob
    const {config, fs} = RNFetchBlob;
    let VideoDir = instader;
    console.log(VideoDir);
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: VideoDir + '/insta-' + date + '.mp4',
        description: 'Video',
        indicator: true,
      },
    };
    config(options)
      .fetch('GET', video_url)
      .then(res => {
        //Show alert on successful download
        setDownload(undefined);
        console.log('res ->', JSON.stringify(res));
        Toast.show({
          type: 'info',
          text1: 'Info',
          text2: 'Video Downloaded Successfully!',
          autoHide: true,
          visibilityTime: 2000,
        }),
          ToastAndroid.showWithGravity(
            'Video Downloaded Successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
      })
      .catch(e => {
        setDownload(null);
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const fetcher = videoUrl => {
    const {url, options} = videoApi(videoUrl);
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        console.log('JSONNNNN  -->', json);
        setLoading(false)
        if (json.length === 0){
          ToastAndroid.showWithGravity(
            'Invalid URL',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          )
          setData('')
            }else{setData(json)}
        
      })
      .catch(err =>
        console.error(
          Toast.show({
            type: 'info',
            text1: 'Info',
            text2: 'Something went wrong, please try again!',
            autoHide: true,
            visibilityTime: 2000,
          }),
          ToastAndroid.showWithGravity(
            'Something went wrong, please try again!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          ),
        ),
      );

    // console.log('Data -->', data);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    // console.log(text); https://www.instagram.com/tv/Cb8eKJoD6Tn/?utm_source=ig_web_copy_link
    let regex =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(text)) {
      setLoading(false);
      Toast.show({
        type: 'info',
        text1: 'Info',
        text2: 'COPIED TEXT IS NOT A VALID URL',
        autoHide: true,
        visibilityTime: 2000,
      });
      ToastAndroid.showWithGravity(
        'COPIED TEXT IS NOT A VALID URL',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      Toast.show({
        type: 'info',
        text1: 'Info',
        text2: 'Loading... Please Wait',
        autoHide: true,
        visibilityTime: 5000,
      });
      ToastAndroid.showWithGravity(
        'Loading... Please Wait',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );

      console.log(text);
      fetcher(text);
      setUrl(text);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchCopiedText();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={-100}>
      <SafeAreaView style={styles.safeAreaStytle}>
        <View style={styles.container}>
          {/* TODO:  Add clear and paste icons or button to search bar */}
          {/* TODO:  Import Video_Player and destructure {data} as its prop */}
          <View style={styles.searchStyle}>
            <SearchBar
              term={inputUrl}
              onTermChange={setUrl}
              onTermSubmit={() => {
                fetcher(inputUrl), setLoading(true);
              }}
            />
            <View style={styles.pasteView}>
              <TouchableOpacity
                onPress={() => {
                  fetchCopiedText(), setLoading(true);
                }}>
                <Icon name="paste" size={22} color={'green'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentStyle}>
            {data === '' ? (
              loading === false ? (
                <View style={styles.BodyStyle}>
                  <Body />
                </View>
              ) : (
                <View style={styles.loadingStyle}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
              )
            ) : (
              <>
                <View style={styles.VideoContainer}>
                  <Video_Player url={data.video} />
                </View>
                {downloading === false ? (
                  <TouchableOpacity
                    onPress={() => {
                      addSaved(IDENTIFIER, inputUrl);
                      checkPermission(data.video);
                    }}
                    style={styles.saveStyles}>
                    <Text style={{color: 'white'}}> DOWNLOAD </Text>
                  </TouchableOpacity>
                ) : downloading === true ? (
                  <TouchableOpacity style={styles.saveStyles}>
                    <Text style={{color: 'white'}}> DOWNLOADING... </Text>
                  </TouchableOpacity>
                ) : downloading === undefined ? (
                  <TouchableOpacity
                    onPress={() => {
                      // addSaved(USER_ID, InputUrl);
                      checkPermission(VIDEO_URL);
                    }}
                    style={styles.saveStyles}>
                    <Text style={{color: 'white'}}> RE-DOWNLOAD </Text>
                  </TouchableOpacity>
                ) : null}
              </>
            )}
          </View>

          <View style={styles.footerStyle}>
            <Footer navigation={navigation} progress={downloading} />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeAreaStytle: {
    flex: 1,
    paddingTop: -100,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
    backgroundColor: '#91d6e2',
  },
  contentStyle: {
    borderColor: 'red',
    // height: 500,
    marginBottom: 10,
    flex: 8,
  },
  VideoContainer: {
    borderWidth: 0,
    borderColor: 'black',
    justifyContent: 'center',
  },
  BodyStyle: {
    flex: 1,
    borderColor: 'green',
  },
  footerStyle: {
    flex: 1,
    borderColor: 'red',
    justifyContent: 'flex-end',
  },
  saveStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#405ded',
    height: 60,
    marginHorizontal: 10,
  },
  pasteText: {
    color: 'green',
  },
  searchStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  pasteView: {
    backgroundColor: '#d3dbdc',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    width: '12%',
    justifyContent: 'center',
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Home;
