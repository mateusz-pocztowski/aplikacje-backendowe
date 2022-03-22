package lab1;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class Main1 {
    public static void main(String[] args) {
        File file = new File("text.txt");
        Charset charset = StandardCharsets.UTF_8;

        try (InputStream stream = new FileInputStream(file))
        {
            byte[] bytes = new byte[(int) file.length()];
            stream.read(bytes);

            String content = new String(bytes, charset);
            System.out.println(content);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
