package com.hSenid.demo.controllers;

import com.hSenid.demo.models.User;
import com.hSenid.demo.payload.request.PatientUpdateRequest;
import com.hSenid.demo.payload.response.UserResponse;
import com.hSenid.demo.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/patients")
public class PatientController {

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    private final UserService userService;

    public PatientController(UserService userService) {
        this.userService = userService;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        logger.info("The /patients/all endpoint has been accessed");
        List<UserResponse> users = userService.findAllUsers();
        logger.info("Successfully accessed all the Users");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserById(@PathVariable ("id") int id) {
        logger.info("The /patients/find/{id} endpoint has been accessed");
        User User = userService.findUserById(id);
        logger.info("Successfully retrieved {} from the database",userService.findUserById(id));
        return new ResponseEntity<>(User, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User User) {
        logger.info("The /patients/add endpoint has been accessed");
        User newUser = userService.addUser(User);
        logger.info("Successfully added User {} to the database",newUser.getFirstName()+" "+newUser.getLastName());
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody PatientUpdateRequest patientUpdateRequest) {
        logger.info("The patients/update endpoint has been accessed");
        userService.updateUser(patientUpdateRequest);
        logger.info("Successfully updated User {}",patientUpdateRequest.firstName()+" "+patientUpdateRequest.lastName());
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable ("id") int id) {
        logger.info("The /patients/delete/{id} endpoint has been accessed");
        User userToDelete = userService.findUserById(id);
        if (userToDelete != null) {
            logger.info("User {} successfully deleted from the database", userToDelete);
            userService.deleteUser(id);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            logger.error("Invalid user ID");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
