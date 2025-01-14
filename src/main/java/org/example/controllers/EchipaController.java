package org.example.controllers;

import org.example.DTO.EchipaDTO;
import org.example.DTO.UtilizatorDTO;
import org.example.utils.HttpClientUtil;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class EchipaController {
    private static final String BASE_URL = "http://localhost:8083/team/rest/servicii/echipe";

    public List<EchipaDTO> getAllTeams() {
        EchipaDTO[] echipe = HttpClientUtil.get(BASE_URL, EchipaDTO[].class);
        if (echipe == null) {
            System.err.println("Failed to fetch teams. Returning empty list.");
            return List.of(); // Return an empty list if no teams are fetched
        }
        return Arrays.asList(echipe);
    }

    // Method to get all users (leaders) for ComboBox in the UI
    public List<UtilizatorDTO> getAllUtilizatori() {
        String url = "http://localhost:8083/team/rest/utilizatori"; // Assuming there is an endpoint for users
        UtilizatorDTO[] utilizatori = HttpClientUtil.get(url, UtilizatorDTO[].class);
        if (utilizatori == null) {
            System.err.println("Failed to fetch users. Returning empty list.");
            return List.of(); // Return an empty list if no users are fetched
        }
        return Arrays.asList(utilizatori);
    }

    // Method to create a new team
    public void createTeam(EchipaDTO team) {
        try {
            HttpClientUtil.post(BASE_URL, team, Void.class); // Sending team data as POST request
        } catch (Exception e) {
            System.err.println("Error creating team: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Method to update an existing team
    public void updateTeam(int teamId, EchipaDTO team) {
        try {
            String url = BASE_URL + "/" + teamId;
            HttpClientUtil.put(url, team, Void.class); // Sending updated team data as PUT request
        } catch (Exception e) {
            System.err.println("Error updating team: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Method to delete a team
    public void deleteTeam(int teamId) {
        try {
            String url = BASE_URL + "/" + teamId;
            HttpClientUtil.delete(url); // Deleting team using DELETE request
        } catch (Exception e) {
            System.err.println("Error deleting team: " + e.getMessage());
            e.printStackTrace();
        }
    }


    public void saveEchipa(EchipaDTO echipa) {
        try {
            HttpClientUtil.post(BASE_URL, echipa, EchipaDTO.class);
        } catch (Exception e) {
            // Logăm și gestionăm eroarea
            System.err.println("Eroare la salvarea echipei: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
