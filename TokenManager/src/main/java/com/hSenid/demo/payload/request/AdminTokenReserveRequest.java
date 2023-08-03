package com.hSenid.demo.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminTokenReserveRequest {

    private int tokenNum;
    private int reservedByID;

}
