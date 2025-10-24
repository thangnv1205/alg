
# Dãy con tăng dài nhất (Longest Increasing Subsequence - LIS)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Dãy con tăng dài nhất (LIS) là một bài toán kinh điển trong quy hoạch động. Cho một dãy số, bài toán là tìm một dãy con của dãy đã cho sao cho các phần tử của dãy con được sắp xếp theo thứ tự tăng dần, và dãy con đó có độ dài lớn nhất có thể.

Một dãy con không nhất thiết phải liên tục, tức là các phần tử của nó có thể không liền kề trong dãy gốc, nhưng chúng phải giữ nguyên thứ tự tương đối của chúng.

Ví dụ: Cho dãy `[10, 22, 9, 33, 21, 50, 41, 60, 80]`. Một LIS là `[10, 22, 33, 41, 60, 80]` có độ dài là 6.

## Mã giả (Pseudocode)

```
function LIS(A) is
    n := length(A)
    dp := array of size n, initialized to 1

    for i from 1 to n-1 do
        for j from 0 to i-1 do
            if A[i] > A[j] and dp[i] < dp[j] + 1 then
                dp[i] := dp[j] + 1

    return max(dp)
```

*   `A`: Dãy số đầu vào
*   `n`: Độ dài của dãy
*   `dp[i]`: Độ dài của dãy con tăng dài nhất kết thúc tại `A[i]`

## Hướng tiếp cận

Bài toán LIS có thể được giải quyết bằng quy hoạch động. Chúng ta định nghĩa `dp[i]` là độ dài của dãy con tăng dài nhất kết thúc tại chỉ số `i`.

1.  **Khởi tạo:** Khởi tạo tất cả các giá trị `dp[i]` bằng 1, vì mỗi phần tử tự nó là một dãy con tăng có độ dài 1.
2.  **Lặp qua dãy:** Lặp qua dãy từ phần tử thứ hai (`i` từ 1 đến `n-1`).
3.  **So sánh với các phần tử trước:** Đối với mỗi phần tử `A[i]`, lặp qua tất cả các phần tử `A[j]` trước nó (`j` từ 0 đến `i-1`).
4.  **Cập nhật `dp[i]`:** Nếu `A[i]` lớn hơn `A[j]`, điều đó có nghĩa là `A[i]` có thể mở rộng dãy con tăng kết thúc tại `A[j]`. Do đó, chúng ta có thể cập nhật `dp[i]` thành `max(dp[i], dp[j] + 1)`.
5.  **Kết quả:** Sau khi lặp qua tất cả các phần tử, giá trị lớn nhất trong mảng `dp` sẽ là độ dài của LIS.

## Ứng dụng

*   **Tin sinh học:** Phân tích trình tự DNA và protein.
*   **Phân tích dữ liệu:** Tìm kiếm các xu hướng hoặc mẫu trong dữ liệu.
*   **Tối ưu hóa:** Trong các bài toán tối ưu hóa khác nhau nơi cần tìm một chuỗi tăng dần.

## Bài toán thực hành (LeetCode)

Bài toán dãy con tăng dài nhất (LIS) là một bài toán kinh điển của quy hoạch động. Có nhiều biến thể và cách giải khác nhau, bao gồm cả giải pháp O(n log n).

*   [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
*   [354. Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/) (Biến thể của LIS)

## Triển khai (Python)

```python
def longest_increasing_subsequence(arr):
    n = len(arr)
    # dp[i] lưu trữ độ dài của LIS kết thúc tại arr[i]
    dp = [1] * n

    # Tính toán các giá trị dp từ trái sang phải
    for i in range(1, n):
        for j in range(i):
            if arr[i] > arr[j] and dp[i] < dp[j] + 1:
                dp[i] = dp[j] + 1

    # Độ dài LIS là giá trị lớn nhất trong mảng dp
    return max(dp)

# Ví dụ sử dụng:
arr = [10, 22, 9, 33, 21, 50, 41, 60, 80]
print("Độ dài của dãy con tăng dài nhất là", longest_increasing_subsequence(arr))
```
