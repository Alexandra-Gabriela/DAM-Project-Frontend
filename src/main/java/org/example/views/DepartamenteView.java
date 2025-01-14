package org.example.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.SpringComponent;
import jakarta.annotation.PostConstruct;
import org.example.DTO.DepartamentDTO;
import org.example.controllers.DepartamentController;

import java.util.List;

@SpringComponent
@PageTitle("Lista Departamente")
@Route(value = "departamente", layout = MainView.class)
public class DepartamenteView extends VerticalLayout {

    private final Grid<DepartamentDTO> departamenteGrid = new Grid<>(DepartamentDTO.class);
    private final DepartamentController controller;

    public DepartamenteView(DepartamentController controller) {
        this.controller = controller;

        Button addDepartmentButton = new Button("Adaugă Departament", e -> showAddDepartmentDialog(null));
        add(addDepartmentButton);
        setupGrid();
        add(departamenteGrid);
    }

    @PostConstruct
    public void init() {
        refreshDepartamente();
    }

    private void setupGrid() {
        departamenteGrid.removeAllColumns();
        departamenteGrid.addColumn(DepartamentDTO::getId).setHeader("ID").setSortable(true);
        departamenteGrid.addColumn(DepartamentDTO::getNumeDepartament).setHeader("Nume").setSortable(true);

        departamenteGrid.addComponentColumn(departament -> {
            Button editButton = new Button("Edit", e -> showAddDepartmentDialog(departament));
            Button deleteButton = new Button("Delete", e -> {
                if (confirm("Ești sigur că vrei să ștergi acest departament?")) {
                    controller.deleteDepartament(departament.getId());
                    refreshDepartamente();
                    Notification.show("Departament șters!");
                }
            });

            deleteButton.getStyle().set("color", "red");
            return new HorizontalLayout(editButton, deleteButton);
        }).setHeader("Acțiuni");
    }

    private void refreshDepartamente() {
        List<DepartamentDTO> departamente = controller.getAllDepartamente();
        if (departamente == null || departamente.isEmpty()) {
            Notification.show("Nu s-au găsit departamente!");
        } else {
            departamenteGrid.setItems(departamente);
        }
    }

    private void showAddDepartmentDialog(DepartamentDTO departament) {
        Dialog dialog = new Dialog();
        dialog.setWidth("400px");

        TextField numeField = new TextField("Nume Departament");

        // Verifică dacă este un departament existent
        if (departament != null) {
            numeField.setValue(departament.getNumeDepartament() != null ? departament.getNumeDepartament() : "");
        }

        Button saveButton = new Button("Save", e -> {
            DepartamentDTO departamentFinal = departament != null ? departament : new DepartamentDTO();
            departamentFinal.setNumeDepartament(numeField.getValue());

            try {
                if (departament == null) {
                    controller.saveDepartament(departamentFinal);
                } else {
                    controller.updateDepartament(departament.getId(), departamentFinal);
                }
                refreshDepartamente();
                Notification.show("Departament salvat cu succes!");
            } catch (Exception ex) {
                Notification.show("Eroare la salvarea departamentului: " + ex.getMessage());
            }
            dialog.close();
        });

        Button cancelButton = new Button("Cancel", e -> dialog.close());

        HorizontalLayout buttonsLayout = new HorizontalLayout(saveButton, cancelButton);
        VerticalLayout content = new VerticalLayout(numeField, buttonsLayout);
        content.setSpacing(true);
        dialog.add(content);
        dialog.open();
    }


    private boolean confirm(String message) {
        return true; // Poți adăuga o implementare mai sofisticată pentru confirmări.
    }
}
