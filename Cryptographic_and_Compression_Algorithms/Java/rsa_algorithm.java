import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import javax.crypto.Cipher;
import java.util.Base64;

/**
 * Lớp rsa_algorithm cung cấp các phương thức để tạo cặp khóa RSA,
 * mã hóa và giải mã dữ liệu sử dụng thuật toán RSA.
 * Nó sử dụng các API mật mã tiêu chuẩn của Java để đảm bảo tính bảo mật và hiệu quả.
 */
public class rsa_algorithm {

    /**
     * Tạo một cặp khóa RSA (khóa công khai và khóa riêng tư).
     * Kích thước khóa được đặt là 2048 bit, một kích thước phổ biến và an toàn.
     * @return KeyPair - Một đối tượng KeyPair chứa khóa công khai và khóa riêng tư.
     * @throws Exception nếu có lỗi trong quá trình tạo khóa.
     */
    public static KeyPair generateKeyPair() throws Exception {
        // Lấy một thể hiện của KeyPairGenerator cho thuật toán RSA
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        // Khởi tạo KeyPairGenerator với kích thước khóa 2048 bit
        keyPairGenerator.initialize(2048);
        // Tạo và trả về cặp khóa
        return keyPairGenerator.generateKeyPair();
    }

    /**
     * Mã hóa một tin nhắn văn bản thuần túy bằng khóa công khai RSA.
     * @param plaintext String - Tin nhắn văn bản thuần túy cần mã hóa.
     * @param publicKey PublicKey - Khóa công khai RSA được sử dụng để mã hóa.
     * @return String - Tin nhắn đã mã hóa được biểu diễn dưới dạng chuỗi Base64.
     * @throws Exception nếu có lỗi trong quá trình mã hóa.
     */
    public static String encrypt(String plaintext, PublicKey publicKey) throws Exception {
        // Lấy một thể hiện của Cipher cho thuật toán RSA
        Cipher cipher = Cipher.getInstance("RSA");
        // Khởi tạo Cipher ở chế độ mã hóa với khóa công khai đã cho
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        // Mã hóa tin nhắn (chuyển đổi thành byte trước)
        byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes());
        // Chuyển đổi byte đã mã hóa thành chuỗi Base64 để dễ dàng truyền tải/lưu trữ
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    /**
     * Giải mã một tin nhắn đã mã hóa bằng khóa riêng tư RSA.
     * @param ciphertext String - Tin nhắn đã mã hóa (chuỗi Base64) cần giải mã.
     * @param privateKey PrivateKey - Khóa riêng tư RSA được sử dụng để giải mã.
     * @return String - Tin nhắn văn bản thuần túy đã giải mã.
     * @throws Exception nếu có lỗi trong quá trình giải mã.
     */
    public static String decrypt(String ciphertext, PrivateKey privateKey) throws Exception {
        // Lấy một thể hiện của Cipher cho thuật toán RSA
        Cipher cipher = Cipher.getInstance("RSA");
        // Khởi tạo Cipher ở chế độ giải mã với khóa riêng tư đã cho
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        // Giải mã tin nhắn (chuyển đổi từ Base64 thành byte trước)
        byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
        // Chuyển đổi byte đã giải mã thành chuỗi văn bản thuần túy
        return new String(decryptedBytes);
    }

    /**
     * Phương thức chính để trình diễn việc sử dụng thuật toán RSA.
     * @param args String[] - Đối số dòng lệnh (không được sử dụng).
     * @throws Exception nếu có lỗi trong quá trình mã hóa/giải mã.
     */
    public static void main(String[] args) throws Exception {
        // 1. Tạo một cặp khóa RSA
        KeyPair keyPair = generateKeyPair();
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();

        System.out.println("Khóa công khai (Base64): " + Base64.getEncoder().encodeToString(publicKey.getEncoded()));
        System.out.println("Khóa riêng tư (Base64): " + Base64.getEncoder().encodeToString(privateKey.getEncoded()));

        // 2. Tin nhắn gốc cần mã hóa
        String originalMessage = "Hello RSA!";
        System.out.println("Tin nhắn gốc: " + originalMessage);

        // 3. Mã hóa tin nhắn bằng khóa công khai
        String encryptedMessage = encrypt(originalMessage, publicKey);
        System.out.println("Tin nhắn được mã hóa: " + encryptedMessage);

        // 4. Giải mã tin nhắn bằng khóa riêng tư
        String decryptedMessage = decrypt(encryptedMessage, privateKey);
        System.out.println("Tin nhắn được giải mã: " + decryptedMessage);

        // 5. Xác minh rằng tin nhắn gốc và tin nhắn đã giải mã khớp nhau
        System.out.println("Tin nhắn gốc == Tin nhắn được giải mã: " + originalMessage.equals(decryptedMessage));
    }
}
