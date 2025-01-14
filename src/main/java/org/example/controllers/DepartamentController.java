package org.example.controllers;

import org.example.DTO.DepartamentDTO;
import org.example.DTO.UtilizatorDTO;
import org.example.utils.HttpClientUtil;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DepartamentController {
    private static final String BASE_URL = "http://localhost:8083/team/rest/servicii/departamente";

    // Metodă pentru obținerea tuturor departamentelor
    public List<DepartamentDTO> getAllDepartamente() {
        DepartamentDTO[] departamente = HttpClientUtil.get(BASE_URL, DepartamentDTO[].class);
        if (departamente == null) {
            System.err.println("Failed to fetch departments. Returning empty list.");
            return List.of(); // Listă goală
        }
        return Arrays.asList(departamente);
    }

    // Metodă pentru salvarea unui departament
    public void saveDepartament(DepartamentDTO departament) {
        try {
            HttpClientUtil.post(BASE_URL, departament, DepartamentDTO.class);
        } catch (Exception e) {
            // Logăm și gestionăm eroarea
            System.err.println("Eroare la salvarea departamentului: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Metodă pentru actualizarea unui departament
    public void updateDepartament(int departamentId, DepartamentDTO departament) {
        try {
            String url = BASE_URL + "/" + departamentId;
            HttpClientUtil.put(url, departament, DepartamentDTO.class);
        } catch (Exception e) {
            // Logăm și gestionăm eroarea
            System.err.println("Eroare la actualizarea departamentului: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Metodă pentru ștergerea unui departament
    public void deleteDepartament(int departamentId) {
        try {
            String url = BASE_URL + "/" + departamentId;
            HttpClientUtil.delete(url);
        } catch (Exception e) {
            // Logăm și gestionăm eroarea
            System.err.println("Eroare la ștergerea departamentului: " + e.getMessage());
            e.printStackTrace();
        }
    }


    public List<UtilizatorDTO> getAllUtilizatori() {
        try {
            // URL-ul endpointului pentru a obține utilizatorii
            String url = "http://localhost:8083/team/rest/utilizatori"; // Ajustează URL-ul în funcție de configurarea ta
            // Obținem utilizatorii de la serviciu
            UtilizatorDTO[] utilizatori = HttpClientUtil.get(url, UtilizatorDTO[].class);

            if (utilizatori == null || utilizatori.length == 0) {
                return List.of(); // Returnează o listă goală dacă nu sunt utilizatori
            }

            return Arrays.asList(utilizatori); // Returnează lista de utilizatori
        } catch (Exception e) {
            // Logăm și gestionăm eroarea
            System.err.println("Eroare la încărcarea utilizatorilor: " + e.getMessage());
            e.printStackTrace();
            return List.of(); // Returnează o listă goală în cazul unei erori
        }
    }
}
