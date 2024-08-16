var URL = Java.type('java.net.URL');
var HttpURLConnection = Java.type('java.net.HttpURLConnection');
var BufferedReader = Java.type('java.io.BufferedReader');
var InputStreamReader = Java.type('java.io.InputStreamReader');
var OutputStreamWriter = Java.type('java.io.OutputStreamWriter');


const ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH";
const HOST = "https://openapi.band.us";
const POST_API = "/v2/band/posts";
const COMMENT_API = "/v2/band/post/comment/create";

// parameters
const BAND_KEY = "AACsu29d6yYC7v3fNw_ggj_o"; // Replace with the actual band key
const BODY = "좋아요";


function fetchPosts() {
    var connection = URL('https://openapi.band.us/v2/band/posts?access_token=' + ACCESS_TOKEN + '&band_key=' + BAND_KEY).openConnection();
    connection.setRequestMethod('GET');
    connection.setRequestProperty('Content-Type', 'application/json');

    var responseCode = connection.getResponseCode();
    if (responseCode === 200) {
        var reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        var response = '';
        var line;
        while ((line = reader.readLine()) !== null) {
            response += line;
        }
        reader.close();

        var jsonResponse = JSON.parse(response);
        var posts = jsonResponse.result_data.items;
        if (posts.length > 0) {
            return posts[0].post_key; // 첫 번째 포스트의 post_key 반환
        }
    } else {
        print('Error: ' + responseCode);
    }
    return null;
}

function postComment(postKey) {
    var connection = URL('https://openapi.band.us/v2/band/post/comment/create').openConnection();
    connection.setRequestMethod('POST');
    connection.setRequestProperty('Content-Type', 'application/json');
    connection.setDoOutput(true);

    var jsonInputString = JSON.stringify({
        access_token: ACCESS_TOKEN,
        band_key: BAND_KEY,
        post_key: postKey,
        body: BODY
    });

    var os = new OutputStreamWriter(connection.getOutputStream());
    os.write(jsonInputString);
    os.close();

    var responseCode = connection.getResponseCode();
    if (responseCode === 200) {
        var reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        var response = '';
        var line;
        while ((line = reader.readLine()) !== null) {
            response += line;
        }
        reader.close();
        print(response); // 응답 출력
    } else {
        print('Error: ' + responseCode);
    }
}

var postKey = fetchPosts();
if (postKey) {
    postComment(postKey);
}