
# Thuật toán Knuth-Morris-Pratt (KMP)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Knuth-Morris-Pratt (KMP) là một thuật toán tìm kiếm chuỗi hiệu quả. Nó được sử dụng để tìm kiếm sự xuất hiện của một "mẫu" (pattern) `P` trong một "văn bản" (text) `T`. KMP cải thiện thuật toán tìm kiếm chuỗi ngây thơ bằng cách tránh kiểm tra lại các ký tự đã được so khớp trước đó.

Điểm mấu chốt của thuật toán KMP là sử dụng một "mảng tiền tố hậu tố dài nhất" (Longest Proper Prefix Suffix - LPS) (còn gọi là mảng `pi` hoặc `next`). Mảng LPS lưu trữ độ dài của tiền tố dài nhất của mẫu mà cũng là hậu tố của mẫu đó. Thông tin này được sử dụng để biết bao nhiêu ký tự có thể được bỏ qua khi có sự không khớp, thay vì bắt đầu lại từ đầu.

## Mã giả (Pseudocode)

### Hàm `compute_lps_array`

```
function compute_lps_array(pattern, M, lps) is
    length := 0 // độ dài của tiền tố hậu tố dài nhất trước đó
    lps[0] := 0
    i := 1

    while i < M do
        if pattern[i] = pattern[length] then
            length := length + 1
            lps[i] := length
            i := i + 1
        else
            if length != 0 then
                length := lps[length - 1]
            else
                lps[i] := 0
                i := i + 1
```

### Hàm `kmp_search`

```
function kmp_search(text, pattern) is
    N := length(text)
    M := length(pattern)

    lps := array of size M
    compute_lps_array(pattern, M, lps)

    i := 0 // chỉ số cho text
    j := 0 // chỉ số cho pattern
    occurrences := empty list

    while i < N do
        if pattern[j] = text[i] then
            i := i + 1
            j := j + 1

        if j = M then
            add (i - j) to occurrences
            j := lps[j - 1]
        else if i < N and pattern[j] != text[i] then
            if j != 0 then
                j := lps[j - 1]
            else
                i := i + 1

    return occurrences
```

## Hướng tiếp cận

Thuật toán KMP có hai giai đoạn chính:

1.  **Tiền xử lý mẫu (Xây dựng mảng LPS):**
    *   Mảng LPS (`lps[]`) được xây dựng cho mẫu. `lps[i]` lưu trữ độ dài của tiền tố dài nhất của mẫu `pattern[0...i]` mà cũng là hậu tố của `pattern[0...i]`.
    *   Mảng này giúp thuật toán biết bao nhiêu ký tự có thể được bỏ qua khi có sự không khớp, thay vì bắt đầu lại từ đầu.

2.  **Tìm kiếm:**
    *   Sử dụng mảng LPS, thuật toán so sánh các ký tự của văn bản và mẫu.
    *   Khi có sự khớp, cả hai con trỏ (cho văn bản và mẫu) đều tiến lên.
    *   Khi có sự không khớp, thay vì lùi con trỏ văn bản, thuật toán sử dụng mảng LPS để lùi con trỏ mẫu đến vị trí thích hợp, cho phép tiếp tục so sánh mà không cần kiểm tra lại các ký tự đã biết là khớp.

## Ứng dụng

*   **Tìm kiếm văn bản:** Trong các trình soạn thảo văn bản, công cụ tìm kiếm và các ứng dụng xử lý văn bản khác.
*   **Phân tích DNA:** Tìm kiếm các chuỗi con trong chuỗi DNA.
*   **Phát hiện đạo văn:** Tìm kiếm các đoạn văn bản trùng lặp.
*   **Nén dữ liệu:** Là một phần của một số thuật toán nén dữ liệu.

## Bài toán thực hành (LeetCode)

Thuật toán KMP là một thuật toán tìm kiếm chuỗi hiệu quả, đặc biệt hữu ích khi mẫu có các tiền tố và hậu tố lặp lại. Nó thường được sử dụng trong các bài toán tìm kiếm mẫu hoặc xử lý chuỗi.

*   [28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) (Có thể giải bằng KMP)
*   [214. Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/) (Giải pháp dựa trên KMP)
*   [459. Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/) (Có thể giải bằng KMP)

## Triển khai (Python)

```python
def compute_lps_array(pattern, M, lps):
    length = 0 # độ dài của tiền tố hậu tố dài nhất trước đó
    lps[0] = 0
    i = 1

    while i < M:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

def kmp_search(text, pattern):
    N = len(text)
    M = len(pattern)

    lps = [0] * M
    compute_lps_array(pattern, M, lps)

    i = 0 # chỉ số cho text
    j = 0 # chỉ số cho pattern
    occurrences = []

    while i < N:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == M:
            occurrences.append(i - j)
            j = lps[j - 1]
        elif i < N and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return occurrences

# Ví dụ sử dụng:
text = "ABABDABACDABABCABAB"
pattern = "ABABCABAB"

found_indices = kmp_search(text, pattern)

if found_indices:
    print(f"Mẫu được tìm thấy tại các chỉ số: {found_indices}")
else:
    print("Không tìm thấy mẫu trong văn bản.")
```
