package org.example.views;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.dnd.DragSource;
import com.vaadin.flow.component.dnd.DropEffect;
import com.vaadin.flow.component.dnd.DropTarget;
import com.vaadin.flow.component.grid.Grid;
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
import org.example.controllers.UtilizatorController;
import org.example.utils.HttpClientUtil;

import jakarta.annotation.PostConstruct;

import java.util.Arrays;
import java.util.List;

@SpringComponent
@PageTitle("Board de Task-uri")
@Route(value = "task-board", layout = MainView.class)
public class TaskBoardView extends VerticalLayout {
    private final TaskController taskController;

    private boolean isListView = false;

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
        ComboBox<TaskDTO> searchField = new ComboBox<>();
        searchField.setPlaceholder("Caută task-uri...");
        searchField.setWidth("300px");
        searchField.setItems(taskController.getAllTasks());
        searchField.setItemLabelGenerator(TaskDTO::getDenumire);

// Listener pentru selectare
        searchField.addValueChangeListener(event -> {
            TaskDTO selectedTask = event.getValue();
            if (selectedTask != null) {
                showTaskDetailsModal(selectedTask);
            }
        });

        Button insightsButton = new Button("Insights");
        Button settingsButton = new Button("Settings");
        Button completeSprintButton = new Button("Complete Sprint");
        completeSprintButton.getStyle()
                .set("background-color", "#007bff")
                .set("color", "white");

        Button toggleViewButton = new Button("Comută Vizualizarea");
        toggleViewButton.addClickListener(e -> toggleView());

        // Layout pentru membrii echipei
        HorizontalLayout membersLayout = new HorizontalLayout();
        membersLayout.setSpacing(true);

        List<UtilizatorDTO> membriEchipa = getAllMembers();
        if (membriEchipa.isEmpty()) {
            Span noMembers = new Span("Fără membri");
            membersLayout.add(noMembers);
        } else {
            for (UtilizatorDTO membru : membriEchipa) {
                // Inițialele membrului
                String initiale = membru.getNume().substring(0, 1);
                Span memberBubble = new Span(initiale);
                memberBubble.getStyle()
                        .set("border-radius", "50%")
                        .set("background-color", "#cccccc")
                        .set("width", "30px")
                        .set("height", "30px")
                        .set("display", "inline-block")
                        .set("text-align", "center")
                        .set("line-height", "30px")
                        .set("cursor", "pointer");

                // Tooltip cu detalii
                memberBubble.getElement().setProperty("title",
                        "Nume: " + membru.getNume() + " "  +
                                "\nEchipa: " + membru.getTipUtilizator() +
                                "\nContact: " + membru.getEmail());

                membersLayout.add(memberBubble);
            }
        }

        Span addMemberBubble = new Span("+");
        addMemberBubble.getStyle()
                .set("border-radius", "50%")
                .set("background-color", "#007bff")
                .set("width", "30px")
                .set("height", "30px")
                .set("display", "inline-block")
                .set("text-align", "center")
                .set("line-height", "30px")
                .set("color", "white")
                .set("cursor", "pointer");

// Eveniment pentru deschiderea dialogului de adăugare membru
        addMemberBubble.addClickListener(event -> showAddMemberDialog(membersLayout));
        membersLayout.add(addMemberBubble);

        // Layout final
        HorizontalLayout topBar = new HorizontalLayout(searchField, membersLayout, insightsButton, settingsButton, completeSprintButton, toggleViewButton);
        topBar.setWidthFull();
        topBar.setJustifyContentMode(JustifyContentMode.BETWEEN);
        topBar.setAlignItems(Alignment.CENTER);

