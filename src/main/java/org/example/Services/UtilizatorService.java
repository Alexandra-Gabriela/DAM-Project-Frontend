package org.example.Services;

import org.example.DTO.UtilizatorDTO;
import org.example.utils.HttpClientUtil;

import java.util.List;

public class UtilizatorService {
    private static final String BASE_URL = "http://localhost:8083/team/rest/utilizatori";

    public List<UtilizatorDTO> getAllUtilizatori() {
        return HttpClientUtil.get(BASE_URL, List.class);
    }

    public UtilizatorDTO getUtilizatorById(int id) {
        return HttpClientUtil.get(BASE_URL + "/" + id, UtilizatorDTO.class);
    }

    public List<UtilizatorDTO> getAllLideri() {
        return HttpClientUtil.get(BASE_URL + "/lideri", List.class);
    }

    public List<UtilizatorDTO> getAllMembri() {
        return HttpClientUtil.get(BASE_URL + "/membri", List.class);
    }

    public UtilizatorDTO createUtilizator(UtilizatorDTO utilizator) throws Exception {
        return HttpClientUtil.post(BASE_URL, utilizator, UtilizatorDTO.class);
    }

    public UtilizatorDTO updateUtilizator(int id, UtilizatorDTO utilizator) throws Exception {
        return HttpClientUtil.put(BASE_URL + "/" + id, utilizator, UtilizatorDTO.class);
    }

    public void deleteUtilizator(int id) {
        HttpClientUtil.delete(BASE_URL + "/" + id);
    }
}
