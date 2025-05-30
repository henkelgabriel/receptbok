// src/main/java/com/myrecipebook/backend/RecipeRepository.java
package com.myrecipebook.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
    // Spring Data MongoDB ger oss automatiskt CRUD-metoder (find, save, delete, etc.)
    // Vi kan också lägga till egna query-metoder om vi vill, t.ex.:
    List<Recipe> findByTitleContainingIgnoreCase(String title);
    List<Recipe> findByDescriptionContainingIgnoreCase(String description);
}