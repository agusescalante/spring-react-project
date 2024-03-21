package com.escalante.backend.usersapp.backendapp.auth.filters;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.escalante.backend.usersapp.backendapp.auth.TokenJWTConfig;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


/*
 * 
 * Clase que verifica el token que envia el usuario, que no se haya modificado
 * 
 */
public class JWTValidationFilter extends BasicAuthenticationFilter{

    public JWTValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
            
       String header = request.getHeader(TokenJWTConfig.HEADER_AUTHORIZATION);
       
       if(header == null || !header.startsWith(TokenJWTConfig.PREFIX_TOKEN)){
            chain.doFilter(request, response);
            return;
       }
       String token = header.replace(TokenJWTConfig.PREFIX_TOKEN, "");
       
          try {
               Claims claims = Jwts.parser().
               verifyWith(TokenJWTConfig.SECRET_KEY).
               build().parseSignedClaims(token).
               getPayload();
               
               String username = claims.getSubject(); // objenemos el username del token
               
               List<GrantedAuthority> authorities = new ArrayList<>();
               authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                    
               UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
               SecurityContextHolder.getContext().setAuthentication(auth);
               
               chain.doFilter(request, response);

          } catch(JwtException e) {
               Map<String, String> body = new HashMap<>();
               body.put("error", e.getMessage());
               body.put("message", "the token is not valid!");

               response.getWriter().write(new ObjectMapper().writeValueAsString(body));
               response.setStatus(403);
               response.setContentType("application/json");
       }
    }
    
}
