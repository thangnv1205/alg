
import random

def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def extended_gcd(a, b):
    if a == 0:
        return b, 0, 1
    gcd, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    return gcd, x, y

def mod_inverse(a, m):
    gcd, x, y = extended_gcd(a, m)
    if gcd != 1:
        raise Exception('Nghịch đảo modulo không tồn tại')
    else:
        return (x % m + m) % m

def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

def generate_prime(min_val, max_val):
    prime = random.randint(min_val, max_val)
    while not is_prime(prime):
        prime = random.randint(min_val, max_val)
    return prime

def generate_key_pair(min_val=10, max_val=100):
    p = generate_prime(min_val, max_val)
    q = generate_prime(min_val, max_val)
    while p == q:
        q = generate_prime(min_val, max_val)

    n = p * q
    phi = (p - 1) * (q - 1)

    # Chọn e sao cho 1 < e < phi và gcd(e, phi) = 1
    e = random.randint(2, phi - 1)
    while gcd(e, phi) != 1:
        e = random.randint(2, phi - 1)

    # Tính d là nghịch đảo modulo của e mod phi
    d = mod_inverse(e, phi)

    return ((e, n), (d, n)) # Khóa công khai, Khóa riêng tư

def encrypt(public_key, plaintext):
    e, n = public_key
    # C = M^e mod n
    cipher = [pow(ord(char), e, n) for char in plaintext]
    return cipher

def decrypt(private_key, ciphertext):
    d, n = private_key
    # M = C^d mod n
    plain = [chr(pow(char, d, n)) for char in ciphertext]
    return ''.join(plain)
