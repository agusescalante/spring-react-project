package com.escalante.backend.usersapp.backendapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.escalante.backend.usersapp.backendapp.models.IUser;
import com.escalante.backend.usersapp.backendapp.models.dto.UserDto;
import com.escalante.backend.usersapp.backendapp.models.dto.mapper.DtoMapperUser;
import com.escalante.backend.usersapp.backendapp.models.entities.Role;
import com.escalante.backend.usersapp.backendapp.models.entities.User;
import com.escalante.backend.usersapp.backendapp.models.request.UserRequest;
import com.escalante.backend.usersapp.backendapp.repositories.RoleRepository;
import com.escalante.backend.usersapp.backendapp.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository repo;

    @Autowired
    private RoleRepository repoRole;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> findAll(){
        List<User> usrs = (List<User>) repo.findAll();
        // List<UserDto> userDtos = new ArrayList<>();
        // for(User u: usrs){
        //     userDtos.add(DtoMapperUser.getInstance().setUser(u).build());
        // }
        return usrs.stream().map(u -> DtoMapperUser.
                                    getInstance().
                                    setUser(u).
                                    build()).
                                    collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<UserDto> findById(Long id){
        return repo.findById(id).map(u -> DtoMapperUser.
                                        getInstance().
                                        setUser(u).
                                        build());
    }

    @Override
    @Transactional
    public UserDto save(User u){
        String passwordEncode = passwordEncoder.encode(u.getPassword());
        u.setPassword(passwordEncode);

        
        u.setRolesList(getRoles(u));
        return DtoMapperUser.getInstance().setUser(repo.save(u)).build();
    }

    @Override
    @Transactional
    public void deleteById(Long id){
        repo.deleteById(id);
    }

    @Override
    @Transactional
    public Optional<UserDto> update(UserRequest user, Long id){
        Optional<User> op = repo.findById(id);
        if(op.isPresent()){
        
            User us = op.orElseThrow();
            us.setAdmin(user.isAdmin());
            us.setEmail(user.getEmail());
            us.setUsername(user.getUsername());
            us.setRolesList(getRoles(us));
            return Optional.of(DtoMapperUser.getInstance().setUser(repo.save(us)).build());
        }
        return Optional.empty();
    }

    /**
     * for user pagination
     * @return Page<User>
     */
    @Override
    @Transactional(readOnly = true) 
    public Page<UserDto> findAll(Pageable p){
        Page<User> users = repo.findAll(p);
        return users.map(u -> DtoMapperUser.getInstance().setUser(u).build());
    }

    /*
     * Aux methos
     */
    

    /**
     * Busca en la base el user role, para obtener el id
     * 
     * @return Role List
     */
    private List<Role> getRoles(IUser u){
        Optional<Role> DBRoles = repoRole.findByName("ROLE_USER"); // default

        List<Role> roles = new ArrayList<>();

        if(DBRoles.isPresent()){
            roles.add(DBRoles.orElseThrow());
        }
        if(u.isAdmin()){
            Optional<Role> oa = repoRole.findByName("ROLE_ADMIN");
            if(oa.isPresent())
                roles.add(oa.orElseThrow());
                
        }
        return roles;
    }
}
