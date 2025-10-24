import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Lớp lzw_compression cung cấp các phương thức để nén và giải nén dữ liệu
 * sử dụng thuật toán Lempel-Ziv-Welch (LZW).
 * LZW là một thuật toán nén dữ liệu không mất mát dựa trên từ điển.
 */
public class lzw_compression {

    /**
     * Nén một chuỗi bằng thuật toán LZW.
     * @param uncompressed String - Chuỗi chưa nén.
     * @return List<Integer> - Danh sách các mã đã nén.
     */
    public static List<Integer> compress(String uncompressed) {
        // 1. Khởi tạo từ điển với tất cả các ký tự đơn lẻ (0-255 cho ASCII).
        int dictSize = 256;
        Map<String, Integer> dictionary = new HashMap<>();
        for (int i = 0; i < dictSize; i++) {
            dictionary.put(String.valueOf((char) i), i);
        }

        String w = ""; // Chuỗi hiện tại đang được xây dựng
        List<Integer> result = new ArrayList<>(); // Danh sách các mã đã nén

        // 2. Duyệt chuỗi đầu vào từng ký tự một.
        for (char c : uncompressed.toCharArray()) {
            String wc = w + c;
            // 3. Nếu wc đã có trong từ điển, tiếp tục xây dựng w.
            if (dictionary.containsKey(wc)) {
                w = wc;
            } else {
                // 4. Nếu wc không có trong từ điển, xuất mã của w và thêm wc vào từ điển.
                result.add(dictionary.get(w));
                dictionary.put(wc, dictSize++); // Thêm chuỗi mới vào từ điển với mã mới
                w = String.valueOf(c); // Đặt lại w thành ký tự hiện tại
            }
        }

        // 5. Xuất phần còn lại của w (nếu có).
        if (!w.isEmpty()) {
            result.add(dictionary.get(w));
        }
        return result;
    }

    /**
     * Giải nén một danh sách các mã LZW thành một chuỗi dữ liệu.
     * @param compressed List<Integer> - Danh sách các mã đã nén.
     * @return String - Chuỗi đã giải nén.
     */
    public static String decompress(List<Integer> compressed) {
        // 1. Khởi tạo từ điển giống như trong quá trình nén.
        int dictSize = 256;
        Map<Integer, String> dictionary = new HashMap<>();
        for (int i = 0; i < dictSize; i++) {
            dictionary.put(i, String.valueOf((char) i));
        }

        // 2. Đọc mã đầu tiên, giải mã nó thành một chuỗi và thêm vào kết quả.
        String w = dictionary.get(compressed.get(0));
        StringBuilder result = new StringBuilder(w);
        String entry; // Chuỗi tương ứng với mã hiện tại

        // 3. Lặp qua các mã còn lại.
        for (int k : compressed.subList(1, compressed.size())) {
            // 4. Nếu mã k có trong từ điển, lấy chuỗi tương ứng.
            if (dictionary.containsKey(k)) {
                entry = dictionary.get(k);
            } else if (k == dictSize) {
                // 5. Trường hợp đặc biệt: mã mới được tạo ra (w + w[0]).
                entry = w + w.charAt(0);
            } else {
                throw new IllegalArgumentException("Dữ liệu nén bị hỏng: " + k);
            }

            result.append(entry);

            // 6. Thêm chuỗi mới (w + entry[0]) vào từ điển.
            dictionary.put(dictSize++, w + entry.charAt(0));

            // 7. Cập nhật w thành entry hiện tại.
            w = entry;
        }
        return result.toString();
    }

    /**
     * Phương thức chính để trình diễn việc sử dụng thuật toán LZW.
     * @param args String[] - Đối số dòng lệnh (không được sử dụng).
     */
    public static void main(String[] args) {
        String originalText = "TOBEORNOTTOBEORTOBEORNOT";
        System.out.println("Văn bản gốc: " + originalText);

        // Nén văn bản
        List<Integer> compressedCodes = compress(originalText);
        System.out.println("Mã nén LZW: " + compressedCodes);

        // Giải nén văn bản
        String decompressedText = decompress(compressedCodes);
        System.out.println("Văn bản được giải nén: " + decompressedText);

        // Xác minh rằng văn bản gốc và văn bản đã giải nén khớp nhau
        System.out.println("Văn bản gốc == Văn bản được giải nén: " + originalText.equals(decompressedText));
    }
}
