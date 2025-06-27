package com.todayeatwhat.backend.repository;

import com.todayeatwhat.backend.model.FoodOption;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FoodOptionRepository extends MongoRepository<FoodOption, String> {
    
    Optional<FoodOption> findByName(String name);
    
    void deleteByName(String name);
} 