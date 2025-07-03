package com.example.springboilerplate.controller.api;

import com.example.springboilerplate.model.User;
import com.example.springboilerplate.service.UserService;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/account_activations")
@RequiredArgsConstructor
public class AccountActivationController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> resendActivationEmail(@RequestBody ResendActivationRequest request) {
        Optional<User> userOpt = userService.findByEmail(request.resend_activation_email().email());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOpt.get();
        if (user.isActivated()) {
            return ResponseEntity.unprocessableEntity().body("Account already activated");
        }

        userService.sendActivationEmailAgain(user);
        return ResponseEntity.ok("The activation email has been sent again");
    }

    @PatchMapping("/{token}")
    public ResponseEntity<?> activate(@PathVariable String token, @RequestBody ActivationConfirmRequest request) {
        boolean success = userService.activateWithToken(token, request.email());
        if (success) {
            return ResponseEntity.ok("Account activated successfully");
        } else {
            return ResponseEntity.status(401).body("Invalid activation link or already activated");
        }
    }

    public record ResendActivationRequest(ResendActivationEmail resend_activation_email) {
        public record ResendActivationEmail(@Email String email) {}
    }

    public record ActivationConfirmRequest(@Email String email) {}
}
