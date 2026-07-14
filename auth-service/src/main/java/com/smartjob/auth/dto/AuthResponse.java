package com.smartjob.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type;
    private String email;
    private String fullName;
    private String role;
    private Long id;
}
