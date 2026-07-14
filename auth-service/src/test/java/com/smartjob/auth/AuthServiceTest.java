package com.smartjob.auth;

import com.smartjob.auth.dto.LoginRequest;
import com.smartjob.auth.dto.RegisterRequest;
import com.smartjob.auth.entity.Role;
import com.smartjob.auth.entity.User;
import com.smartjob.auth.repository.RoleRepository;
import com.smartjob.auth.repository.UserRepository;
import com.smartjob.auth.security.JwtUtil;
import com.smartjob.auth.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void registerShouldCreateUserAndReturnToken() {
        RegisterRequest request = new RegisterRequest();
        request.setFullName("Omkar");
        request.setEmail("omkar@example.com");
        request.setPassword("password");
        request.setRole("JOB_SEEKER");

        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("encoded");
        when(roleRepository.findByName(any())).thenReturn(Optional.of(new Role(1L, "JOB_SEEKER")));
        when(jwtUtil.generateToken(any(), any())).thenReturn("token");

        var response = authService.register(request);

        assertEquals("token", response.getToken());
        assertEquals("omkar@example.com", response.getEmail());
    }

    @Test
    void loginShouldReturnTokenForValidCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("omkar@example.com");
        request.setPassword("password");

        User user = new User();
        user.setEmail("omkar@example.com");
        user.setPassword("encoded");
        user.setFullName("Omkar");
        user.setRoles(Set.of(new Role(1L, "JOB_SEEKER")));

        when(userRepository.findByEmail(any())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(any(), any())).thenReturn(true);
        when(jwtUtil.generateToken(any(), any())).thenReturn("token");

        var response = authService.login(request);

        assertEquals("token", response.getToken());
        assertEquals("Omkar", response.getFullName());
    }
}
