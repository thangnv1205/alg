
# Thuật toán Miller-Rabin (Miller-Rabin Primality Test)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Miller-Rabin là một thuật toán kiểm tra tính nguyên tố ngẫu nhiên (probabilistic primality test). Nó được sử dụng để xác định xem một số có phải là số nguyên tố hay không. Không giống như các thuật toán xác định (như Sàng Eratosthenes), Miller-Rabin không đảm bảo 100% rằng một số là số nguyên tố, nhưng nó có thể chứng minh rằng một số là hợp số (không phải số nguyên tố) hoặc tuyên bố rằng nó là số nguyên tố với xác suất rất cao.

Sự an toàn của thuật toán này dựa trên Định lý Fermat nhỏ và các tính chất của căn bậc hai của 1 modulo `n`. Nếu một số `n` là số nguyên tố, thì nó phải thỏa mãn một số điều kiện nhất định. Miller-Rabin kiểm tra các điều kiện này. Nếu `n` không thỏa mãn, nó chắc chắn là hợp số. Nếu `n` thỏa mãn, nó có thể là số nguyên tố hoặc một "số nguyên tố giả mạnh" (strong pseudoprime).

## Mã giả (Pseudocode)

```
function MillerRabinTest(n, k) is
    if n <= 1 or n = 4 then return false
    if n <= 3 then return true

    // Tìm d và s sao cho n-1 = 2^s * d, với d là số lẻ
    d := n - 1
    s := 0
    while d mod 2 = 0 do
        d := d / 2
        s := s + 1

    for r from 1 to k do // k là số lần lặp để tăng độ tin cậy
        a := random integer in [2, n-2]
        x := power(a, d, n) // Tính a^d mod n

        if x = 1 or x = n - 1 then
            continue // Có thể là số nguyên tố

        for i from 1 to s-1 do
            x := (x * x) mod n
            if x = 1 then return false // Chắc chắn là hợp số
            if x = n - 1 then break // Có thể là số nguyên tố
        
        if x != n - 1 then return false // Chắc chắn là hợp số

    return true // Có thể là số nguyên tố (với xác suất cao)

function power(base, exp, mod) is
    result := 1
    base := base mod mod
    while exp > 0 do
        if exp mod 2 = 1 then
            result := (result * base) mod mod
        base := (base * base) mod mod
        exp := floor(exp / 2)
    return result
```

## Hướng tiếp cận

1.  **Tiền xử lý:** Cho một số `n` cần kiểm tra, viết `n-1` dưới dạng `2^s * d`, trong đó `d` là một số lẻ.
2.  **Chọn cơ số ngẫu nhiên:** Chọn một số nguyên `a` ngẫu nhiên trong khoảng `[2, n-2]`. `a` được gọi là "cơ số" (witness).
3.  **Kiểm tra điều kiện:** Kiểm tra xem `n` có thỏa mãn một trong các điều kiện sau hay không:
    *   `a^d ≡ 1 (mod n)`
    *   `a^(2^r * d) ≡ -1 (mod n)` cho một số `r` trong khoảng `[0, s-1]`
4.  **Kết quả:**
    *   Nếu `n` không thỏa mãn cả hai điều kiện trên, thì `n` chắc chắn là hợp số.
    *   Nếu `n` thỏa mãn một trong các điều kiện trên, thì `n` có thể là số nguyên tố. Để tăng độ tin cậy, lặp lại các bước 2 và 3 `k` lần với các giá trị `a` ngẫu nhiên khác nhau. Xác suất `n` là hợp số sau `k` lần kiểm tra thành công là cực kỳ nhỏ.

## Ứng dụng

*   **Mật mã học:** Tạo ra các số nguyên tố lớn cho các thuật toán mã hóa khóa công khai như RSA, nơi cần các số nguyên tố rất lớn.
*   **Tạo số ngẫu nhiên:** Trong các ứng dụng yêu cầu số ngẫu nhiên chất lượng cao.

## Bài toán thực hành (LeetCode)

Thuật toán Miller-Rabin là một thuật toán kiểm tra tính nguyên tố ngẫu nhiên, rất quan trọng trong mật mã học. Mặc dù không có bài toán LeetCode trực tiếp yêu cầu triển khai Miller-Rabin, các bài toán liên quan đến số nguyên tố, số học modulo và các phép toán lũy thừa có thể giúp bạn củng cố kiến thức.

*   [204. Count Primes](https://leetcode.com/problems/count-primes/) (Có thể sử dụng các thuật toán kiểm tra tính nguyên tố)
*   [50. Pow(x, n)](https://leetcode.com/problems/powx-n/) (Liên quan đến lũy thừa modulo)

## Triển khai (Python)

```python
import random

def power(a, d, n):
    """Tính (a^d) % n"""
    res = 1
    a = a % n
    while d > 0:
        if d % 2 == 1:
            res = (res * a) % n
        d //= 2
        a = (a * a) % n
    return res

def miller_rabin_test(d, n):
    """Hàm trợ giúp cho Miller-Rabin, kiểm tra một cơ số a"""
    # Chọn một số ngẫu nhiên trong [2, n-2]
    a = random.randint(2, n - 2)
    x = power(a, d, n)

    if x == 1 or x == n - 1:
        return True

    # Bình phương x lặp đi lặp lại
    while d != n - 1:
        x = (x * x) % n
        d *= 2

        if x == 1:
            return False
        if x == n - 1:
            return True
    return False

def is_prime_miller_rabin(n, k=4):
    """Kiểm tra tính nguyên tố của n bằng Miller-Rabin k lần"""
    # Trường hợp đặc biệt
    if n <= 1 or n == 4:
        return False
    if n <= 3:
        return True

    # Tìm d sao cho n-1 = 2^s * d
    d = n - 1
    while d % 2 == 0:
        d //= 2

    # Lặp lại k lần
    for _ in range(k):
        if not miller_rabin_test(d, n):
            return False
    return True

# Ví dụ sử dụng:
print(f"13 là số nguyên tố: {is_prime_miller_rabin(13)}")
print(f"15 là số nguyên tố: {is_prime_miller_rabin(15)}")
print(f"97 là số nguyên tố: {is_prime_miller_rabin(97)}")
print(f"561 là số nguyên tố: {is_prime_miller_rabin(561)}") # 561 là số Carmichael, Miller-Rabin sẽ phát hiện ra nó là hợp số
```
