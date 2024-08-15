// const axios = require('axios');

// const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH";
// const HOST = "https://openapi.band.us";
// const API = "/v2.1/bands";

// async function fetchBands() {
//   try {
//     const response = await axios.get(`${HOST}${API}`, {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       params: {
//         access_token: ACCESS_TOKEN
//       }
//     });

//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// fetchBands();



const axios = require('axios');

const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH";
const HOST = "https://openapi.band.us";
const API = "/v2.1/bands";

async function fetchBands() {
  try {
    const response = await axios.get(`${HOST}${API}`, {
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        access_token: ACCESS_TOKEN
      }
    });

    const bands = response.data.result_data.bands;
    console.log(JSON.stringify(bands,null,2));

    bands.forEach(band => {
      console.log(band.name); // Print the name of each band
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


fetchBands();
