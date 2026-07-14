package com.smartjob.auth.config;

import com.smartjob.auth.entity.Role;
import com.smartjob.auth.entity.User;
import com.smartjob.auth.repository.RoleRepository;
import com.smartjob.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "HRAdmin@example.com";
        
        if (!userRepository.existsByEmail(adminEmail)) {
            Role adminRole = roleRepository.findByName("ADMIN")
                    .orElseGet(() -> {
                        Role role = new Role();
                        role.setName("ADMIN");
                        return roleRepository.save(role);
                    });

            User adminUser = new User();
            adminUser.setFullName("HR Admin");
            adminUser.setEmail(adminEmail);
            adminUser.setPassword(passwordEncoder.encode("HRAdmin@1234"));
            adminUser.setRoles(Set.of(adminRole));

            userRepository.save(adminUser);
            System.out.println("Default HR Admin account created successfully.");
        } else {
            System.out.println("Default HR Admin account already exists.");
        }
    }
}
