package com.todayeatwhat.backend.model;

import java.time.LocalDateTime;

public class FoodOption {
    
    private String id;
    private String name;
    private LocalDateTime createdAt;
    
    public FoodOption() {
        this.createdAt = LocalDateTime.now();
    }
    
    public FoodOption(String name) {
        this.name = name;
        this.createdAt = LocalDateTime.now();
    }
    
    public FoodOption(String id, String name, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
} 