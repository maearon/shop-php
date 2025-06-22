package com.example.springboilerplate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OAuthLoginRequestDto {

    @NotNull(message = "id_token is required")
    @NotEmpty(message = "id_token must not be empty")
    @JsonProperty("id_token")
    private String idToken;

    @NotNull(message = "provider is required")
    @NotEmpty(message = "provider must not be empty")
    private String provider;
}
