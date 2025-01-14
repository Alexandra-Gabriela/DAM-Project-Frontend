package org.example;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.BodySize;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.server.PWA;
import org.springframework.stereotype.Component;

@Component
@Push
@BodySize(height = "100vh", width = "100vw")
@PWA(name = "Calendar App", shortName = "Calendar")
public class AppShellConfig implements AppShellConfigurator {
}
