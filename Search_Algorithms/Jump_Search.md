
# Tìm kiếm nhảy (Jump Search)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Tìm kiếm nhảy là một thuật toán tìm kiếm cho các mảng đã được sắp xếp. Ý tưởng cơ bản là kiểm tra ít phần tử hơn (so với tìm kiếm tuyến tính) bằng cách "nhảy" về phía trước theo các bước cố định. Nó nằm giữa tìm kiếm tuyến tính (O(n)) và tìm kiếm nhị phân (O(log n)).

Trong tìm kiếm nhảy, chúng ta nhảy về phía trước một số bước nhất định, sau đó thực hiện một tìm kiếm tuyến tính trong một khối nhỏ hơn. Kích thước bước nhảy tối ưu là `√n`, trong đó `n` là kích thước của mảng. Điều này đảm bảo rằng độ phức tạp thời gian là O(√n).

## Mã giả (Pseudocode)

```
function jumpSearch(A, n, T) is
    step := floor(sqrt(n))
    prev := 0
    while A[min(step, n) - 1] < T do
        prev := step
        step := step + floor(sqrt(n))
        if prev >= n then
            return -1
    
    while A[prev] < T do
        prev := prev + 1
        if prev = min(step, n) then
            return -1

    if A[prev] = T then
        return prev

    return -1
```

*   `A`: Mảng đã được sắp xếp
*   `n`: Số lượng phần tử trong `A`
*   `T`: Mục tiêu cần tìm
*   `step`: Kích thước của bước nhảy
*   `prev`: Chỉ số của khối trước đó

## Hướng tiếp cận

1.  **Nhảy về phía trước:** Bắt đầu từ đầu mảng, nhảy về phía trước theo một kích thước bước cố định (`√n`).
2.  **Tìm khối:** Tiếp tục nhảy cho đến khi bạn tìm thấy một khoảng (một khối) mà phần tử mục tiêu có thể nằm trong đó. Điều này xảy ra khi giá trị tại cuối khối hiện tại lớn hơn phần tử mục tiêu.
3.  **Tìm kiếm tuyến tính:** Khi bạn đã xác định được khối, hãy thực hiện một tìm kiếm tuyến tính từ đầu khối đó để tìm phần tử mục tiêu.

## Ứng dụng

*   **Thay thế cho tìm kiếm nhị phân:** Tìm kiếm nhảy có thể hữu ích khi chi phí của việc nhảy lùi (như trong tìm kiếm nhị phân) là đáng kể. Trong một số hệ thống bộ nhớ, việc nhảy về phía trước có thể nhanh hơn.
*   **Các hệ thống mà tìm kiếm nhị phân không khả thi:** Mặc dù hiếm, nhưng có thể có các cấu trúc dữ liệu chỉ cho phép duyệt về phía trước một cách hiệu quả.

Nói chung, tìm kiếm nhị phân hầu như luôn tốt hơn tìm kiếm nhảy. Tuy nhiên, tìm kiếm nhảy là một sự cải tiến thú vị so với tìm kiếm tuyến tính và minh họa một sự cân bằng khác giữa thời gian tìm kiếm và độ phức tạp của thuật toán.

## Bài toán thực hành (LeetCode)

Tìm kiếm nhảy là một thuật toán tìm kiếm trên các mảng đã được sắp xếp, nằm giữa tìm kiếm tuyến tính và tìm kiếm nhị phân. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Tìm kiếm nhảy, việc hiểu nguyên lý của nó có thể giúp bạn trong các bài toán liên quan đến tìm kiếm trên các tập dữ liệu có cấu trúc hoặc khi cần tối ưu hóa số lượng truy cập phần tử. Các bài toán về tìm kiếm nhị phân có thể là nơi tốt để nghĩ về các biến thể tìm kiếm.

*   [704. Binary Search](https://leetcode.com/problems/binary-search/) (Bạn có thể thử giải bằng Jump Search để thực hành)
*   [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/) (Cũng có thể thử áp dụng)

## Triển khai (Python)

```python
import math

def jump_search(arr, x):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0

    while arr[min(step, n)-1] < x:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1

    while arr[prev] < x:
        prev += 1
        if prev == min(step, n):
            return -1

    if arr[prev] == x:
        return prev

    return -1

# Ví dụ sử dụng:
arr = [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 ]
x = 55

# Find the index of 'x' using Jump Search
index = jump_search(arr, x)

# Print the index where 'x' is located
print("Số", x, "ở chỉ số", index)
```
