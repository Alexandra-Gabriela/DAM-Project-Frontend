package org.example.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
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
import org.example.DTO.TipUtilizator;
import org.example.DTO.UtilizatorDTO;
import org.example.controllers.DepartamentController;

import java.util.List;

@SpringComponent
@PageTitle("Lista Departamente")
@Route(value = "departamente", layout = MainView.class)
public class DepartamenteView extends VerticalLayout {

    private final Grid<DepartamentDTO> departamenteGrid = new Grid<>(DepartamentDTO.class);
    private final Grid<UtilizatorDTO> membriGrid = new Grid<>(UtilizatorDTO.class);
    private final DepartamentController controller;
    private final VerticalLayout membriSection = new VerticalLayout();

    public DepartamenteView(DepartamentController controller) {
        this.controller = controller;

        Button addDepartmentButton = new Button("Adaugă Departament", e -> showAddDepartmentDialog(null));
        add(addDepartmentButton);

        setupGrid();
        setupMembriSection();

        add(departamenteGrid, membriSection);
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

            Button viewMembersButton = new Button("Membri", e -> showMembersForDepartment(departament.getId()));

            deleteButton.getStyle().set("color", "red");
            return new HorizontalLayout(editButton, deleteButton, viewMembersButton);
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

    private void setupMembriSection() {
        membriSection.setVisible(false);
        membriGrid.addColumn(UtilizatorDTO::getUserId).setHeader("ID");
        membriGrid.addColumn(UtilizatorDTO::getNume).setHeader("Nume");
        membriGrid.addColumn(UtilizatorDTO::getEmail).setHeader("Email");

        Button addMemberButton = new Button("Adaugă Membru", e -> {
            DepartamentDTO selectedDepartament = departamenteGrid.asSingleSelect().getValue();
            if (selectedDepartament != null) {
                showAddMemberDialog(selectedDepartament.getId());
            } else {
                Notification.show("Selectați un departament mai întâi!");
            }
        });
        membriSection.add(membriGrid, addMemberButton);
    }

    private void showMembersForDepartment(Integer departamentId) {
        List<UtilizatorDTO> membri = controller.vizualizeazaMembriiDepartament(departamentId);

        if (membri == null || membri.isEmpty()) {
            Notification.show("Acest departament nu are membri!");
        } else {
            membriGrid.setItems(membri);
        }

        membriSection.setVisible(true);
    }

    private void showAddMemberDialog(Integer departamentId) {
        Dialog dialog = new Dialog();
        dialog.setWidth("400px");

        TextField numeField = new TextField("Nume Membru");
        TextField emailField = new TextField("Email Membru");
        ComboBox<TipUtilizator> tipUtilizatorField = new ComboBox<>("Tip Utilizator");
        tipUtilizatorField.setItems(TipUtilizator.values());
        tipUtilizatorField.setItemLabelGenerator(TipUtilizator::name); // Setează etichetele (dacă enum are metode custom, le poți folosi aici)

        Button saveButton = new Button("Adaugă", e -> {
            UtilizatorDTO utilizator = new UtilizatorDTO();
            utilizator.setNume(numeField.getValue());
            utilizator.setEmail(emailField.getValue());
            utilizator.setTipUtilizator(tipUtilizatorField.getValue());
            try {
                controller.adaugaMembruLaDepartament(departamentId, utilizator);
                Notification.show("Membru adăugat cu succes!");
                showMembersForDepartment(departamentId);
            } catch (Exception ex) {
                Notification.show("Eroare: " + ex.getMessage());
            }
            dialog.close();
        });

        Button cancelButton = new Button("Anulează", e -> dialog.close());

        dialog.add(new VerticalLayout(numeField, emailField, tipUtilizatorField, new HorizontalLayout(saveButton, cancelButton)));
        dialog.open();
    }

    private void showAddDepartmentDialog(DepartamentDTO departament) {
        Dialog dialog = new Dialog();
        dialog.setWidth("400px");

        TextField numeField = new TextField("Nume Departament");

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
        return true;
    }
}
