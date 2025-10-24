
# Sắp xếp nhanh ngẫu nhiên (Randomized Quick Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp nhanh ngẫu nhiên là một biến thể của thuật toán sắp xếp nhanh tiêu chuẩn. Trong sắp xếp nhanh tiêu chuẩn, việc lựa chọn phần tử pivot có thể ảnh hưởng đáng kể đến hiệu suất của thuật toán. Nếu pivot luôn được chọn một cách kém hiệu quả (ví dụ: luôn là phần tử nhỏ nhất hoặc lớn nhất), sắp xếp nhanh có thể suy biến thành độ phức tạp thời gian O(n^2).

Sắp xếp nhanh ngẫu nhiên giải quyết vấn đề này bằng cách chọn pivot một cách ngẫu nhiên từ mảng. Bằng cách chọn pivot ngẫu nhiên, chúng ta đảm bảo rằng trường hợp xấu nhất hiếm khi xảy ra và độ phức tạp thời gian trung bình của thuật toán vẫn là O(n log n), bất kể thứ tự đầu vào.

## Mã giả (Pseudocode)

```
function RandomizedQuickSort(A, lo, hi) is
    if lo < hi then
        p := RandomizedPartition(A, lo, hi)
        RandomizedQuickSort(A, lo, p - 1)
        RandomizedQuickSort(A, p + 1, hi)

function RandomizedPartition(A, lo, hi) is
    i := random integer from lo to hi
    swap A[i] with A[hi]
    return Partition(A, lo, hi) // Sử dụng hàm phân vùng tiêu chuẩn

function Partition(A, lo, hi) is
    pivot := A[hi]
    i := lo
    for j from lo to hi - 1 do
        if A[j] <= pivot then
            swap A[i] with A[j]
            i := i + 1
    swap A[i] with A[hi]
    return i
```

## Hướng tiếp cận

1.  **Chọn Pivot ngẫu nhiên:** Thay vì chọn pivot theo một cách cố định (ví dụ: phần tử đầu tiên, cuối cùng hoặc giữa), sắp xếp nhanh ngẫu nhiên chọn một phần tử ngẫu nhiên từ mảng làm pivot. Sau đó, nó hoán đổi pivot được chọn ngẫu nhiên này với phần tử cuối cùng của mảng (hoặc bất kỳ vị trí cố định nào khác) trước khi tiến hành phân vùng.
2.  **Phân vùng:** Sau khi chọn và đặt pivot, thuật toán tiến hành phân vùng mảng như trong sắp xếp nhanh tiêu chuẩn. Tất cả các phần tử nhỏ hơn pivot được di chuyển sang bên trái của pivot, và tất cả các phần tử lớn hơn được di chuyển sang bên phải.
3.  **Đệ quy:** Thuật toán sau đó gọi đệ quy chính nó trên hai mảng con được tạo bởi bước phân vùng.

Ưu điểm chính của việc chọn pivot ngẫu nhiên là nó làm cho hiệu suất của thuật toán ít phụ thuộc vào thứ tự đầu vào. Mặc dù trường hợp xấu nhất O(n^2) vẫn tồn tại về mặt lý thuyết, nhưng xác suất xảy ra nó là cực kỳ thấp.

## Ứng dụng

*   **Thuật toán sắp xếp mục đích chung:** Được sử dụng rộng rãi trong các thư viện và hệ thống do hiệu suất trung bình tốt và khả năng tránh trường hợp xấu nhất một cách hiệu quả.
*   **Trong các tình huống mà dữ liệu đầu vào có thể được sắp xếp theo một cách cụ thể:** Ví dụ, nếu dữ liệu đầu vào đã được sắp xếp hoặc sắp xếp ngược, sắp xếp nhanh tiêu chuẩn có thể hoạt động kém. Sắp xếp nhanh ngẫu nhiên giảm thiểu rủi ro này.

## Bài toán thực hành (LeetCode)

Sắp xếp nhanh ngẫu nhiên là một biến thể của sắp xếp nhanh tiêu chuẩn, giúp tránh trường hợp xấu nhất một cách hiệu quả. Các bài toán sau có thể được giải bằng sắp xếp nhanh, và việc áp dụng ngẫu nhiên hóa pivot sẽ cải thiện hiệu suất trung bình.

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Triển khai Randomized Quick Sort)
*   [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (Sử dụng Quickselect ngẫu nhiên)

## Triển khai (Python)

```python
import random

def partition(arr, low, high):
    pivot_index = random.randint(low, high)
    arr[pivot_index], arr[high] = arr[high], arr[pivot_index] # Đặt pivot ở cuối
    
    pivot = arr[high]
    i = (low - 1)

    for j in range(low, high):
        if arr[j] <= pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return (i + 1)

def randomized_quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        randomized_quick_sort(arr, low, pi - 1)
        randomized_quick_sort(arr, pi + 1, high)

# Ví dụ sử dụng:
arr = [10, 7, 8, 9, 1, 5]
n = len(arr)
randomized_quick_sort(arr, 0, n - 1)
print("Mảng đã sắp xếp là:")
for i in range(n):
    print("%d" % arr[i]),
```
