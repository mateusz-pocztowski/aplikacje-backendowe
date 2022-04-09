package com.example.lab03;

import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class UsersController {
    private Map<Integer, UserEntity> users = new HashMap<Integer,UserEntity>();

    @RequestMapping("/api/users")
    @ResponseBody
    public Object getAllUsers() {
        return this.users;
    }

    @RequestMapping("/api/users/{id}")
    @ResponseBody
    public Object getUser(@PathVariable Integer id) {
        return this.users.get(id);
    }

    @RequestMapping(
            value = "/api/user/create",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Object addUser(@RequestBody UserEntity user) {
        int id = 0;
        while (this.users.containsKey(id)) {
            id++;
        }

        user.setId(id);
        this.users.put(id, user);

        return user;
    }

    @RequestMapping(
            value = "/api/users/{id}/remove",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Object removeUser(@PathVariable Integer id) {
        this.users.remove(id);

        JSONObject json = new JSONObject();
        json.put("result", true);

        return json.toString();
    }

    @RequestMapping(
            value = "/api/user/update",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Object updateUser(@PathVariable Integer id, @RequestBody UserEntity input) {
        UserEntity user = this.users.get(id);
        user.setName(input.getName());
        user.setEmail(input.getEmail());

        this.users.put(id, user);

        return user;
    }
}