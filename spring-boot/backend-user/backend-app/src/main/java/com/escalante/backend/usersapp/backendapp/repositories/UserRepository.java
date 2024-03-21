package com.escalante.backend.usersapp.backendapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.escalante.backend.usersapp.backendapp.models.entities.User;


public interface UserRepository extends CrudRepository<User, Long>{

    
    Optional<User> findByUsername(String username);

    // el uno porque corresponde al primer parametro, este metodo con cumple con la nomenclatura por eso el @query
    @Query("select u from User u where u.username=?1")
    Optional<User> getUserbyUsername(String username);
}
