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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        return new AuthResponse(token, "Bearer", user.getEmail(), user.getFullName(), roleName, user.getId());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String roleName = user.getRoles().stream().findFirst().map(Role::getName).orElse("JOB_SEEKER");
        String token = jwtUtil.generateToken(user.getEmail(), roleName);
        return new AuthResponse(token, "Bearer", user.getEmail(), user.getFullName(), roleName, user.getId());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setFullName(userDetails.getFullName());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setAddress(userDetails.getAddress());
        user.setSkills(userDetails.getSkills());
        user.setEducation(userDetails.getEducation());
        user.setExperience(userDetails.getExperience());
        
        if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        return userRepository.save(user);
    }

    public User uploadResume(Long id, MultipartFile file) {
        User user = getUserById(id);
        try {
            String folder = "uploads/";
            File uploadDir = new File(folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(folder + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            user.setResumePath(path.toString());

            // Extract mock skills from resume filename
            StringBuilder autoSkills = new StringBuilder();
            String originalName = file.getOriginalFilename().toLowerCase();
            if (originalName.contains("java")) autoSkills.append("Java, ");
            if (originalName.contains("spring") || originalName.contains("boot")) autoSkills.append("Spring Boot, ");
            if (originalName.contains("react") || originalName.contains("js") || originalName.contains("javascript")) autoSkills.append("React, ");
            if (originalName.contains("mysql") || originalName.contains("sql")) autoSkills.append("MySQL, ");

            if (autoSkills.length() > 0) {
                String skills = autoSkills.substring(0, autoSkills.length() - 2);
                user.setSkills(skills);
            }

            return userRepository.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    public Map<String, List<String>> getInterviewQuestions(Long id) {
        User user = getUserById(id);
        String skillsStr = user.getSkills();

        List<String> technical = new ArrayList<>();
        List<String> hr = new ArrayList<>();
        List<String> project = new ArrayList<>();

        hr.add("Tell me about yourself.");
        hr.add("Why do you want this role?");
        hr.add("What are your strengths and weaknesses?");

        project.add("Describe your portfolio project architecture.");
        project.add("How did you implement JWT security?");
        project.add("Explain a difficult technical problem you solved.");

        if (skillsStr != null && !skillsStr.isBlank()) {
            String[] skills = skillsStr.split(",");
            for (String skill : skills) {
                String cleanSkill = skill.trim().toLowerCase();
                if (cleanSkill.contains("java")) {
                    technical.add("Explain JVM memory architecture (Stack vs Heap).");
                    technical.add("What is the difference between an Interface and an Abstract Class?");
                } else if (cleanSkill.contains("spring") || cleanSkill.contains("boot")) {
                    technical.add("Explain Spring Boot dependency injection and IoC container.");
                    technical.add("What is the purpose of @RestController and @Autowired?");
                } else if (cleanSkill.contains("react") || cleanSkill.contains("js") || cleanSkill.contains("javascript")) {
                    technical.add("What are React hooks, and when would you use useEffect?");
                    technical.add("Explain Virtual DOM in React.");
                } else if (cleanSkill.contains("mysql") || cleanSkill.contains("sql") || cleanSkill.contains("db")) {
                    technical.add("What is database normalization and why is it important?");
                    technical.add("Explain the difference between JOIN, LEFT JOIN, and RIGHT JOIN.");
                } else {
                    technical.add("Explain the core features and architecture of " + skill.trim() + ".");
                }
            }
        }

        if (technical.isEmpty()) {
            technical.add("Explain Spring Boot dependency injection.");
            technical.add("What is Java 21 virtual threads?");
        }

        Map<String, List<String>> response = new HashMap<>();
        response.put("technical", technical);
        response.put("hr", hr);
        response.put("project", project);
        return response;
    }
}
