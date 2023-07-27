package com.hSenid.demo.services;

import com.hSenid.demo.exception.PatientNotFoundException;
import com.hSenid.demo.exception.TokenInUseException;
import com.hSenid.demo.exception.TokenNotFoundException;
import com.hSenid.demo.models.Patient;
import com.hSenid.demo.models.Token;
import com.hSenid.demo.models.TokenState;
import com.hSenid.demo.repository.PatientRepository;
import com.hSenid.demo.repository.TokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TokenService {

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    private final TokenRepository tokenRepository;

    private final PatientRepository patientRepository;

    public TokenService(TokenRepository tokenRepository, PatientRepository patientRepository) {
        this.tokenRepository = tokenRepository;
        this.patientRepository = patientRepository;
    }

    public List<Token> getAllTokens() {
        return tokenRepository.findAll();
    }

    public Token findTokenById(int id) {
        return tokenRepository.findTokenByTokenNum(id);
    }

    public Token createToken(Token token) {
        // Check if the maximum limit of 20 tokens per day is reached
        LocalDate selectedDay = token.getSelectedDay();
        long tokenCountForSelectedDay = tokenRepository.countBySelectedDay(selectedDay);
        if (tokenCountForSelectedDay >= 20) {
            logger.error("The maximum number of tokens have been issued for {}", selectedDay);
            throw new IllegalStateException("Maximum limit of 20 tokens per day reached");
        }
        Token existingToken = tokenRepository.findTokenByTokenNum(token.getTokenNum());
        if (existingToken != null) {
            logger.error("Token number {} is already in use", token.getTokenNum());
            throw new TokenInUseException("Token number is already in use");
        }
        return tokenRepository.save(token);
    }

    public void reserveToken(int reservedByID, LocalDate date) {
        List<Token> availableTokens = tokenRepository.findBySelectedDayAndState(date, TokenState.AVAILABLE);

        if (availableTokens.isEmpty()) {
            logger.error("All tokens have been reserved for the day.");
            return;
        }

        Token firstAvailableToken = availableTokens.get(0);
        firstAvailableToken.setState(TokenState.RESERVED);
        firstAvailableToken.setReservedByID(reservedByID);
        firstAvailableToken.setReservedByName(patientRepository.findPatientById(reservedByID).get().getFirstName()+
                " "+patientRepository.findPatientById(reservedByID).get().getLastName());

        // Save the updated token to the database
        tokenRepository.save(firstAvailableToken);

        logger.info("The token has been reserved for the patient with ID: " + reservedByID);

    }

    public void invalidateToken(int id) {
        try{
            Token existingToken = tokenRepository.findTokenByTokenNum(id);
            if (existingToken.getState()==TokenState.INVALIDATED){
                logger.error("Token has already been invalidated");
            }else {
                existingToken.setState(TokenState.INVALIDATED);
                tokenRepository.save(existingToken);
                tokenRepository.findTokenByTokenNum(id).setState(TokenState.INVALIDATED);
            }
        }catch (TokenNotFoundException e){
            logger.error("Token with ID {} has not been found", id);
            throw new TokenNotFoundException("Token not found");
        }
    }

    public void validateToken(int id) {
        try{
            Token existingToken = tokenRepository.findTokenByTokenNum(id);
            if (existingToken.getState()==TokenState.AVAILABLE){
                logger.error("Token is already in AVAILABLE state");
            }else {
                existingToken.setState(TokenState.AVAILABLE);
                tokenRepository.save(existingToken);
                tokenRepository.findTokenByTokenNum(id).setState(TokenState.AVAILABLE);
            }
        }catch (TokenNotFoundException e){
            logger.error("Token with ID {} has not been found", id);
            throw new TokenNotFoundException("Token not found");
        }
    }

    public void deleteToken(int id){
        try{
            tokenRepository.deleteTokenByTokenNum(id);
        }catch (TokenNotFoundException e){
            logger.error("Token with ID {} has not been found", id);
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

    public void deleteToken(String tokenId) {
        // Check if the token exists in the database
        Token existingToken = tokenRepository.findById(tokenId)
                .orElseThrow(() -> {
                    logger.info("Token with ID {} has not been found", tokenRepository.findById(tokenId) );
                    return new TokenNotFoundException("Token not found");
                });

        tokenRepository.delete(existingToken);
    }

    public List<Token> getTokensByDate(LocalDate date) {
        return tokenRepository.findBySelectedDay(date);
    }

    public List<Token> getTokensByPatient(int reservedBy) {
        Patient patient = patientRepository.findPatientById(reservedBy)
                .orElseThrow(() -> {
                    logger.info("Patient with ID {} has not been found", patientRepository.findPatientById(reservedBy));
                    return new PatientNotFoundException("Patient not found");
                });
        return tokenRepository.findByReservedByID(reservedBy);
    }

}
