package org.example.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.dnd.DragSource;
import com.vaadin.flow.component.dnd.DropEffect;
import com.vaadin.flow.component.dnd.DropTarget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.SpringComponent;
import org.example.DTO.Status;
import org.example.DTO.TaskDTO;
import org.example.DTO.UtilizatorDTO;
import org.example.controllers.TaskController;
import org.example.utils.HttpClientUtil;

import jakarta.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@SpringComponent
@PageTitle("Board de Task-uri")
@Route(value = "task-board", layout = MainView.class)
public class TaskBoardView extends VerticalLayout {
    private final TaskController taskController;


    private final VerticalLayout toDoColumn = new VerticalLayout();
    private final VerticalLayout inProgressColumn = new VerticalLayout();
    private final VerticalLayout doneColumn = new VerticalLayout();

    public TaskBoardView(TaskController taskController) {
        this.taskController = taskController;

        HorizontalLayout topBar = createTopBar();
        add(topBar);

        setupKanbanBoard();

        // Butonul de adăugare a unui nou task
        Button addTaskButton = new Button("Adaugă Task", e -> showAddTaskDialog(null));
        add(new HorizontalLayout(addTaskButton));
    }

    private HorizontalLayout createTopBar() {
        // Căutare
        TextField searchField = new TextField();
        searchField.setPlaceholder("Search");
        searchField.setWidth("300px");

        // Iconițe
        Button insightsButton = new Button("Insights");
        Button settingsButton = new Button("Settings");
        Button completeSprintButton = new Button("Complete Sprint");
        completeSprintButton.getStyle()
                .set("background-color", "#007bff")
                .set("color", "white");

        // Layout pentru membrii echipei
        HorizontalLayout membersLayout = new HorizontalLayout();
        membersLayout.setSpacing(true);
        for (int i = 0; i < 5; i++) { // Exemplu de 5 membri
            Span member = new Span("M" + (i + 1));
            member.getStyle()
                    .set("border-radius", "50%")
                    .set("background-color", "#cccccc")
                    .set("width", "30px")
                    .set("height", "30px")
                    .set("display", "inline-block")
                    .set("text-align", "center")
                    .set("line-height", "30px");
            membersLayout.add(member);
        }

        // Adăugăm butoanele și câmpurile în bara de sus
        HorizontalLayout topBar = new HorizontalLayout(searchField, membersLayout, insightsButton, settingsButton, completeSprintButton);
        topBar.setWidthFull();
        topBar.setJustifyContentMode(JustifyContentMode.BETWEEN);
        topBar.setAlignItems(Alignment.CENTER);

        return topBar;
    }

    @PostConstruct
    public void init() {
        refreshTasks();
    }

    private void setupKanbanBoard() {
        // Adăugăm titluri pentru fiecare coloană

        toDoColumn.add(new Span("To-Do"));
        toDoColumn.getStyle().set("border", "1px solid lightgray").set("padding", "10px");

        inProgressColumn.add(new Span("In Progress"));
        inProgressColumn.getStyle().set("border", "1px solid lightgray").set("padding", "10px");

        doneColumn.add(new Span("Done"));
        doneColumn.getStyle().set("border", "1px solid lightgray").set("padding", "10px");

        // Adăugăm funcționalitatea de drag & drop pentru fiecare coloană
        setupDropTarget(toDoColumn, Status.NOU);
        setupDropTarget(inProgressColumn, Status.IN_EXECUTIE);
        setupDropTarget(doneColumn, Status.FINALIZAT);

        // Adăugăm coloanele în layout-ul principal
        HorizontalLayout kanbanLayout = new HorizontalLayout( toDoColumn, inProgressColumn, doneColumn);
        kanbanLayout.setWidthFull();
        add(kanbanLayout);
    }

    private void refreshTasks() {
        List<TaskDTO> tasks = taskController.getAllTasks();
        if (tasks == null || tasks.isEmpty()) {
            Notification.show("Nu există task-uri de afișat.");
            return;
        }

        // Resetăm conținutul coloanelor (lăsăm doar header-ul)
        clearColumn(toDoColumn);
        clearColumn(inProgressColumn);
        clearColumn(doneColumn);

        // Grupăm task-urile pe baza statusului și le adăugăm în coloane
        tasks.forEach(task -> {
            Div taskCard = createTaskCard(task);

            switch (task.getStatus()) {

                case NOU -> toDoColumn.add(taskCard);
                case  IN_EXECUTIE -> inProgressColumn.add(taskCard);
                case FINALIZAT -> doneColumn.add(taskCard);
            }
        });
    }

    private Div createTaskCard(TaskDTO task) {
        Div taskCard = new Div();
        taskCard.setText(task.getDenumire());
        taskCard.getStyle()
                .set("padding", "10px")
                .set("margin", "5px")
                .set("background-color", "#e0e0e0")
                .set("border-radius", "5px")
                .set("cursor", "pointer");
        taskCard.addClickListener(event -> showTaskOptionsDialog(task));

        DragSource<Div> dragSource = DragSource.create(taskCard);
        dragSource.addDragStartListener(event -> {
            Notification.show("Tragi task-ul: " + task.getDenumire());
        });

        dragSource.addDragEndListener(event -> {
            if (event.isSuccessful()) {
                Notification.show("Task mutat cu succes!");
            }
        });

        return taskCard;
    }
    private void showTaskOptionsDialog(TaskDTO task) {
        Dialog optionsDialog = new Dialog();
        optionsDialog.setWidth("400px");

        // Text descriptiv
        Span taskInfo = new Span("Selectează o acțiune pentru task-ul: " + task.getDenumire());
        taskInfo.getStyle().set("font-weight", "bold");

        // Buton de editare
        Button editButton = new Button("Editare", e -> {
            optionsDialog.close();
            showAddTaskDialog(task); // Deschidem dialogul de editare
        });

        // Buton de ștergere
        Button deleteButton = new Button("Ștergere", e -> {
            optionsDialog.close();
            if (confirm("Ești sigur că vrei să ștergi acest task?")) {
                taskController.deleteTask(task.getIdTask());
                refreshTasks();
                Notification.show("Task șters!");
            }
        });
        deleteButton.getStyle().set("color", "red");

        // Layout pentru butoane
        HorizontalLayout buttonsLayout = new HorizontalLayout(editButton, deleteButton);
        VerticalLayout dialogLayout = new VerticalLayout(taskInfo, buttonsLayout);
        optionsDialog.add(dialogLayout);

        optionsDialog.open();
    }


    private void setupDropTarget(VerticalLayout column, Status targetStatus) {
        DropTarget<VerticalLayout> dropTarget = DropTarget.create(column);
        dropTarget.setDropEffect(DropEffect.MOVE);

        dropTarget.addDropListener(event -> {
            event.getDragSourceComponent().ifPresent(draggedComponent -> {
                Div taskCard = (Div) draggedComponent;
                String taskName = taskCard.getText();
                TaskDTO task = findTaskByName(taskName);

                if (task != null) {
                    task.setStatus(targetStatus);
                    taskController.saveTask(task);
                    refreshTasks();
                }
            });
        });
    }

    private TaskDTO findTaskByName(String name) {
        return taskController.getAllTasks()
                .stream()
                .filter(task -> task.getDenumire().equals(name))
                .findFirst()
                .orElse(null);
    }

    private void clearColumn(VerticalLayout column) {
        column.getChildren().filter(component -> !(component instanceof Span)).forEach(column::remove);
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
            if (deadlinePicker.getValue() == null) {
                Notification.show("Te rog să selectezi o dată validă pentru deadline!");
                return;
            }

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
