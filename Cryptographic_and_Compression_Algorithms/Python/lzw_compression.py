
def lzw_compress(uncompressed):
    """Nén một chuỗi bằng thuật toán LZW."""
    # Xây dựng từ điển.
    dictionary_size = 256
    dictionary = {chr(i): chr(i) for i in range(dictionary_size)}

    w = ""
    result = []
    for c in uncompressed:
        wc = w + c
        if wc in dictionary:
            w = wc
        else:
            result.append(dictionary[w])
            # Thêm wc vào từ điển. wc là một chuỗi mới.
            dictionary[wc] = str(dictionary_size)
            dictionary_size += 1
            w = c

    # Xuất phần còn lại của w
    if w:
        result.append(dictionary[w])
    return ''.join(result)

def lzw_decompress(compressed):
    """Giải nén một danh sách các đầu ra LZW thành một chuỗi dữ liệu."""
    # Xây dựng từ điển.
    dictionary_size = 256
    dictionary = {str(i): chr(i) for i in range(dictionary_size)}

    result = []
    w = compressed[0]
    result.append(dictionary[w])
    entry = dictionary[w]

    for k in compressed[1:]:
        if k in dictionary:
            entry = dictionary[k]
        elif k == str(dictionary_size):
            entry = w + w[0]
        else:
            raise ValueError('Dữ liệu nén bị hỏng')

        result.append(entry)

        # Thêm w + entry[0] vào từ điển.
        dictionary[str(dictionary_size)] = w + entry[0]
        dictionary_size += 1

        w = entry
    return ''.join(result)
