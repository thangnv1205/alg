
# Thuật toán Euclid (Euclidean Algorithm)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Euclid là một phương pháp hiệu quả để tính ước chung lớn nhất (GCD) của hai số nguyên. GCD của hai số là số nguyên dương lớn nhất chia hết cho cả hai số đó mà không để lại số dư.

Thuật toán này dựa trên nguyên tắc rằng ước chung lớn nhất của hai số không thay đổi nếu số lớn hơn được thay thế bằng hiệu của nó với số nhỏ hơn. Quá trình này được lặp lại cho đến khi một trong các số trở thành 0, và số còn lại là GCD.

## Mã giả (Pseudocode)

```
function EuclideanAlgorithm(a, b) is
    while b != 0 do
        temp := b
        b := a mod b
        a := temp
    return a
```

## Hướng tiếp cận

1.  **Trường hợp cơ sở:** Nếu `b` bằng 0, thì `a` là GCD.
2.  **Bước đệ quy/lặp:** Nếu `b` khác 0, thay thế `a` bằng `b` và `b` bằng phần dư của `a` chia `b` (`a mod b`).
3.  **Lặp lại:** Lặp lại bước 2 cho đến khi `b` trở thành 0.

Ví dụ: Tìm GCD của 48 và 18

*   `gcd(48, 18)`
*   `gcd(18, 48 % 18)` = `gcd(18, 12)`
*   `gcd(12, 18 % 12)` = `gcd(12, 6)`
*   `gcd(6, 12 % 6)` = `gcd(6, 0)`
*   Khi `b` là 0, `a` là GCD. Vậy GCD(48, 18) = 6.

## Ứng dụng

*   **Rút gọn phân số:** Để rút gọn một phân số về dạng tối giản.
*   **Mật mã học:** Là một phần của thuật toán RSA để tính nghịch đảo modulo.
*   **Lý thuyết số:** Trong nhiều bài toán liên quan đến số nguyên.
*   **Đồng bộ hóa:** Trong một số thuật toán đồng bộ hóa.

## Bài toán thực hành (LeetCode)

Thuật toán Euclid là một thuật toán cơ bản để tìm ước chung lớn nhất (GCD). Nó có nhiều ứng dụng trong lý thuyết số và mật mã học.

*   [1071. Greatest Common Divisor of Strings](https://leetcode.com/problems/greatest-common-divisor-of-strings/)
*   [204. Count Primes](https://leetcode.com/problems/count-primes/) (Có thể sử dụng GCD để kiểm tra tính nguyên tố)

## Triển khai (Python)

```python
def euclidean_algorithm(a, b):
    while b:
        a, b = b, a % b
    return a

# Ví dụ sử dụng:
num1 = 48
num2 = 18
print(f"Ước chung lớn nhất của {num1} và {num2} là: {euclidean_algorithm(num1, num2)}")

num3 = 101
num4 = 103
print(f"Ước chung lớn nhất của {num3} và {num4} là: {euclidean_algorithm(num3, num4)}")
```
