package com.escalante.backend.usersapp.backendapp.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escalante.backend.usersapp.backendapp.models.dto.UserDto;
import com.escalante.backend.usersapp.backendapp.models.entities.User;
import com.escalante.backend.usersapp.backendapp.models.request.UserRequest;
import com.escalante.backend.usersapp.backendapp.services.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/users")
@CrossOrigin(originPatterns = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDto> list(){
        return userService.findAll();
    }

    @GetMapping("page/{page}")
    public Page<UserDto> list(@PathVariable Integer page){
        Pageable pageObj = PageRequest.of(page, 2);
        return userService.findAll(pageObj);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showById(@PathVariable Long id){
        Optional<UserDto> userOp = userService.findById(id);
        if(userOp.isPresent())
            return ResponseEntity.ok(userOp.orElseThrow());
        return ResponseEntity.notFound().build();
    }

    /* @PostMapping v1
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User u) {
         return userService.save(u);
    }
    */

    //por nomenclatura => el obj BindingResult va despues del objeto parametro que se tiene que validar
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User userRequest, BindingResult result) {
        if(result.hasErrors()) return validation(result);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody UserRequest user, BindingResult result, @PathVariable Long id){
        if(result.hasErrors())  return validation(result);
           
        Optional<UserDto> us = userService.update(user, id);
        if(us.isPresent())
            return ResponseEntity.status(HttpStatus.CREATED).body(us.orElseThrow());
        return ResponseEntity.notFound().build();
    }       

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { 
        Optional<UserDto> op = userService.findById(id);
        if(op.isPresent()){
            userService.deleteById(id);
            return ResponseEntity.noContent().build(); //code 204
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * @param result 
     * 
     * @return badRequest with error msjs in body section response
     */
    private ResponseEntity<?> validation(BindingResult result){
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "The field " + err.getField() + " " + err.getDefaultMessage().toString());
        });
        return ResponseEntity.badRequest().body(errors);
    }
   
}
