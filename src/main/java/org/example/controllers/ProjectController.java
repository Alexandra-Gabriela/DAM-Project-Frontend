package org.example.controllers;

import org.example.DTO.ProiectDTO;
import org.example.utils.HttpClientUtil;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ProjectController {
    private static final String BASE_URL = "http://localhost:8083/team/rest/servicii/proiect";

    public List<ProiectDTO> getAllProjects() {
        ProiectDTO[] projects = HttpClientUtil.get(BASE_URL, ProiectDTO[].class);
        if (projects == null) {
            System.err.println("Failed to fetch projects. Returning empty list.");
            return List.of(); // Listă goală
        }
        return Arrays.asList(projects);
    }

    public void saveProject(ProiectDTO project) {
        try {
            HttpClientUtil.post(BASE_URL, project, ProiectDTO.class);
        } catch (Exception e) {
            // Logăm și gestionăm eroarea
            System.err.println("Eroare la salvarea proiectului: " + e.getMessage());
            e.printStackTrace();
        }
    }


    public void deleteProject(int projectId) {
        String url = BASE_URL + "/" + projectId;
        HttpClientUtil.delete(url);
    }

}
