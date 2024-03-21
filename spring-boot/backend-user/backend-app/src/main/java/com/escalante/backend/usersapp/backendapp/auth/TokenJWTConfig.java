package com.escalante.backend.usersapp.backendapp.auth;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;

public class TokenJWTConfig {


    //public final static String SECRET_KEY = "token_key_11!!!!!!!!!!!!!!///////&&&&&2423423";
    public final static SecretKey SECRET_KEY = Jwts.SIG.HS512.key().build();
    public final static String PREFIX_TOKEN = "Bearer ";
    public final static String HEADER_AUTHORIZATION = "Authorization";

    

}
