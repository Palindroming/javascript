const axios = require('axios');

const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH"; // Replace with your actual access token
const HOST = "https://openapi.band.us";
const API = "/v2/profile";

// parameters
const BAND_KEY = "AADLoh5xfXA4h7PlycWNmYFT"; // Replace with the actual band key

async function fetchPosts() {
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

    console.log(JSON.stringify(response.data, null,2))

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