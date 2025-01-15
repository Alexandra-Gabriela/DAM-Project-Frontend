package org.example.views;

import com.vaadin.flow.component.UI;
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
import org.example.DTO.ProiectDTO;
import org.example.DTO.UtilizatorDTO;
import org.example.controllers.ProjectController;
import org.example.controllers.UtilizatorController;
import org.example.utils.HttpClientUtil;

import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;

@SpringComponent
@PageTitle("Lista Proiecte")
@Route(value = "proiecte", layout = MainView.class)
public class ProjectsView extends VerticalLayout {
    private final Grid<ProiectDTO> projectGrid = new Grid<>(ProiectDTO.class);
    private final ProjectController controller;

    public ProjectsView(ProjectController controller) {
        this.controller = controller;

        Button addProjectButton = new Button("Adaugă Proiect", e -> showAddProjectDialog(null));
        add(addProjectButton);
        setupGrid();
        add(projectGrid);
    }

    @PostConstruct
    public void init() {
        refreshProjects();
    }

    private void setupGrid() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        projectGrid.removeAllColumns();

        projectGrid.addColumn(ProiectDTO::getDenumire).setHeader("Denumire").setSortable(true);
        projectGrid.addColumn(ProiectDTO::getDescriere).setHeader("Descriere").setSortable(true);
        projectGrid.addColumn(ProiectDTO::getStatus).setHeader("Status").setSortable(true);
        projectGrid.addColumn(proiect ->
                proiect.getDataIncepere() != null ? dateFormat.format(proiect.getDataIncepere()) : "N/A"
        ).setHeader("Data Începere").setSortable(true);
        projectGrid.addColumn(proiect ->
                proiect.getDataFinalizare() != null ? dateFormat.format(proiect.getDataFinalizare()) : "N/A"
        ).setHeader("Data Finalizare").setSortable(true);
        projectGrid.addColumn(proiect ->
                proiect.getLider() != null ? proiect.getLider().getNume() : "N/A"
        ).setHeader("Lider").setSortable(true);

        projectGrid.addComponentColumn(proiect -> {
            Button editButton = new Button("Edit", e -> showAddProjectDialog(proiect));
            Button deleteButton = new Button("Delete", e -> {
                if (confirm("Ești sigur că vrei să ștergi acest proiect?")) {
                    controller.deleteProject(proiect.getId());
                    refreshProjects();
                    Notification.show("Proiect șters!");
                }
            });

            deleteButton.getStyle().set("color", "red");
            return new HorizontalLayout(editButton, deleteButton);
        }).setHeader("Acțiuni");
    }

    private void refreshProjects() {
        List<ProiectDTO> projects = controller.getAllProjects();
        if (projects == null || projects.isEmpty()) {
            Notification.show("Nu s-au găsit proiecte!");
        } else {
            projectGrid.setItems(projects);
        }
    }

    private void showAddProjectDialog(ProiectDTO proiect) {
        Dialog dialog = new Dialog();
        dialog.setWidth("600px");

        FlexLayout formLayout = new FlexLayout();
        formLayout.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        formLayout.setJustifyContentMode(FlexLayout.JustifyContentMode.BETWEEN);

        TextField denumireField = new TextField("Denumire");
        TextArea descriereField = new TextArea("Descriere");
        DatePicker dataInceperePicker = new DatePicker("Data Începere");
        DatePicker dataFinalizarePicker = new DatePicker("Data Finalizare");
        ComboBox<UtilizatorDTO> liderComboBox = new ComboBox<>("Lider");

        denumireField.setWidth("48%");
        descriereField.setWidth("48%");
        dataInceperePicker.setWidth("48%");
        dataFinalizarePicker.setWidth("48%");
        liderComboBox.setWidth("48%");

        liderComboBox.setItems(getAllLideri());
        liderComboBox.setItemLabelGenerator(UtilizatorDTO::getNume);

        if (proiect != null) {
            denumireField.setValue(proiect.getDenumire() != null ? proiect.getDenumire() : "");
            descriereField.setValue(proiect.getDescriere() != null ? proiect.getDescriere() : "");
            dataInceperePicker.setValue(proiect.getDataIncepere() != null
                    ? proiect.getDataIncepere().toInstant().atZone(ZoneId.systemDefault()).toLocalDate() : null);
            dataFinalizarePicker.setValue(proiect.getDataFinalizare() != null
                    ? proiect.getDataFinalizare().toInstant().atZone(ZoneId.systemDefault()).toLocalDate() : null);
            liderComboBox.setValue(proiect.getLider());
        }


        formLayout.add(denumireField, descriereField, dataInceperePicker, dataFinalizarePicker, liderComboBox);

        Button saveButton = new Button("Save", e -> {
            ProiectDTO proiectFinal = proiect != null ? proiect : new ProiectDTO();
            proiectFinal.setDenumire(denumireField.getValue());
            proiectFinal.setDescriere(descriereField.getValue());
            proiectFinal.setDataIncepere(dataInceperePicker.getValue() != null
                    ? java.sql.Date.valueOf(dataInceperePicker.getValue()) : null);
            proiectFinal.setDataFinalizare(dataFinalizarePicker.getValue() != null
                    ? java.sql.Date.valueOf(dataFinalizarePicker.getValue()) : null);
            proiectFinal.setLider(liderComboBox.getValue());

            try {
                controller.saveProject(proiectFinal);
                refreshProjects();
                Notification.show("Proiect salvat cu succes!");
            } catch (Exception ex) {
                Notification.show("Eroare la salvarea proiectului: " + ex.getMessage());
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

    private List<UtilizatorDTO> getAllLideri() {
        try {
            UtilizatorController utilizatorController = new UtilizatorController();
            List<UtilizatorDTO> lideri = utilizatorController.getAllLideri();

            if (lideri == null || lideri.isEmpty()) {
                Notification.show("Lista liderilor este goală.");
                return List.of();
            }
            return lideri;
        } catch (Exception e) {
            Notification.show("Eroare la încărcarea liderilor: " + e.getMessage());
            e.printStackTrace();
            return List.of();
        }
    }

    private boolean confirm(String message) {

        return true;
    }
}
