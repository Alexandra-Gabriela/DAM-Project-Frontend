package org.example.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.SpringComponent;
import jakarta.annotation.PostConstruct;
import org.example.DTO.Status;
import org.example.DTO.TaskDTO;
import org.example.DTO.UtilizatorDTO;
import org.example.controllers.TaskController;
import org.example.utils.HttpClientUtil;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@SpringComponent
@PageTitle("Board de Task-uri")
@Route(value = "task-board", layout = MainView.class)
public class TaskBoardView extends VerticalLayout {
    private final Grid<TaskDTO> taskGrid = new Grid<>(TaskDTO.class);
    private final TaskController taskController;

    public TaskBoardView(TaskController taskController) {
        this.taskController = taskController;

        Button addTaskButton = new Button("Adaugă Task", e -> showAddTaskDialog(null));
        add(addTaskButton);
        setupGrid();
        add(taskGrid);
    }

    @PostConstruct
    public void init() {
        refreshTasks();
    }

    private void setupGrid() {
        taskGrid.removeAllColumns();
        taskGrid.addColumn(TaskDTO::getDenumire).setHeader("Denumire").setSortable(true);
        taskGrid.addColumn(TaskDTO::getDescriere).setHeader("Descriere").setSortable(true);
        taskGrid.addColumn(task -> task.getStatus() != null ? task.getStatus().toString() : "N/A").setHeader("Status");
        taskGrid.addColumn(task -> {
            if (task.getDeadline() != null) {
                // Deadline este deja LocalDate, deci folosim direct toString()
                return task.getDeadline().toString();
            }
            return "N/A";
        }).setHeader("Deadline");
        taskGrid.addColumn(task -> task.getMembru() != null ? task.getMembru().getNume() : "N/A").setHeader("Membru");

        taskGrid.addComponentColumn(task -> {
            Button editButton = new Button("Edit", e -> showAddTaskDialog(task));
            Button deleteButton = new Button("Delete", e -> {
                if (confirm("Ești sigur că vrei să ștergi acest task?")) {
                    taskController.deleteTask((long) task.getIdTask());
                    refreshTasks();
                    Notification.show("Task șters!");
                }
            });
            deleteButton.getStyle().set("color", "red");
            return new HorizontalLayout(editButton, deleteButton);
        }).setHeader("Acțiuni");
    }

    private void refreshTasks() {
        List<TaskDTO> tasks = taskController.getAllTasks();
        if (tasks == null || tasks.isEmpty()) {
            Notification.show("Nu s-au găsit task-uri!");
        } else {
            taskGrid.setItems(tasks);
        }
    }

    private void showAddTaskDialog(TaskDTO task) {
        Dialog dialog = new Dialog();
        dialog.setWidth("600px");

        FlexLayout formLayout = new FlexLayout();
        formLayout.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        formLayout.setJustifyContentMode(FlexLayout.JustifyContentMode.BETWEEN);

        TextField denumireField = new TextField("Denumire");
        TextArea descriereField = new TextArea("Descriere");
        ComboBox<Status> statusComboBox = new ComboBox<>("Status");
        statusComboBox.setItems(Status.values());
        DatePicker deadlinePicker = new DatePicker("Deadline");
        ComboBox<UtilizatorDTO> membruComboBox = new ComboBox<>("Membru");

        denumireField.setWidth("48%");
        descriereField.setWidth("48%");
        statusComboBox.setWidth("48%");
        deadlinePicker.setWidth("48%");
        membruComboBox.setWidth("48%");

        membruComboBox.setItems(getAllMembers());
        membruComboBox.setItemLabelGenerator(UtilizatorDTO::getNume);

        if (task != null) {
            denumireField.setValue(task.getDenumire() != null ? task.getDenumire() : "");
            descriereField.setValue(task.getDescriere() != null ? task.getDescriere() : "");
            statusComboBox.setValue(task.getStatus() != null ? task.getStatus() : Status.NOU);
            // Setăm valoarea direct pentru LocalDate
            deadlinePicker.setValue(task.getDeadline());
            membruComboBox.setValue(task.getMembru());
        }

        formLayout.add(denumireField, descriereField, statusComboBox, deadlinePicker, membruComboBox);

        Button saveButton = new Button("Save", e -> {
            TaskDTO finalTask = task != null ? task : new TaskDTO();
            finalTask.setDenumire(denumireField.getValue());
            finalTask.setDescriere(descriereField.getValue());
            finalTask.setStatus(statusComboBox.getValue());
            finalTask.setDeadline(deadlinePicker.getValue());
            finalTask.setMembru(membruComboBox.getValue());

            try {
                taskController.saveTask(finalTask);
                refreshTasks();
                Notification.show("Task salvat cu succes!");
            } catch (Exception ex) {
                Notification.show("Eroare la salvarea task-ului: " + ex.getMessage());
            }
            dialog.close();
        });

        Button cancelButton = new Button("Cancel", e -> dialog.close());

        HorizontalLayout buttonsLayout = new HorizontalLayout(saveButton, cancelButton);
        VerticalLayout content = new VerticalLayout(formLayout, buttonsLayout);
        content.setSpacing(true);
        dialog.add(content);
        dialog.open();
    }

    private List<UtilizatorDTO> getAllMembers() {
        try {
            String url = "http://localhost:8083/team/rest/utilizatori/membri";
            UtilizatorDTO[] utilizatori = HttpClientUtil.get(url, UtilizatorDTO[].class);

            if (utilizatori == null || utilizatori.length == 0) {
                Notification.show("Lista membrilor este goală.");
                return List.of();
            }

            return Arrays.asList(utilizatori);
        } catch (Exception e) {
            Notification.show("Eroare la încărcarea membrilor: " + e.getMessage());
            e.printStackTrace();
            return List.of();
        }
    }

    private boolean confirm(String message) {
        return true;
    }
}
