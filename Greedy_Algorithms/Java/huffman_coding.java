import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class huffman_coding {

    // Lớp Node cho cây Huffman
    static class Node {
        Character character;
        Integer frequency;
        Node left;
        Node right;

        public Node(Character character, Integer frequency, Node left, Node right) {
            this.character = character;
            this.frequency = frequency;
            this.left = left;
            this.right = right;
        }
    }

    // Phương thức xây dựng cây Huffman
    public static Node buildHuffmanTree(Map<Character, Integer> frequencies) {
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(node -> node.frequency));

        for (Map.Entry<Character, Integer> entry : frequencies.entrySet()) {
            pq.add(new Node(entry.getKey(), entry.getValue(), null, null));
        }

        while (pq.size() > 1) {
            Node left = pq.poll();
            Node right = pq.poll();

            Node merged = new Node(null, left.frequency + right.frequency, left, right);
            pq.add(merged);
        }

        return pq.poll();
    }

    // Phương thức tạo mã Huffman
    public static void generateHuffmanCodes(Node node, String currentCode, Map<Character, String> huffmanCodes) {
        if (node == null) {
            return;
        }

        if (node.character != null) {
            huffmanCodes.put(node.character, currentCode);
            return;
        }

        generateHuffmanCodes(node.left, currentCode + "0", huffmanCodes);
        generateHuffmanCodes(node.right, currentCode + "1", huffmanCodes);
    }

    // Phương thức mã hóa văn bản
    public static String encode(String text, Map<Character, String> huffmanCodes) {
        StringBuilder encodedText = new StringBuilder();
        for (char c : text.toCharArray()) {
            encodedText.append(huffmanCodes.get(c));
        }
        return encodedText.toString();
    }

    // Phương thức giải mã văn bản
    public static String decode(String encodedText, Node huffmanTree) {
        StringBuilder decodedText = new StringBuilder();
        Node current = huffmanTree;

        for (char bit : encodedText.toCharArray()) {
            if (bit == '0') {
                current = current.left;
            } else {
                current = current.right;
            }

            if (current.character != null) {
                decodedText.append(current.character);
                current = huffmanTree; // Quay lại gốc cho ký tự tiếp theo
            }
        }
        return decodedText.toString();
    }

    public static void main(String[] args) {
        String text = "this is an example for huffman encoding";

        // 1. Tính tần số của các ký tự
        Map<Character, Integer> frequencies = new HashMap<>();
        for (char c : text.toCharArray()) {
            frequencies.put(c, frequencies.getOrDefault(c, 0) + 1);
        }

        // 2. Xây dựng cây Huffman
        Node huffmanTree = buildHuffmanTree(frequencies);

        // 3. Tạo mã Huffman
        Map<Character, String> huffmanCodes = new HashMap<>();
        generateHuffmanCodes(huffmanTree, "", huffmanCodes);

        // 4. Mã hóa văn bản
        String encodedText = encode(text, huffmanCodes);

        System.out.println("Mã Huffman: " + huffmanCodes);
        System.out.println("Văn bản được mã hóa: " + encodedText);

        // 5. Giải mã văn bản
        String decodedText = decode(encodedText, huffmanTree);
        System.out.println("Văn bản được giải mã: " + decodedText);
        System.out.println("Văn bản gốc == Văn bản được giải mã: " + text.equals(decodedText));
    }
}
