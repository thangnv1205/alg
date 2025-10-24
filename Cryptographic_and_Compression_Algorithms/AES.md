
# AES (Advanced Encryption Standard)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

AES (Advanced Encryption Standard) là một thuật toán mã hóa khối đối xứng được chính phủ Hoa Kỳ áp dụng để bảo mật dữ liệu nhạy cảm. Nó được phát triển bởi hai nhà mật mã học người Bỉ, Joan Daemen và Vincent Rijmen, và được công bố vào năm 1998 dưới tên Rijndael. Năm 2001, NIST (Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ) đã chọn Rijndael làm tiêu chuẩn mã hóa mới, thay thế DES (Data Encryption Standard).

Là một thuật toán mã hóa đối xứng, AES sử dụng cùng một khóa để mã hóa và giải mã dữ liệu. Nó hoạt động trên các khối dữ liệu có kích thước cố định (128 bit) và sử dụng các kích thước khóa khác nhau: 128, 192 hoặc 256 bit. Số vòng lặp (rounds) mà thuật toán thực hiện phụ thuộc vào kích thước khóa.

## Mã giả (Pseudocode) - Tổng quan

Một triển khai đầy đủ của AES là rất phức tạp và dài. Dưới đây là tổng quan cấp cao về các bước chính trong một vòng lặp của AES:

```
function AES_Encrypt(block, key) is
    key_schedule := KeyExpansion(key)
    state := block

    AddRoundKey(state, key_schedule[0])

    for round from 1 to Nr-1 do // Nr là số vòng lặp
        SubBytes(state)
        ShiftRows(state)
        MixColumns(state)
        AddRoundKey(state, key_schedule[round])

    SubBytes(state)
    ShiftRows(state)
    AddRoundKey(state, key_schedule[Nr])

    return state
```

Các bước chính trong mỗi vòng lặp:

*   **SubBytes:** Mỗi byte trong ma trận trạng thái được thay thế bằng một byte khác theo một bảng tra cứu (S-box).
*   **ShiftRows:** Các hàng của ma trận trạng thái được dịch chuyển vòng tròn sang trái một số vị trí nhất định.
*   **MixColumns:** Mỗi cột của ma trận trạng thái được biến đổi bằng cách nhân với một ma trận cố định.
*   **AddRoundKey:** Khóa vòng lặp (được tạo từ khóa chính) được XOR với ma trận trạng thái.

## Hướng tiếp cận

AES là một thuật toán mã hóa khối dựa trên mạng thay thế-hoán vị (substitution-permutation network - SPN). Nó thực hiện một chuỗi các phép biến đổi trên dữ liệu đầu vào (plaintext) để tạo ra dữ liệu đầu ra (ciphertext).

1.  **Mở rộng khóa (Key Expansion):** Từ khóa chính, một lịch trình khóa (key schedule) được tạo ra, bao gồm các khóa vòng lặp (round keys) được sử dụng trong mỗi vòng lặp của quá trình mã hóa/giải mã.
2.  **Khởi tạo:** Khối văn bản gốc được XOR với khóa vòng lặp đầu tiên.
3.  **Các vòng lặp chính:** Đối với mỗi vòng lặp (trừ vòng lặp cuối cùng), bốn phép biến đổi sau được thực hiện:
    *   **SubBytes:** Thay thế byte.
    *   **ShiftRows:** Dịch chuyển hàng.
    *   **MixColumns:** Trộn cột.
    *   **AddRoundKey:** Thêm khóa vòng lặp.
4.  **Vòng lặp cuối cùng:** Vòng lặp cuối cùng bỏ qua bước MixColumns.
5.  **Giải mã:** Quá trình giải mã là đảo ngược của quá trình mã hóa, thực hiện các phép biến đổi ngược lại theo thứ tự ngược lại.

## Ứng dụng

*   **Bảo mật dữ liệu:** Được sử dụng rộng rãi để bảo vệ dữ liệu nhạy cảm trong nhiều ứng dụng, bao gồm truyền thông không dây, lưu trữ đám mây và giao dịch tài chính.
*   **Giao thức bảo mật:** Là một thành phần quan trọng trong các giao thức bảo mật như SSL/TLS, IPsec và SSH.
*   **Mã hóa ổ đĩa:** Được sử dụng trong các hệ thống mã hóa ổ đĩa toàn bộ (ví dụ: BitLocker, FileVault).

## Bài toán thực hành (LeetCode)

AES là một thuật toán mã hóa đối xứng phức tạp, và LeetCode không có các bài toán trực tiếp yêu cầu triển khai AES từ đầu. Tuy nhiên, các bài toán liên quan đến thao tác bit, ma trận và các phép toán modulo có thể giúp bạn củng cố các khái niệm cơ bản của AES.

*   [136. Single Number](https://leetcode.com/problems/single-number/) (Liên quan đến phép toán XOR)
*   [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) (Liên quan đến thao tác ma trận)

## Triển khai (Python) - Khái niệm (sử dụng thư viện)

Một triển khai đầy đủ của AES từ đầu là rất phức tạp và dễ mắc lỗi. Trong thực tế, các thư viện mật mã đã được kiểm tra kỹ lưỡng và tối ưu hóa được sử dụng. Dưới đây là một ví dụ khái niệm về cách AES có thể được sử dụng với một thư viện Python phổ biến (`cryptography`).

```python
# Để chạy ví dụ này, bạn cần cài đặt thư viện cryptography:
# pip install cryptography

from cryptography.fernet import Fernet

def generate_key():
    """Tạo một khóa AES ngẫu nhiên."""
    return Fernet.generate_key()

def encrypt_message(message, key):
    """Mã hóa một tin nhắn bằng khóa AES đã cho."""
    f = Fernet(key)
    encrypted_message = f.encrypt(message.encode()) # Mã hóa tin nhắn thành bytes
    return encrypted_message

def decrypt_message(encrypted_message, key):
    """Giải mã một tin nhắn đã mã hóa bằng khóa AES đã cho."""
    f = Fernet(key)
    decrypted_message = f.decrypt(encrypted_message).decode() # Giải mã và giải mã hóa thành chuỗi
    return decrypted_message

# Ví dụ sử dụng:
key = generate_key()
print(f"Khóa được tạo: {key.decode()}")

original_message = "Đây là một tin nhắn bí mật."
print(f"Tin nhắn gốc: {original_message}")

encrypted = encrypt_message(original_message, key)
print(f"Tin nhắn được mã hóa: {encrypted.decode()}")

decrypted = decrypt_message(encrypted, key)
print(f"Tin nhắn được giải mã: {decrypted}")
```
