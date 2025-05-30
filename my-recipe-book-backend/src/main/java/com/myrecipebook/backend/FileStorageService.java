// src/main/java/com/myrecipebook/backend/FileStorageService.java (eller src/main/java/com/myrecipebook/backend/service/FileStorageService.java)
package com.myrecipebook.backend; // Eller com.myrecipebook.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Kunde inte skapa uppladdningskatalogen!", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // Generera ett unikt filnamn
        String fileName = UUID.randomUUID().toString() + fileExtension;
        Path targetLocation = this.fileStorageLocation.resolve(fileName);

        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName; // Returnera det unika filnamnet
        } catch (IOException ex) {
            throw new RuntimeException("Kunde inte lagra filen " + fileName + ". Försök igen!", ex);
        }
    }

    public void deleteFile(String fileName) {
        Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            System.err.println("Kunde inte radera filen: " + fileName + ". Fel: " + ex.getMessage());
            // Kasta ingen exception här, bara logga. Filen kanske inte finns, men det är ok.
        }
    }
}