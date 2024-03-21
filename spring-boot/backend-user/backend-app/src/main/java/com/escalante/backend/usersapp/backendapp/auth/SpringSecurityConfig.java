package com.escalante.backend.usersapp.backendapp.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.escalante.backend.usersapp.backendapp.auth.filters.JWTAuthenticacionFilter;
import com.escalante.backend.usersapp.backendapp.auth.filters.JWTValidationFilter;

@Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration conf;

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    } 

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return conf.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests()
        .requestMatchers(HttpMethod.GET, "/users").permitAll()
        .anyRequest().authenticated()
        .and()
        .addFilter(new JWTAuthenticacionFilter(conf.getAuthenticationManager()))
        .addFilter(new JWTValidationFilter(conf.getAuthenticationManager()))
        .csrf(config -> config.disable())
        .sessionManagement(managment -> managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .build();
    }

}
