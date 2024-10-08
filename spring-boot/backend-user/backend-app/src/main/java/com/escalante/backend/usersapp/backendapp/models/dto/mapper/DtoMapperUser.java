package com.escalante.backend.usersapp.backendapp.models.dto.mapper;

import com.escalante.backend.usersapp.backendapp.models.dto.UserDto;
import com.escalante.backend.usersapp.backendapp.models.entities.User;

public class DtoMapperUser {

    private User user;

    private DtoMapperUser() {}

    public static DtoMapperUser getInstance() {
        return new DtoMapperUser();
    }

    public DtoMapperUser setUser(User user){
        if(user != null) this.user = user;
        return this;
    }


    public UserDto build(){
        if(user == null) throw new RuntimeException("debe pasar el entity user");
        boolean admin = user.getRoles().stream().anyMatch(r -> "ROLE_ADMIN".equals(r.getName()));
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), admin);
    }

}
