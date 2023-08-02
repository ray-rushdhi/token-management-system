package com.hSenid.demo.controllers;

import com.hSenid.demo.models.User;
import com.hSenid.demo.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    private final UserService userService;

    public PatientController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        logger.info("Successfully accessed all the Users");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserById(@PathVariable ("id") int id) {
        User User = userService.findUserById(id);
        logger.info("Successfully retrieved {} from the database",userService.findUserById(id));
        return new ResponseEntity<>(User, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User User) {
        User newUser = userService.addUser(User);
        logger.info("Successfully added User {} to the database",newUser.getFirstName()+" "+newUser.getLastName());
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User User) {
        User updateUser = userService.updateUser(User);
        logger.info("Successfully updated User {}",updateUser.getFirstName()+" "+updateUser.getLastName());
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable ("id") int id) {
        userService.deleteUser(id);
        logger.info("User {} successfully deleted from the database",userService.findUserById(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
