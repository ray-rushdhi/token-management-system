package com.hSenid.demo.payload.response;

import com.hSenid.demo.models.Gender;
import com.hSenid.demo.models.Role;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public record UserResponse(
        int id,
        String firstName,
        String lastName,
        Gender gender,
        LocalDate dob,
        Long contactNum,
        String email,
        String username,
        Set<Role> roles

) {
}
