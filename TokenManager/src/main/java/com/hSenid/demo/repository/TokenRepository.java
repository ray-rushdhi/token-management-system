package com.hSenid.demo.repository;

import com.hSenid.demo.models.Token;
import com.hSenid.demo.models.TokenState;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, String> {

    Token findTokenById(int id);
    Token findTokenByTokenNum(int id);
    long countBySelectedDay(LocalDate selectedDay);
    List<Token> findBySelectedDay(LocalDate selectedDay);
    List<Token> findByReservedByID(int reservedBy);
    List<Token> findBySelectedDayAndState(LocalDate selectedDay, TokenState state);
    void deleteTokenByTokenNum(int id);
}
