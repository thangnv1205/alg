
# Sắp xếp theo cơ số (Radix Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp theo cơ số là một thuật toán sắp xếp không dựa trên so sánh. Nó tránh so sánh bằng cách tạo và phân phối các phần tử vào các nhóm dựa trên các chữ số của chúng. Nó hoạt động bằng cách xử lý các số nguyên riêng lẻ theo từng chữ số có cùng giá trị vị trí.

Đối với các số, cơ số (hoặc cơ số) là số lượng chữ số duy nhất, bao gồm cả chữ số 0, được sử dụng để biểu diễn các số nguyên trong một hệ thống số vị trí. Ví dụ, đối với hệ thập phân (hệ cơ số 10), cơ số là 10.

Sắp xếp theo cơ số có thể được áp dụng cho dữ liệu có thể được sắp xếp theo từ điển, chẳng hạn như số nguyên, từ và chuỗi.

## Mã giả (Pseudocode)

```
function radixSort(A) is
    max_val := find maximum value in A
    exp := 1
    while max_val / exp > 0 do
        countingSort(A, exp)
        exp := exp * 10

function countingSort(A, exp) is
    n := length(A)
    output := array of size n
    count := array of size 10, initialized to 0

    for i from 0 to n - 1 do
        index := floor(A[i] / exp)
        count[index mod 10] := count[index mod 10] + 1

    for i from 1 to 9 do
        count[i] := count[i] + count[i - 1]

    i := n - 1
    while i >= 0 do
        index := floor(A[i] / exp)
        output[count[index mod 10] - 1] := A[i]
        count[index mod 10] := count[index mod 10] - 1
        i := i - 1

    for i from 0 to n - 1 do
        A[i] := output[i]
```

## Hướng tiếp cận

1.  **Tìm giá trị lớn nhất:** Tìm phần tử lớn nhất trong mảng để xác định số lượng chữ số (tức là số lần lặp cần thiết).
2.  **Sắp xếp theo từng chữ số:** Bắt đầu từ chữ số có nghĩa nhỏ nhất (LSD) và kết thúc ở chữ số có nghĩa lớn nhất (MSD), sắp xếp mảng dựa trên từng chữ số. Một thuật toán sắp xếp ổn định, chẳng hạn như sắp xếp đếm, được sử dụng để sắp xếp các chữ số ở mỗi vị trí.
    *   **Lần lặp 1 (Chữ số hàng đơn vị):** Sắp xếp toàn bộ mảng dựa trên chữ số hàng đơn vị.
    *   **Lần lặp 2 (Chữ số hàng chục):** Sắp xếp lại mảng dựa trên chữ số hàng chục. Vì chúng ta đang sử dụng một sắp xếp ổn định, thứ tự tương đối của các phần tử có cùng chữ số hàng chục được duy trì từ lần lặp trước.
    *   **Tiếp tục:** Lặp lại quá trình này cho tất cả các chữ số cho đến chữ số có nghĩa lớn nhất.
3.  **Kết quả:** Sau khi sắp xếp theo chữ số có nghĩa lớn nhất, mảng sẽ được sắp xếp hoàn toàn.

## Ứng dụng

*   **Sắp xếp số nguyên:** Rất hiệu quả để sắp xếp các mảng lớn chứa các số nguyên.
*   **Sắp xếp chuỗi:** Có thể được sử dụng để sắp xếp các chuỗi có độ dài bằng nhau.
*   **Tạo hậu tố (Suffix Arrays):** Được sử dụng trong việc xây dựng các mảng hậu tố, một cấu trúc dữ liệu quan trọng trong tin sinh học và xử lý văn bản.
*   **Xử lý song song:** Các bước của sắp xếp theo cơ số (đặc biệt là sắp xếp đếm) có thể được song song hóa hiệu quả.

## Bài toán thực hành (LeetCode)

Sắp xếp cơ số là một thuật toán sắp xếp không dựa trên so sánh, hiệu quả cho các số nguyên. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Radix Sort, việc hiểu nó có thể hữu ích cho các bài toán liên quan đến sắp xếp số nguyên hoặc khi cần hiệu suất cao.

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Có thể triển khai Radix Sort để giải)
*   [164. Maximum Gap](https://leetcode.com/problems/maximum-gap/) (Có thể giải bằng Radix Sort hoặc Bucket Sort)

## Triển khai (Python)

```python
def counting_sort_for_radix(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    max1 = max(arr)
    exp = 1
    while max1 / exp > 0:
        counting_sort_for_radix(arr, exp)
        exp *= 10

# Ví dụ sử dụng:
arr = [ 170, 45, 75, 90, 802, 24, 2, 66]
radix_sort(arr)

print("Mảng đã sắp xếp là:")
for i in range(len(arr)):
    print(arr[i])
```
