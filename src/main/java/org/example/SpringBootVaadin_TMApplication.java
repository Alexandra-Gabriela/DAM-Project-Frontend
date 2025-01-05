package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.logging.Logger;

/**
 * The entry point of the Spring Boot application.
 */
@SpringBootApplication
public class SpringBootVaadin_TMApplication {
    private static Logger logger = Logger.getLogger(SpringBootVaadin_TMApplication.class.getName());

    public static void main(String[] args) {
        logger.info("Loading ... SpringBootVaadin_ScrumApplication: Vaadin Web Client ... ");
        SpringApplication.run(SpringBootVaadin_TMApplication.class, args);
    }

}

