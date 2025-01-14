
package org.example.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
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
import org.example.DTO.EchipaDTO;
import org.example.controllers.EchipaController;

import java.util.List;

@SpringComponent
@PageTitle("Lista Echipe")
@Route(value = "echipe", layout = MainView.class)
public class EchipeView extends VerticalLayout {
    private final Grid<EchipaDTO> echipeGrid = new Grid<>(EchipaDTO.class);
    private final EchipaController controller;

    public EchipeView(EchipaController controller) {
        this.controller = controller;

        Button addTeamButton = new Button("Adaugă Echipă", e -> showAddTeamDialog(null));
        add(addTeamButton);
        setupGrid();
        add(echipeGrid);
    }

    @PostConstruct
    public void init() {
        refreshEchipe();
    }

    private void setupGrid() {
        echipeGrid.removeAllColumns();

        echipeGrid.addColumn(EchipaDTO::getIdEchipa).setHeader("ID").setSortable(true);
        echipeGrid.addColumn(EchipaDTO::getDenumire).setHeader("Denumire").setSortable(true);
        echipeGrid.addColumn(echipa -> echipa.isArhivata() ? "Da" : "Nu").setHeader("Arhivata").setSortable(true);


        echipeGrid.addComponentColumn(echipa -> {
            Button editButton = new Button("Edit", e -> showAddTeamDialog(echipa));
            Button deleteButton = new Button("Delete", e -> {
                if (confirm("Ești sigur că vrei să ștergi această echipă?")) {
                    controller.deleteTeam(echipa.getIdEchipa());
                    refreshEchipe();
                    Notification.show("Echipă ștearsă!");
                }
            });

            deleteButton.getStyle().set("color", "red");
            return new HorizontalLayout(editButton, deleteButton);
        }).setHeader("Acțiuni");
    }

    private void refreshEchipe() {
        try {
            List<EchipaDTO> echipe = controller.getAllTeams();
            if (echipe == null || echipe.isEmpty()) {
                Notification.show("Nu s-au găsit echipe!");
            } else {
                echipeGrid.setItems(echipe);
            }
        } catch (Exception e) {
            Notification.show("Eroare la încărcarea echipelor: " + e.getMessage(), 5000, Notification.Position.MIDDLE);
            e.printStackTrace();
        }
    }

    private void showAddTeamDialog(EchipaDTO echipa) {
        Dialog dialog = new Dialog();
        dialog.setWidth("400px");

        TextField denumireField = new TextField("Denumire Echipă");
        Checkbox arhivataCheckBox = new Checkbox("Arhivată");


        // Pre-completare câmpuri la edit
        if (echipa != null) {
            denumireField.setValue(echipa.getDenumire() != null ? echipa.getDenumire() : "");
            arhivataCheckBox.setValue(echipa.isArhivata());
        }

        Button saveButton = new Button("Save", e -> {
            EchipaDTO echipaFinal = echipa != null ? echipa : new EchipaDTO();
            echipaFinal.setDenumire(denumireField.getValue());
            echipaFinal.setArhivata(arhivataCheckBox.getValue());
            try {
                controller.saveEchipa(echipaFinal);
                refreshEchipe();
                Notification.show("Echipa salvata cu succes!");
            } catch (Exception ex) {
                Notification.show("Eroare la salvarea echipei: " + ex.getMessage());
            }
            dialog.close();
        });

        Button cancelButton = new Button("Cancel", e -> dialog.close());

        HorizontalLayout buttonsLayout = new HorizontalLayout(saveButton, cancelButton);
        VerticalLayout content = new VerticalLayout(denumireField, arhivataCheckBox, buttonsLayout);
        content.setSpacing(true);
        dialog.add(content);
        dialog.open();
    }
    private boolean confirm(String message) {
        return true;
    }


}



