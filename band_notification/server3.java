import android.os.AsyncTask;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class BandApi {

    private static final String ACCESS_TOKEN = "ZQAAAZWzHq9KcSLxOT3AatmkPY7aOIb6eH_pye6bGQzMhFFFg19ie7dENad7EHTcxCJm7thWqoXIYLKNZnMTXCEdv8TTRiKaq2jIGnp-KBKRP-mH";
    private static final String HOST = "https://openapi.band.us";
    private static final String POST_API = "/v2/band/posts";
    private static final String COMMENT_API = "/v2/band/post/comment/create";
    private static final String BAND_KEY = "AACsu29d6yYC7v3fNw_ggj_o"; // 실제 밴드 키로 교체
    private static final String BODY = "좋아요";

    public void fetchPosts() {
        new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... voids) {
                try {
                    URL url = new URL(HOST + POST_API + "?access_token=" + ACCESS_TOKEN + "&band_key=" + BAND_KEY);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setRequestProperty("Content-Type", "application/json");

                    BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    reader.close();

                    JSONObject jsonResponse = new JSONObject(response.toString());
                    JSONArray posts = jsonResponse.getJSONObject("result_data").getJSONArray("items");

                    if (posts.length() > 0) {
                        return posts.getJSONObject(0).getString("post_key"); // 첫 번째 포스트의 post_key 반환
                    } else {
                        return null;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }

            @Override
            protected void onPostExecute(String postKey) {
                if (postKey != null) {
                    postComment(postKey);
                } else {
                    System.out.println("No posts found");
                }
            }
        }.execute();
    }

    public void postComment(String postKey) {
        new AsyncTask<String, Void, Void>() {
            @Override
            protected Void doInBackground(String... params) {
                try {
                    String postKey = params[0];
                    URL url = new URL(HOST + COMMENT_API);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setDoOutput(true);

                    JSONObject json = new JSONObject();
                    json.put("access_token", ACCESS_TOKEN);
                    json.put("band_key", BAND_KEY);
                    json.put("post_key", postKey);
                    json.put("body", BODY);

                    OutputStream os = conn.getOutputStream();
                    os.write(json.toString().getBytes("UTF-8"));
                    os.close();

                    BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    reader.close();

                    System.out.println(response.toString()); // 응답 출력
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            }
        }.execute(postKey);
    }
}