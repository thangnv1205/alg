
# Thuật toán Huffman (Huffman Coding)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Mã hóa Huffman là một thuật toán nén dữ liệu không mất mát. Nó là một thuật toán tham lam được sử dụng để xây dựng một bảng mã có độ dài thay đổi cho các ký tự nguồn (ví dụ: các ký tự trong một tệp văn bản), trong đó mã cho các ký tự thường xuyên xuất hiện ngắn hơn mã cho các ký tự ít thường xuyên hơn. Điều này dẫn đến tổng độ dài của chuỗi bit được mã hóa nhỏ hơn.

Thuật toán hoạt động bằng cách xây dựng một cây nhị phân đặc biệt, được gọi là cây Huffman, từ các tần số xuất hiện của các ký tự. Các ký tự có tần số cao hơn sẽ có đường đi ngắn hơn từ gốc đến lá, do đó có mã ngắn hơn.

## Mã giả (Pseudocode)

```
function HuffmanCoding(symbols, frequencies) is
    create a priority queue Q
    for each symbol s in symbols do
        create a leaf node for s
        node.frequency := frequencies[s]
        insert node into Q

    while Q.size > 1 do
        left := Q.extract_min()
        right := Q.extract_min()
        parent := new internal node
        parent.frequency := left.frequency + right.frequency
        parent.left := left
        parent.right := right
        insert parent into Q

    return Q.extract_min() // Gốc của cây Huffman

function GenerateCodes(node, current_code, codes_map) is
    if node is a leaf then
        codes_map[node.symbol] := current_code
        return
    GenerateCodes(node.left, current_code + "0", codes_map)
    GenerateCodes(node.right, current_code + "1", codes_map)
```

## Hướng tiếp cận

1.  **Tính tần số:** Tính tần số xuất hiện của mỗi ký tự trong dữ liệu đầu vào.
2.  **Xây dựng hàng đợi ưu tiên:** Tạo một nút lá cho mỗi ký tự và tần số của nó. Thêm tất cả các nút này vào một hàng đợi ưu tiên, được sắp xếp theo tần số tăng dần.
3.  **Xây dựng cây Huffman:** Trong khi hàng đợi ưu tiên có nhiều hơn một nút:
    *   Lấy hai nút có tần số thấp nhất từ hàng đợi ưu tiên.
    *   Tạo một nút nội bộ mới có tần số bằng tổng tần số của hai nút đã lấy. Đặt hai nút đã lấy làm con trái và con phải của nút mới.
    *   Thêm nút nội bộ mới vào hàng đợi ưu tiên.
4.  **Tạo mã:** Sau khi cây Huffman được xây dựng (khi chỉ còn một nút trong hàng đợi ưu tiên), duyệt cây để tạo mã Huffman cho mỗi ký tự. Gán '0' cho cạnh trái và '1' cho cạnh phải. Đường đi từ gốc đến lá của một ký tự sẽ tạo thành mã Huffman của nó.

## Ứng dụng

*   **Nén tệp:** Được sử dụng trong các định dạng tệp như JPEG, MP3 và ZIP để nén dữ liệu.
*   **Truyền dữ liệu:** Giảm kích thước dữ liệu cần truyền qua mạng, tiết kiệm băng thông.
*   **Hệ thống fax:** Nén hình ảnh đen trắng.

## Bài toán thực hành (LeetCode)

Mã hóa Huffman là một thuật toán tham lam được sử dụng rộng rãi trong nén dữ liệu. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Huffman Coding, việc hiểu nguyên lý của nó có thể hữu ích cho các bài toán liên quan đến tối ưu hóa mã hóa hoặc nén.

*   [1054. Distant Barcodes](https://leetcode.com/problems/distant-barcodes/) (Có thể sử dụng hàng đợi ưu tiên và ý tưởng tần suất)

## Triển khai (Python)

```python
import heapq
from collections import defaultdict

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    # So sánh các đối tượng Node dựa trên tần số của chúng
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(frequencies):
    priority_queue = []
    for char, freq in frequencies.items():
        heapq.heappush(priority_queue, Node(char, freq))

    while len(priority_queue) > 1:
        left = heapq.heappop(priority_queue)
        right = heapq.heappop(priority_queue)

        merged = Node(None, left.freq + right.freq)
        merged.left = left
        merged.right = right

        heapq.heappush(priority_queue, merged)

    return priority_queue[0]

def generate_huffman_codes(node, current_code, huffman_codes):
    if node is None:
        return

    if node.char is not None:
        huffman_codes[node.char] = current_code
        return

    generate_huffman_codes(node.left, current_code + "0", huffman_codes)
    generate_huffman_codes(node.right, current_code + "1", huffman_codes)

def huffman_coding(text):
    # 1. Tính tần số của các ký tự
    frequencies = defaultdict(int)
    for char in text:
        frequencies[char] += 1

    # 2. Xây dựng cây Huffman
    huffman_tree = build_huffman_tree(frequencies)

    # 3. Tạo mã Huffman
    huffman_codes = {}
    generate_huffman_codes(huffman_tree, "", huffman_codes)

    # 4. Mã hóa văn bản
    encoded_text = "".join(huffman_codes[char] for char in text)

    return encoded_text, huffman_codes

# Ví dụ sử dụng:
text = "this is an example for huffman encoding"
encoded_text, huffman_codes = huffman_coding(text)

print("Mã Huffman:", huffman_codes)
print("Văn bản được mã hóa:", encoded_text)
```
