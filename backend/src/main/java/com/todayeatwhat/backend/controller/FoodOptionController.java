package com.todayeatwhat.backend.controller;

import com.todayeatwhat.backend.model.FoodOption;
import com.todayeatwhat.backend.service.FoodOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FoodOptionController {
    
    @Autowired
    private FoodOptionService foodOptionService;
    
    @GetMapping("/options")
    public ResponseEntity<List<String>> getAllOptions() {
        List<String> options = foodOptionService.getAllOptions();
        return ResponseEntity.ok(options);
    }
    
    @PostMapping("/options")
    public ResponseEntity<FoodOption> addOption(@RequestBody FoodOption foodOption) {
        if (foodOption.getName() == null || foodOption.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        FoodOption savedOption = foodOptionService.addOption(foodOption.getName().trim());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOption);
    }
    
    @DeleteMapping("/options/{name}")
    public ResponseEntity<String> deleteOption(@PathVariable String name) {
        foodOptionService.deleteOption(name);
        return ResponseEntity.ok("Option deleted successfully");
    }
    
    @GetMapping("/random")
    public ResponseEntity<String> getRandomOption() {
        String randomOption = foodOptionService.getRandomOption();
        if (randomOption == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(randomOption);
    }
} 