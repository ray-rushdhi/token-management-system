package com.hSenid.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document (collection = "patients")
public class Patient implements Serializable {

    @Transient
    public static String SEQUENCE_NAME = "user_sequence";

    @Id
    private int id;
    private String firstName;
    private String email;
    private String lastName;
    private Gender gender;
    private LocalDate dob;
    private Long contactNum;
}
