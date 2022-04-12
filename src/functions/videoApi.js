export const videoApi = (videoUrl) => {
    const fetch = require('node-fetch');

    const url = `https://instagram-media-downloader.p.rapidapi.com/rapid/post.php?url=${videoUrl}`;
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com',
        'X-RapidAPI-Key': '7f9ace4cbdmshc72395aeeec405fp169c25jsn7ff5e0fe4baf'
      }
    };

    return {url, options}
};
//This is a dummy url

// https://www.instagram.com/p/Cb0-pEGtAQv/?utm_source=ig_web_copy_link
// Free API KEY - a16eece551msh6f5df4e8ec1e4d1p153518jsnd25f7d55b100
