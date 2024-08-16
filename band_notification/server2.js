const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH";
const HOST = "https://openapi.band.us";
const POST_API = "/v2/band/posts";
const COMMENT_API = "/v2/band/post/comment/create";
const BAND_KEY = "AACsu29d6yYC7v3fNw_ggj_o"; // Replace with the actual band key
const BODY = "좋아요";



async function fetchPosts() {
    try {
      const response = await fetch(`${HOST}${POST_API}`, {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          access_token: ACCESS_TOKEN,
          band_key: BAND_KEY,
        }
      });
  
      const data = await response.json();  // await fetch의 response를 json으로 파싱
  
      const posts = data.result_data.items;
  
      if (posts.length > 0) {
        return posts[0].post_key; // 첫 번째 포스트의 post_key 반환
      } else {
        console.log('No posts found');
        return null;
      }
  
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  async function postComment(postKey) {
    try {
      const response = await fetch(`${HOST}${COMMENT_API}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          access_token: ACCESS_TOKEN,
          band_key: BAND_KEY,
          post_key: postKey,
          body: BODY,
        }
      });
  
      const data = await response.json();
      console.log(data); // response!
  
    } catch (error) {
      console.error("Error!", error);
    }
  }
  
  async function main() {
    const postKey = await fetchPosts();
    if (postKey) {
      await postComment(postKey);
    }
  }
  
  main();