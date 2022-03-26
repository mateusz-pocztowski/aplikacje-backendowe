package lab1;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Main8 {
    public static void main(String[] arg) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        String userJson = "{\"name\":\"John\",\"age\":21}";
        StaticUser userObject = objectMapper.readValue(userJson, StaticUser.class);

        System.out.println(userObject.getName());
        System.out.println(userObject.getAge());
    }
}
