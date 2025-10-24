
# Thuật toán Z (Z Algorithm)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Z là một thuật toán tìm kiếm chuỗi hiệu quả, tìm tất cả các lần xuất hiện của một mẫu `P` trong một văn bản `T` trong thời gian tuyến tính. Nó hoạt động bằng cách xây dựng một "mảng Z" (Z-array) cho chuỗi kết hợp `P + $ + T`, trong đó `$` là một ký tự không xuất hiện trong `P` hoặc `T`.

Mảng Z, đối với một chuỗi `S` có độ dài `n`, là một mảng `Z` có độ dài `n` trong đó `Z[i]` là độ dài của tiền tố dài nhất của `S` mà cũng là một chuỗi con bắt đầu tại `i`. Nói cách khác, `Z[i]` là độ dài của chuỗi con dài nhất bắt đầu tại `S[i]` mà cũng là tiền tố của `S`.

Khi `Z[i]` bằng độ dài của mẫu `P`, điều đó có nghĩa là một lần xuất hiện của `P` đã được tìm thấy trong `T`.

## Mã giả (Pseudocode)

### Hàm `calculate_z_array`

```
function calculate_z_array(S) is
    n := length(S)
    Z := array of size n, initialized to 0
    L, R := 0, 0

    for i from 1 to n-1 do
        if i > R then
            L, R := i, i
            while R < n and S[R - L] = S[R] do
                R := R + 1
            Z[i] := R - L
            R := R - 1
        else
            k := i - L
            if Z[k] < R - i + 1 then
                Z[i] := Z[k]
            else
                L, R := i, R
                while R < n and S[R - L] = S[R] do
                    R := R + 1
                Z[i] := R - L
                R := R - 1
    return Z
```

### Hàm `z_algorithm_search`

```
function z_algorithm_search(text, pattern) is
    concat := pattern + "$" + text
    z_array := calculate_z_array(concat)

    occurrences := empty list
    for i from 0 to length(z_array) - 1 do
        if z_array[i] = length(pattern) then
            add (i - length(pattern) - 1) to occurrences
    return occurrences
```

## Hướng tiếp cận

1.  **Xây dựng chuỗi kết hợp:** Nối mẫu `P` với một ký tự phân tách độc đáo (ví dụ: `$`) và sau đó là văn bản `T`. `S = P + $ + T`.
2.  **Tính toán mảng Z:** Tính toán mảng Z cho chuỗi `S` này.
3.  **Tìm kiếm khớp:** Lặp qua mảng Z. Bất cứ khi nào `Z[i]` bằng độ dài của mẫu `P`, điều đó có nghĩa là một lần xuất hiện của `P` đã được tìm thấy trong `T` tại vị trí `i - length(P) - 1`.

Việc tính toán mảng Z là phần cốt lõi của thuật toán. Nó sử dụng một cửa sổ `[L, R]` để tối ưu hóa việc tính toán `Z[i]`. Nếu `i` nằm trong cửa sổ `[L, R]`, chúng ta có thể sử dụng thông tin từ các giá trị Z trước đó để tính toán `Z[i]` nhanh hơn.

## Ứng dụng

*   **Tìm kiếm chuỗi:** Tìm tất cả các lần xuất hiện của một mẫu trong một văn bản.
*   **Tìm kiếm mẫu lặp lại:** Tìm các chuỗi con lặp lại trong một chuỗi.
*   **Nén dữ liệu:** Là một phần của một số thuật toán nén dữ liệu.
*   **Tin sinh học:** Phân tích trình tự DNA và protein.

## Bài toán thực hành (LeetCode)

Thuật toán Z là một thuật toán tìm kiếm chuỗi hiệu quả trong thời gian tuyến tính. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Z Algorithm, việc hiểu nguyên lý của nó có thể hữu ích cho các bài toán tìm kiếm mẫu hoặc xử lý chuỗi.

*   [28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) (Có thể giải bằng Z Algorithm)
*   [214. Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/) (Có thể giải bằng Z Algorithm)

## Triển khai (Python)

```python
def calculate_z_array(s):
    n = len(s)
    z = [0] * n
    L, R = 0, 0

    for i in range(1, n):
        if i > R:
            L, R = i, i
            while R < n and s[R - L] == s[R]:
                R += 1
            z[i] = R - L
            R -= 1
        else:
            k = i - L
            if z[k] < R - i + 1:
                z[i] = z[k]
            else:
                L, R = i, R
                while R < n and s[R - L] == s[R]:
                    R += 1
                z[i] = R - L
                R -= 1
    return z

def z_algorithm_search(text, pattern):
    concat = pattern + "$" + text
    z = calculate_z_array(concat)

    occurrences = []
    for i in range(len(z)):
        if z[i] == len(pattern):
            occurrences.append(i - len(pattern) - 1)
    return occurrences

# Ví dụ sử dụng:
text = "GEEKS FOR GEEKS"
pattern = "GEEK"

found_indices = z_algorithm_search(text, pattern)

if found_indices:
    print(f"Mẫu được tìm thấy tại các chỉ số: {found_indices}")
else:
    print("Không tìm thấy mẫu trong văn bản.")
```
