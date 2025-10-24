import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

/**
 * Lớp aes_algorithm cung cấp các phương thức để mã hóa và giải mã dữ liệu
 * sử dụng thuật toán Advanced Encryption Standard (AES).
 * Nó sử dụng các API mật mã tiêu chuẩn của Java để đảm bảo tính bảo mật và hiệu quả.
 */
public class aes_algorithm {

    // Hằng số xác định thuật toán mã hóa được sử dụng
    private static final String ALGORITHM = "AES";

    /**
     * Tạo một khóa AES ngẫu nhiên có kích thước 128 bit.
     * @return SecretKey - Khóa bí mật AES được tạo.
     * @throws Exception nếu có lỗi trong quá trình tạo khóa.
     */
    public static SecretKey generateKey() throws Exception {
        // Lấy một thể hiện của KeyGenerator cho thuật toán AES
        KeyGenerator keyGen = KeyGenerator.getInstance(ALGORITHM);
        // Khởi tạo KeyGenerator với kích thước khóa 128 bit
        keyGen.init(128);
        // Tạo và trả về khóa bí mật
        return keyGen.generateKey();
    }

    /**
     * Mã hóa một tin nhắn văn bản thuần túy bằng khóa AES đã cho.
     * @param message String - Tin nhắn văn bản thuần túy cần mã hóa.
     * @param key SecretKey - Khóa AES được sử dụng để mã hóa.
     * @return String - Tin nhắn đã mã hóa được biểu diễn dưới dạng chuỗi Base64.
     * @throws Exception nếu có lỗi trong quá trình mã hóa.
     */
    public static String encrypt(String message, SecretKey key) throws Exception {
        // Lấy một thể hiện của Cipher cho thuật toán AES
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        // Khởi tạo Cipher ở chế độ mã hóa với khóa đã cho
        cipher.init(Cipher.ENCRYPT_MODE, key);
        // Mã hóa tin nhắn (chuyển đổi thành byte trước)
        byte[] encryptedBytes = cipher.doFinal(message.getBytes());
        // Chuyển đổi byte đã mã hóa thành chuỗi Base64 để dễ dàng truyền tải/lưu trữ
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    /**
     * Giải mã một tin nhắn đã mã hóa bằng khóa AES đã cho.
     * @param encryptedMessage String - Tin nhắn đã mã hóa (chuỗi Base64) cần giải mã.
     * @param key SecretKey - Khóa AES được sử dụng để giải mã.
     * @return String - Tin nhắn văn bản thuần túy đã giải mã.
     * @throws Exception nếu có lỗi trong quá trình giải mã.
     */
    public static String decrypt(String encryptedMessage, SecretKey key) throws Exception {
        // Lấy một thể hiện của Cipher cho thuật toán AES
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        // Khởi tạo Cipher ở chế độ giải mã với khóa đã cho
        cipher.init(Cipher.DECRYPT_MODE, key);
        // Giải mã tin nhắn (chuyển đổi từ Base64 thành byte trước)
        byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedMessage));
        // Chuyển đổi byte đã giải mã thành chuỗi văn bản thuần túy
        return new String(decryptedBytes);
    }

    /**
     * Phương thức chính để trình diễn việc sử dụng thuật toán AES.
     * @param args String[] - Đối số dòng lệnh (không được sử dụng).
     * @throws Exception nếu có lỗi trong quá trình mã hóa/giải mã.
     */
    public static void main(String[] args) throws Exception {
        // 1. Tạo một khóa AES ngẫu nhiên
        SecretKey key = generateKey();
        System.out.println("Khóa được tạo (Base64): " + Base64.getEncoder().encodeToString(key.getEncoded()));

        // 2. Tin nhắn gốc cần mã hóa
        String originalMessage = "Đây là một tin nhắn bí mật.";
        System.out.println("Tin nhắn gốc: " + originalMessage);

        // 3. Mã hóa tin nhắn
        String encrypted = encrypt(originalMessage, key);
        System.out.println("Tin nhắn được mã hóa: " + encrypted);

        // 4. Giải mã tin nhắn
        String decrypted = decrypt(encrypted, key);
        System.out.println("Tin nhắn được giải mã: " + decrypted);

        // 5. Xác minh rằng tin nhắn gốc và tin nhắn đã giải mã khớp nhau
        System.out.println("Tin nhắn gốc == Tin nhắn được giải mã: " + originalMessage.equals(decrypted));
    }
}
