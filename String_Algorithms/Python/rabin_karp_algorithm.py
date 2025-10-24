
# Hằng số cho thuật toán Rabin-Karp
D = 256 # Số lượng ký tự trong bảng chữ cái đầu vào
Q = 101 # Một số nguyên tố lớn

def rabin_karp_search(text, pattern):
    M = len(pattern)
    N = len(text)
    i = 0
    j = 0
    p = 0    # giá trị băm cho pattern
    t = 0    # giá trị băm cho text
    h = 1
    occurrences = []

    # Giá trị của h sẽ là pow(D, M-1) % Q
    for i in range(M - 1):
        h = (h * D) % Q

    # Tính toán giá trị băm của pattern và cửa sổ đầu tiên của text
    for i in range(M):
        p = (D * p + ord(pattern[i])) % Q
        t = (D * t + ord(text[i])) % Q

    # Trượt pattern qua text từng ký tự một
    for i in range(N - M + 1):
        # Nếu giá trị băm khớp, thì kiểm tra các ký tự một cách riêng lẻ
        if p == t:
            # Kiểm tra các ký tự cho sự khớp
            for j in range(M):
                if text[i + j] != pattern[j]:
                    break
            j += 1
            # Nếu p == t và pattern[0...M-1] == text[i...i+M-1]
            if j == M:
                occurrences.append(i)

        # Tính toán giá trị băm cho cửa sổ tiếp theo của text:
        # Loại bỏ chữ số hàng đầu, thêm chữ số hàng cuối
        if i < N - M:
            t = (D * (t - ord(text[i]) * h) + ord(text[i + M])) % Q

            # Chúng ta có thể nhận được giá trị âm của t, chuyển đổi nó thành dương
            if t < 0:
                t = t + Q

    return occurrences
