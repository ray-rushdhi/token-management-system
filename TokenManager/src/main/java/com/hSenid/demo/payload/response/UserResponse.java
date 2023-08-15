package com.hSenid.demo.payload.response;

import com.hSenid.demo.models.Gender;

import java.time.LocalDate;

public record UserResponse(
        int id,
        String firstName,
        String lastName,
        Gender gender,
        LocalDate dob,
        Long contactNum,
        String email

) {
}
