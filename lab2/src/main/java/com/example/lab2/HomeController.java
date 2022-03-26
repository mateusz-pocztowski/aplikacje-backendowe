package com.example.lab2;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
    @RequestMapping("/")
    @ResponseBody
    public String index() {
        return "Hello World!";
    }

    @RequestMapping("/example2/{name}/{age}")
    @ResponseBody
    public String example2(
            @PathVariable String name,
            @PathVariable Integer age,
            @RequestParam(required = false) String param1,
            @RequestParam(required = false) Boolean param2
        ) {
        return "example2 message!" + name + " " + age + " " + param1 + " " + param2;
    }
}