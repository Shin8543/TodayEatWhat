package com.todayeatwhat.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "foodOptions")
public class FoodOption {
    
    @Id
    private String id;
    
    @Field("name")
    private String name;
    
    @Field("createdAt")
    private LocalDateTime createdAt;
    
    public FoodOption() {
        this.createdAt = LocalDateTime.now();
    }
    
    public FoodOption(String name) {
        this.name = name;
        this.createdAt = LocalDateTime.now();
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