
# Thuật toán RSA

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

RSA (Rivest-Shamir-Adleman) là một thuật toán mã hóa bất đối xứng (còn gọi là mã hóa khóa công khai). Đây là một trong những hệ thống mật mã khóa công khai đầu tiên và được sử dụng rộng rãi để truyền dữ liệu an toàn. Trong hệ thống mật mã khóa công khai, mỗi người dùng có một cặp khóa: một khóa công khai và một khóa riêng tư.

*   **Khóa công khai:** Có thể được chia sẻ công khai và được sử dụng để mã hóa tin nhắn.
*   **Khóa riêng tư:** Phải được giữ bí mật và được sử dụng để giải mã tin nhắn.

Sự an toàn của RSA dựa trên sự khó khăn trong việc phân tích thừa số các số nguyên lớn. Việc tạo khóa RSA liên quan đến việc chọn hai số nguyên tố lớn, tính toán mô-đun và hàm totient Euler, sau đó chọn các số mũ mã hóa và giải mã.

## Mã giả (Pseudocode)

### Tạo khóa

```
function generate_key_pair(min_val, max_val) is
    p := generate_prime(min_val, max_val)
    q := generate_prime(min_val, max_val)
    while p = q do
        q := generate_prime(min_val, max_val)

    n := p * q
    phi := (p - 1) * (q - 1)

    e := random integer such that 1 < e < phi and gcd(e, phi) = 1
    d := modular_inverse(e, phi)

    public_key := (e, n)
    private_key := (d, n)
    return public_key, private_key
```

### Mã hóa

```
function encrypt(public_key, plaintext) is
    e, n := public_key
    ciphertext := [ (char_to_int(char) ^ e) mod n for each char in plaintext ]
    return ciphertext
```

### Giải mã

```
function decrypt(private_key, ciphertext) is
    d, n := private_key
    plaintext := [ int_to_char((char ^ d) mod n) for each char in ciphertext ]
    return plaintext
```

## Hướng tiếp cận

1.  **Tạo khóa:**
    *   **Chọn hai số nguyên tố lớn:** Chọn hai số nguyên tố lớn, `p` và `q`, khác nhau.
    *   **Tính `n`:** Tính `n = p * q`. `n` là mô-đun cho cả khóa công khai và khóa riêng tư.
    *   **Tính `phi`:** Tính `phi = (p - 1) * (q - 1)`. `phi` là hàm totient Euler.
    *   **Chọn số mũ mã hóa `e`:** Chọn một số nguyên `e` sao cho `1 < e < phi` và `e` là số nguyên tố cùng nhau với `phi` (tức là `gcd(e, phi) = 1`).
    *   **Tính số mũ giải mã `d`:** Tính `d` là nghịch đảo modulo của `e` modulo `phi`. Điều này có nghĩa là `(d * e) mod phi = 1`.
    *   **Khóa công khai:** `(e, n)`
    *   **Khóa riêng tư:** `(d, n)`

2.  **Mã hóa:** Để mã hóa một tin nhắn `M` (được biểu diễn dưới dạng số), người gửi sử dụng khóa công khai `(e, n)` của người nhận:
    `C = M^e mod n`

3.  **Giải mã:** Để giải mã một bản mã `C`, người nhận sử dụng khóa riêng tư `(d, n)` của mình:
    `M = C^d mod n`

## Ứng dụng

*   **Truyền thông an toàn:** Được sử dụng để mã hóa dữ liệu nhạy cảm qua các kênh không an toàn (ví dụ: HTTPS, email an toàn).
*   **Chữ ký số:** Để xác minh tính xác thực và toàn vẹn của tin nhắn hoặc tài liệu.
*   **Trao đổi khóa:** Để trao đổi khóa đối xứng một cách an toàn.

## Bài toán thực hành (LeetCode)

RSA là một thuật toán mật mã phức tạp, và LeetCode không có các bài toán trực tiếp yêu cầu triển khai RSA từ đầu. Tuy nhiên, các bài toán liên quan đến số học modulo, số nguyên tố và lũy thừa có thể giúp bạn củng cố các khái niệm cơ bản của RSA.

*   [50. Pow(x, n)](https://leetcode.com/problems/powx-n/) (Liên quan đến lũy thừa)
*   [204. Count Primes](https://leetcode.com/problems/count-primes/) (Liên quan đến số nguyên tố)
*   [1071. Greatest Common Divisor of Strings](https://leetcode.com/problems/greatest-common-divisor-of-strings/) (Liên quan đến GCD)

## Triển khai (Python)

```python
import random

def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def extended_gcd(a, b):
    if a == 0:
        return b, 0, 1
    gcd, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    return gcd, x, y

def mod_inverse(a, m):
    gcd_val, x, y = extended_gcd(a, m)
    if gcd_val != 1:
        raise Exception('Nghịch đảo modulo không tồn tại')
    else:
        return (x % m + m) % m

def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

def generate_prime(min_val, max_val):
    prime = random.randint(min_val, max_val)
    while not is_prime(prime):
        prime = random.randint(min_val, max_val)
    return prime

def generate_key_pair(min_val=10, max_val=100):
    p = generate_prime(min_val, max_val)
    q = generate_prime(min_val, max_val)
    while p == q:
        q = generate_prime(min_val, max_val)

    n = p * q
    phi = (p - 1) * (q - 1)

    # Chọn e sao cho 1 < e < phi và gcd(e, phi) = 1
    e = random.randint(2, phi - 1)
    while gcd(e, phi) != 1:
        e = random.randint(2, phi - 1)

    # Tính d là nghịch đảo modulo của e mod phi
    d = mod_inverse(e, phi)

    return ((e, n), (d, n)) # Khóa công khai, Khóa riêng tư

def encrypt(public_key, plaintext):
    e, n = public_key
    # C = M^e mod n
    cipher = [pow(ord(char), e, n) for char in plaintext]
    return cipher

def decrypt(private_key, ciphertext):
    d, n = private_key
    # M = C^d mod n
    plain = [chr(pow(char, d, n)) for char in ciphertext]
    return ''.join(plain)

# Ví dụ sử dụng:
public_key, private_key = generate_key_pair()
print("Khóa công khai:", public_key)
print("Khóa riêng tư:", private_key)

message = "Hello RSA!"
encrypted_message = encrypt(public_key, message)
print("Tin nhắn được mã hóa:", encrypted_message)

decrypted_message = decrypt(private_key, encrypted_message)
print("Tin nhắn được giải mã:", decrypted_message)
```
