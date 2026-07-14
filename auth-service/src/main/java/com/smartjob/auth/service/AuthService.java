package com.smartjob.auth.service;

import com.smartjob.auth.dto.AuthResponse;
import com.smartjob.auth.dto.LoginRequest;
import com.smartjob.auth.dto.RegisterRequest;
import com.smartjob.auth.entity.Role;
import com.smartjob.auth.entity.User;
import com.smartjob.auth.repository.RoleRepository;
import com.smartjob.auth.repository.UserRepository;
import com.smartjob.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setSkills(request.getSkills());
        user.setEducation(request.getEducation());
        user.setExperience(request.getExperience());

        String roleName = request.getRole() == null ? "JOB_SEEKER" : request.getRole().toUpperCase();
        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(roleName);
                    return roleRepository.save(newRole);
                });

        user.setRoles(Set.of(role));
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), roleName);
        return new AuthResponse(token, "Bearer", user.getEmail(), user.getFullName(), roleName);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String roleName = user.getRoles().stream().findFirst().map(Role::getName).orElse("JOB_SEEKER");
        String token = jwtUtil.generateToken(user.getEmail(), roleName);
        return new AuthResponse(token, "Bearer", user.getEmail(), user.getFullName(), roleName);
    }
}
