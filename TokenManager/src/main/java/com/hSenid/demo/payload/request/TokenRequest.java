package com.hSenid.demo.payload.request;

import com.hSenid.demo.models.TokenState;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

public record TokenRequest(
        int tokenNum,
        LocalDate selectedDay,
        TokenState state
        ) {
}
