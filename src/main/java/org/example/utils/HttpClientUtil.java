package org.example.utils;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HttpClientUtil {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper()
            .enable(DeserializationFeature.READ_ENUMS_USING_TO_STRING)
            .enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);

    public static <T> T get(String urlString, Class<T> responseType) {
        HttpURLConnection conn = null;
        try {
            URL url = new URL(urlString);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            conn.setConnectTimeout(5000); // 5 sec timeout for connection
            conn.setReadTimeout(5000);    // 5 sec timeout for reading data

            int responseCode = conn.getResponseCode();
            if (responseCode == 200) {
                try (InputStream inputStream = conn.getInputStream()) {
                    return OBJECT_MAPPER.readValue(inputStream, responseType);
                }
            } else {
                System.err.println("GET Request failed. HTTP Code: " + responseCode);
                printErrorStream(conn);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return null;
    }

    public static <T> T post(String url, Object body, Class<T> responseType) throws Exception {
        String response = null;
        try {
            HttpClient client = HttpClient.newHttpClient();

            String jsonBody = OBJECT_MAPPER.writeValueAsString(body);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> httpResponse = client.send(request, HttpResponse.BodyHandlers.ofString());
            response = httpResponse.body();

            System.out.println("Răspuns brut de la server: " + response);

            if (httpResponse.statusCode() != 200) {
                throw new RuntimeException("Eroare HTTP: " + httpResponse.statusCode());
            }

            return OBJECT_MAPPER.readValue(response, responseType);

        } catch (Exception e) {
            System.out.println("Eroare în metoda post: " + e.getMessage());
            System.out.println("Răspuns brut: " + response);
            throw e;
        }
    }

    public static void delete(String url) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(url);
    }

    private static void printErrorStream(HttpURLConnection conn) {
        try (InputStream errorStream = conn.getErrorStream()) {
            if (errorStream != null) {
                String errorResponse = new String(errorStream.readAllBytes());
                System.err.println("Error Response: " + errorResponse);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static <T> T put(String url, Object body, Class<T> responseType) throws Exception {
        String response = null;
        try {
            HttpClient client = HttpClient.newHttpClient();

            String jsonBody = OBJECT_MAPPER.writeValueAsString(body);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .PUT(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> httpResponse = client.send(request, HttpResponse.BodyHandlers.ofString());
            response = httpResponse.body();

            System.out.println("Răspuns brut de la server: " + response);

            if (httpResponse.statusCode() != 200) {
                throw new RuntimeException("Eroare HTTP: " + httpResponse.statusCode());
            }

            return OBJECT_MAPPER.readValue(response, responseType);

        } catch (Exception e) {
            System.out.println("Eroare în metoda put: " + e.getMessage());
            System.out.println("Răspuns brut: " + response);
            throw e;
        }
    }

}
