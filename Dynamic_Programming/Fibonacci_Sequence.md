
# Dãy Fibonacci

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Dãy Fibonacci là một dãy số trong đó mỗi số là tổng của hai số đứng trước nó, bắt đầu bằng 0 và 1. Các số trong dãy Fibonacci thường được ký hiệu là `F(n)`.

Các số đầu tiên của dãy Fibonacci là:
`0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...`

Định nghĩa toán học của dãy Fibonacci là:

*   `F(0) = 0`
*   `F(1) = 1`
*   `F(n) = F(n-1) + F(n-2)` cho `n > 1`

Dãy Fibonacci xuất hiện tự nhiên trong nhiều lĩnh vực, từ toán học và khoa học máy tính đến sinh học và nghệ thuật.

## Mã giả (Pseudocode)

```
function fibonacci(n) is
    if n <= 1 then
        return n
    else
        return fibonacci(n-1) + fibonacci(n-2)
```

Phiên bản đệ quy đơn giản này có độ phức tạp thời gian theo cấp số nhân. Để cải thiện hiệu suất, chúng ta có thể sử dụng quy hoạch động (ghi nhớ hoặc lập bảng).

### Mã giả (Pseudocode) - Quy hoạch động (Lập bảng)

```
function fibonacci_dp(n) is
    if n <= 1 then
        return n
    
    f := array of size n+1
    f[0] := 0
    f[1] := 1

    for i from 2 to n do
        f[i] := f[i-1] + f[i-2]

    return f[n]
```

## Hướng tiếp cận

Có nhiều cách để tính toán các số Fibonacci. Cách tiếp cận quy hoạch động (lập bảng) là một trong những cách hiệu quả nhất:

1.  **Trường hợp cơ sở:** Xác định các giá trị cơ sở của dãy: `F(0) = 0` và `F(1) = 1`.
2.  **Lập bảng:** Tạo một mảng (hoặc bảng) để lưu trữ các giá trị Fibonacci đã tính toán. Khởi tạo `f[0] = 0` và `f[1] = 1`.
3.  **Lặp và tính toán:** Lặp từ `i = 2` đến `n`. Trong mỗi lần lặp, tính `f[i]` bằng cách cộng hai giá trị trước đó: `f[i] = f[i-1] + f[i-2]`.
4.  **Kết quả:** Giá trị `f[n]` sẽ là số Fibonacci thứ `n`.

Cách tiếp cận này tránh tính toán lại các giá trị đã được tính toán, làm cho nó hiệu quả hơn nhiều so với cách tiếp cận đệ quy thuần túy.

## Ứng dụng

*   **Khoa học máy tính:** Được sử dụng trong các thuật toán tìm kiếm và sắp xếp, cấu trúc dữ liệu heap Fibonacci.
*   **Toán học:** Xuất hiện trong nhiều lĩnh vực của toán học, bao gồm lý thuyết số và hình học.
*   **Sinh học:** Các mẫu tăng trưởng của cây, sự sắp xếp của lá trên thân cây, sự phân nhánh của cây, sự sắp xếp của hạt trên hoa hướng dương, vỏ ốc sên và tỷ lệ của các bộ phận cơ thể người thường tuân theo dãy Fibonacci.
*   **Thị trường tài chính:** Được sử dụng trong phân tích kỹ thuật để dự đoán các mức hỗ trợ và kháng cự.

## Bài toán thực hành (LeetCode)

Dãy Fibonacci là một bài toán cơ bản trong quy hoạch động và thường được sử dụng để giới thiệu các khái niệm về đệ quy, ghi nhớ và lập bảng.

*   [509. Fibonacci Number](https://leetcode.com/problems/fibonacci-number/)
*   [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (Một biến thể của Fibonacci)
*   [746. Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/) (Một biến thể khác của Fibonacci)

## Triển khai (Python)

```python
def fibonacci(n):
    # Tạo một mảng để lưu trữ các giá trị Fibonacci đã tính toán
    f = [0] * (n + 1)

    # Trường hợp cơ sở
    f[1] = 1

    # Tính toán các giá trị Fibonacci từ 2 đến n
    for i in range(2, n + 1):
        f[i] = f[i-1] + f[i-2]

    return f[n]

# Ví dụ sử dụng:
print("Số Fibonacci thứ 9 là", fibonacci(9))
```
