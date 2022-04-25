package com.example.lab03;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.*;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class UsersService {
    private Map<Integer, UserEntity> users = new LinkedHashMap<Integer,UserEntity>();

    public Object getAllUsers(int pageNumber, int pageSize) {
        if (pageSize < 1) {
            pageSize = 1;
        }

        if (pageSize > 100) {
            pageSize = 100;
        }

        if (pageNumber < 1) {
            pageNumber = 1;
        }

        double pagesCount = Math.ceil(users.size() / pageSize);

        Map<Integer, UserEntity> pageUsers = new LinkedHashMap<Integer,UserEntity>();

        int start = (pageNumber-1) * pageSize;
        int end = pageNumber * pageSize;

        for (int i=start; i < end; i++) {
            if(users.size() == 0) break;

            Object[] keyArray = users.keySet().toArray();
            if (keyArray.length > i) {
                UserEntity user = users.get(keyArray[i]);
                pageUsers.put(user.getId(), user);
            }
        }

        JSONObject json = new JSONObject();
        json.put("pageNumber", pageNumber);
        json.put("pagesCount", pagesCount);
        json.put("pageSize", pageUsers.size());
        json.put("totalCount", users.size());
        json.put("users", pageUsers);

        return json.toString();
    }

    public UserEntity getUser(int id) {
        return users.get(id);
    }

    public UserEntity addUser(UserEntity user) {
        int id = 1;
        while (this.users.containsKey(id)) {
            id++;
        }

        user.setId(id);
        this.users.put(id, user);

        return user;
    }

    public Object updateUser(int id, UserEntity input) {
        UserEntity user = this.users.get(id);
        user.setName(input.getName());
        user.setEmail(input.getEmail());

        this.users.put(id, user);

        return user;
    }

    public Object removeUser(Integer id) {
        this.users.remove(id);

        JSONObject json = new JSONObject();
        json.put("result", true);

        return json.toString();
    }

    @PostConstruct
    private void onCreate() {
        JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader("users.json"))
        {
            Object obj = jsonParser.parse(reader);

            System.out.println(obj);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @PreDestroy
    private void onDestroy() {
        try (FileWriter file = new FileWriter("users.json")) {
            file.write(users.toString());
            file.flush();
         } catch (IOException e) {
            e.printStackTrace();
        }
    }
}