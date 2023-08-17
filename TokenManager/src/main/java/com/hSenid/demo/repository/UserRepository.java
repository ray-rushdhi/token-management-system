package com.hSenid.demo.repository;

import com.hSenid.demo.models.ERole;
import com.hSenid.demo.models.Role;
import com.hSenid.demo.models.User;
import com.hSenid.demo.models.UserState;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,Long> {
    void deleteUserById(int id);
    Optional<User> findUserById(int id);

    List<User> findUsersByState(UserState userState);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Optional<Object> findByUsername(String username);

    boolean existsById(int patientID);

}
