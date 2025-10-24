
# Sàng Eratosthenes (Sieve of Eratosthenes)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sàng Eratosthenes là một thuật toán cổ xưa để tìm tất cả các số nguyên tố lên đến một giới hạn đã cho. Nó là một trong những thuật toán hiệu quả nhất để tìm tất cả các số nguyên tố nhỏ. Thuật toán được đặt theo tên của nhà toán học Hy Lạp cổ đại Eratosthenes.

Ý tưởng cơ bản là loại bỏ (sàng) các bội số của mỗi số nguyên tố, bắt đầu từ 2. Khi thuật toán kết thúc, các số còn lại chưa bị loại bỏ là các số nguyên tố.

## Mã giả (Pseudocode)

```
function SieveOfEratosthenes(n) is
    create a boolean array 'is_prime[0..n]' and initialize all entries as true
    is_prime[0] := false
    is_prime[1] := false

    p := 2
    while (p * p <= n) do
        // Nếu is_prime[p] vẫn là true, thì đó là một số nguyên tố
        if is_prime[p] = true then
            // Cập nhật tất cả các bội số của p thành false
            for i from p*p to n step p do
                is_prime[i] := false
        p := p + 1

    // Thu thập tất cả các số nguyên tố
    primes := empty list
    for p from 2 to n do
        if is_prime[p] then
            add p to primes

    return primes
```

## Hướng tiếp cận

1.  **Khởi tạo:** Tạo một danh sách boolean (hoặc mảng) `is_prime` có kích thước `n+1`, và khởi tạo tất cả các mục là `true`. `is_prime[i]` sẽ là `false` nếu `i` không phải là số nguyên tố, ngược lại là `true`. Đánh dấu 0 và 1 là không phải số nguyên tố.
2.  **Bắt đầu từ 2:** Bắt đầu với số nguyên tố đầu tiên, `p = 2`.
3.  **Đánh dấu bội số:** Trong khi `p * p` nhỏ hơn hoặc bằng `n`:
    *   Nếu `is_prime[p]` vẫn là `true`, điều đó có nghĩa là `p` là một số nguyên tố.
    *   Đánh dấu tất cả các bội số của `p` (bắt đầu từ `p*p`) là `false`. Chúng ta bắt đầu từ `p*p` vì các bội số nhỏ hơn `p*p` (ví dụ: `2*p`, `3*p`, ...) đã được đánh dấu bởi các số nguyên tố nhỏ hơn `p`.
    *   Tăng `p` lên 1.
4.  **Thu thập kết quả:** Sau khi vòng lặp kết thúc, tất cả các chỉ số `i` mà `is_prime[i]` vẫn là `true` là các số nguyên tố.

## Ứng dụng

*   **Mật mã học:** Tạo ra các số nguyên tố lớn cho các thuật toán mã hóa như RSA.
*   **Lý thuyết số:** Nghiên cứu các tính chất của số nguyên tố.
*   **Các bài toán lập trình cạnh tranh:** Để tạo ra một danh sách các số nguyên tố một cách hiệu quả.

## Bài toán thực hành (LeetCode)

Sàng Eratosthenes là một thuật toán hiệu quả để tìm tất cả các số nguyên tố lên đến một giới hạn nhất định. Nó rất hữu ích trong các bài toán liên quan đến số nguyên tố.

*   [204. Count Primes](https://leetcode.com/problems/count-primes/)
*   [263. Ugly Number](https://leetcode.com/problems/ugly-number/) (Liên quan đến các thừa số nguyên tố)

## Triển khai (Python)

```python
def sieve_of_eratosthenes(n):
    # Tạo một mảng boolean "prime[0..n]" và khởi tạo tất cả các mục là true.
    # Một giá trị tại prime[i] sẽ là false nếu i không phải là số nguyên tố, ngược lại là true.
    prime = [True for i in range(n + 1)]
    p = 2
    while (p * p <= n):
        # Nếu prime[p] vẫn là true, thì đó là một số nguyên tố
        if (prime[p] == True):
            # Cập nhật tất cả các bội số của p thành false
            for i in range(p * p, n + 1, p):
                prime[i] = False
        p += 1

    # Thu thập tất cả các số nguyên tố
    primes = []
    for p in range(2, n + 1):
        if prime[p]:
            primes.append(p)
    return primes

# Ví dụ sử dụng:
limit = 30
primes_up_to_limit = sieve_of_eratosthenes(limit)
print(f"Các số nguyên tố lên đến {limit} là: {primes_up_to_limit}")
```
