package lab1;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class Main2 {
    public static void main(String[] args) {
        File file = new File("text.txt");
        Charset charset = StandardCharsets.UTF_8;

        try (OutputStream stream = new FileOutputStream(file))
        {
            String text = "Test";
            byte[] bytes = text.getBytes();

            String content = new String(bytes, charset);
            byte[] encodedBytes = content.getBytes();

            stream.write(encodedBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
