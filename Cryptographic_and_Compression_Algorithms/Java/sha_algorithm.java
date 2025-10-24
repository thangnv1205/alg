import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.Formatter;

/**
 * Lớp sha_algorithm cung cấp các phương thức để tính toán giá trị băm SHA-256
 * cho dữ liệu đầu vào. Nó sử dụng các API mật mã tiêu chuẩn của Java.
 */
public class sha_algorithm {

    /**
     * Tính toán giá trị băm SHA-256 của dữ liệu đã cho.
     * @param data String - Dữ liệu đầu vào dưới dạng chuỗi.
     * @return String - Giá trị băm SHA-256 dưới dạng chuỗi thập lục phân.
     * @throws Exception nếu thuật toán băm SHA-256 không có sẵn.
     */
    public static String sha256Hash(String data) throws Exception {
        // Lấy một thể hiện của MessageDigest cho thuật toán SHA-256
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        // Chuyển đổi dữ liệu đầu vào thành byte bằng cách sử dụng mã hóa UTF-8 và tính toán băm
        byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));
        // Chuyển đổi mảng byte băm thành chuỗi thập lục phân
        return toHexString(hash);
    }

    /**
     * Chuyển đổi một mảng byte thành biểu diễn chuỗi thập lục phân.
     * @param bytes byte[] - Mảng byte cần chuyển đổi.
     * @return String - Chuỗi thập lục phân tương ứng.
     */
    private static String toHexString(byte[] bytes) {
        // Sử dụng Formatter để định dạng các byte thành chuỗi thập lục phân
        Formatter formatter = new Formatter();
        for (byte b : bytes) {
            formatter.format("%02x", b); // Định dạng mỗi byte thành hai ký tự thập lục phân
        }
        return formatter.toString();
    }

    /**
     * Phương thức chính để trình diễn việc sử dụng hàm băm SHA-256.
     * @param args String[] - Đối số dòng lệnh (không được sử dụng).
     * @throws Exception nếu có lỗi trong quá trình tính toán băm.
     */
    public static void main(String[] args) throws Exception {
        // Ví dụ 1: Hai tin nhắn giống hệt nhau sẽ tạo ra cùng một giá trị băm
        String message1 = "Hello, world!";
        String hash1 = sha256Hash(message1);
        System.out.println("Hash SHA256 của \"" + message1 + "\": " + hash1);

        // Ví dụ 2: Một thay đổi nhỏ (khoảng trắng) sẽ tạo ra một giá trị băm hoàn toàn khác
        String message2 = "Hello, world! "; // Có một khoảng trắng ở cuối
        String hash2 = sha256Hash(message2);
        System.out.println("Hash SHA256 của \"" + message2 + "\": " + hash2);

        // Ví dụ 3: Tin nhắn giống hệt message1
        String message3 = "Hello, world!";
        String hash3 = sha256Hash(message3);
        System.out.println("Hash SHA256 của \"" + message3 + "\": " + hash3);

        // So sánh các giá trị băm
        System.out.println("Hash1 == Hash3: " + hash1.equals(hash3)); // Nên là True
        System.out.println("Hash1 == Hash2: " + hash1.equals(hash2)); // Nên là False
    }
}
