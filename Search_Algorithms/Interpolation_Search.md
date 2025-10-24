
# Tìm kiếm nội suy (Interpolation Search)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Tìm kiếm nội suy là một thuật toán để tìm kiếm một khóa đã cho trong một mảng đã được sắp xếp. Nó là một sự cải tiến so với tìm kiếm nhị phân khi các giá trị trong mảng được sắp xếp được phân bố đều.

Trong khi tìm kiếm nhị phân luôn kiểm tra phần tử ở giữa, tìm kiếm nội suy có thể kiểm tra các vị trí khác nhau tùy thuộc vào giá trị của khóa đang được tìm kiếm. Ví dụ, nếu giá trị của khóa gần với phần tử cuối cùng, tìm kiếm nội suy có khả năng bắt đầu tìm kiếm ở cuối mảng.

Công thức để tìm vị trí thăm dò là:

`pos = lo + [ (x-arr[lo])*(hi-lo) / (arr[hi]-arr[lo]) ]`

*   `arr[]`: Mảng
*   `x`: Phần tử cần tìm
*   `lo`: Chỉ số bắt đầu trong `arr[]`
*   `hi`: Chỉ số kết thúc trong `arr[]`

## Mã giả (Pseudocode)

```
function interpolationSearch(A, n, T) is
    lo := 0
    hi := n - 1
    while lo <= hi and T >= A[lo] and T <= A[hi] do
        if lo = hi then
            if A[lo] = T then
                return lo
            return -1
        
        pos := lo + floor( ((T - A[lo]) * (hi - lo)) / (A[hi] - A[lo]) )

        if A[pos] = T then
            return pos
        if A[pos] < T then
            lo := pos + 1
        else
            hi := pos - 1
    return -1
```

## Hướng tiếp cận

1.  **Ước tính vị trí:** Thay vì chia đôi, thuật toán ước tính vị trí của mục tiêu bằng cách sử dụng công thức nội suy. Công thức này tính đến giá trị của mục tiêu và các giá trị ở đầu và cuối của không gian tìm kiếm.
2.  **So sánh:** So sánh phần tử tại vị trí được thăm dò với mục tiêu.
    *   **Tìm thấy:** Nếu chúng khớp nhau, trả về vị trí.
    *   **Mục tiêu lớn hơn:** Nếu mục tiêu lớn hơn, điều chỉnh đầu dưới (`lo`) của không gian tìm kiếm thành vị trí được thăm dò cộng một.
    *   **Mục tiêu nhỏ hơn:** Nếu mục tiêu nhỏ hơn, điều chỉnh đầu trên (`hi`) của không gian tìm kiếm thành vị trí được thăm dò trừ một.
3.  **Lặp lại:** Lặp lại quá trình cho đến khi tìm thấy mục tiêu hoặc khi các đầu `lo` và `hi` cắt nhau.

## Ứng dụng

*   **Tập dữ liệu phân bố đều:** Hoạt động tốt nhất trên các tập dữ liệu lớn, được sắp xếp và phân bố đều, chẳng hạn như danh bạ điện thoại.
*   **Cơ sở dữ liệu:** Có thể được sử dụng trong các cơ sở dữ liệu lớn nơi các khóa được phân bố đều.

Trong trường hợp xấu nhất (khi các giá trị tăng theo cấp số nhân), nó có thể hoạt động kém hơn tìm kiếm nhị phân và có độ phức tạp O(n). Tuy nhiên, trong trường hợp trung bình trên một mảng phân bố đều, nó có độ phức tạp thời gian là O(log(log(n))).

## Bài toán thực hành (LeetCode)

Tìm kiếm nội suy là một thuật toán tìm kiếm hiệu quả trên các mảng đã được sắp xếp và phân bố đều. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Tìm kiếm nội suy, việc hiểu nguyên lý của nó có thể giúp bạn trong các bài toán liên quan đến tìm kiếm trên các tập dữ liệu có cấu trúc hoặc khi cần tối ưu hóa số lượng truy cập phần tử. Các bài toán về tìm kiếm nhị phân có thể là nơi tốt để nghĩ về các biến thể tìm kiếm.

*   [704. Binary Search](https://leetcode.com/problems/binary-search/) (Bạn có thể thử giải bằng Interpolation Search để thực hành)
*   [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/) (Cũng có thể thử áp dụng)

## Triển khai (Python)

```python
def interpolation_search(arr, n, x):
    # Tìm chỉ số của hai góc
    lo = 0
    hi = (n - 1)

    # Vì mảng đã được sắp xếp, nên phần tử phải nằm trong phạm vi được xác định bởi các góc
    while lo <= hi and x >= arr[lo] and x <= arr[hi]:
        if lo == hi:
            if arr[lo] == x:
                return lo;
            return -1;

        # Thăm dò vị trí bằng công thức nội suy
        pos = lo + int(((float(hi - lo) / ( arr[hi] - arr[lo])) * ( x - arr[lo])))

        # Nếu tìm thấy, trả về chỉ số
        if arr[pos] == x:
            return pos

        # Nếu x lớn hơn, x nằm ở phần trên
        if arr[pos] < x:
            lo = pos + 1;

        # Nếu x nhỏ hơn, x nằm ở phần dưới
        else:
            hi = pos - 1;

    return -1

# Ví dụ sử dụng:
arr = [10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47]
n = len(arr)
x = 18
index = interpolation_search(arr, n, x)

if index != -1:
    print("Phần tử được tìm thấy tại chỉ số", index)
else:
    print("Không tìm thấy phần tử")
```
