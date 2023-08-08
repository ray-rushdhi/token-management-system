package com.hSenid.demo.repository;

import com.hSenid.demo.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,Long> {
    void deleteUserById(int id);
    Optional<User> findUserById(int id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Optional<Object> findByUsername(String username);

    boolean existsById(int patientID);

}
