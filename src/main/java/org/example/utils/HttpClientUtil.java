package org.example.utils;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.example.DTO.UtilizatorDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class HttpClientUtil {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper()
            .enable(DeserializationFeature.READ_ENUMS_USING_TO_STRING)
            .enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);

    private static final RestTemplate restTemplate = new RestTemplate();

    // GET method for a single response
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

    // GET method for lists (using ParameterizedTypeReference)
    public static <T> T get(String urlString, ParameterizedTypeReference<T> responseType) {
        return restTemplate.exchange(urlString, HttpMethod.GET, null, responseType).getBody();
    }

    // Helper method to retrieve list of UtilizatorDTO objects
    public static List<UtilizatorDTO> getUtilizatoriList(String urlString) {
        return get(urlString, new ParameterizedTypeReference<List<UtilizatorDTO>>() {});
    }

    // POST method for sending data
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

    // PUT method for sending data
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

    // DELETE method for sending data
    public static void delete(String url) {
        restTemplate.delete(url);
    }

    // Helper method to print error response from server
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
}
