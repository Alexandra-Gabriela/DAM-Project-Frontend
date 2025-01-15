package org.example.views;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.SpringComponent;
import org.example.DTO.CursDTO;
import org.example.controllers.CursuriController;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Value;

@SpringComponent
@PageTitle("Board de Cursuri")
@Route(value = "curs-board", layout = MainView.class)
public class CursuriView extends VerticalLayout {

    private final CursuriController cursuriController;
    private final Grid<CursDTO> cursuriGrid;

    public CursuriView(@Value("${backend.service.proiecte.url}") String baseUrl) {
        this.cursuriController = new CursuriController(baseUrl); // Folosește URL-ul din configurație
        this.cursuriGrid = new Grid<>(CursDTO.class);

        configureGrid();
        add(cursuriGrid, createRefreshButton());
        incarcaCursuri();
    }

    private void configureGrid() {
        cursuriGrid.setColumns("id", "titlu", "adminId");
        cursuriGrid.setSizeFull();
    }

    private Button createRefreshButton() {
        return new Button("Reîncarcă", event -> incarcaCursuri());
    }

    private void incarcaCursuri() {
        // Folosește un ExecutorService pentru a gestiona thread-urile
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        executorService.submit(() -> {
            try {
                // Încarcă cursurile într-un thread separat
                List<CursDTO> cursuri = cursuriController.obtineToateCursurile();

                // Folosim UI.getCurrent().access() pentru a actualiza UI-ul pe thread-ul principal
                UI.getCurrent().access(() -> cursuriGrid.setItems(cursuri));
            } catch (Exception e) {
                // În caz de eroare, afișăm notificarea pe thread-ul UI
                UI.getCurrent().access(() ->
                        Notification.show("Eroare la încărcarea cursurilor: " + e.getMessage(), 5000, Notification.Position.MIDDLE)
                );
            } finally {
                // Este important să închizi executorul după ce ai terminat
                executorService.shutdown();
            }
        });
    }


}
