
# Chỉnh sửa khoảng cách (Edit Distance)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Chỉnh sửa khoảng cách, còn được gọi là khoảng cách Levenshtein, là một số liệu để định lượng sự khác biệt giữa hai chuỗi. Nó được định nghĩa là số lượng thao tác tối thiểu cần thiết để biến đổi một chuỗi thành chuỗi kia. Các thao tác được phép là:

*   **Chèn:** Thêm một ký tự.
*   **Xóa:** Xóa một ký tự.
*   **Thay thế:** Thay đổi một ký tự thành một ký tự khác.

Ví dụ, khoảng cách chỉnh sửa giữa "kitten" và "sitting" là 3:
1.  `k`itten -> `s`itten (thay thế 'k' bằng 's')
2.  sitt`e`n -> sitt`i`n (thay thế 'e' bằng 'i')
3.  sittin -> sittin`g` (chèn 'g')

## Mã giả (Pseudocode)

```
function LevenshteinDistance(str1, str2) is
    len1 := length(str1)
    len2 := length(str2)
    dp := 2D array of size (len1+1) x (len2+1)

    for i from 0 to len1 do
        dp[i][0] := i
    for j from 0 to len2 do
        dp[0][j] := j

    for i from 1 to len1 do
        for j from 1 to len2 do
            cost := 0
            if str1[i-1] != str2[j-1] then
                cost := 1
            dp[i][j] := min(
                dp[i-1][j] + 1,       // Xóa
                dp[i][j-1] + 1,       // Chèn
                dp[i-1][j-1] + cost   // Thay thế
            )

    return dp[len1][len2]
```

## Hướng tiếp cận

Bài toán chỉnh sửa khoảng cách là một bài toán quy hoạch động cổ điển. Chúng ta xây dựng một ma trận `dp` trong đó `dp[i][j]` đại diện cho khoảng cách chỉnh sửa giữa tiền tố `str1[0...i-1]` và `str2[0...j-1]`.

1.  **Khởi tạo:**
    *   Hàng đầu tiên của ma trận `dp` được khởi tạo từ 0 đến `len2`, vì để biến đổi một chuỗi rỗng thành một chuỗi có độ dài `j`, chúng ta cần `j` thao tác chèn.
    *   Cột đầu tiên của ma trận `dp` được khởi tạo từ 0 đến `len1`, vì để biến đổi một chuỗi có độ dài `i` thành một chuỗi rỗng, chúng ta cần `i` thao tác xóa.

2.  **Điền bảng:** Lặp qua ma trận `dp` từ `i = 1` đến `len1` và `j = 1` đến `len2`.
    *   **Nếu `str1[i-1]` bằng `str2[j-1]`:** Các ký tự cuối cùng khớp nhau, vì vậy không cần thao tác nào. `dp[i][j]` sẽ bằng `dp[i-1][j-1]`.
    *   **Nếu `str1[i-1]` khác `str2[j-1]`:** Chúng ta phải thực hiện một trong ba thao tác:
        *   **Chèn:** `dp[i][j-1] + 1` (chèn một ký tự vào `str1` để khớp với `str2[j-1]`).
        *   **Xóa:** `dp[i-1][j] + 1` (xóa `str1[i-1]`).
        *   **Thay thế:** `dp[i-1][j-1] + 1` (thay thế `str1[i-1]` bằng `str2[j-1]`).
        Chúng ta chọn giá trị nhỏ nhất trong ba lựa chọn này.

3.  **Kết quả:** Giá trị ở `dp[len1][len2]` sẽ là khoảng cách chỉnh sửa tối thiểu giữa `str1` và `str2`.

## Ứng dụng

*   **Kiểm tra chính tả:** Để đề xuất các từ có thể đúng khi người dùng gõ sai.
*   **So sánh chuỗi DNA:** Trong tin sinh học, để đo lường sự tương đồng giữa các chuỗi DNA hoặc protein.
*   **Phát hiện đạo văn:** Để tìm kiếm sự tương đồng giữa các tài liệu văn bản.
*   **Xử lý ngôn ngữ tự nhiên:** Trong các tác vụ như dịch máy và nhận dạng giọng nói.

## Bài toán thực hành (LeetCode)

Bài toán chỉnh sửa khoảng cách là một bài toán quy hoạch động cổ điển với nhiều ứng dụng trong xử lý chuỗi và tin sinh học.

*   [72. Edit Distance](https://leetcode.com/problems/edit-distance/)
*   [583. Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/) (Biến thể của Edit Distance)
*   [1092. Shortest Common Supersequence](https://leetcode.com/problems/shortest-common-supersequence/) (Liên quan đến Edit Distance)

## Triển khai (Python)

```python
def edit_distance(str1, str2):
    m = len(str1)
    n = len(str2)

    # Tạo một bảng để lưu trữ kết quả của các bài toán con
    dp = [[0 for x in range(n + 1)] for x in range(m + 1)]

    # Điền bảng dp theo cách từ dưới lên
    for i in range(m + 1):
        for j in range(n + 1):

            # Nếu chuỗi đầu tiên trống, chỉ có một cách để chuyển đổi chuỗi thứ hai
            # (chèn tất cả các ký tự của chuỗi thứ hai)
            if i == 0:
                dp[i][j] = j    # Min. operations = j

            # Nếu chuỗi thứ hai trống, chỉ có một cách để chuyển đổi chuỗi đầu tiên
            # (xóa tất cả các ký tự của chuỗi đầu tiên)
            elif j == 0:
                dp[i][j] = i    # Min. operations = i

            # Nếu các ký tự cuối cùng giống nhau, bỏ qua chúng và kiểm tra phần còn lại
            elif str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1]

            # Nếu các ký tự cuối cùng khác nhau, hãy xem xét tất cả ba thao tác:
            # chèn, xóa, thay thế
            else:
                dp[i][j] = 1 + min(dp[i][j-1],        # Chèn
                                   dp[i-1][j],        # Xóa
                                   dp[i-1][j-1])    # Thay thế

    return dp[m][n]

# Ví dụ sử dụng:
str1 = "kitten"
str2 = "sitting"
print("Khoảng cách chỉnh sửa giữa", str1, "và", str2, "là", edit_distance(str1, str2))
```
