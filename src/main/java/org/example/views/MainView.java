package org.example.views;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.server.VaadinSession;

public class MainView extends AppLayout implements RouterLayout {
    private final VerticalLayout sidebar;
    private boolean isSidebarExpanded;

    public MainView() {
        isSidebarExpanded = VaadinSession.getCurrent().getAttribute("isSidebarExpanded") != null
                ? VaadinSession.getCurrent().getAttribute("isSidebarExpanded").equals(true)
                : true;

        sidebar = createSidebar();
        sidebar.setVisible(isSidebarExpanded);

        Button toggleButton = createNavbarToggle();
        addToNavbar(toggleButton);

        HorizontalLayout layout = new HorizontalLayout(sidebar);
        layout.setSizeFull();
        addToDrawer(sidebar); // Sidebar-ul adăugat în drawer
    }

    private VerticalLayout createSidebar() {
        VerticalLayout sidebar = new VerticalLayout();
        sidebar.setWidth("250px");
        sidebar.getStyle().set("background-color", "#f7f7f7");
        sidebar.getStyle().set("border-right", "1px solid #ddd");

        RouterLink homeLink = new RouterLink("🏠 Acasă", DefaultView.class);
        RouterLink projectsLink = new RouterLink("📁 Proiecte", ProjectsView.class);
        RouterLink tasksLink = new RouterLink("📝 Task-uri", TaskBoardView.class);

        sidebar.add(
                new Span("Meniu"),
                homeLink,
                projectsLink,
                tasksLink
        );

        return sidebar;
    }

    private Button createNavbarToggle() {
        Button toggleButton = new Button("☰", event -> toggleSidebar());
        toggleButton.getStyle().set("background-color", "transparent");
        toggleButton.getStyle().set("border", "none");
        toggleButton.getStyle().set("font-size", "24px");
        toggleButton.getStyle().set("cursor", "pointer");
        return toggleButton;
    }

    private void toggleSidebar() {
        isSidebarExpanded = !isSidebarExpanded;
        sidebar.setVisible(isSidebarExpanded);
        VaadinSession.getCurrent().setAttribute("isSidebarExpanded", isSidebarExpanded);
    }
}
