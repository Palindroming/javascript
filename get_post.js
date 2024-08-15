// const axios = require('axios');

// const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH"; // Replace with your actual access token
// const HOST = "https://openapi.band.us";
// const API = "/v2/band/posts";

// // parameters
// const BAND_KEY = "AADLoh5xfXA4h7PlycWNmYFT"; // Replace with the actual band key
// const LOCALE = "kr_KR"
// async function fetchPosts() {
//   try {
//     const response = await axios.get(`${HOST}${API}`, {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       params: {
//         access_token: ACCESS_TOKEN,
//         band_key: BAND_KEY,
        
//       }
//     });

//     // console.log(JSON.stringify(response.data, null,2))

  
//     const posts = response.data.result_data.items;

//     posts.forEach(post => {
//         console.log(`Post Key: ${post.post_key}`);
      
//       });
  

//   } catch (error) {
//     if (error.response) {
//       console.error('Error response:', error.response.data);
//     } else if (error.request) {
//       console.error('Error request:', error.request);
//     } else {
//       console.error('Error message:', error.message);
//     }
//   }
// }

// fetchPosts();


const axios = require('axios');

const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH"; // Replace with your actual access token
const HOST = "https://openapi.band.us";
const API = "/v2/band/posts";

// parameters
const BAND_KEY = "AADLoh5xfXA4h7PlycWNmYFT"; // Replace with the actual band key
const LOCALE = "kr_KR";async function fetchPosts() {
  try {
    const response = await axios.get(`${HOST}${API}`, {
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        access_token: ACCESS_TOKEN,
        band_key: BAND_KEY,
      }
    });

    // console.log(JSON.stringify(response.data, null,2))

    const posts = response.data.result_data.items;

    if (posts.length > 0) {
      console.log(`Post Key: ${posts[0].post_key}`); // 첫 번째 포스트의 post_key만 출력
    } else {
      console.log('No posts found');
    }

  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
}

fetchPosts();