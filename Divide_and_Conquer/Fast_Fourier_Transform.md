# Chuyển đổi Fourier nhanh (Fast Fourier Transform - FFT)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Chuyển đổi Fourier nhanh (FFT) là một thuật toán hiệu quả để tính toán Chuyển đổi Fourier rời rạc (DFT) và nghịch đảo của nó. DFT chuyển đổi một chuỗi thời gian (hoặc tín hiệu) thành các thành phần tần số của nó và ngược lại. FFT là một trong những thuật toán quan trọng nhất trong xử lý tín hiệu số.

DFT được định nghĩa bởi công thức:

`X_k = Σ_{n=0}^{N-1} x_n * e^(-2πi * k * n / N)`

Trong đó:
*   `x_n`: Các mẫu tín hiệu đầu vào.
*   `X_k`: Các thành phần tần số đầu ra.
*   `N`: Tổng số mẫu.
*   `i`: Đơn vị ảo (`√-1`).

Việc tính toán DFT trực tiếp có độ phức tạp thời gian là O(N^2). FFT, bằng cách sử dụng cách tiếp cận chia để trị, giảm độ phức tạp này xuống O(N log N).

## Mã giả (Pseudocode) - FFT cơ số 2 (Cooley-Tukey)

```
function FFT(x) is
    N := length(x)
    if N = 1 then
        return x
    
    x_even := FFT(x[0], x[2], ..., x[N-2])
    x_odd := FFT(x[1], x[3], ..., x[N-1])

    for k from 0 to N/2 - 1 do
        t := exp(-2πi * k / N) * x_odd[k]
        X[k] := x_even[k] + t
        X[k + N/2] := x_even[k] - t

    return X
```

## Hướng tiếp cận

FFT là một thuật toán **chia để trị**:

1.  **Chia (Divide):** Chia chuỗi đầu vào `x` có độ dài `N` thành hai chuỗi con: một chuỗi chứa các phần tử ở vị trí chẵn (`x_even`) và một chuỗi chứa các phần tử ở vị trí lẻ (`x_odd`). Mỗi chuỗi con có độ dài `N/2`.
2.  **Trị (Conquer):** Gọi đệ quy FFT trên `x_even` và `x_odd` để tính toán DFT của chúng.
3.  **Kết hợp (Combine):** Kết hợp các kết quả của hai DFT con để tạo thành DFT của chuỗi gốc. Bước này sử dụng các thuộc tính đối xứng và tuần hoàn của hàm mũ phức tạp.

Quá trình đệ quy tiếp tục cho đến khi độ dài của chuỗi con là 1, tại đó DFT là chính phần tử đó.

## Ứng dụng

*   **Xử lý tín hiệu số:** Phân tích phổ, lọc, điều chế và giải điều chế tín hiệu.
*   **Nén dữ liệu:** Trong các thuật toán nén âm thanh (MP3) và hình ảnh (JPEG).
*   **Giải phương trình vi phân từng phần:** Trong các phương pháp số để giải các phương trình vật lý.
*   **Nhân số nguyên lớn:** FFT có thể được sử dụng để nhân hai số nguyên lớn hiệu quả hơn các phương pháp truyền thống.
*   **Xử lý hình ảnh:** Lọc, làm sắc nét và phát hiện cạnh.

## Bài toán thực hành (LeetCode)

Chuyển đổi Fourier nhanh (FFT) là một thuật toán phức tạp và thường không xuất hiện trực tiếp dưới dạng bài toán LeetCode yêu cầu triển khai từ đầu. Tuy nhiên, nguyên lý của nó (chia để trị, xử lý tín hiệu) có thể liên quan đến một số bài toán khó hơn.

*   [67. Add Binary](https://leetcode.com/problems/add-binary/) (Không trực tiếp FFT, nhưng liên quan đến phép toán trên chuỗi bit)
*   [43. Multiply Strings](https://leetcode.com/problems/multiply-strings/) (Có thể giải bằng FFT để tối ưu hóa phép nhân số lớn)

## Triển khai (Python)

```python
import numpy as np

def fft(x):
    N = len(x)

    if N <= 1:
        return x
    else:
        even = fft(x[0::2])
        odd = fft(x[1::2])
        
        T = [np.exp(-2j * np.pi * k / N) * odd[k] for k in range(N // 2)]
        
        return [even[k] + T[k] for k in range(N // 2)] + \
               [even[k] - T[k] for k in range(N // 2)]

# Ví dụ sử dụng:
x = np.array([1, 1, 1, 1, 0, 0, 0, 0])
X = fft(x)
print("Chuyển đổi Fourier nhanh:")
print(X)
```
