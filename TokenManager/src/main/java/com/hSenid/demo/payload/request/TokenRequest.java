package com.hSenid.demo.payload.request;

import java.time.LocalDate;

public record TokenRequest(

        LocalDate selectedDay,
        int reservedByID
        ) {
}
