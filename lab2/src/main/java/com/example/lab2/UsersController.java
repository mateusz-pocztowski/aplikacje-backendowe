package com.example.lab2;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UsersController {
    @RequestMapping("/users")
    public String index() {
        return "example"; // example.html
    }

    @RequestMapping("/users2")
    public String example2() {
        return "example2"; // example2.html
    }

    @RequestMapping("/api/products")
    @ResponseBody
    public Object apiUsers() {
        List<ProductEntity> products = new ArrayList<>();

        products.add(new ProductEntity(1, "Product 1"));
        products.add(new ProductEntity(2, "Product 2"));
        products.add(new ProductEntity(3, "Product 3"));

        return products;
    }
}