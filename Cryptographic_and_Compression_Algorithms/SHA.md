# SHA (Secure Hash Algorithm)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

SHA (Secure Hash Algorithm) là một họ các hàm băm mật mã được thiết kế bởi Cơ quan An ninh Quốc gia Hoa Kỳ (NSA) và được Viện Tiêu chuẩn và Công nghệ Quốc gia (NIST) xuất bản như một Tiêu chuẩn Xử lý Thông tin Liên bang (FIPS). Các hàm băm SHA được sử dụng rộng rãi trong các ứng dụng bảo mật để tạo ra một "dấu vân tay" duy nhất cho một khối dữ liệu.

Các phiên bản phổ biến của SHA bao gồm:

*   **SHA-1:** Hiện được coi là không an toàn cho hầu hết các mục đích mật mã do các cuộc tấn công va chạm đã được chứng minh.
*   **SHA-2:** Bao gồm các biến thể như SHA-224, SHA-256, SHA-384, SHA-512. SHA-256 và SHA-512 là những phiên bản được sử dụng phổ biến nhất.
*   **SHA-3:** Một tiêu chuẩn mới hơn, được chọn thông qua một cuộc thi công khai, cung cấp một cấu trúc khác với SHA-2.

Một hàm băm mật mã lấy một đầu vào (hoặc "tin nhắn") và trả về một chuỗi byte có kích thước cố định, thường được gọi là "giá trị băm" hoặc "tóm tắt tin nhắn". Các thuộc tính chính của hàm băm mật mã là:

*   **Tính xác định:** Cùng một đầu vào luôn tạo ra cùng một đầu ra băm.
*   **Tính toán hiệu quả:** Việc tính toán giá trị băm cho bất kỳ đầu vào nào là nhanh chóng.
*   **Kháng tiền ảnh (Pre-image Resistance):** Không thể tìm thấy đầu vào từ đầu ra băm.
*   **Kháng tiền ảnh thứ hai (Second Pre-image Resistance):** Không thể tìm thấy một đầu vào khác có cùng đầu ra băm với một đầu vào đã cho.
*   **Kháng va chạm (Collision Resistance):** Không thể tìm thấy hai đầu vào khác nhau tạo ra cùng một đầu ra băm.

## Mã giả (Pseudocode) - Tổng quan SHA-256

Một triển khai đầy đủ của SHA-256 là rất phức tạp. Dưới đây là tổng quan cấp cao về các bước:

```
function SHA256(message) is
    // 1. Đệm tin nhắn
    padded_message := pad(message)

    // 2. Phân tích tin nhắn thành các khối 512-bit
    blocks := parse(padded_message)

    // 3. Khởi tạo các giá trị băm H0 đến H7
    H := initial_hash_values

    // 4. Xử lý từng khối
    for each block in blocks do
        // Tạo lịch trình tin nhắn 64 từ
        W := message_schedule(block)

        // Khởi tạo các biến làm việc a, b, c, d, e, f, g, h
        a, b, c, d, e, f, g, h := H

        // Vòng lặp chính 64 lần
        for t from 0 to 63 do
            Σ1 := (e rightrotate 6) xor (e rightrotate 11) xor (e rightrotate 25)
            Ch := (e and f) xor ((not e) and g)
            temp1 := h + Σ1 + Ch + K[t] + W[t]

            Σ0 := (a rightrotate 2) xor (a rightrotate 13) xor (a rightrotate 22)
            Maj := (a and b) xor (a and c) xor (b and c)
            temp2 := Σ0 + Maj

            h := g
            g := f
            f := e
            e := d + temp1
            d := c
            c := b
            b := a
            a := temp1 + temp2

        // Cộng các giá trị băm của khối vào kết quả
        H[0] := H[0] + a
        H[1] := H[1] + b
        H[2] := H[2] + c
        H[3] := H[3] + d
        H[4] := H[4] + e
        H[5] := H[5] + f
        H[6] := H[6] + g
        H[7] := H[7] + h

    // 5. Xuất giá trị băm cuối cùng
    return concatenate(H)
```

