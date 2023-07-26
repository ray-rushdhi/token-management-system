package com.hSenid.demo.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenReserveRequest {

    private int reservedByID;
    private LocalDate date;
}
