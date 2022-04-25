package com.example.lab03;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UsersController {
    UsersService service = new UsersService();

    @RequestMapping(
            value = "/api/users",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Object getAllUsers(
            @RequestParam(defaultValue = "1", required = false, name = "page-number") Integer pageNumber,
            @RequestParam(defaultValue = "20", required = false, name = "page-size") Integer pageSize
    ) {
        return service.getAllUsers(pageNumber, pageSize);
    }

    @RequestMapping("/api/users/{id}")
    @ResponseBody
    public Object getUser(@PathVariable Integer id) {
        return service.getUser(id);
    }

    @RequestMapping(
            value = "/api/user/create",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Object addUser(@RequestBody UserEntity user) {
        return service.addUser(user);
    }

    @RequestMapping(
            value = "/api/users/{id}/remove",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Object removeUser(@PathVariable Integer id) {
        return service.removeUser(id);
    }

    @RequestMapping(
            value = "/api/user/{id}/update",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public Object updateUser(
            @PathVariable Integer id,
            @RequestBody UserEntity input
    ) {
        return service.updateUser(id, input);
    }
}