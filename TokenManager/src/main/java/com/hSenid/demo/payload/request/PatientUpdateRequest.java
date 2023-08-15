package com.hSenid.demo.payload.request;

import com.hSenid.demo.models.Gender;

import java.time.LocalDate;

public record PatientUpdateRequest(
            int id,
            String firstName,
            String lastName,
            Gender gender,
            LocalDate dob,
            Long contactNum,
            String username,
            String email
) {
}
