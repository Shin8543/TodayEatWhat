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
        try {
            List<String> options = foodOptionService.getAllOptions();
            return ResponseEntity.ok(options);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping("/options")
    public ResponseEntity<FoodOption> addOption(@RequestBody FoodOption foodOption) {
        try {
            FoodOption savedOption = foodOptionService.addOption(foodOption.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedOption);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @DeleteMapping("/options/{name}")
    public ResponseEntity<String> deleteOption(@PathVariable String name) {
        try {
            foodOptionService.deleteOption(name);
            return ResponseEntity.ok("Option deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
} 