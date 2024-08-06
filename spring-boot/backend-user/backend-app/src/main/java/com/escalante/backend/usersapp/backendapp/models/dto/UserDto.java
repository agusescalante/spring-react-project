package com.escalante.backend.usersapp.backendapp.models.dto;

public class UserDto {

    private Long id;
    private String username, email;
    private boolean admin;


    public UserDto() {}

    public UserDto(Long id, String username, String email, boolean admin) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.admin = admin;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAdmin(){
        return admin;
    }

    public void setAdmin(boolean admin){
        this.admin = admin;
    }

}
