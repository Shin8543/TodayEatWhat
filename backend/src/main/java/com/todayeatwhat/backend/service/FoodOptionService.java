package com.todayeatwhat.backend.service;

import com.todayeatwhat.backend.model.FoodOption;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class FoodOptionService {
    
    // 使用ConcurrentHashMap作为内存存储
    private final Map<String, FoodOption> foodOptions = new ConcurrentHashMap<>();
    private final Random random = new Random();
    
    public List<String> getAllOptions() {
        return foodOptions.values()
                .stream()
                .map(FoodOption::getName)
                .collect(Collectors.toList());
    }
    
    public FoodOption addOption(String name) {
        String id = UUID.randomUUID().toString();
        FoodOption foodOption = new FoodOption(id, name, LocalDateTime.now());
        foodOptions.put(id, foodOption);
        return foodOption;
    }
    
    public void deleteOption(String name) {
        foodOptions.entrySet().removeIf(entry -> entry.getValue().getName().equals(name));
    }
    
    public String getRandomOption() {
        List<String> options = getAllOptions();
        if (options.isEmpty()) {
            return null;
        }
        return options.get(random.nextInt(options.size()));
    }
} 