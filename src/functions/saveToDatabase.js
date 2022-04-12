export const addSaved = (DEVICE_ID, VIDEO_URL) => {
  fetch(
    //"commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    'https://tiktok-vid-api.herokuapp.com/api/save/' +
      DEVICE_ID +
      '/' +
      VIDEO_URL,
  )
    .then(res => res.json())
    .then(response => console.log('SAVED -->' +response))
    .catch(e => console.log(e));
};
