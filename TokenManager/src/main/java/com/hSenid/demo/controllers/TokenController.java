package com.hSenid.demo.controllers;

import com.hSenid.demo.exception.TokenNotFoundException;
import com.hSenid.demo.exception.UserNotFoundException;
import com.hSenid.demo.models.Token;
import com.hSenid.demo.payload.request.TokenRequest;
import com.hSenid.demo.services.TokenService;
import com.hSenid.demo.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/tokens")
public class TokenController {

    private static final Logger logger = LoggerFactory.getLogger(TokenController.class);

    private final TokenService tokenService;

    private final UserService userService;

    public TokenController(TokenService tokenService, UserService userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveToken(@RequestBody TokenRequest request) {
        try {
            tokenService.reserveToken(request);
            logger.info("Token reserved successfully");
            return ResponseEntity.ok("{\"message\": \"Token reserved successfully\"}");
        } catch (TokenNotFoundException e) {
            logger.error("Token not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (IllegalStateException e) {
            logger.error("Error in reserving token");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/invalidate/{id}")
    public ResponseEntity<?> invalidateId(@PathVariable ("id") int id) {
        try {
            tokenService.findTokenById(id);
            tokenService.invalidateToken(id);
            logger.info("Token of ID {} has been successfully invalidated", id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (TokenNotFoundException e) {
            logger.error("Token not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Token>> findByDate(@PathVariable("date") LocalDate date) {
        List<Token> tokens = tokenService.getTokensByDate(date);
        logger.info("Users reserved for the date {} have been successfully retrieved",date);
        return new ResponseEntity<>(tokens, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Token>> getAllTokens() {
        List<Token> tokens = tokenService.getAllTokens();
        logger.info("All the tokens have been successfully retrieved");
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/find/{id}")
    public ResponseEntity<?> getTokenById(@PathVariable("id") int id) {
        try {
            tokenService.findTokenById(id);
            tokenService.invalidateToken(id);
            Token token = tokenService.findTokenById(id);
            logger.info("The token of id {} has been successfully retrieved", token.getId());
            return new ResponseEntity<>(token,HttpStatus.OK);
        } catch (TokenNotFoundException e) {
            logger.error("Token not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Token>> getTokenByUser(@PathVariable("id") int id) {
        userService.findUserById(id);
        List<Token> tokens = tokenService.getTokensByUser(id);
        logger.info("The tokens of User of ID {} has been successfully retrieved", id);
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{tokenNum}")
    public ResponseEntity<?> deleteToken(@PathVariable ("tokenNum") int tokenNum) {
        try{
            tokenService.findTokenById(tokenNum);
            tokenService.deleteToken(tokenNum);
            logger.info("Token number {} successfully deleted from the database",tokenNum);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (TokenNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
