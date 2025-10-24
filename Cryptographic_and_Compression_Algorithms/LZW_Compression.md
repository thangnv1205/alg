
# Nén LZW (LZW Compression)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Nén LZW (Lempel-Ziv-Welch) là một thuật toán nén dữ liệu không mất mát. Nó là một thuật toán nén từ điển, có nghĩa là nó xây dựng một "từ điển" các chuỗi (sequences) ký tự trong dữ liệu đầu vào và sau đó thay thế các chuỗi này bằng các mã ngắn hơn. Thuật toán này được sử dụng rộng rãi trong các định dạng tệp như GIF, TIFF và PDF.

Điểm đặc biệt của LZW là từ điển được xây dựng động trong quá trình nén và giải nén, mà không cần phải truyền từ điển cùng với dữ liệu nén. Điều này làm cho nó rất hiệu quả.

## Mã giả (Pseudocode) - Nén

```
function LZW_Compress(uncompressed_string) is
    dictionary := initialize dictionary with all single-character strings
    w := empty string
    result := empty list

    for each character c in uncompressed_string do
        wc := w + c
        if wc is in dictionary then
            w := wc
        else
            add dictionary[w] to result
            add wc to dictionary
            w := c

    if w is not empty then
        add dictionary[w] to result

    return result
```

## Mã giả (Pseudocode) - Giải nén

```
function LZW_Decompress(compressed_codes) is
    dictionary := initialize dictionary with all single-character strings
    
    entry := dictionary[first code in compressed_codes]
    result := entry
    w := entry

    for each code k in compressed_codes (starting from second code) do
        if k is in dictionary then
            entry := dictionary[k]
        else if k is new_code_index then // Trường hợp đặc biệt: w + w[0]
            entry := w + w[0]
        else
            error: bad compressed code

        add entry to result
        add w + entry[0] to dictionary
        w := entry

    return result
```

## Hướng tiếp cận

### Nén

1.  **Khởi tạo từ điển:** Bắt đầu với một từ điển chứa tất cả các ký tự đơn lẻ (ví dụ: 0-255 cho ASCII).
2.  **Duyệt chuỗi đầu vào:** Đọc chuỗi đầu vào từng ký tự một.
3.  **Xây dựng chuỗi `w`:** Xây dựng một chuỗi `w` bằng cách thêm các ký tự. Nếu `w + c` (trong đó `c` là ký tự tiếp theo) có trong từ điển, hãy tiếp tục thêm `c` vào `w`.
4.  **Thêm vào kết quả và từ điển:** Nếu `w + c` không có trong từ điển, điều đó có nghĩa là `w` là chuỗi dài nhất đã biết. Xuất mã của `w` vào kết quả nén. Sau đó, thêm `w + c` vào từ điển với một mã mới.
5.  **Đặt lại `w`:** Đặt `w` thành `c` và tiếp tục.

### Giải nén

1.  **Khởi tạo từ điển:** Bắt đầu với một từ điển giống như từ điển được sử dụng trong quá trình nén.
2.  **Đọc mã đầu tiên:** Đọc mã đầu tiên từ dữ liệu nén, giải mã nó thành một chuỗi và thêm nó vào kết quả giải nén. Đặt chuỗi này là `w`.
3.  **Lặp qua các mã còn lại:** Đối với mỗi mã `k` tiếp theo:
    *   Nếu `k` có trong từ điển, hãy lấy chuỗi tương ứng. Đặt nó là `entry`.
    *   Nếu `k` không có trong từ điển, điều đó có nghĩa là nó là một mã mới được tạo ra trong quá trình nén. Trong trường hợp này, `entry` sẽ là `w` cộng với ký tự đầu tiên của `w`.
    *   Thêm `entry` vào kết quả giải nén.
    *   Thêm `w` cộng với ký tự đầu tiên của `entry` vào từ điển.
    *   Đặt `w` thành `entry`.

## Ứng dụng

*   **Định dạng tệp hình ảnh:** Được sử dụng trong định dạng tệp GIF và TIFF.
*   **Nén dữ liệu chung:** Được sử dụng trong các công cụ nén như `compress` trên các hệ thống Unix.
*   **Nén văn bản:** Hiệu quả cho các tệp văn bản có nhiều chuỗi lặp lại.

## Bài toán thực hành (LeetCode)

LZW là một thuật toán nén dữ liệu không mất mát dựa trên từ điển. Mặc dù không có bài toán LeetCode trực tiếp yêu cầu triển khai LZW, việc hiểu nguyên lý của nó có thể hữu ích trong các bài toán liên quan đến xử lý chuỗi, từ điển hoặc nén dữ liệu.

*   [208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) (Liên quan đến việc xây dựng từ điển/cây tiền tố)
*   [648. Replace Words](https://leetcode.com/problems/replace-words/) (Có thể sử dụng Trie để tìm tiền tố)

## Triển khai (Python)

```python
def lzw_compress(uncompressed):
    """Nén một chuỗi bằng thuật toán LZW."""
    # Xây dựng từ điển.
    dictionary_size = 256
    dictionary = {chr(i): str(i) for i in range(dictionary_size)} # Lưu trữ mã dưới dạng chuỗi

    w = ""
    result = []
    for c in uncompressed:
        wc = w + c
        if wc in dictionary:
            w = wc
        else:
            result.append(dictionary[w])
            # Thêm wc vào từ điển. wc là một chuỗi mới.
            dictionary[wc] = str(dictionary_size)
            dictionary_size += 1
            w = c

    # Xuất phần còn lại của w
    if w:
        result.append(dictionary[w])
    return result # Trả về danh sách các mã chuỗi

def lzw_decompress(compressed):
    """Giải nén một danh sách các mã LZW thành một chuỗi dữ liệu."""
    # Xây dựng từ điển.
    dictionary_size = 256
    dictionary = {str(i): chr(i) for i in range(dictionary_size)}

    result = []
    # Chuyển đổi mã đầu tiên thành chuỗi
    w = str(compressed[0])
    curr_char = dictionary[w]
    result.append(curr_char)

    for k_str in compressed[1:]:
        k = str(k_str) # Đảm bảo k là chuỗi để tra cứu từ điển
        if k in dictionary:
            entry = dictionary[k]
        elif k == str(dictionary_size):
            entry = curr_char + curr_char[0]
        else:
            raise ValueError('Dữ liệu nén bị hỏng')

        result.append(entry)

        # Thêm chuỗi mới vào từ điển
        dictionary[str(dictionary_size)] = curr_char + entry[0]
        dictionary_size += 1

        curr_char = entry
    return ''.join(result)

# Ví dụ sử dụng:
original_text = "TOBEORNOTTOBEORTOBEORNOT"

compressed_codes = lzw_compress(original_text)
print("Mã nén LZW:", compressed_codes)

decompressed_text = lzw_decompress(compressed_codes)
print("Văn bản được giải nén:", decompressed_text)

print("Văn bản gốc == Văn bản được giải nén:", original_text == decompressed_text)
```
