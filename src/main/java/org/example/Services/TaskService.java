package org.example.Services;

import org.example.DTO.TaskDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class TaskService {
    private final RestTemplate restTemplate;

    public TaskService() {
        this.restTemplate = new RestTemplate();
    }

    public List<TaskDTO> getToateTaskurile() {
        String url = "http://localhost:8083/rest/servicii/taskuri";

        return List.of(restTemplate.getForObject(url, TaskDTO[].class));
    }

    public TaskDTO adaugaTask(TaskDTO task) {
        String url = "http://localhost:8083/rest/servicii/taskuri";

        return restTemplate.postForObject(url, task, TaskDTO.class);
    }

    public void stergeTask(Long id) {
        String url = "http://localhost:8083/rest/servicii/taskuri"
        + id;
        restTemplate.delete(url);
    }
}
