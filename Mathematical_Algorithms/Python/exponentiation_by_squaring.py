
def exponentiation_by_squaring(base, exp, mod=None):
    res = 1
    base %= mod if mod else base # Đảm bảo base nằm trong phạm vi modulo nếu có

    while exp > 0:
        # Nếu exp là lẻ, nhân base với res
        if exp % 2 == 1:
            res = (res * base) % mod if mod else (res * base)

        # exp trở thành exp/2
        base = (base * base) % mod if mod else (base * base)
        exp //= 2

    return res
