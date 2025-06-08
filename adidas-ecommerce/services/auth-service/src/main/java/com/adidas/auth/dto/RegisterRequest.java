package com.adidas.auth.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {

    @Valid
    @NotNull
    private RegisterDto user;
}
