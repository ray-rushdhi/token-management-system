package com.hSenid.demo.services;

import com.hSenid.demo.exception.UserNotFoundException;
import com.hSenid.demo.models.Token;
import com.hSenid.demo.models.User;
import com.hSenid.demo.payload.request.PassChangeRequest;
import com.hSenid.demo.payload.request.PatientUpdateRequest;
import com.hSenid.demo.repository.TokenRepository;
import com.hSenid.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    PasswordEncoder encoder;

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;

    private final SequenceGeneratorService service;

    @Autowired
    public UserService(UserRepository userRepository, TokenRepository tokenRepository, SequenceGeneratorService service) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.service = service;
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        user.setId(service.getSequenceNumber(User.SEQUENCE_NAME));
        logger.info("ID for the User updated automatically");
        return userRepository.save(user);
    }

    public Optional<User> updateUser(PatientUpdateRequest patientUpdateRequest) {
        int id = patientUpdateRequest.id();
        Optional<User> optionalUser = userRepository.findUserById(id);

        List<Token> tokens = tokenRepository.findByReservedByID(id);
        for (Token token: tokens) {
            token.setReservedByName(patientUpdateRequest.firstName()+" "+patientUpdateRequest.lastName());
            tokenRepository.save(token);
        }
        logger.info("Successfully updated the tokens of {}", patientUpdateRequest.firstName()+" "+patientUpdateRequest.lastName());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstName(patientUpdateRequest.firstName());
            user.setLastName(patientUpdateRequest.lastName());
            user.setGender(patientUpdateRequest.gender());
            user.setDob(patientUpdateRequest.dob());
            user.setContactNum(patientUpdateRequest.contactNum());
            user.setEmail(patientUpdateRequest.email());
            user.setUsername(patientUpdateRequest.username());

            userRepository.save(user); // Update the user in the database

            logger.info("Successfully updated patient {}", patientUpdateRequest.firstName()+" "+patientUpdateRequest.lastName());

            return Optional.of(user);
        } else {
            return Optional.empty(); // User not found
        }
    }

    public User findUserById(int id) {
        return userRepository.findUserById(id).orElseThrow(() -> {
            logger.error("User by ID {} was not found", id);
            return new UserNotFoundException("User by ID "+id+" was not found");
        });
    }

    public void deleteUser(int id) {
        userRepository.deleteUserById(id);
    }

    public ResponseEntity<String> changePassword(PassChangeRequest passChangeRequest) {

        String encodedOldPass = encoder.encode(passChangeRequest.oldPassword());
        String encodedNewPass = encoder.encode(passChangeRequest.newPassword());
        User user = this.findUserById(passChangeRequest.patientID());
        String oldPassword = user.getPassword();
        logger.info("The encoded old password : "+encodedOldPass);
        logger.info("The encoded new password : "+encodedNewPass);
        logger.info("Old password : "+oldPassword);

        if (encoder.matches(passChangeRequest.oldPassword(), oldPassword)) {
            logger.info("The passwords match");
            user.setPassword(encodedNewPass);
            // Save the updated user with the new password
            userRepository.save(user);

            logger.info("Password changed successfully");
            return ResponseEntity.ok().body("{\"message\": \"Password changed successfully\"}");
        } else {
            logger.error("Passwords do not match");
            return ResponseEntity.badRequest().body("{\"error\": \"Old password does not match\"}");
        }

        }
}