## Hướng tiếp cận

Các thuật toán SHA hoạt động theo một quy trình nhiều bước:

1.  **Đệm (Padding):** Tin nhắn đầu vào được đệm để đảm bảo độ dài của nó là bội số của kích thước khối (ví dụ: 512 bit cho SHA-256). Điều này bao gồm việc thêm một bit '1', theo sau là các bit '0' và cuối cùng là độ dài của tin nhắn gốc.
2.  **Phân tích (Parsing):** Tin nhắn đã đệm được phân tích thành các khối có kích thước cố định.
3.  **Khởi tạo giá trị băm:** Một tập hợp các giá trị băm ban đầu (thường là các hằng số được xác định trước) được sử dụng để bắt đầu quá trình băm.
4.  **Xử lý khối:** Mỗi khối được xử lý tuần tự. Trong mỗi khối, một loạt các phép toán logic và số học (ví dụ: XOR, AND, NOT, dịch chuyển bit, cộng modulo) được thực hiện trên dữ liệu của khối và các giá trị băm hiện tại. Các phép toán này được lặp lại trong một số vòng nhất định.
5.  **Đầu ra:** Sau khi tất cả các khối đã được xử lý, các giá trị băm cuối cùng được nối lại để tạo thành giá trị băm cuối cùng của tin nhắn.

## Ứng dụng

*   **Kiểm tra toàn vẹn dữ liệu:** Để xác minh rằng một tệp hoặc tin nhắn không bị thay đổi trong quá trình truyền hoặc lưu trữ.
*   **Mật khẩu:** Lưu trữ mật khẩu dưới dạng băm thay vì văn bản thuần túy để bảo mật.
*   **Chữ ký số:** Là một phần của quy trình chữ ký số để tạo ra một tóm tắt tin nhắn.
*   **Blockchain và tiền điện tử:** Là một thành phần cốt lõi trong việc tạo ra các khối và xác minh giao dịch.

## Bài toán thực hành (LeetCode)

SHA là một hàm băm mật mã được sử dụng để đảm bảo tính toàn vẹn của dữ liệu. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai SHA, nhưng các bài toán liên quan đến băm, kiểm tra tính toàn vẹn hoặc xử lý chuỗi có thể giúp bạn củng cố kiến thức.

*   [205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) (Liên quan đến việc ánh xạ ký tự)
*   [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) (Liên quan đến việc kiểm tra sự bằng nhau của các tập hợp ký tự)

## Triển khai (Python) - Sử dụng thư viện hashlib

Python cung cấp mô-đun `hashlib` tích hợp sẵn để làm việc với các hàm băm mật mã như SHA. Đây là cách thực tế để sử dụng SHA trong các ứng dụng Python.

```python
import hashlib

def sha256_hash(data):
    """Tính toán băm SHA256 của dữ liệu đã cho."""
    # Chuyển đổi dữ liệu thành bytes nếu nó là chuỗi
    if isinstance(data, str):
        data = data.encode('utf-8')
    
    # Tạo đối tượng băm SHA256
    hasher = hashlib.sha256()
    
    # Cập nhật đối tượng băm với dữ liệu
    hasher.update(data)
    
    # Lấy giá trị băm dưới dạng chuỗi thập lục phân
    return hasher.hexdigest()

# Ví dụ sử dụng:
message1 = "Xin chào, thế giới!"
hash1 = sha256_hash(message1)
print(f"Hash SHA256 của \"{message1}\": {hash1}")

message2 = "Xin chào, thế giới! " # Có một khoảng trắng ở cuối
hash2 = sha256_hash(message2)
print(f"Hash SHA256 của \"{message2}\": {hash2}")

message3 = "Xin chào, thế giới!"
hash3 = sha256_hash(message3)
print(f"Hash SHA256 của \"{message3}\": {hash3}")

print(f"Hash1 == Hash3: {hash1 == hash3}") # Nên là True
print(f"Hash1 == Hash2: {hash1 == hash2}") # Nên là False
```
