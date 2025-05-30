
package com.myrecipebook.backend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data 
@Document(collection = "recipes") 
public class Recipe {
    @Id 
    private String id; 

    private String title;
    private String description;
    private String ingredients; 
    private String instructions; 
    private String imageUrl; 

    
}