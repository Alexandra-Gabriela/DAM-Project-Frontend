package org.example.Services;

import org.example.DTO.CursDTO;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class CursuriService {
    private final RestTemplate restTemplate;
    private final String baseUrl;

    public CursuriService(String baseUrl) {
        this.restTemplate = new RestTemplate();
        this.baseUrl = baseUrl;
    }

    public List<CursDTO> getAllCursuri() {
        String url = baseUrl + "/rest/servicii/dezvoltare/cursuri";
        return restTemplate.getForObject(url, List.class);
    }

    public CursDTO getCursById(Integer id, Integer utilizatorId) {
        String url = baseUrl + "/rest/servicii/dezvoltare/cursuri/" + id + "?utilizatorId=" + utilizatorId;
        return restTemplate.getForObject(url, CursDTO.class);
    }

    public CursDTO createCurs(CursDTO cursDTO) {
        String url = baseUrl + "/rest/servicii/dezvoltare/cursuri";
        return restTemplate.postForObject(url, cursDTO, CursDTO.class);
    }

    public void updateCurs(Integer id, CursDTO cursDTO) {
        String url = baseUrl + "/rest/servicii/dezvoltare/cursuri/" + id;
        restTemplate.put(url, cursDTO);
    }

    public void deleteCurs(Integer id) {
        String url = baseUrl + "/rest/servicii/dezvoltare/cursuri/" + id;
        restTemplate.delete(url);
    }
}
