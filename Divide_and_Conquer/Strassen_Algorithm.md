
# Thuật toán Strassen (Strassen's Algorithm)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Strassen là một thuật toán nhân ma trận nhanh hơn thuật toán nhân ma trận tiêu chuẩn. Nó được phát triển bởi Volker Strassen vào năm 1969. Thuật toán nhân ma trận tiêu chuẩn có độ phức tạp thời gian là O(n^3) cho hai ma trận vuông `n x n`.

Thuật toán Strassen sử dụng cách tiếp cận chia để trị để giảm số lượng phép nhân cần thiết. Thay vì 8 phép nhân ma trận con như trong cách tiếp cận chia để trị thông thường, thuật toán Strassen chỉ yêu cầu 7 phép nhân ma trận con. Điều này làm giảm độ phức tạp thời gian của nó xuống khoảng O(n^log2(7)), xấp xỉ O(n^2.807).

## Mã giả (Pseudocode)

Giả sử chúng ta có hai ma trận `A` và `B` có kích thước `n x n` và chúng ta muốn tính `C = A * B`.

1.  **Chia:** Chia các ma trận `A` và `B` thành các ma trận con `n/2 x n/2`:

    ```
    A = | A11 A12 |
        | A21 A22 |

    B = | B11 B12 |
        | B21 B22 |
    ```

2.  **Tính toán 7 tích P:**

    ```
    P1 = (A11 + A22) * (B11 + B22)
    P2 = (A21 + A22) * B11
    P3 = A11 * (B12 - B22)
    P4 = A22 * (B21 - B11)
    P5 = (A11 + A12) * B22
    P6 = (A21 - A11) * (B11 + B12)
    P7 = (A12 - A22) * (B21 + B22)
    ```

3.  **Tính toán các ma trận con C:**

    ```
    C11 = P1 + P4 - P5 + P7
    C12 = P3 + P5
    C21 = P2 + P4
    C22 = P1 - P2 + P3 + P6
    ```

4.  **Ghép:** Ghép các ma trận con `C11, C12, C21, C22` lại để tạo thành ma trận `C`.

## Hướng tiếp cận

Thuật toán Strassen là một ví dụ điển hình của mô hình **Chia để trị**:

1.  **Chia (Divide):** Chia các ma trận `n x n` thành bốn ma trận con `n/2 x n/2`. Điều này được thực hiện đệ quy cho đến khi kích thước ma trận đủ nhỏ để sử dụng phép nhân ma trận tiêu chuẩn (thường là 1x1).
2.  **Trị (Conquer):** Thực hiện 7 phép nhân ma trận con đệ quy. Đây là điểm khác biệt chính so với cách tiếp cận chia để trị thông thường, nơi sẽ có 8 phép nhân.
3.  **Kết hợp (Combine):** Kết hợp các kết quả của 7 phép nhân ma trận con bằng cách sử dụng các phép cộng và trừ ma trận để tạo thành ma trận kết quả cuối cùng.

## Ứng dụng

*   **Đồ họa máy tính:** Trong các phép biến đổi hình học.
*   **Xử lý tín hiệu:** Trong các thuật toán liên quan đến biến đổi Fourier.
*   **Khoa học máy tính lý thuyết:** Có ý nghĩa quan trọng trong việc nghiên cứu giới hạn dưới của độ phức tạp nhân ma trận.

## Bài toán thực hành (LeetCode)

Thuật toán Strassen là một thuật toán nhân ma trận hiệu quả hơn thuật toán tiêu chuẩn. Tuy nhiên, do tính phức tạp và yêu cầu về cấu trúc dữ liệu ma trận, nó hiếm khi xuất hiện trực tiếp dưới dạng bài toán LeetCode. Các bài toán liên quan đến nhân ma trận hoặc chia để trị có thể giúp bạn hiểu sâu hơn về nguyên lý này.

*   [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) (Không trực tiếp liên quan nhưng có thể áp dụng tư duy chia để trị)
*   [73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) (Không trực tiếp liên quan nhưng làm việc với ma trận)

## Triển khai (Python)

```python
import numpy as np

def strassen_matrix_multiply(A, B):
    # Trường hợp cơ sở: nếu kích thước ma trận là 1x1
    if A.shape[0] == 1:
        return A * B

    # Chia ma trận thành các ma trận con
    n = A.shape[0]
    A11 = A[0:n//2, 0:n//2]
    A12 = A[0:n//2, n//2:n]
    A21 = A[n//2:n, 0:n//2]
    A22 = A[n//2:n, n//2:n]

    B11 = B[0:n//2, 0:n//2]
    B12 = B[0:n//2, n//2:n]
    B21 = B[n//2:n, 0:n//2]
    B22 = B[n//2:n, n//2:n]

    # Tính toán 7 tích P
    P1 = strassen_matrix_multiply(A11 + A22, B11 + B22)
    P2 = strassen_matrix_multiply(A21 + A22, B11)
    P3 = strassen_matrix_multiply(A11, B12 - B22)
    P4 = strassen_matrix_multiply(A22, B21 - B11)
    P5 = strassen_matrix_multiply(A11 + A12, B22)
    P6 = strassen_matrix_multiply(A21 - A11, B11 + B12)
    P7 = strassen_matrix_multiply(A12 - A22, B21 + B22)

    # Tính toán các ma trận con C
    C11 = P1 + P4 - P5 + P7
    C12 = P3 + P5
    C21 = P2 + P4
    C22 = P1 - P2 + P3 + P6

    # Ghép các ma trận con C lại
    C = np.zeros((n, n), dtype=A.dtype)
    C[0:n//2, 0:n//2] = C11
    C[0:n//2, n//2:n] = C12
    C[n//2:n, 0:n//2] = C21
    C[n//2:n, n//2:n] = C22

    return C

# Ví dụ sử dụng:
A = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 1, 2, 3], [4, 5, 6, 7]])
B = np.array([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])

result = strassen_matrix_multiply(A, B)
print("Kết quả nhân ma trận bằng thuật toán Strassen:")
print(result)
```
