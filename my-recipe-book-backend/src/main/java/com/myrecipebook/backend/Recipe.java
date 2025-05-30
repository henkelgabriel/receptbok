// src/main/java/com/myrecipebook/backend/Recipe.java
package com.myrecipebook.backend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Lombok annotation för getters, setters, toString, equals, hashCode
@Document(collection = "recipes") // Mappar denna klass till en MongoDB-kollektion som heter "recipes"
public class Recipe {
    @Id // Detta fält kommer att vara MongoDBs _id
    private String id; // MongoDB ObjectId representeras ofta som String i Spring Data

    private String title;
    private String description;
    private String ingredients; // Enklast att lagra som en sträng med radbrytningar
    private String instructions; // Enklast att lagra som en sträng med radbrytningar
    private String imageUrl; // Sökväg/URL till bilden

    // Lombok hanterar konstruktorer, getters, setters automatiskt med @Data
    // Om du inte använder Lombok, måste du lägga till dem manuellt
}