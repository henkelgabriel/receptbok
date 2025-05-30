
package com.myrecipebook.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
    
    List<Recipe> findByTitleContainingIgnoreCase(String title);
    List<Recipe> findByDescriptionContainingIgnoreCase(String description);
}