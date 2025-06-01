package com.myrecipebook.backend.user;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Document(collection = "users") // Mappar till en collection som heter 'users' i MongoDB
public class User implements UserDetails {

    @Id
    private String id;
    private String username;
    private String email; // Föredragen för inloggning, men username går också
    private String password; // OBS: Detta ska vara det HASHADE lösenordet
    private List<String> roles; // T.ex. ["ROLE_USER", "ROLE_ADMIN"]

    // Standardkonstruktorer, getters och setters
    public User() {}

    public User(String username, String email, String password, List<String> roles) {
        this.username = username;
        this.email = email;
        this.password = password; // Hashat lösenord
        this.roles = roles;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String getUsername() { // Spring Security använder detta för att identifiera användare
        return username; // Eller email om du loggar in med email
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password; // Returnerar det hashade lösenordet
    }

    public void setPassword(String password) {
        this.password = password; // Sätt det hashade lösenordet här
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    // --- Metoder från UserDetails-interfacet ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (roles == null) {
            return Collections.emptyList();
        }
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}