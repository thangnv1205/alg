
# Tìm kiếm nhị phân (Binary Search)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Tìm kiếm nhị phân là một thuật toán tìm kiếm hiệu quả để tìm một phần tử trong một **danh sách đã được sắp xếp**. Nó hoạt động bằng cách liên tục chia đôi phần danh sách có thể chứa mục tiêu và thu hẹp các vị trí có thể có của mục tiêu.

Ý tưởng cốt lõi là so sánh phần tử mục tiêu với phần tử ở giữa danh sách. Nếu chúng bằng nhau, chúng ta đã tìm thấy mục tiêu. Nếu mục tiêu nhỏ hơn, chúng ta biết rằng nó chỉ có thể nằm ở nửa bên trái của danh sách. Ngược lại, nếu mục tiêu lớn hơn, nó chỉ có thể nằm ở nửa bên phải. Bằng cách lặp lại quá trình này, chúng ta loại bỏ một nửa không gian tìm kiếm sau mỗi lần so sánh, giúp thuật toán rất nhanh.

## Mã giả (Pseudocode)

```
function binary_search(A, n, T) is
    L := 0
    R := n - 1
    while L <= R do
        m := floor((L + R) / 2)
        if A[m] < T then
            L := m + 1
        else if A[m] > T then
            R := m - 1
        else:
            return m
    return unsuccessful
```

*   `A`: Mảng đã được sắp xếp
*   `n`: Số lượng phần tử trong `A`
*   `T`: Mục tiêu cần tìm
*   `L`: Chỉ số bên trái của không gian tìm kiếm
*   `R`: Chỉ số bên phải của không gian tìm kiếm
*   `m`: Chỉ số ở giữa

## Hướng tiếp cận

1.  **Khởi tạo:** Bắt đầu với một không gian tìm kiếm bao gồm toàn bộ danh sách (từ chỉ số đầu tiên đến chỉ số cuối cùng).
2.  **Tìm điểm giữa:** Tính chỉ số ở giữa của không gian tìm kiếm hiện tại.
3.  **So sánh:** So sánh phần tử ở điểm giữa với giá trị mục tiêu.
    *   **Tìm thấy:** Nếu chúng bằng nhau, quá trình tìm kiếm kết thúc thành công.
    *   **Mục tiêu nhỏ hơn:** Nếu mục tiêu nhỏ hơn phần tử ở giữa, điều này có nghĩa là mục tiêu (nếu có) phải nằm ở nửa bên trái của không gian tìm kiếm. Cập nhật không gian tìm kiếm để chỉ bao gồm nửa bên trái.
    *   **Mục tiêu lớn hơn:** Nếu mục tiêu lớn hơn phần tử ở giữa, nó phải nằm ở nửa bên phải. Cập nhật không gian tìm kiếm để chỉ bao gồm nửa bên phải.
4.  **Lặp lại:** Lặp lại các bước 2-3 trên không gian tìm kiếm bị thu hẹp cho đến khi tìm thấy mục tiêu hoặc không gian tìm kiếm trống (có nghĩa là mục tiêu không có trong danh sách).

## Ứng dụng

*   **Tìm kiếm trong cơ sở dữ liệu:** Rất hiệu quả để tìm kiếm các bản ghi trong các chỉ mục cơ sở dữ liệu đã được sắp xếp.
*   **Gỡ lỗi:** Tìm kiếm một commit gây ra lỗi trong lịch sử phiên bản (ví dụ: `git bisect`).
*   **Tìm gốc của phương trình:** Được sử dụng trong các phương pháp số để tìm nghiệm của phương trình trong một khoảng nhất định.
*   **Tra cứu trong từ điển:** Tìm một từ trong từ điển (mặc dù con người thường sử dụng một biến thể trực quan hơn).
*   **Bất kỳ ứng dụng nào yêu cầu tìm kiếm nhanh trên một tập dữ liệu lớn, đã được sắp xếp.**

## Bài toán thực hành (LeetCode)

*   [704. Binary Search](https://leetcode.com/problems/binary-search/)
*   [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
*   [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

## Triển khai (Python)

```python
def binary_search(arr, low, high, x):
    if high >= low:
        mid = (high + low) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] > x:
            return binary_search(arr, low, mid - 1, x)
        else:
            return binary_search(arr, mid + 1, high, x)
    else:
        return -1

# Ví dụ sử dụng:
arr = [ 2, 3, 4, 10, 40 ]
x = 10

# Function call
result = binary_search(arr, 0, len(arr)-1, x)

if result != -1:
    print("Phần tử có mặt tại chỉ số", str(result))
else:
    print("Phần tử không có trong mảng")
```
