package lab1;

public class Main6 {
    public static void main(String[] args) {
        String input = "line 1\r\nline 2\nline 3";
        String[] linesArr = input.split("\\r?\\n|\\r");

        for(int index = 0; index < linesArr.length; index++) {
            String line = linesArr[index];
            System.out.println(String.format("%s: %s", index+1, line));
        }
    }
}
