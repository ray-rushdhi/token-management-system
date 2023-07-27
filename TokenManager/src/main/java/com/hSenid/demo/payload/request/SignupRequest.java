package com.hSenid.demo.payload.request;

import java.time.LocalDate;
import java.util.Set;

import com.hSenid.demo.models.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dob;
    private Long contactNum;

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    private Set<String> roles;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}
