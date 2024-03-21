package com.escalante.backend.usersapp.backendapp.models.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


/**
 * Se usa esta clase cuando se actualiza un usuario no valide el campo contraseña, ya que la contraseña no se puede actualizar desde el front
 */
public class UserRequest {

    @NotBlank(message = "This field cannot empty")
    @Column(unique = true)
    private String username;

    @Column(unique = true)
    @NotBlank
    @Email
    private String email;

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

}
