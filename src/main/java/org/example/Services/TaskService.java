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
        String url = "http://localhost:8083/team/rest/servicii/taskuri";
        return List.of(restTemplate.getForObject(url, TaskDTO[].class));
    }

    public TaskDTO adaugaTask(TaskDTO task) {
        String url = "http://localhost:8083/team/rest/servicii/taskuri";
        return restTemplate.postForObject(url, task, TaskDTO.class);
    }

    public void actualizeazaTask(TaskDTO task) {
        String url = "http://localhost:8083/team/rest/servicii/taskuri/" + task.getIdTask();
        restTemplate.put(url, task);
    }

    public void stergeTask(int id) {
        String url = "http://localhost:8083/team/rest/servicii/taskuri/" + id;
        restTemplate.delete(url);
    }

    public void schimbareStatusTask(int taskId, String statusNou) {
        String url = "http://localhost:8083/team/rest/servicii/taskuri/" + taskId + "/status";
        restTemplate.put(url, statusNou);
    }
}
