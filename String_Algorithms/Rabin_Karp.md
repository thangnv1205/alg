
# Thuật toán Rabin-Karp

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Rabin-Karp là một thuật toán tìm kiếm chuỗi sử dụng băm để tìm kiếm bất kỳ một hoặc nhiều mẫu trong một văn bản. Nó được phát triển bởi Michael O. Rabin và Richard M. Karp vào năm 1987.

Điểm khác biệt chính của Rabin-Karp là nó sử dụng một hàm băm để so sánh các chuỗi con của văn bản với mẫu. Thay vì so sánh từng ký tự, nó tính toán giá trị băm của mẫu và giá trị băm của các chuỗi con có cùng độ dài trong văn bản. Nếu các giá trị băm khớp nhau, thì có khả năng có sự khớp và một so sánh ký tự trực tiếp được thực hiện để xác nhận (để xử lý các va chạm băm).

Thuật toán này đặc biệt hiệu quả khi tìm kiếm nhiều mẫu cùng một lúc.

## Mã giả (Pseudocode)

```
function RabinKarpSearch(text, pattern) is
    M := length(pattern)
    N := length(text)
    d := number of characters in alphabet (e.g., 256 for ASCII)
    q := a prime number (e.g., 101)

    h := d^(M-1) mod q // Giá trị cho việc loại bỏ chữ số hàng đầu
    p := 0 // Giá trị băm cho pattern
    t := 0 // Giá trị băm cho text (cửa sổ hiện tại)

    // Tính toán giá trị băm của pattern và cửa sổ đầu tiên của text
    for i from 0 to M-1 do
        p := (d * p + char_to_int(pattern[i])) mod q
        t := (d * t + char_to_int(text[i])) mod q

    // Trượt pattern qua text từng ký tự một
    for i from 0 to N - M do
        if p = t then
            // Nếu giá trị băm khớp, thì kiểm tra các ký tự một cách riêng lẻ
            // (để xử lý các va chạm băm)
            match := true
            for j from 0 to M-1 do
                if text[i+j] != pattern[j] then
                    match := false
                    break
            if match then
                add i to occurrences

        // Tính toán giá trị băm cho cửa sổ tiếp theo của text:
        // Loại bỏ chữ số hàng đầu, thêm chữ số hàng cuối
        if i < N - M then
            t := (d * (t - char_to_int(text[i]) * h) + char_to_int(text[i + M])) mod q
            // Đảm bảo t không âm
            if t < 0 then
                t := t + q

    return occurrences
```

## Hướng tiếp cận

1.  **Tiền xử lý:**
    *   Chọn một số nguyên tố `q` lớn. `q` càng lớn, xác suất va chạm băm càng thấp.
    *   Tính toán giá trị `h = d^(M-1) mod q`, trong đó `d` là kích thước bảng chữ cái và `M` là độ dài mẫu. `h` được sử dụng để loại bỏ ký tự đầu tiên khỏi giá trị băm khi trượt cửa sổ.
    *   Tính toán giá trị băm của mẫu (`p`) và giá trị băm của cửa sổ đầu tiên của văn bản (`t`).

2.  **Trượt cửa sổ:** Lặp qua văn bản, trượt một cửa sổ có cùng độ dài với mẫu.
    *   **So sánh băm:** So sánh giá trị băm của mẫu (`p`) với giá trị băm của cửa sổ hiện tại của văn bản (`t`).
    *   **Kiểm tra va chạm:** Nếu `p` và `t` khớp nhau, thực hiện so sánh ký tự trực tiếp để xác nhận sự khớp (để xử lý các va chạm băm).
    *   **Cập nhật băm:** Để tính toán giá trị băm của cửa sổ tiếp theo một cách hiệu quả, sử dụng kỹ thuật "rolling hash": loại bỏ ký tự đầu tiên của cửa sổ hiện tại và thêm ký tự tiếp theo của văn bản.

## Ứng dụng

*   **Phát hiện đạo văn:** Tìm kiếm các đoạn văn bản trùng lặp trong một tập hợp lớn các tài liệu.
*   **Tìm kiếm chuỗi:** Trong các trình soạn thảo văn bản và công cụ tìm kiếm.
*   **Tin sinh học:** Tìm kiếm các chuỗi DNA hoặc protein.

## Bài toán thực hành (LeetCode)

Thuật toán Rabin-Karp sử dụng băm để tìm kiếm mẫu trong văn bản, đặc biệt hiệu quả khi tìm kiếm nhiều mẫu. Các bài toán sau có thể được giải bằng Rabin-Karp hoặc các kỹ thuật băm chuỗi tương tự.

*   [686. Repeated String Match](https://leetcode.com/problems/repeated-string-match/)
*   [1044. Longest Duplicate Substring](https://leetcode.com/problems/longest-duplicate-substring/) (Có thể giải bằng Rabin-Karp với tìm kiếm nhị phân)
*   [1316. Distinct Echo Substrings](https://leetcode.com/problems/distinct-echo-substrings/) (Có thể sử dụng băm chuỗi)

## Triển khai (Python)

```python
# Hằng số cho thuật toán Rabin-Karp
D = 256 # Số lượng ký tự trong bảng chữ cái đầu vào
Q = 101 # Một số nguyên tố lớn

def rabin_karp_search(text, pattern):
    M = len(pattern)
    N = len(text)
    i = 0
    j = 0
    p = 0    # giá trị băm cho pattern
    t = 0    # giá trị băm cho text
    h = 1
    occurrences = []

    # Giá trị của h sẽ là pow(D, M-1) % Q
    for i in range(M - 1):
        h = (h * D) % Q

    # Tính toán giá trị băm của pattern và cửa sổ đầu tiên của text
    for i in range(M):
        p = (D * p + ord(pattern[i])) % Q
        t = (D * t + ord(text[i])) % Q

    # Trượt pattern qua text từng ký tự một
    for i in range(N - M + 1):
        # Nếu giá trị băm khớp, thì kiểm tra các ký tự một cách riêng lẻ
        if p == t:
            # Kiểm tra các ký tự cho sự khớp
            for j in range(M):
                if text[i + j] != pattern[j]:
                    break
            j += 1
            # Nếu p == t và pattern[0...M-1] == text[i...i+M-1]
            if j == M:
                occurrences.append(i)

        # Tính toán giá trị băm cho cửa sổ tiếp theo của text:
        # Loại bỏ chữ số hàng đầu, thêm chữ số hàng cuối
        if i < N - M:
            t = (D * (t - ord(text[i]) * h) + ord(text[i + M])) % Q

            # Chúng ta có thể nhận được giá trị âm của t, chuyển đổi nó thành dương
            if t < 0:
                t = t + Q

    return occurrences

# Ví dụ sử dụng:
text = "GEEKS FOR GEEKS"
pattern = "GEEK"

found_indices = rabin_karp_search(text, pattern)

if found_indices:
    print(f"Mẫu được tìm thấy tại các chỉ số: {found_indices}")
else:
    print("Không tìm thấy mẫu trong văn bản.")
```
