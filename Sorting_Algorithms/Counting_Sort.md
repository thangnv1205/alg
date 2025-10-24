
# Sắp xếp đếm (Counting Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp đếm là một thuật toán sắp xếp số nguyên hoạt động bằng cách đếm số lần xuất hiện của mỗi giá trị duy nhất trong mảng đầu vào. Sau đó, nó sử dụng các số đếm này để tính toán vị trí của mỗi giá trị trong mảng đầu ra.

Nó là một thuật toán sắp xếp không dựa trên so sánh và có độ phức tạp thời gian tuyến tính O(n + k), trong đó n là số phần tử và k là phạm vi của các giá trị đầu vào. Do đó, nó cực kỳ hiệu quả nhưng bị giới hạn ở các tình huống mà phạm vi của các giá trị đầu vào không lớn hơn đáng kể so với số lượng phần tử.

## Mã giả (Pseudocode)

```
function countingSort(A, k) is
    n := length(A)
    count := array of size k+1, initialized to 0
    output := array of size n

    // Đếm số lần xuất hiện của mỗi phần tử
    for i from 0 to n-1 do
        count[A[i]] := count[A[i]] + 1

    // Sửa đổi mảng đếm để lưu trữ tổng tích lũy
    for i from 1 to k do
        count[i] := count[i] + count[i-1]

    // Xây dựng mảng đầu ra
    for i from n-1 down to 0 do
        output[count[A[i]] - 1] := A[i]
        count[A[i]] := count[A[i]] - 1

    return output
```

*   `A`: Mảng đầu vào
*   `k`: Giá trị lớn nhất trong mảng `A`
*   `count`: Mảng để lưu trữ số đếm của các phần tử
*   `output`: Mảng đã sắp xếp

## Hướng tiếp cận

1.  **Tìm phạm vi:** Xác định giá trị lớn nhất (`k`) trong mảng đầu vào để biết kích thước của mảng `count` cần thiết.
2.  **Khởi tạo mảng đếm:** Tạo một mảng `count` có kích thước `k+1` và khởi tạo tất cả các giá trị của nó thành 0.
3.  **Lưu trữ số đếm:** Lặp qua mảng đầu vào và đối với mỗi phần tử, tăng số đếm tương ứng trong mảng `count`.
4.  **Sửa đổi mảng đếm:** Sửa đổi mảng `count` bằng cách lưu trữ tổng của các số đếm trước đó. Sau bước này, giá trị tại mỗi chỉ số trong `count` biểu thị vị trí (cụ thể là vị trí cuối cùng) của phần tử đó trong mảng đầu ra.
5.  **Xây dựng mảng đầu ra:** Lặp ngược qua mảng đầu vào. Đối với mỗi phần tử, đặt nó vào vị trí được chỉ định bởi mảng `count`, sau đó giảm số đếm cho phần tử đó. Lặp ngược đảm bảo tính ổn định của thuật toán.

## Ứng dụng

*   **Khi phạm vi của các khóa nhỏ:** Rất hiệu quả khi phạm vi của các số nguyên đầu vào (k) không lớn hơn đáng kể so với số lượng phần tử (n).
*   **Làm thuật toán con:** Được sử dụng làm thuật toán con trong các thuật toán sắp xếp khác, chẳng hạn như sắp xếp theo cơ số.
*   **Đếm tần suất:** Có thể được điều chỉnh để đếm tần suất của các phần tử trong một mảng.

## Bài toán thực hành (LeetCode)

Sắp xếp đếm là một thuật toán sắp xếp hiệu quả cho các số nguyên trong một phạm vi nhỏ. Nó thường được sử dụng khi phạm vi giá trị (k) không lớn hơn đáng kể so với số lượng phần tử (n).

*   [75. Sort Colors](https://leetcode.com/problems/sort-colors/) (Một bài toán kinh điển có thể giải bằng Counting Sort)
*   [274. H-Index](https://leetcode.com/problems/h-index/) (Có thể sử dụng ý tưởng Counting Sort để tối ưu)

## Triển khai (Python)

```python
def counting_sort(arr):
    max_val = max(arr)
    min_val = min(arr)
    range_of_elements = max_val - min_val + 1
    count = [0] * range_of_elements
    output = [0] * len(arr)

    for i in range(len(arr)):
        count[arr[i] - min_val] += 1

    for i in range(1, len(count)):
        count[i] += count[i - 1]

    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1

    for i in range(len(arr)):
        arr[i] = output[i]

    return arr

# Ví dụ sử dụng:
arr = [4, 2, 2, 8, 3, 3, 1]
counting_sort(arr)
print("Mảng đã sắp xếp là:", arr)
```
