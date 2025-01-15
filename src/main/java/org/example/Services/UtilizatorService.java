package org.example.Services;

import org.example.DTO.UtilizatorDTO;
import org.example.utils.HttpClientUtil;

import java.util.List;

public class UtilizatorService {
    private static final String BASE_URL = "http://localhost:8083/team/rest/servicii/utilizatori";

    // Metodă pentru a obține toți utilizatorii
    public List<UtilizatorDTO> getAllUtilizatori() {
        return HttpClientUtil.getUtilizatoriList(BASE_URL);
    }

    // Metodă pentru a obține un utilizator după ID
    public UtilizatorDTO getUtilizatorById(int id) {
        return HttpClientUtil.get(BASE_URL + "/" + id, UtilizatorDTO.class);
    }

    // Metodă pentru a obține liderii
    public List<UtilizatorDTO> getAllLideri() {
        return HttpClientUtil.getUtilizatoriList(BASE_URL + "/lideri");
    }

    // Metodă pentru a crea un utilizator
    public UtilizatorDTO createUtilizator(UtilizatorDTO utilizator) throws Exception {
        return HttpClientUtil.post(BASE_URL, utilizator, UtilizatorDTO.class);
    }

    // Metodă pentru a actualiza un utilizator
    public UtilizatorDTO updateUtilizator(int id, UtilizatorDTO utilizator) throws Exception {
        return HttpClientUtil.put(BASE_URL + "/" + id, utilizator, UtilizatorDTO.class);
    }
    // Metodă pentru a obține toți utilizatorii de tip ADMIN
    public List<UtilizatorDTO> getAllAdmini() {
        return HttpClientUtil.getUtilizatoriList(BASE_URL + "/admini");
    }

    // Metodă pentru a șterge un utilizator
    public void deleteUtilizator(int id) {
        HttpClientUtil.delete(BASE_URL + "/" + id);
    }
}
