import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import VideoCard from '../Components/fullScreenPlayer';
import InAppReview from 'react-native-in-app-review';

const Downloads = ({navigation}) => {
  const [data, setData] = useState([]);

  console.log(InAppReview.isAvailable());

  const reviewApp = () => {
    // trigger UI InAppreview
    InAppReview.RequestInAppReview()
      .then(hasFlowFinishedSuccessfully => {
        // when return true in android it means user finished or close review flow
        console.log('InAppReview in android', hasFlowFinishedSuccessfully);

        // when return true in ios it means review flow lanuched to user.
        console.log(
          'InAppReview in ios has launched successfully',
          hasFlowFinishedSuccessfully,
        );

        if (hasFlowFinishedSuccessfully) {
          // do something for ios


          // do something for android
          ToastAndroid.showWithGravity(
            'Thanks!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          )
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      return null;
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Media',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted!');
        } else {
          alert('Storage Permission Not Granted!');
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  const date = month + '/' + day;
  console.log(date);
  const getDownloads = () => {
    CameraRoll.getPhotos({
      first: 20,
      groupName: 'Instader',
      assetType: 'Videos',
    })
      .then(r => {
        // console.log('JSON DATA -->', r.edges);
        return r.edges;
        // console.log('From data', typeof(data));
      })
      .then(res => {
        const clean = res.map(obj => obj.node.image);
        setData(clean);
        console.log('DATA---->', data.length);
      })
      .catch(err => {
        console.log(err);
        //Error Loading Images
      });
  };

  if (data.length === 5) {
    reviewApp();
  }

  useEffect(() => {
    checkPermission();
    getDownloads();
  }, []);

  // const clean =  data.filter(obj => console.log(obj.image.uri))
  // console.log(clean)

  // console.log(getAlbum);
  return (
    <View style={styles.container}>
      {data.length == 0 ? (
        <View style={styles.nullStyles}>
          <Text style={styles.textStyle}>
            YOU HAVEN'T SAVED ANY VIDEOS YET :({' '}
          </Text>
        </View>
      ) : (
        <View style={styles.objStyle}>
          <FlatList
            style={styles.list}
            data={data}
            keyExtractor={video => video.id}
            renderItem={({item}) => {
           
              const fileUri = item.uri;
              let fileName = '';
              try {
                // We create filename by getting text from the value insta to the end
                //So if file name is DCIM/Instader/insta-4-12-22, it will return from /insta to 22 ie insta-4-12-22 will be the file name
                fileName = fileUri.match(/insta([\s\S]*)$/)[0];
              } catch (error) {
                fileName = 'instader';
              }
              return (
                <View style={styles.container}>
                  <VideoCard
                    navigation={navigation}
                    uris={item.uri}
                    fileName={fileName}
                    id={item.id}
                  />
                  {/* <VideoPlayer
                    video={{
                      //if url does exist pass url as video uri else return Null
                      uri: item.uri,
                    }}
                    autoplay={false}
                    showDuration
                    resizeMode="contain"
                  /> */}
                  {/* <Text style={{fontSize: 24, color: 'black'}}>{fileName}</Text> */}
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nullStyles: {
    alignItems: 'center',
    marginVertical: 200,
  },
  objStyle: {
    backgroundColor: '#91d6e2',
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 15,
    color: 'black',
  },
  videoStyle: {
    height: '100%',
  },
});

export default Downloads;
