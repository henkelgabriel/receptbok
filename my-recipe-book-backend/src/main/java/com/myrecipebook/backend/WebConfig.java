// src/main/java/com/myrecipebook/backend/WebConfig.java
package com.myrecipebook.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${spring.web.cors.allowed-origins}")
    private String allowedOrigins; // Läs in tillåtna ursprung från properties

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Konfigurerar Spring Boot för att servera filer från mappen 'uploads/images/'
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + uploadDir + "/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Konfigurerar CORS
        registry.addMapping("/api/**") // Gäller för alla API-endpoints
                .allowedOrigins(allowedOrigins) // Använd den dynamiska originen från properties
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}