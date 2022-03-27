package com.example.lab2;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class UsersController {
    private Map<Integer, UserEntity> users = new HashMap<Integer,UserEntity>();

    @RequestMapping("/users")
    @ResponseBody
    public Object getAllUsers() {
        return this.users;
    }

    @RequestMapping("/users/{id}/get")
    @ResponseBody
    public Object getUser(@PathVariable Integer id) {
        return this.users.get(id);
    }

    @RequestMapping("/users/{id}/remove")
    @ResponseBody
    public Object removeUser(@PathVariable Integer id) {
        return this.users.remove(id);
    }

    @RequestMapping("/users/add")
    @ResponseBody
    public Object addUser(
            @RequestParam(required = true) String name,
            @RequestParam(required = true) Integer age
    ) {
        int id = 0;
        while (this.users.containsKey(id)) {
            id++;
        }

        UserEntity user = new UserEntity(id, name, age);
        this.users.put(id, user);

        return this.users.get(id);
    }
}