
package com.myrecipebook.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private FileStorageService fileStorageService;

    
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable String id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    
    @PostMapping
    public ResponseEntity<Recipe> createRecipe(
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "ingredients", required = false) String ingredients,
            @RequestParam(value = "instructions", required = false) String instructions,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        Recipe recipe = new Recipe();
        recipe.setTitle(title);
        recipe.setDescription(description);
        recipe.setIngredients(ingredients);
        recipe.setInstructions(instructions);

        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = fileStorageService.storeFile(imageFile);
            
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/images/")
                    .path(fileName)
                    .toUriString();
            recipe.setImageUrl(imageUrl);
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "ingredients", required = false) String ingredients,
            @RequestParam(value = "instructions", required = false) String instructions,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "imageUrl", required = false) String existingImageUrl) { 

        Optional<Recipe> existingRecipeOptional = recipeRepository.findById(id);
        if (!existingRecipeOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Recipe existingRecipe = existingRecipeOptional.get();
        existingRecipe.setTitle(title);
        existingRecipe.setDescription(description);
        existingRecipe.setIngredients(ingredients);
        existingRecipe.setInstructions(instructions);

        
        if (imageFile != null && !imageFile.isEmpty()) {
            
            if (existingRecipe.getImageUrl() != null && !existingRecipe.getImageUrl().isEmpty()) {
                
                String oldFileName = existingRecipe.getImageUrl().substring(existingRecipe.getImageUrl().lastIndexOf('/') + 1);
                fileStorageService.deleteFile(oldFileName);
            }
            String fileName = fileStorageService.storeFile(imageFile);
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/images/")
                    .path(fileName)
                    .toUriString();
            existingRecipe.setImageUrl(imageUrl);
        } else if (existingImageUrl != null && !existingImageUrl.isEmpty()) {
             
            
            existingRecipe.setImageUrl(existingImageUrl);
        } else {
           
            if (existingRecipe.getImageUrl() != null && !existingRecipe.getImageUrl().isEmpty()) {
                String oldFileName = existingRecipe.getImageUrl().substring(existingRecipe.getImageUrl().lastIndexOf('/') + 1);
                fileStorageService.deleteFile(oldFileName);
            }
            existingRecipe.setImageUrl(null);
        }

        Recipe updatedRecipe = recipeRepository.save(existingRecipe);
        return ResponseEntity.ok(updatedRecipe);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable String id) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(id);
        if (!recipeOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Recipe recipeToDelete = recipeOptional.get();
      
        if (recipeToDelete.getImageUrl() != null && !recipeToDelete.getImageUrl().isEmpty()) {
            String fileName = recipeToDelete.getImageUrl().substring(recipeToDelete.getImageUrl().lastIndexOf('/') + 1);
            fileStorageService.deleteFile(fileName);
        }

        recipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    
}