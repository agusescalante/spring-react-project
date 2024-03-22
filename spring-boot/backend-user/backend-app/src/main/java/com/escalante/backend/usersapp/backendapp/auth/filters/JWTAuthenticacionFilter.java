package com.escalante.backend.usersapp.backendapp.auth.filters;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.escalante.backend.usersapp.backendapp.auth.TokenJWTConfig;
import com.escalante.backend.usersapp.backendapp.models.entities.User;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthenticacionFilter extends UsernamePasswordAuthenticationFilter {


    private AuthenticationManager authencationManager;

    public JWTAuthenticacionFilter(AuthenticationManager auth) {
        authencationManager = auth;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        User user = null;
        String username = null;
        String password = null;

        try {
            user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            username = user.getUsername();
            password = user.getPassword();


        } catch (StreamReadException e) {
            e.printStackTrace();
        } catch (DatabindException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        return authencationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
       
        String adminUser = "ROLE_ADMIN"; // aca podriamos buscar en base, y poner un poco de logica, podria ser una lista de "role administradores"
        String username = ((org.springframework.security.core.userdetails.User) authResult.getPrincipal()).getUsername();
        
        Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();
        
        Boolean isAdmin = roles.stream().anyMatch(r -> r.getAuthority().equals(adminUser));
        // guardamos los roles                  aca en los claims se podrian guardar otros datos, no sensibles
        Claims claims = (Claims) Jwts.claims();
        claims.put("authorities", new ObjectMapper().writeValueAsString(roles));
        claims.put("isAdmin", isAdmin);
        
        String token = Jwts.builder().
                        setClaims(claims).
                        subject(username).
                        signWith(TokenJWTConfig.SECRET_KEY).
                        issuedAt(new Date()).
                        expiration(new Date(System.currentTimeMillis() + 3600000)) // expirates at 1 hours
                        .compact();

        response.addHeader(TokenJWTConfig.HEADER_AUTHORIZATION, TokenJWTConfig.PREFIX_TOKEN+token);
        Map<String, Object> body = new HashMap<>();
        
        body.put("token", token);
        body.put("message", String.format("Success with %s", username));
        body.put("username", username);

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(200);
        response.setContentType("application/json");
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,AuthenticationException failed) throws IOException, ServletException {
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Error en la autenticacion!");
        body.put("error", failed.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(401);
        response.setContentType("application/json");
    }

    
}
