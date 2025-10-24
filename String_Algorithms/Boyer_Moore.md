
# Thuật toán Boyer-Moore

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Boyer-Moore là một thuật toán tìm kiếm chuỗi hiệu quả. Nó được phát triển bởi Robert S. Boyer và J Strother Moore vào năm 1977. Thuật toán này thường được coi là thuật toán tìm kiếm chuỗi tiêu chuẩn thực tế trong nhiều ứng dụng, vì nó thường nhanh hơn đáng kể so với các thuật toán khác như KMP hoặc tìm kiếm ngây thơ.

Điểm khác biệt chính của Boyer-Moore là nó bắt đầu so sánh mẫu với văn bản từ **cuối mẫu** thay vì đầu mẫu. Khi có sự không khớp, nó sử dụng hai heuristic để quyết định lượng dịch chuyển tối đa có thể có của mẫu:

1.  **Heuristic ký tự xấu (Bad Character Heuristic):** Dịch chuyển mẫu dựa trên ký tự không khớp trong văn bản.
2.  **Heuristic hậu tố tốt (Good Suffix Heuristic):** Dịch chuyển mẫu dựa trên phần hậu tố của mẫu đã khớp.

## Mã giả (Pseudocode)

```
function BoyerMooreSearch(text, pattern) is
    N := length(text)
    M := length(pattern)

    bad_char_table := preprocess_bad_character(pattern, M)
    // good_suffix_table := preprocess_good_suffix(pattern, M) // Thường phức tạp hơn

    s := 0 // s là chỉ số dịch chuyển của pattern đối với text
    occurrences := empty list

    while s <= N - M do
        j := M - 1

        // Giữ j giảm dần trong khi các ký tự của pattern và text khớp nhau
        // tại vị trí dịch chuyển hiện tại s
        while j >= 0 and pattern[j] = text[s + j] do
            j := j - 1

        // Nếu pattern được tìm thấy tại vị trí dịch chuyển hiện tại
        // (tức là j trở thành -1)
        if j < 0 then
            add s to occurrences
            // Dịch chuyển pattern bằng cách sử dụng heuristic ký tự xấu
            // hoặc heuristic hậu tố tốt (tùy thuộc vào triển khai)
            s := s + (M - bad_char_table[text[s + M]] if s + M < N else 1)
        else
            // Dịch chuyển pattern bằng cách sử dụng heuristic ký tự xấu
            // và/hoặc heuristic hậu tố tốt
            s := s + max(1, j - bad_char_table[text[s + j]])

    return occurrences
```

## Hướng tiếp cận

Thuật toán Boyer-Moore sử dụng hai heuristic để tối ưu hóa việc dịch chuyển mẫu:

1.  **Heuristic ký tự xấu (Bad Character Heuristic):**
    *   Khi có sự không khớp giữa `pattern[j]` và `text[s + j]`, thuật toán tìm kiếm `text[s + j]` trong `pattern`.
    *   Nếu `text[s + j]` xuất hiện trong `pattern`, mẫu được dịch chuyển sao cho lần xuất hiện cuối cùng của `text[s + j]` trong `pattern` thẳng hàng với `text[s + j]`.
    *   Nếu `text[s + j]` không xuất hiện trong `pattern`, mẫu được dịch chuyển hoàn toàn qua `text[s + j]`.

2.  **Heuristic hậu tố tốt (Good Suffix Heuristic):**
    *   Khi có sự không khớp, và một hậu tố của mẫu đã khớp với một phần của văn bản, heuristic này tìm kiếm một lần xuất hiện khác của hậu tố đó trong mẫu.
    *   Nếu tìm thấy, mẫu được dịch chuyển để hậu tố đó thẳng hàng. Nếu không, mẫu được dịch chuyển đến vị trí tiếp theo có thể có.

Thuật toán kết hợp cả hai heuristic này và chọn dịch chuyển lớn nhất để đảm bảo không bỏ lỡ bất kỳ sự khớp nào.

## Ứng dụng

*   **Trình soạn thảo văn bản:** Được sử dụng trong các chức năng tìm kiếm và thay thế.
*   **Công cụ tìm kiếm:** Trong các công cụ tìm kiếm văn bản để tìm các từ khóa hoặc cụm từ.
*   **Phân tích mã nguồn:** Tìm kiếm các chuỗi cụ thể trong mã nguồn.

## Bài toán thực hành (LeetCode)

Thuật toán Boyer-Moore là một trong những thuật toán tìm kiếm chuỗi hiệu quả nhất trong thực tế. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Boyer-Moore, việc hiểu các heuristic của nó có thể hữu ích cho các bài toán tìm kiếm mẫu hoặc xử lý chuỗi.

*   [28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) (Có thể giải bằng Boyer-Moore)
*   [686. Repeated String Match](https://leetcode.com/problems/repeated-string-match/) (Có thể áp dụng các kỹ thuật tìm kiếm chuỗi)

## Triển khai (Python)

```python
NO_OF_CHARS = 256

def bad_char_heuristic(string, size):
    """Tiền xử lý heuristic ký tự xấu."""
    bad_char = [-1] * NO_OF_CHARS
    for i in range(size):
        bad_char[ord(string[i])] = i
    return bad_char

def boyer_moore_search(text, pattern):
    M = len(pattern)
    N = len(text)

    bad_char = bad_char_heuristic(pattern, M)

    s = 0 # s là chỉ số dịch chuyển của pattern đối với text
    occurrences = []
    while s <= N - M:
        j = M - 1

        # Giữ j giảm dần trong khi các ký tự của pattern và text khớp nhau
        # tại vị trí dịch chuyển hiện tại s
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1

        # Nếu pattern được tìm thấy tại vị trí dịch chuyển hiện tại
        # (tức là j trở thành -1)
        if j < 0:
            occurrences.append(s)
            # Dịch chuyển pattern để ký tự tiếp theo trong text
            # khớp với tiền tố dài nhất của pattern
            # Nếu pattern là cuối cùng trong text, thì s + M sẽ là N
            s += (M - bad_char[ord(text[s + M])] if s + M < N else 1)
        else:
            # Dịch chuyển pattern để ký tự không khớp trong text
            # khớp với lần xuất hiện cuối cùng của nó trong pattern.
            # Hàm max được sử dụng để đảm bảo dịch chuyển dương
            s += max(1, j - bad_char[ord(text[s + j])])
    return occurrences

# Ví dụ sử dụng:
text = "ABAAABCD"
pattern = "ABC"

found_indices = boyer_moore_search(text, pattern)

if found_indices:
    print(f"Mẫu được tìm thấy tại các chỉ số: {found_indices}")
else:
    print("Không tìm thấy mẫu trong văn bản.")
```
