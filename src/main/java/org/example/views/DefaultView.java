package org.example.views;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import elemental.json.Json;
import elemental.json.JsonArray;
import elemental.json.JsonObject;

@Route(value = "", layout = MainView.class)
public class DefaultView extends Div {
    public DefaultView() {
        setSizeFull();

        // Stilizare layout
        VerticalLayout layout = new VerticalLayout();
        layout.setSizeFull();
        layout.getStyle().set("padding", "10px");

        // Titlu
        Span title = new Span("Calendar cu Task-uri");
        title.getStyle().set("font-size", "24px").set("font-weight", "bold");
        layout.add(title);

        // Calendarul
        Div calendarContainer = new Div();
        calendarContainer.setId("calendar");
        calendarContainer.setSizeFull();
        calendarContainer.getStyle().set("border", "1px solid #ccc").set("margin-top", "20px");
        layout.add(calendarContainer);

        // Inițializare Calendar
        initCalendar();

        add(layout);
    }

    private void initCalendar() {
        getElement().executeJs(
                "const calendarEl = document.querySelector('#calendar');" +
                        "if (calendarEl) {" +
                        "   const calendar = new FullCalendar.Calendar(calendarEl, {" +
                        "       initialView: 'dayGridMonth'," +
                        "       headerToolbar: {" +
                        "           left: 'prev,next today'," +
                        "           center: 'title'," +
                        "           right: 'dayGridMonth,timeGridWeek,timeGridDay'" +
                        "       }," +
                        "       events: $0" +
                        "   });" +
                        "   calendar.render();" +
                        "} ",
                getTaskEvents());
    }

    private JsonArray getTaskEvents() {
        JsonArray events = Json.createArray();

        // Exemplu de task-uri
        events.set(0, createEvent("Task în execuție", "2025-01-15", "in-execution"));
        events.set(1, createEvent("Task finalizat", "2025-01-10", "completed"));
        events.set(2, createEvent("Alt task în execuție", "2025-01-20", "in-execution"));

        return events;
    }

    private JsonObject createEvent(String title, String date, String status) {
        JsonObject event = Json.createObject();
        event.put("title", title);
        event.put("start", date);

        // Culoare în funcție de status
        if ("completed".equals(status)) {
            event.put("color", "green");
        } else if ("in-execution".equals(status)) {
            event.put("color", "blue");
        } else {
            event.put("color", "gray");
        }

        return event;
    }
}
