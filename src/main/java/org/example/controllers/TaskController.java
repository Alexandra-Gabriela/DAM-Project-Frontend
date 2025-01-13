package org.example.controllers;

import org.example.DTO.TaskDTO;
import org.example.Services.TaskService;
import org.springframework.stereotype.Controller;

import java.util.List;

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
        if (task.getIdTask()==0) {
            taskService.adaugaTask(task);
        } else {
            taskService.adaugaTask(task); // Dacă ai un PUT endpoint, folosește-l aici.
        }
    }

    public void deleteTask(Long idTask) {
        taskService.stergeTask(idTask);
    }
}
