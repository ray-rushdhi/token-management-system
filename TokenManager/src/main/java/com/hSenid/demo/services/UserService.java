package com.hSenid.demo.services;

import com.hSenid.demo.exception.UserNotFoundException;
import com.hSenid.demo.models.Token;
import com.hSenid.demo.models.User;
import com.hSenid.demo.payload.request.PatientUpdateRequest;
import com.hSenid.demo.repository.TokenRepository;
import com.hSenid.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

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
}
