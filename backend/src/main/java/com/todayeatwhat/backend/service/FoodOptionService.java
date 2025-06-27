package com.todayeatwhat.backend.service;

import com.todayeatwhat.backend.model.FoodOption;
import com.todayeatwhat.backend.repository.FoodOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodOptionService {
    
    @Autowired
    private FoodOptionRepository foodOptionRepository;
    
    public List<String> getAllOptions() {
        return foodOptionRepository.findAll()
                .stream()
                .map(FoodOption::getName)
                .collect(Collectors.toList());
    }
    
    public FoodOption addOption(String name) {
        FoodOption foodOption = new FoodOption(name);
        return foodOptionRepository.save(foodOption);
    }
    
    public void deleteOption(String name) {
        foodOptionRepository.deleteByName(name);
    }
} 