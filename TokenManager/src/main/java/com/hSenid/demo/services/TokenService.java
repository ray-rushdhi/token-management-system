package com.hSenid.demo.services;

import com.hSenid.demo.exception.UserNotFoundException;
import com.hSenid.demo.exception.TokenNotFoundException;
import com.hSenid.demo.models.User;
import com.hSenid.demo.models.Token;
import com.hSenid.demo.models.TokenState;
import com.hSenid.demo.payload.request.TokenRequest;
import com.hSenid.demo.repository.TokenRepository;
import com.hSenid.demo.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TokenService {

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    private final TokenRepository tokenRepository;

    private final UserRepository UserRepository;

    private final TokenSequenceGenerator tokenSequenceGenerator;

    private final EmailSenderService senderService;

    public TokenService(TokenRepository tokenRepository, UserRepository UserRepository,
                        TokenSequenceGenerator tokenSequenceGenerator, EmailSenderService senderService) {
        this.tokenRepository = tokenRepository;
        this.UserRepository = UserRepository;
        this.tokenSequenceGenerator = tokenSequenceGenerator;
        this.senderService = senderService;
    }

    public List<Token> getAllTokens() {
        logger.info("All tokens have been successfully retrieved");
        return tokenRepository.findAll();
    }

    public Token findTokenById(int id) {
        logger.info("Token of number {} has been successfully retrieved", id);
        return tokenRepository.findTokenByTokenNum(id);
    }


    public Token reserveToken(TokenRequest tokenRequest) {
        LocalDate selectedDay = tokenRequest.selectedDay();
        long tokenCountForSelectedDay = tokenRepository.countBySelectedDay(selectedDay);
        logger.info("The number of tokens for the date of {} is {}", selectedDay, tokenCountForSelectedDay);
        if (tokenCountForSelectedDay >= 20) {
            logger.error("The maximum number of tokens have been issued for {}", selectedDay);
            throw new IllegalStateException("Maximum limit of 20 tokens per day reached");
        }

        Token token = new Token();
        token.setTokenNum(tokenSequenceGenerator.getSequenceNumber(Token.SEQUENCE_NAME));
        token.setSelectedDay(tokenRequest.selectedDay());
        token.setState(TokenState.RESERVED);
        token.setReservedByID(tokenRequest.reservedByID());
        token.setReservedByName(UserRepository.findUserById(tokenRequest.reservedByID()).get().getFirstName()+" "+
                UserRepository.findUserById(tokenRequest.reservedByID()).get().getLastName());

        int patID = token.getReservedByID();
        String email = UserRepository.findUserById(patID).get().getEmail();
        tokenRepository.save(token);
        logger.info("Token has been successfully saved to the database");

        sendMail(email,
                "Dear Sir/Madam,\n" +
                        "\n" +
                        "Your token for the date " + tokenRequest.selectedDay() + " has been reserved successfully.\n" +
                        "Here are the details of the reservation:\n" +
                        "\n" +
                        "Patient Name: " + token.getReservedByName() + "\n" +
                        "Reserved Date: " + token.getSelectedDay() + "\n" +
                        "Token Number: " + token.getTokenNum() + "\n" +
                        "\n" +
                        "Please do not hesitate to contact us for further clarifications.\n" +
                        "\n" +
                        "Thank you,\n" +
                        "Clinic");
        logger.info("The email has been successfully sent");
        return tokenRepository.save(token);
    }

    public void invalidateToken(int id) {
        try{
            Token existingToken = tokenRepository.findTokenByTokenNum(id);
            if (existingToken.getState()==TokenState.INVALIDATED){
                logger.error("Token has already been invalidated");
            }else {
                existingToken.setState(TokenState.INVALIDATED);
                logger.info("Token has been successfully invalidated");
                tokenRepository.save(existingToken);
                tokenRepository.findTokenByTokenNum(id).setState(TokenState.INVALIDATED);
            }
        }catch (TokenNotFoundException e){
            logger.error("Token with ID {} has not been found", id);
            throw new TokenNotFoundException("Token not found");
        }
    }

    public void deleteToken(int tokenNum){
        try{
            tokenRepository.deleteTokenByTokenNum(tokenNum);
            logger.info("Token of number {} has been successfully deleted", tokenNum);
        }catch (TokenNotFoundException e){
            logger.error("Token number {} has not been found", tokenNum);
            throw new TokenNotFoundException("Token not found");
        }
    }

    public Token updateToken(Token token) {
        // Check if the token exists in the database
        Token existingToken = tokenRepository.findById(token.getId())
                .orElseThrow(() -> {
                    logger.info("Token with ID {} has not been found", tokenRepository.findById(token.getId()) );
                    return new TokenNotFoundException("Token not found");
                });

        // Update the existing token with the new data
        existingToken.setTokenNum(token.getTokenNum());
        existingToken.setState(token.getState());
        existingToken.setSelectedDay(token.getSelectedDay());
        existingToken.setReservedByID(token.getReservedByID());

        return tokenRepository.save(existingToken);
    }

    public List<Token> getTokensByDate(LocalDate date) {
        logger.info("Tokens of the date {} have been successfully retrieved", date);
        return tokenRepository.findBySelectedDay(date);
    }

    public List<Token> getTokensByUser(int reservedBy) {
        User user = UserRepository.findUserById(reservedBy)
                .orElseThrow(() -> {
                    logger.info("User with ID {} has not been found", UserRepository.findUserById(reservedBy));
                    return new UserNotFoundException("User not found");
                });
        logger.info("Tokens of {} have been successfully retrieved", user.getFirstName()+" "+user.getLastName());
        return tokenRepository.findByReservedByID(reservedBy);
    }

    public void sendMail(String email, String message) {
        senderService.sendEmail(email,
                "Token Reserved Successfully",
                message);
    }

}
