package org.example.Services;

import org.example.DTO.CursDTO;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class CursuriService {
    private final RestTemplate restTemplate;

    public CursuriService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<CursDTO> getAllCursuri() {
        String url = "http://localhost:8083/team/rest/servicii/dezvoltare/cursuri";
        return Arrays.asList(restTemplate.getForObject(url, CursDTO[].class));
    }

    public CursDTO getCursById(Integer id, Integer utilizatorId) {
        String url = "http://localhost:8083/team/rest/servicii/dezvoltare/cursuri/" + id + "?utilizatorId=" + utilizatorId;
        return restTemplate.getForObject(url, CursDTO.class);
    }

    public CursDTO createCurs(CursDTO cursDTO) {
        String url = "http://localhost:8083/team/rest/servicii/dezvoltare/cursuri";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<CursDTO> request = new HttpEntity<>(cursDTO, headers);
        return restTemplate.postForObject(url, request, CursDTO.class);
    }

    public void updateCurs(Integer id, CursDTO cursDTO) {
        String url = "http://localhost:8083/team/rest/servicii/dezvoltare/cursuri/" + id;
        restTemplate.put(url, cursDTO);
    }

    public void deleteCurs(Integer id) {
        String url = "http://localhost:8083/team/rest/servicii/dezvoltare/cursuri/" + id;
        restTemplate.delete(url);
    }
    public void asigneazaUtilizatoriLaCurs(Integer cursId, List<Integer> utilizatorIds) {
        String url = "http://localhost:8083/team/rest/servicii/dezvoltare/cursuri/" + cursId + "/utilizatori";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<List<Integer>> request = new HttpEntity<>(utilizatorIds, headers);

        restTemplate.postForEntity(url, request, Void.class);
    }
    public List<Integer> getUtilizatoriAsignatiLaCurs(Integer cursId) {
        String url = "http://localhost:8083/team/rest/servicii/dezvoltare/cursuri/" + cursId + "/utilizatori";
        return Arrays.asList(restTemplate.getForObject(url, Integer[].class));
    }


}