        return topBar;
    }
    private void toggleView() {
        removeAll();
        if (isListView) {
            setupKanbanBoard();
        } else {
            showListView();
        }
        isListView = !isListView;
    }
    private void showListView() {
        VerticalLayout listView = new VerticalLayout();

        // Buton de revenire la board
        Button backButton = new Button("Înapoi la Board", e -> {
            removeAll();
            setupKanbanBoard();
            isListView = false;
        });
        listView.add(backButton);

        // Lista task-urilor în format simplu
        List<TaskDTO> tasks = taskController.getAllTasks();
        if (tasks == null || tasks.isEmpty()) {
            Notification.show("Nu există task-uri de afișat.");
            return;
        }
        // Adăugare task-uri în listă
        Grid<TaskDTO> taskGrid = new Grid<>(TaskDTO.class, false);
        taskGrid.addColumn(TaskDTO::getDenumire).setHeader("Denumire");
        taskGrid.addColumn(task -> task.getStatus() != null ? task.getStatus().toString() : "").setHeader("Status");
        taskGrid.addColumn(task -> task.getDeadline() != null ? task.getDeadline().toString() : "").setHeader("Deadline");

        taskGrid.setItems(tasks);

        // Eveniment de click pe rând pentru detalii
        taskGrid.addItemClickListener(event -> showTaskDetailsModal(event.getItem()));

        listView.add(taskGrid);

        add(listView);
    }
    private void showAddMemberDialog(HorizontalLayout membersLayout) {
        Dialog addMemberDialog = new Dialog();
        addMemberDialog.setWidth("400px");

        ComboBox<UtilizatorDTO> memberComboBox = new ComboBox<>("Alege un membru");
        memberComboBox.setItems(getAllMembers());
        memberComboBox.setItemLabelGenerator(UtilizatorDTO::getNume);

        Button addButton = new Button("Adaugă", e -> {
            UtilizatorDTO selectedMember = memberComboBox.getValue();
            if (selectedMember != null) {
                String initiale = selectedMember.getNume().substring(0, 1);
                Span memberBubble = new Span(initiale);
                memberBubble.getStyle()
                        .set("border-radius", "50%")
                        .set("background-color", "#cccccc")
                        .set("width", "30px")
                        .set("height", "30px")
                        .set("display", "inline-block")
                        .set("text-align", "center")
                        .set("line-height", "30px")
                        .set("cursor", "pointer");

                memberBubble.getElement().setProperty("title",
                        "Nume: " + selectedMember.getNume() +
                                "\nEchipa: " + selectedMember.getTipUtilizator() +
                                "\nContact: " + selectedMember.getEmail());

                membersLayout.add(memberBubble);
                addMemberDialog.close();
            } else {
                Notification.show("Te rog să selectezi un membru!");
            }
        });

        Button cancelButton = new Button("Anulează", e -> addMemberDialog.close());

        HorizontalLayout buttonsLayout = new HorizontalLayout(addButton, cancelButton);
        VerticalLayout dialogLayout = new VerticalLayout(memberComboBox, buttonsLayout);
        dialogLayout.setSpacing(true);

        addMemberDialog.add(dialogLayout);
        addMemberDialog.open();
    }





    private void showTaskDetailsModal(TaskDTO task) {
        Dialog detailsDialog = new Dialog();
        detailsDialog.setWidth("400px");

        // Titlu
        Span title = new Span("Detalii Task");
        title.getStyle().set("font-weight", "bold");

        // Informații despre task
        Span name = new Span("Denumire: " + task.getDenumire());
        Span description = new Span("Descriere: " + (task.getDescriere() != null ? task.getDescriere() : "N/A"));
        Span status = new Span("Status: " + (task.getStatus() != null ? task.getStatus().toString() : "N/A"));
        Span deadline = new Span("Deadline: " + (task.getDeadline() != null ? task.getDeadline().toString() : "N/A"));

        // Layout pentru informații
        VerticalLayout infoLayout = new VerticalLayout(title, name, description, status, deadline);
        infoLayout.setSpacing(true);

        // Buton de închidere
        Button closeButton = new Button("Închide", e -> detailsDialog.close());
        closeButton.getStyle().set("color", "red");

        // Adăugăm totul în dialog
        detailsDialog.add(infoLayout, closeButton);
        detailsDialog.open();
    }


    @PostConstruct
    public void init() {
        refreshTasks();
    }

    private void setupKanbanBoard() {
     ;

        Span toDoTitle = new Span("To-Do");
        Button addTaskButton = new Button("Adaugă Task", e -> showAddTaskDialog(null));
        VerticalLayout toDoHeader = new VerticalLayout(toDoTitle, addTaskButton);
        toDoHeader.getStyle().set("border", "1px solid lightgray").set("padding", "10px");
        toDoColumn.add(toDoHeader);
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
                    try {
                        taskController.saveTask(task);
                        refreshTasks();
                        Notification.show("Task mutat cu succes în " + targetStatus.toString() + "!");
                    } catch (Exception ex) {
                        Notification.show("Eroare la actualizarea task-ului: " + ex.getMessage());
                    }
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
            UtilizatorController utilizatorController = new UtilizatorController();
            List<UtilizatorDTO> membri = utilizatorController.getAllMembri();

            if (membri == null || membri.isEmpty()) {
                // Folosim UI.access() pentru a ne asigura că Notification.show() este apelată pe thread-ul UI
                UI.getCurrent().access(() -> Notification.show("Lista membrilor este goală."));
                return List.of();
            }
            return membri;
        } catch (Exception e) {
            // Folosim UI.access() și aici pentru a arăta eroarea într-un context valid de UI
            UI.getCurrent().access(() -> Notification.show("Eroare la încărcarea membrilor: " + e.getMessage()));
            e.printStackTrace();
            return List.of();
        }
    }


    private boolean confirm(String message) {
        return true;
    }

}
