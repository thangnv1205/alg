
# Sắp xếp xô (Bucket Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp xô, hay sắp xếp theo nhóm, là một thuật toán sắp xếp hoạt động bằng cách phân phối các phần tử của một mảng vào một số xô. Mỗi xô sau đó được sắp xếp riêng lẻ, bằng cách sử dụng một thuật toán sắp xếp khác hoặc bằng cách áp dụng đệ quy thuật toán sắp xếp xô.

Sắp xếp xô hoạt động tốt nhất khi các phần tử của mảng đầu vào được phân bố đều trên một phạm vi. Khi các phần tử được phân bố đều, sắp xếp xô có thể hoạt động trong thời gian tuyến tính (O(n)).

## Mã giả (Pseudocode)

```
function bucketSort(A) is
    n := length(A)
    B := an array of n empty lists
    for i = 0 to n - 1 do
        insert A[i] into B[floor(n * A[i])]
    
    for i = 0 to n - 1 do
        sort B[i] with insertion sort
    
    concatenate the lists in B together in order
```

*   `A`: Mảng đầu vào (thường là các số dấu phẩy động trong phạm vi [0, 1))
*   `n`: Số lượng phần tử trong `A`
*   `B`: Mảng các xô (danh sách)

## Hướng tiếp cận

1.  **Tạo xô:** Tạo một số lượng xô rỗng. Số lượng xô thường được chọn bằng với số lượng phần tử trong mảng.
2.  **Phân phối:** Lặp qua mảng đầu vào và đặt mỗi phần tử vào một xô dựa trên giá trị của nó. Một công thức phổ biến để xác định chỉ số xô cho một phần tử `e` là `floor(n * e)`, trong đó `n` là số lượng xô.
3.  **Sắp xếp các xô:** Sắp xếp từng xô riêng lẻ. Điều này có thể được thực hiện bằng cách sử dụng một thuật toán sắp xếp khác (chẳng hạn như sắp xếp chèn, rất hiệu quả cho các danh sách nhỏ) hoặc bằng cách gọi đệ quy sắp xếp xô.
4.  **Nối:** Nối các xô đã sắp xếp lại với nhau theo thứ tự để có được mảng đã sắp xếp cuối cùng.

## Ứng dụng

*   **Dữ liệu phân bố đều:** Rất hiệu quả khi dữ liệu đầu vào được phân bố đều trên một phạm vi.
*   **Xử lý dữ liệu lớn:** Có thể được sử dụng để sắp xếp các tập dữ liệu lớn không vừa trong bộ nhớ chính (sắp xếp ngoài).
*   **Sắp xếp các số dấu phẩy động:** Đặc biệt hữu ích để sắp xếp các số dấu phẩy động.

## Bài toán thực hành (LeetCode)

Sắp xếp xô là một thuật toán sắp xếp hiệu quả khi dữ liệu được phân bố đều. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Bucket Sort, việc hiểu nó có thể hữu ích cho các bài toán liên quan đến sắp xếp dữ liệu có phân bố cụ thể.

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Có thể triển khai Bucket Sort để giải)
*   [164. Maximum Gap](https://leetcode.com/problems/maximum-gap/) (Có thể giải bằng Bucket Sort)

## Triển khai (Python)

```python
def bucket_sort(arr):
    # 1) Tạo các xô rỗng
    n = len(arr)
    buckets = [[] for _ in range(n)]

    # 2) Đặt các phần tử mảng vào các xô khác nhau
    for i in range(n):
        bucket_index = int(n * arr[i])
        buckets[bucket_index].append(arr[i])

    # 3) Sắp xếp các xô riêng lẻ
    for i in range(n):
        buckets[i].sort()

    # 4) Nối các xô lại
    index = 0
    for i in range(n):
        for j in range(len(buckets[i])):
            arr[index] = buckets[i][j]
            index += 1
    return arr

# Ví dụ sử dụng:
arr = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434]
print("Mảng đã sắp xếp là:", bucket_sort(arr))
```
