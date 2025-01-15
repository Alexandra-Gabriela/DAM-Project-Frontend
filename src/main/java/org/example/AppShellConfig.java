package org.example;

import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.BodySize;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.server.PWA;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Push
@BodySize(height = "100vh", width = "100vw")
@PWA(name = "Calendar App", shortName = "Calendar")
//@CssImport("./styles/styles.css")
public class AppShellConfig implements AppShellConfigurator {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
