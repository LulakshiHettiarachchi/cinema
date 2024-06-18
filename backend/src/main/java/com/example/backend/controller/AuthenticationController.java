package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.model.User;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.PasswordResetService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {



    public final AuthenticationService authService;
    private final PasswordResetService passwordResetService;


    public AuthenticationController(AuthenticationService authService, ModelMapper modelMapper, PasswordResetService passwordResetService) {
        this.authService = authService;
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(
            @RequestBody UserRequestDTO userRequestDTO
    ) {

        return ResponseEntity.ok(authService.register(userRequestDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(
            @RequestBody UserRequestDTO userRequestDTO
    ) {
        return ResponseEntity.ok(authService.authenticate(userRequestDTO));
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@RequestBody PasswordResetRequestDTO passwordResetRequestDTO) {
        passwordResetService.sendPasswordResetEmail(passwordResetRequestDTO.getEmail());
        return ResponseEntity.ok("Password reset link sent to your email.");
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetResponseDTO passwordResetResponseDTO) {
        passwordResetService.resetPassword(passwordResetResponseDTO.getToken(), passwordResetResponseDTO.getNewPassword());
        return ResponseEntity.ok("Password reset successfully.");
    }


    @PostMapping("/verify_email")
    public ResponseEntity<AuthenticationResponseDTO> verifyEmail(@RequestBody EmailVerifyRequestDTO emailVerifyRequestDTO) {
    return ResponseEntity.ok(authService.emailVerify(emailVerifyRequestDTO));
    }

    @PostMapping("/resend_verification")
    public ResponseEntity<AuthenticationResponseDTO> resendVerificationEmail(@RequestBody EmailVerifyRequestDTO emailVerifyRequestDTO) {
        return ResponseEntity.ok(authService.resendVerificationEmail(emailVerifyRequestDTO));
    }


}
