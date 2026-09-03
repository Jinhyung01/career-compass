package com.jobfeel.careercompass.auth.controller;

import com.jobfeel.careercompass.auth.dto.LoginRequest;
import com.jobfeel.careercompass.auth.dto.LoginResponse;
import com.jobfeel.careercompass.auth.dto.SignupRequest;
import com.jobfeel.careercompass.auth.dto.UserResponse;
import com.jobfeel.careercompass.auth.service.MockAuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final MockAuthService mockAuthService;

    public AuthController(MockAuthService mockAuthService) {
        this.mockAuthService = mockAuthService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody SignupRequest request) {
        UserResponse response = mockAuthService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = mockAuthService.login(request);
        return ResponseEntity.ok(response);
    }
}
