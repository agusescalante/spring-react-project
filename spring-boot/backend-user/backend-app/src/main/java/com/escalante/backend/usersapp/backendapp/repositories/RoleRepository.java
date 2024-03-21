package com.escalante.backend.usersapp.backendapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.escalante.backend.usersapp.backendapp.models.entities.Role;
import java.util.List;



public interface RoleRepository extends CrudRepository<Role, Long>{

    
    Optional<Role> findByName(String name);

    // el uno porque corresponde al primer parametro, este metodo con cumple con la nomenclatura por eso el @query
    @Query("select u from Role u where u.name=?1")
    Optional<Role> getRolebyName(String role_name);
}
