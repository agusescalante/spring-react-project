package com.escalante.backend.usersapp.backendapp.models.entities;

import java.util.ArrayList;
import java.util.List;

import com.escalante.backend.usersapp.backendapp.models.IUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="users")
public class User implements IUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "This field cannot empty")
    @Column(unique = true)
    private String username;

    @Column(unique = true)
    @NotBlank
    @Email
    private String email;

    @Transient // no queda enlazado a la tabla db
    private boolean admin;

    //@NotEmpty(message = "field cannot empty")
    @NotBlank
    @Size(min = 8, message = "min size must be 8 length")
    private String password;
    
    @ManyToMany
    @JoinTable(name = "users_roles", 
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "role_id"),
                uniqueConstraints = { @UniqueConstraint(columnNames = {"user_id", "role_id"})})
    private List<Role> roles;   // relacion unidireccional


    public User (){}

    public User(String username, String email, String password, List<Role> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
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

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles(){
        return new ArrayList<Role>(roles);
    }

    public void setRole(Role role){
        if(!roles.contains(role))
            roles.add(role);
    }

    public void setRolesList(List<Role> roles){
        this.roles = roles;
    }

    @Override
    public boolean isAdmin(){
        return admin;
    }

    public void setAdmin(boolean admin){
        this.admin = admin;
    }

}
