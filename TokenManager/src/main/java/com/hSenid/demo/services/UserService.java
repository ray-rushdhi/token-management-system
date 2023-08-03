package com.hSenid.demo.services;

import com.hSenid.demo.exception.UserNotFoundException;
import com.hSenid.demo.models.User;
import com.hSenid.demo.repository.TokenRepository;
import com.hSenid.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public User updateUser(User user) {
        return userRepository.save(user);
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
