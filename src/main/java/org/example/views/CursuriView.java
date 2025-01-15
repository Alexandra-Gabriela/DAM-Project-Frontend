package org.example.views;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.SpringComponent;
import org.example.DTO.CursDTO;
import org.example.DTO.UtilizatorDTO;
import org.example.Services.UtilizatorService;
import org.example.controllers.CursuriController;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@SpringComponent
@PageTitle("My Courses")
@Route(value = "curs-board", layout = MainView.class)
public class CursuriView extends VerticalLayout {

    private final CursuriController cursuriController;
    private List<CursDTO> cursuri;
    private VerticalLayout courseList;

    @Autowired
    public CursuriView(CursuriController cursuriController) {
        this.cursuriController = cursuriController;

        // Layout general
        setSizeFull();
        setPadding(false);
        setSpacing(false);
        getStyle().set("background-color", "#f5f5f5");

        // Crearea componentelor
        HorizontalLayout header = createHeader();
        HorizontalLayout mainContent = createMainContent();

        add(header, mainContent);
    }

    private HorizontalLayout createHeader() {
        H1 title = new H1("My Courses");
        title.getStyle().set("margin", "0").set("color", "#333");

        TextField searchField = new TextField();
        searchField.setPlaceholder("Search...");
        searchField.setWidth("300px");
        searchField.getStyle().set("margin-left", "auto");

        Button notificationButton = new Button(VaadinIcon.BELL.create());
        notificationButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        Button addCourseButton = new Button("Add Course", event -> openAddCourseDialog());
        addCourseButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        HorizontalLayout header = new HorizontalLayout(title, searchField, addCourseButton, notificationButton);
        header.setWidthFull();
        header.setAlignItems(Alignment.CENTER);
        header.setPadding(true);

        return header;
    }

    private HorizontalLayout createMainContent() {
        VerticalLayout sidebar = createSidebar();
        courseList = createCourseList();

        HorizontalLayout mainContent = new HorizontalLayout(sidebar, courseList);
        mainContent.setSizeFull();
        mainContent.setFlexGrow(1, courseList);

        return mainContent;
    }
    private VerticalLayout sidebar;
    private VerticalLayout createSidebar() {
        DatePicker calendar = new DatePicker();
        calendar.setLabel("Select Date");
        calendar.setWidthFull();

        sidebar = new VerticalLayout();
        sidebar.setWidth("300px");
        sidebar.add(new H4("Assigned Users"));
        add(sidebar);


        return sidebar;
    }

    private VerticalLayout createCourseList() {
        VerticalLayout courseList = new VerticalLayout();
        courseList.setSizeFull();
        courseList.setPadding(false);
        courseList.setSpacing(true);
        courseList.setAlignItems(Alignment.STRETCH); // Cardurile ocupă lățimea completă

        this.cursuri = cursuriController.obtineToateCursurile();
        cursuri.forEach(curs -> courseList.add(createCourseCard(curs)));

        this.courseList = courseList;
        return courseList;
    }

    private Component createCourseCard(CursDTO curs) {
        Div card = new Div();
        card.getStyle()
                .set("background-color", "#ffffff")
                .set("padding", "1em")
                .set("margin-bottom", "1em")
                .set("border-radius", "8px")
                .set("box-shadow", "0 4px 6px rgba(0, 0, 0, 0.1)");

        H3 title = new H3(curs.getTitlu());
        title.getStyle().set("margin", "0 0 0.5em 0");

        Span description = new Span(curs.getDescriere());
        description.getStyle().set("color", "#666");

        Button assignUsersButton = new Button("Assign Users", event -> openAssignUsersDialog(curs));
        assignUsersButton.addThemeVariants(ButtonVariant.LUMO_CONTRAST);

        Button editButton = new Button("Edit", event -> openEditCourseDialog(curs));
        editButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        Button deleteButton = new Button("Delete", event -> {
            try {
                cursuriController.stergeCurs(curs.getId());
                refreshCourseListFromBackend();
                Notification.show("Course deleted successfully!");
            } catch (Exception e) {
                Notification.show("Failed to delete course: " + e.getMessage());
            }
        });
        deleteButton.addThemeVariants(ButtonVariant.LUMO_ERROR);

        HorizontalLayout footer = new HorizontalLayout(assignUsersButton, editButton, deleteButton);
        footer.setWidthFull();
        footer.setAlignItems(Alignment.CENTER);

        card.add(title, description, footer);
        return card;
    }

