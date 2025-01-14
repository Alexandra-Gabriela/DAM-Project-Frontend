package org.example.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import org.example.DTO.TaskDTO;
import org.example.DTO.UtilizatorDTO;
import org.example.controllers.TaskController;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

@Route(value = "", layout = MainView.class)
public class DefaultView extends Div {

    private Div calendarContainer;
    private LocalDate selectedDate;

    @Autowired
    private TaskController taskController; // Injectează controller-ul de task-uri

    public DefaultView(TaskController taskController) {
        this.taskController = taskController;
        setSizeFull();

        // Inițializare date
        selectedDate = LocalDate.now();

        // Layout principal
        VerticalLayout layout = new VerticalLayout();
        layout.setSizeFull();
        layout.getStyle().set("padding", "10px");

        // Titlu
        Span title = new Span("Calendar cu Task-uri");
        title.getStyle().set("font-size", "24px").set("font-weight", "bold").set("margin-bottom", "20px");
        layout.add(title);

        // Selector săptămână și buton de actualizare
        HorizontalLayout controls = new HorizontalLayout();
        DatePicker datePicker = new DatePicker("Selectează săptămâna");
        datePicker.setValue(selectedDate);
        datePicker.addValueChangeListener(event -> {
            if (event.getValue() != null) {
                selectedDate = event.getValue(); // Actualizează data selectată
                updateCalendar(selectedDate); // Recalculează săptămâna și actualizează calendarul
            }
        });

        Button updateButton = new Button("Actualizează", event -> {
            if (datePicker.getValue() != null) {
                selectedDate = datePicker.getValue(); // Sincronizează data selectată
                updateCalendar(selectedDate); // Actualizează calendarul
            }
        });

        controls.add(datePicker, updateButton);
        layout.add(controls);

        // Calendar
        calendarContainer = new Div(); // Inițializează containerul calendarului
        calendarContainer.setWidthFull();
        layout.add(calendarContainer);

        // Creează calendarul inițial
        updateCalendar(selectedDate);

        add(layout);
    }

    private Div createCalendar(LocalDate date) {
        Div calendar = new Div();
        calendar.setWidthFull();
        calendar.getStyle().set("display", "grid")
                .set("grid-template-columns", "repeat(7, 1fr)")
                .set("gap", "10px");

        // Obține zilele săptămânii selectate
        List<LocalDate> weekDays = getWeekDays(date);

        for (LocalDate day : weekDays) {
            // Coloană pentru fiecare zi
            VerticalLayout dayColumn = new VerticalLayout();
            dayColumn.getStyle().set("border", "1px solid #ccc")
                    .set("border-radius", "5px")
                    .set("padding", "10px");

            // Afișează data zilei
            Span dayLabel = new Span(day.toString());
            dayLabel.getStyle().set("font-weight", "bold").set("margin-bottom", "10px");
            dayColumn.add(dayLabel);

            // Adaugă task-uri pentru fiecare zi
            List<TaskDTO> dayTasks = getTasksForDate(day);
            if (dayTasks.isEmpty()) {
                Span noTasks = new Span("Nu există task-uri.");
                noTasks.getStyle().set("color", "gray").set("font-style", "italic");
                dayColumn.add(noTasks);
            } else {
                for (TaskDTO task : dayTasks) {
                    Div taskCard = createTaskCard(task);
                    dayColumn.add(taskCard);
                }
            }

            calendar.add(dayColumn);
        }

        return calendar;
    }

    private Div createTaskCard(TaskDTO task) {
        Div card = new Div();
        card.setText(task.getDenumire() + " (" + task.getStatus() + ")");
        card.getStyle().set("background-color", "lightblue") // Adaptează în funcție de status
                .set("padding", "10px")
                .set("border-radius", "5px")
                .set("margin-bottom", "5px")
                .set("font-size", "14px");
        return card;
    }

    private void updateCalendar(LocalDate newDate) {
        if (newDate != null) {
            selectedDate = newDate; // Actualizează data selectată
        }

        // Elimină toate componentele din calendarContainer
        calendarContainer.removeAll();

        // Recreează zilele săptămânii în calendarContainer
        Div updatedCalendar = createCalendar(selectedDate);
        calendarContainer.add(updatedCalendar); // Adaugă noile componente
    }

    private List<LocalDate> getWeekDays(LocalDate date) {
        // Obține toate zilele săptămânii curente
        LocalDate startOfWeek = date.with(WeekFields.of(Locale.getDefault()).getFirstDayOfWeek());
        List<LocalDate> days = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            days.add(startOfWeek.plusDays(i));
        }
        return days;
    }

    private List<TaskDTO> getTasksForDate(LocalDate date) {
        // Obține toate task-urile și filtrează-le după data selectată
        List<TaskDTO> allTasks = taskController.getAllTasks();
        return allTasks.stream()
                .filter(task -> task.getDeadline().equals(date))
                .collect(Collectors.toList());
    }


}
