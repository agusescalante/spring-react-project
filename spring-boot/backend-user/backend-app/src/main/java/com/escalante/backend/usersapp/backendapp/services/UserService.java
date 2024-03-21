package com.escalante.backend.usersapp.backendapp.services;

import java.util.List;
import java.util.Optional;

import com.escalante.backend.usersapp.backendapp.models.entities.User;
import com.escalante.backend.usersapp.backendapp.models.request.UserRequest;

public interface UserService {

    public List<User> findAll();
    public Optional<User> findById(Long id);
    public User save(User user);
    public Optional<User> update(UserRequest user, Long id);
    public void deleteById(Long id);

}
