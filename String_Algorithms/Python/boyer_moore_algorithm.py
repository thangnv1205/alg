
NO_OF_CHARS = 256

def bad_char_heuristic(string, size):
    bad_char = [-1] * NO_OF_CHARS
    for i in range(size):
        bad_char[ord(string[i])] = i
    return bad_char

def boyer_moore_search(text, pattern):
    M = len(pattern)
    N = len(text)

    bad_char = bad_char_heuristic(pattern, M)

    s = 0 # s là chỉ số dịch chuyển của pattern đối với text
    occurrences = []
    while s <= N - M:
        j = M - 1

        # Giữ j giảm dần trong khi các ký tự của pattern và text khớp nhau
        # tại vị trí dịch chuyển hiện tại s
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1

        # Nếu pattern được tìm thấy tại vị trí dịch chuyển hiện tại
        # (tức là j trở thành -1)
        if j < 0:
            occurrences.append(s)
            # Dịch chuyển pattern để ký tự tiếp theo trong text
            # khớp với tiền tố dài nhất của pattern
            # Nếu pattern là cuối cùng trong text, thì s + M sẽ là N
            s += (M - bad_char[ord(text[s + M])] if s + M < N else 1)
        else:
            # Dịch chuyển pattern để ký tự không khớp trong text
            # khớp với lần xuất hiện cuối cùng của nó trong pattern.
            # Hàm max được sử dụng để đảm bảo dịch chuyển dương
            s += max(1, j - bad_char[ord(text[s + j])])
    return occurrences
