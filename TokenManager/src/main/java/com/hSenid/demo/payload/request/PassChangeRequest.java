package com.hSenid.demo.payload.request;

public record PassChangeRequest(

        int patientID,
        String oldPassword,
        String newPassword
) {
}
