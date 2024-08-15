// const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH";
// const HOST = "https://openapi.band.us";
// const API = "/v2/band/post/comment/create";

// // parameters
// const BAND_KEY = "AABRoVpMvGUAdoNezRHyqrQg";
// const POST_KEY = "AABEt1LxDD3Fi-0ACITWw59K";
// const BODY = "멋져용";

// const xhr = new XMLHttpRequest();

// xhr.onload = function () {
//   if (xhr.status != 200) {
//     // Error!
//     return;
//   }
//   var responseObj = xhr.response;
//   console.log(responseObj); // response!
// };
// xhr.open(
//   "POST",
//   `${HOST}${API}?access_token=${ACCESS_TOKEN}&band_key=${BAND_KEY}&post_key=${POST_KEY}&body=${BODY}`
// );
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.responseType = "json";
// xhr.send();


const axios = require('axios');

const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH";
const HOST = "https://openapi.band.us";
const API = "/v2/band/post/comment/create";

// parameters
const BAND_KEY = "AABRoVpMvGUAdoNezRHyqrQg";
const POST_KEY = "AAAZt_bgGQCzKNIRUrtiYMVj";
const BODY = ".";

axios.post(`${HOST}${API}`, null, {
  params: {
    access_token: ACCESS_TOKEN,
    band_key: BAND_KEY,
    post_key: POST_KEY,
    body: BODY,
  },
  headers: {
    "Content-Type": "application/json",
  },
})
.then(response => {
  console.log(response.data); // response!
})
.catch(error => {
  console.error("Error!", error.response ? error.response.data : error.message);
});