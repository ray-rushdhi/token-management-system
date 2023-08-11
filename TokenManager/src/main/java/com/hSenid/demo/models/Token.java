package com.hSenid.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document (collection = "tokens")
public class Token {

    @Transient
    public static String SEQUENCE_NAME = "token_sequence";
    @Id
    private String id;
    @Indexed(unique = true)
    private int tokenNum;
    @Field("selectedDay")
    private LocalDate selectedDay;
    private TokenState state;
    private int reservedByID;
    private String reservedByName;

}
