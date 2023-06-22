package com.example.scmessage.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {

    @Schema(example = "user")
    @NotBlank
    private String username;

    @Schema(example = "user")
    @NotBlank
    private String password;

    @Schema(example = "User")
    @NotBlank
    private String name;

    @Schema(example = "user@aboba.com")
    @Email
    private String email;
}
