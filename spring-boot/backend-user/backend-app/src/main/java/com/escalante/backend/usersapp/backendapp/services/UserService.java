package com.escalante.backend.usersapp.backendapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.escalante.backend.usersapp.backendapp.models.dto.UserDto;
import com.escalante.backend.usersapp.backendapp.models.entities.User;
import com.escalante.backend.usersapp.backendapp.models.request.UserRequest;

public interface UserService {

    public List<UserDto> findAll();
    public Page<UserDto> findAll(Pageable p);
    public Optional<UserDto> findById(Long id);
    public UserDto save(User user);
    public Optional<UserDto> update(UserRequest user, Long id);
    public void deleteById(Long id);

}
