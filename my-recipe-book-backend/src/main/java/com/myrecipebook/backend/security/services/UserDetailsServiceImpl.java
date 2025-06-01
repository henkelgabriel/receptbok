package com.myrecipebook.backend.security.services; // Ändra till ditt faktiska paket

import com.myrecipebook.backend.user.User;
import com.myrecipebook.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service 
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired // Injicera UserRepository för att komma åt användare i databasen
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
       
        User user = userRepository.findByUsername(usernameOrEmail)
                .orElseGet(() -> userRepository.findByEmail(usernameOrEmail)
                        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username or email: " + usernameOrEmail)));

        return user; 
    }
}