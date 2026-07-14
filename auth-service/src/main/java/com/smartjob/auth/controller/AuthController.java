package com.smartjob.auth.controller;

import com.smartjob.auth.dto.AuthResponse;
import com.smartjob.auth.dto.LoginRequest;
import com.smartjob.auth.dto.RegisterRequest;
import com.smartjob.auth.entity.User;
import com.smartjob.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<String> me() {
        return ResponseEntity.ok("Authenticated");
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(authService.getUserById(id));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return ResponseEntity.ok(authService.updateUser(id, userDetails));
    }

    @PostMapping("/users/{id}/resume")
    public ResponseEntity<User> uploadResume(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(authService.uploadResume(id, file));
    }

    @GetMapping("/users/{id}/interview-questions")
    public ResponseEntity<Map<String, List<String>>> getInterviewQuestions(@PathVariable Long id) {
        return ResponseEntity.ok(authService.getInterviewQuestions(id));
    }
}
