
def calculate_z_array(s):
    n = len(s)
    z = [0] * n
    L, R = 0, 0

    for i in range(1, n):
        if i > R:
            L, R = i, i
            while R < n and s[R - L] == s[R]:
                R += 1
            z[i] = R - L
            R -= 1
        else:
            k = i - L
            if z[k] < R - i + 1:
                z[i] = z[k]
            else:
                L, R = i, R
                while R < n and s[R - L] == s[R]:
                    R += 1
                z[i] = R - L
                R -= 1
    return z

def z_algorithm_search(text, pattern):
    concat = pattern + "$" + text
    z = calculate_z_array(concat)

    occurrences = []
    for i in range(len(z)):
        if z[i] == len(pattern):
            occurrences.append(i - len(pattern) - 1)
    return occurrences
