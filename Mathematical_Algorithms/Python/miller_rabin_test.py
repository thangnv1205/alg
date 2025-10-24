
import random

def power(a, d, n):
    res = 1
    a = a % n
    while d > 0:
        if d % 2 == 1:
            res = (res * a) % n
        d //= 2
        a = (a * a) % n
    return res

def miller_rabin_test(d, n):
    a = random.randint(2, n - 2)
    x = power(a, d, n)

    if x == 1 or x == n - 1:
        return True

    while d != n - 1:
        x = (x * x) % n
        d *= 2

        if x == 1:
            return False
        if x == n - 1:
            return True
    return False

def is_prime_miller_rabin(n, k=4):
    if n <= 1 or n == 4:
        return False
    if n <= 3:
        return True

    d = n - 1
    while d % 2 == 0:
        d //= 2

    for _ in range(k):
        if not miller_rabin_test(d, n):
            return False
    return True
