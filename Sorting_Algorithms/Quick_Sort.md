
# Sắp xếp nhanh (Quick Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp nhanh là một thuật toán sắp xếp chia để trị hiệu quả, tại chỗ. Nó có thể nhanh hơn đáng kể trong thực tế so với sắp xếp trộn và sắp xếp vun đống. Tuy nhiên, nó không phải là một thuật toán sắp xếp ổn định.

Thuật toán hoạt động bằng cách chọn một phần tử 'pivot' từ mảng và phân vùng các phần tử khác thành hai mảng con, tùy thuộc vào việc chúng nhỏ hơn hay lớn hơn pivot. Các mảng con sau đó được sắp xếp đệ quy.

## Mã giả (Pseudocode)

Có nhiều lược đồ phân vùng khác nhau. Lược đồ phân vùng Lomuto phổ biến được hiển thị bên dưới.

```
function quicksort(A, lo, hi) is
    if lo < hi then
        p := partition(A, lo, hi)
        quicksort(A, lo, p - 1)
        quicksort(A, p + 1, hi)

function partition(A, lo, hi) is
    pivot := A[hi]
    i := lo
    for j from lo to hi - 1 do
        if A[j] < pivot then
            swap A[i] with A[j]
            i := i + 1
    swap A[i] with A[hi]
    return i
```

*   `A`: Mảng
*   `lo`: Chỉ số bắt đầu
*   `hi`: Chỉ số kết thúc
*   `p`: Chỉ số phân vùng
*   `pivot`: Phần tử được chọn làm pivot

## Hướng tiếp cận

Giống như sắp xếp trộn, sắp xếp nhanh tuân theo mô hình **Chia để trị**:

1.  **Chia (Divide):** Chọn một phần tử trong mảng làm **pivot**. Sắp xếp lại mảng sao cho tất cả các phần tử nhỏ hơn pivot đều ở trước nó, và tất cả các phần tử lớn hơn pivot đều ở sau nó. Sau khi phân vùng, pivot ở đúng vị trí cuối cùng của nó. Thao tác này được gọi là **phân vùng**.
2.  **Trị (Conquer):** Sắp xếp đệ quy hai mảng con được tạo bởi bước phân vùng (một mảng con chứa các phần tử nhỏ hơn pivot và mảng con kia chứa các phần tử lớn hơn).
3.  **Kết hợp (Combine):** Vì các mảng con được sắp xếp tại chỗ, không cần thực hiện công việc gì để kết hợp chúng. Toàn bộ mảng trở nên được sắp xếp khi tất cả các mảng con được sắp xếp.

Sự lựa chọn của pivot là rất quan trọng đối với hiệu suất của sắp xếp nhanh. Một lựa chọn pivot kém có thể dẫn đến hiệu suất O(n^2).

## Ứng dụng

*   **Thuật toán sắp xếp mục đích chung:** Do hiệu suất trung bình nhanh (O(n log n)) và sắp xếp tại chỗ, nó là một trong những thuật toán sắp xếp được sử dụng rộng rãi nhất.
*   **Tìm phần tử lớn thứ k:** Một biến thể của sắp xếp nhanh, được gọi là Quickselect, có thể được sử dụng để tìm phần tử lớn thứ k trong một danh sách trong thời gian O(n) trung bình.
*   **Thư viện thương mại:** Nhiều thư viện hệ thống sử dụng nó làm thuật toán sắp xếp mặc định.

## Bài toán thực hành (LeetCode)

Sắp xếp nhanh là một thuật toán sắp xếp hiệu quả, đặc biệt trong thực tế. Nó cũng là cơ sở cho thuật toán Quickselect để tìm phần tử thứ k.

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Triển khai Quick Sort)
*   [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (Sử dụng Quickselect)
*   [75. Sort Colors](https://leetcode.com/problems/sort-colors/) (Có thể giải bằng phân vùng tương tự Quick Sort)

## Triển khai (Python)

```python
def partition(arr, low, high):
    i = (low-1)
    pivot = arr[high]

    for j in range(low, high):
        if arr[j] <= pivot:
            i = i+1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i+1], arr[high] = arr[high], arr[i+1]
    return (i+1)

def quick_sort(arr, low, high):
    if len(arr) == 1:
        return arr
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi-1)
        quick_sort(arr, pi+1, high)

# Ví dụ sử dụng:
arr = [10, 7, 8, 9, 1, 5]
n = len(arr)
quick_sort(arr, 0, n-1)
print ("Mảng đã sắp xếp là:")
for i in range(n):
    print("%d" %arr[i]),
```