    private void openAssignUsersDialog(CursDTO curs) {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle("Assign Users to " + curs.getTitlu());

        // ComboBox pentru selectarea utilizatorilor
        ComboBox<UtilizatorDTO> userComboBox = new ComboBox<>("Select User");
        userComboBox.setItemLabelGenerator(UtilizatorDTO::getNume);
        userComboBox.setItems(new UtilizatorService().getAllUtilizatori());

        // Butoane
        Button assignButton = new Button("Assign", event -> {
            UtilizatorDTO selectedUser = userComboBox.getValue();
            if (selectedUser != null) {
                try {
                    List<Integer> userIds = List.of(selectedUser.getUserId());
                    cursuriController.asigneazaUtilizatoriLaCurs(curs.getId(), userIds);
                    Notification.show("User assigned successfully!");
                    dialog.close();
                } catch (Exception e) {
                    Notification.show("Failed to assign user: " + e.getMessage());
                }
            } else {
                Notification.show("Please select a user.");
            }
        });
        assignButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button cancelButton = new Button("Cancel", event -> dialog.close());

        dialog.add(userComboBox, new HorizontalLayout(assignButton, cancelButton));
        dialog.open();
    }


    private void openAddCourseDialog() {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle("Add New Course");

        TextField titleField = new TextField("Title");
        TextArea descriptionField = new TextArea("Description");
        TextField durationField = new TextField("Duration (hours)");
        durationField.setPattern("\\d+");

        ComboBox<UtilizatorDTO> adminComboBox = new ComboBox<>("Admin");
        adminComboBox.setItemLabelGenerator(UtilizatorDTO::getNume);
        adminComboBox.setItems(new UtilizatorService().getAllAdmini());

        Button saveButton = new Button("Save", event -> {
            try {
                CursDTO newCourse = new CursDTO();
                newCourse.setTitlu(titleField.getValue());
                newCourse.setDescriere(descriptionField.getValue());
                newCourse.setDurataOre(Integer.parseInt(durationField.getValue()));
                newCourse.setAdminId(adminComboBox.getValue());

                cursuriController.saveCurs(newCourse);

                refreshCourseListFromBackend();
                Notification.show("Course saved successfully!");
            } catch (Exception e) {
                Notification.show("Failed to save course: " + e.getMessage());
            } finally {
                dialog.close();
            }
        });

        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        Button cancelButton = new Button("Cancel", event -> dialog.close());

        dialog.add(titleField, descriptionField, durationField, adminComboBox, new HorizontalLayout(saveButton, cancelButton));
        dialog.open();
    }

    private void openEditCourseDialog(CursDTO curs) {
        Dialog dialog = new Dialog();
        dialog.setHeaderTitle("Edit Course");

        TextField titleField = new TextField("Title");
        titleField.setValue(curs.getTitlu());

        TextArea descriptionField = new TextArea("Description");
        descriptionField.setValue(curs.getDescriere());

        TextField durationField = new TextField("Duration (hours)");
        durationField.setValue(String.valueOf(curs.getDurataOre()));
        durationField.setPattern("\\d+");

        ComboBox<UtilizatorDTO> adminComboBox = new ComboBox<>("Admin");
        adminComboBox.setItemLabelGenerator(UtilizatorDTO::getNume);
        adminComboBox.setItems(new UtilizatorService().getAllAdmini());
        adminComboBox.setValue(curs.getAdminId());

        Button saveButton = new Button("Save", event -> {
            try {
                curs.setTitlu(titleField.getValue());
                curs.setDescriere(descriptionField.getValue());
                curs.setDurataOre(Integer.parseInt(durationField.getValue()));
                curs.setAdminId(adminComboBox.getValue());

                cursuriController.editeazaCurs(curs.getId(), curs);

                refreshCourseListFromBackend();
                Notification.show("Course updated successfully!");
            } catch (Exception e) {
                Notification.show("Failed to update course: " + e.getMessage());
            } finally {
                dialog.close();
            }
        });

        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        Button cancelButton = new Button("Cancel", event -> dialog.close());

        dialog.add(titleField, descriptionField, durationField, adminComboBox, new HorizontalLayout(saveButton, cancelButton));
        dialog.open();
    }

    private void refreshCourseListFromBackend() {
        try {
            this.cursuri = cursuriController.obtineToateCursurile();
            courseList.removeAll();
            cursuri.forEach(curs -> courseList.add(createCourseCard(curs)));
        } catch (Exception e) {
            Notification.show("Failed to refresh courses: " + e.getMessage());
        }
    }
}
