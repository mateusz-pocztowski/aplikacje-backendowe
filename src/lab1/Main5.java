package lab1;

import java.time.Instant;
import java.time.LocalDateTime;

public class Main5 {
    public static void main(String[] args) {
        LocalDateTime local = LocalDateTime.now();
        Instant global = Instant.now();

        System.out.println(String.format("local: %s", local));
        System.out.println(String.format("global: %s", global));
    }
}
