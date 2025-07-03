package com.example.springboilerplate.controller.api;

import com.example.springboilerplate.service.UserService;
import com.example.springboilerplate.model.User;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/password-resets")
@RequiredArgsConstructor
public class PasswordResetApiController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createResetToken(@RequestBody PasswordResetRequest request) {
        Optional<User> userOpt = userService.findByEmail(request.password_reset().email());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Email not found");
        }

        userService.createPasswordReset(userOpt.get());
        return ResponseEntity.ok("Password reset instructions sent");
    }

    @PatchMapping("/{token}")
    public ResponseEntity<?> resetPassword(
        @PathVariable String token,
        @RequestBody PasswordResetConfirmRequest request
    ) {
        Optional<User> userOpt = userService.findByEmail(request.email());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid user");
        }

        User user = userOpt.get();

        if (!user.isActivated() || !userService.verifyResetToken(token, user)) {
            return ResponseEntity.status(401).body("Invalid or expired reset token");
        }

        if (request.user.password() == null || request.user.password().isEmpty()) {
            return ResponseEntity.unprocessableEntity().body("Password can't be blank");
        }

        boolean success = userService.resetPasswordWithToken(user, request.user.password());

        if (success) {
            return ResponseEntity.ok("Password has been reset");
        } else {
            return ResponseEntity.unprocessableEntity().body("Password reset failed");
        }
    }

    public record PasswordResetRequest(PasswordResetEmail password_reset) {
        public record PasswordResetEmail(@Email String email) {}
    }

    public record PasswordResetConfirmRequest(
        @Email String email,
        UserPassword user
    ) {
        public record UserPassword(String password, String password_confirmation) {}
    }
}
