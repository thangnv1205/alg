
# Sắp xếp trộn (Merge Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp trộn là một thuật toán sắp xếp hiệu quả, dựa trên so sánh, ổn định. Hầu hết các triển khai đều tạo ra một sắp xếp ổn định, có nghĩa là thứ tự của các phần tử bằng nhau là giống nhau trong đầu vào và đầu ra.

Sắp xếp trộn là một thuật toán chia để trị. Về mặt khái niệm, một thuật toán sắp xếp trộn hoạt động như sau:

1.  Chia danh sách chưa được sắp xếp thành n danh sách con, mỗi danh sách chứa một phần tử (một danh sách có một phần tử được coi là đã được sắp xếp).
2.  Lặp lại việc trộn các danh sách con để tạo ra các danh sách con mới đã được sắp xếp cho đến khi chỉ còn lại một danh sách con. Đây sẽ là danh sách đã được sắp xếp.

## Mã giả (Pseudocode)

```
function mergeSort(A, n) is
    if n < 2 then
        return
    mid := n / 2
    L := array of size mid
    R := array of size n - mid
    for i from 0 to mid - 1 do
        L[i] := A[i]
    for i from mid to n - 1 do
        R[i - mid] := A[i]
    mergeSort(L, mid)
    mergeSort(R, n - mid)
    merge(A, L, mid, R, n - mid)

function merge(A, L, leftCount, R, rightCount) is
    i := 0, j := 0, k := 0
    while i < leftCount and j < rightCount do
        if L[i] <= R[j] then
            A[k] := L[i]
            i := i + 1
        else
            A[k] := R[j]
            j := j + 1
        end if
        k := k + 1
    while i < leftCount do
        A[k] := L[i]
        i := i + 1
        k := k + 1
    while j < rightCount do
        A[k] := R[j]
        j := j + 1
        k := k + 1
```

## Hướng tiếp cận

Sắp xếp trộn dựa trên mô hình **Chia để trị**:

1.  **Chia (Divide):** Chia mảng `n` phần tử thành hai mảng con có kích thước `n/2`. Nếu mảng con chỉ có một phần tử, nó đã được sắp xếp.
2.  **Trị (Conquer):** Sắp xếp đệ quy hai mảng con bằng cách gọi lại hàm sắp xếp trộn.
3.  **Kết hợp (Combine):** Trộn hai mảng con đã được sắp xếp để tạo ra một mảng duy nhất đã được sắp xếp. Thao tác này được thực hiện bởi một hàm `merge` riêng biệt, hàm này lấy hai mảng con đã được sắp xếp và kết hợp chúng.

Quá trình đệ quy tiếp tục cho đến khi các mảng con có kích thước là 1. Sau đó, các mảng con này được trộn lại với nhau để tạo ra các mảng đã được sắp xếp lớn hơn cho đến khi toàn bộ mảng được sắp xếp.

## Ứng dụng

*   **Sắp xếp các tập dữ liệu lớn:** Sắp xếp trộn là một lựa chọn tốt để sắp xếp các danh sách lớn do độ phức tạp thời gian O(n log n) được đảm bảo của nó.
*   **Sắp xếp ngoài:** Nó rất hữu ích cho việc sắp xếp các tệp quá lớn để vừa trong bộ nhớ. Dữ liệu có thể được đọc từ đĩa, được sắp xếp thành các đoạn nhỏ và sau đó các đoạn đã được sắp xếp được trộn lại với nhau.
*   **Sắp xếp ổn định:** Khi thứ tự của các phần tử bằng nhau cần được duy trì, sắp xếp trộn là một lựa chọn tốt.
*   **Đảo ngược:** Được sử dụng để đếm số lần đảo ngược trong một mảng.

## Bài toán thực hành (LeetCode)

Sắp xếp trộn là một thuật toán sắp xếp hiệu quả và ổn định, thường được sử dụng trong các bài toán yêu cầu độ phức tạp thời gian O(n log n) được đảm bảo. Nó cũng là nền tảng cho nhiều thuật toán "chia để trị" khác.

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Triển khai Merge Sort)
*   [315. Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (Sử dụng biến thể của Merge Sort)
*   [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) (Áp dụng nguyên lý trộn)

## Triển khai (Python)

```python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

# Ví dụ sử dụng:
arr = [12, 11, 13, 5, 6, 7]
merge_sort(arr)
print("Mảng đã sắp xếp là:")
for i in range(len(arr)):
    print("%d" %arr[i])
```
