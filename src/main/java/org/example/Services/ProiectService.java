package org.example.Services;

import org.example.DTO.ProiectDTO;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class ProiectService {
    private final RestTemplate restTemplate;

    public ProiectService() {
        this.restTemplate = new RestTemplate();
    }

    public List<ProiectDTO> getToateProiectele() {
        String url = "http://localhost:8083/team/rest/servicii/proiect";
        return List.of(restTemplate.getForObject(url, ProiectDTO[].class));
    }
}