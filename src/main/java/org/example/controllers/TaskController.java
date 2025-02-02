package org.example.controllers;

import org.example.DTO.Status;
import org.example.DTO.TaskDTO;
import org.example.Services.TaskService;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    public List<TaskDTO> getAllTasks() {
        return taskService.getToateTaskurile();
    }

    public void saveTask(TaskDTO task) {
        if (task.getIdTask() == 0) {
            taskService.adaugaTask(task);
        } else {
            taskService.actualizeazaTask(task);
        }
    }

    public void deleteTask(int idTask) {
        taskService.stergeTask(idTask);
    }

    public void schimbareStatusTask(int taskId, String statusNou) {
        taskService.schimbareStatusTask(taskId, statusNou);
    }
    public List<TaskDTO> getTasksByStatus(Status status) {
        return taskService.getToateTaskurile()
                .stream()
                .filter(task -> task.getStatus() == status)
                .collect(Collectors.toList());
    }
}