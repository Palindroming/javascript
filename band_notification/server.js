require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const BAND_KEY = process.env.BAND_KEY;
const HOST = "https://openapi.band.us";
const API = "/v2/band/post/comment/create";

app.post('/new-post', async (req, res) => {
  const { postKey } = req.body;
  
  try {
    const response = await axios.post(`${HOST}${API}`, null, {
      params: {
        access_token: ACCESS_TOKEN,
        band_key: BAND_KEY,
        post_key: postKey,
        body: "New post detected!"
      }
    });

    console.log('Comment posted:', response.data);
    res.status(200).json({ message: 'Comment posted successfully' });
  } catch (error) {
    console.error('Error posting comment:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));