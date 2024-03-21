package com.escalante.backend.usersapp.backendapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.escalante.backend.usersapp.backendapp.models.entities.User;
import com.escalante.backend.usersapp.backendapp.models.request.UserRequest;
import com.escalante.backend.usersapp.backendapp.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll(){
        return (List<User>) repo.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id){
        return repo.findById(id);
    }

    @Override
    @Transactional
    public User save(User u){
        String passwordEncode = passwordEncoder.encode(u.getPassword());
        u.setPassword(passwordEncode);
        return repo.save(u);
    }

    @Override
    @Transactional
    public void deleteById(Long id){
        repo.deleteById(id);
    }

    @Override
    @Transactional
    public Optional<User> update(UserRequest user, Long id){
        Optional<User> op = this.findById(id);
        if(op.isPresent()){
            User us = op.orElseThrow();
            us.setEmail(user.getEmail());
            us.setUsername(user.getUsername());
            return Optional.of(this.save(us));
        }
        return Optional.empty();
    }
    
}
