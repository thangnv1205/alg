
# Thuật toán bình phương và nhân (Exponentiation by Squaring)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán bình phương và nhân, còn được gọi là lũy thừa nhị phân, là một phương pháp hiệu quả để tính lũy thừa nguyên dương của một số hoặc một phần tử của một nhóm (ví dụ: ma trận, phần tử trong trường hữu hạn). Nó nhanh hơn đáng kể so với việc nhân lặp đi lặp lại, đặc biệt đối với các số mũ lớn.

Ý tưởng chính là sử dụng biểu diễn nhị phân của số mũ. Thay vì tính `a^n` bằng cách nhân `a` với chính nó `n-1` lần, thuật toán này sử dụng các phép bình phương và nhân có điều kiện để đạt được kết quả nhanh hơn.

## Mã giả (Pseudocode)

```
function ExponentiationBySquaring(base, exp, mod) is
    result := 1
    base := base mod mod // Nếu có modulo

    while exp > 0 do
        // Nếu exp là lẻ, nhân base với result
        if (exp mod 2 = 1) then
            result := (result * base) mod mod // Nếu có modulo

        // exp trở thành exp/2
        base := (base * base) mod mod // Nếu có modulo
        exp := floor(exp / 2)

    return result
```

## Hướng tiếp cận

Thuật toán này dựa trên quan sát rằng:

*   Nếu số mũ `exp` là chẵn, thì `base^exp = (base^2)^(exp/2)`.
*   Nếu số mũ `exp` là lẻ, thì `base^exp = base * base^(exp-1) = base * (base^2)^((exp-1)/2)`.

Các bước của thuật toán:

1.  **Khởi tạo:** `result = 1`. Nếu có modulo, `base = base % mod`.
2.  **Lặp:** Trong khi `exp` lớn hơn 0:
    *   **Kiểm tra số mũ lẻ:** Nếu `exp` là lẻ (bit cuối cùng của `exp` là 1), nhân `result` với `base` (và lấy modulo nếu có).
    *   **Bình phương cơ số:** Bình phương `base` (và lấy modulo nếu có).
    *   **Giảm số mũ:** Chia `exp` cho 2 (dịch phải 1 bit).
3.  **Kết quả:** Trả về `result`.

## Ứng dụng

*   **Mật mã học:** Là một thành phần cốt lõi trong các thuật toán mật mã khóa công khai như RSA, nơi các phép tính lũy thừa modulo với số mũ lớn là phổ biến.
*   **Lý thuyết số:** Trong các bài toán liên quan đến số học modulo.
*   **Đại số tuyến tính:** Tính lũy thừa của ma trận.

## Bài toán thực hành (LeetCode)

Thuật toán bình phương và nhân là một phương pháp hiệu quả để tính lũy thừa, đặc biệt hữu ích trong số học modulo và mật mã học.

*   [50. Pow(x, n)](https://leetcode.com/problems/powx-n/)
*   [372. Super Pow](https://leetcode.com/problems/super-pow/) (Sử dụng lũy thừa modulo)

## Triển khai (Python)

```python
def exponentiation_by_squaring(base, exp, mod=None):
    res = 1
    if mod is not None:
        base %= mod # Đảm bảo base nằm trong phạm vi modulo nếu có

    while exp > 0:
        # Nếu exp là lẻ, nhân base với res
        if exp % 2 == 1:
            if mod is not None:
                res = (res * base) % mod
            else:
                res = (res * base)

        # exp trở thành exp/2
        if mod is not None:
            base = (base * base) % mod
        else:
            base = (base * base)
        exp //= 2

    return res

# Ví dụ sử dụng:
print(f"2^10 = {exponentiation_by_squaring(2, 10)}")
print(f"3^5 mod 7 = {exponentiation_by_squaring(3, 5, 7)}")
print(f"5^13 = {exponentiation_by_squaring(5, 13)}")
```
