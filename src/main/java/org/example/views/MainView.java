package org.example.views;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;


@Route
public class MainView extends AppLayout {

    public MainView() {
        Tabs tabs = new Tabs(
                createTab("Proiecte", ProjectsView.class)
                // Adaugă alte taburi pentru pagini adiționale
        );
        tabs.setOrientation(Tabs.Orientation.HORIZONTAL);
        addToNavbar(tabs);
    }

    private Tab createTab(String label, Class<? extends com.vaadin.flow.component.Component> navigationTarget) {
        RouterLink link = new RouterLink(label, navigationTarget);
        link.setTabIndex(-1);
        return new Tab(link);

    }
}