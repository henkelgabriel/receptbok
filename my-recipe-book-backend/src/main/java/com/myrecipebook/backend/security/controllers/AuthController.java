package com.myrecipebook.backend.security.controllers; // Ditt paket

import com.myrecipebook.backend.security.jwt.JwtUtils;
import com.myrecipebook.backend.security.payload.request.LoginRequest;
import com.myrecipebook.backend.security.payload.request.SignupRequest;
import com.myrecipebook.backend.security.payload.request.response.JwtResponse;
import com.myrecipebook.backend.security.payload.request.response.MessageResponse;
import com.myrecipebook.backend.security.services.UserDetailsServiceImpl;
import com.myrecipebook.backend.user.User;
import com.myrecipebook.backend.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@RestController 
@RequestMapping("/api/auth") 
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserDetailsServiceImpl userDetailsService; 

    @PostMapping("/signin") 
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        
        SecurityContextHolder.getContext().setAuthentication(authentication);

      
        String jwt = jwtUtils.generateJwtToken(authentication);

       
        User userDetails = (User) authentication.getPrincipal(); 
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup") 
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

       
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Skapa en ny användare
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), // Hasher lösenordet!
                Collections.singletonList("ROLE_USER")); // Alla nya användare får rollen "ROLE_USER"

        userRepository.save(user); 

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}