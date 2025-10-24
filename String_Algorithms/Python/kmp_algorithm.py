
def compute_lps_array(pattern, M, lps):
    length = 0 # độ dài của tiền tố hậu tố dài nhất trước đó
    lps[0] = 0
    i = 1

    while i < M:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

def kmp_search(text, pattern):
    N = len(text)
    M = len(pattern)

    lps = [0] * M
    compute_lps_array(pattern, M, lps)

    i = 0 # chỉ số cho text
    j = 0 # chỉ số cho pattern
    occurrences = []

    while i < N:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == M:
            occurrences.append(i - j)
            j = lps[j - 1]
        elif i < N and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return occurrences
