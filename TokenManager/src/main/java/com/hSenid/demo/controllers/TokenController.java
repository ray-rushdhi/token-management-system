package com.hSenid.demo.controllers;

import com.hSenid.demo.exception.TokenNotFoundException;
import com.hSenid.demo.models.Token;
import com.hSenid.demo.payload.request.TokenRequest;
import com.hSenid.demo.services.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin (origins = "*")
@RequestMapping("/tokens")
public class TokenController {

    private static final Logger logger = LoggerFactory.getLogger(TokenController.class);

    private final TokenService tokenService;

    public TokenController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

//    @PostMapping("/issue")
//    public ResponseEntity<Token> addToken(@RequestBody TokenRequest tokenRequest) {
//        Token newToken = tokenService.createToken(tokenRequest);
//        logger.info("Token has been issued successfully");
//        return new ResponseEntity<>(newToken, HttpStatus.CREATED);
//    }

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveToken(@RequestBody TokenRequest request) {
        try {
            tokenService.reserveToken(request);
            return ResponseEntity.ok("Token reserved successfully");
        } catch (TokenNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

//    @PostMapping("/reserve-admin")
//    public ResponseEntity<String> reserveToken(@RequestBody TokenRequest request) {
//        try {
//            tokenService.reserveToken(request);
//            return ResponseEntity.ok("Token reserved successfully");
//        } catch (TokenNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (IllegalStateException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }

    @PutMapping("/invalidate/{id}")
    public ResponseEntity<?> invalidateId(@PathVariable ("id") int id) {
        tokenService.invalidateToken(id);
        logger.info("Token of ID {} has been successfully invalidated", id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PutMapping("/validate/{id}")
//    public ResponseEntity<?> validateId(@PathVariable ("id") int id) {
//        tokenService.validateToken(id);
//        logger.info("Token of ID {} has been successfully validated", id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Token>> findByDate(@PathVariable("date") LocalDate date) {
        List<Token> tokens = tokenService.getTokensByDate(date);
        logger.info("Users reserved for the date {} have been successfully retrieved",date);
        return new ResponseEntity<>(tokens, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Token>> getAllTokens() {
        List<Token> tokens = tokenService.getAllTokens();
        logger.info("All the tokens have been successfully retrieved");
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Token> getTokenById(@PathVariable("id") int id) {
        Token token = tokenService.findTokenById(id);
        logger.info("The token of id {} has been successfully retrieved", token.getId());
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Token>> getTokenByUser(@PathVariable("id") int id) {
        List<Token> tokens = tokenService.getTokensByUser(id);
        logger.info("The tokens of User of ID {} has been successfully retrieved", id);
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{tokenNum}")
    public ResponseEntity<?> deleteToken(@PathVariable ("tokenNum") int tokenNum) {
        tokenService.deleteToken(tokenNum);
        logger.info("Token number {} successfully deleted from the database",tokenNum);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
