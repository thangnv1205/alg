
def sieve_of_eratosthenes(n):
    # Tạo một mảng boolean "prime[0..n]" và khởi tạo tất cả các mục là true.
    # Một giá trị tại prime[i] sẽ là false nếu i không phải là số nguyên tố, ngược lại là true.
    prime = [True for i in range(n + 1)]
    p = 2
    while (p * p <= n):
        # Nếu prime[p] vẫn là true, thì đó là một số nguyên tố
        if (prime[p] == True):
            # Cập nhật tất cả các bội số của p thành false
            for i in range(p * p, n + 1, p):
                prime[i] = False
        p += 1

    # Thu thập tất cả các số nguyên tố
    primes = []
    for p in range(2, n + 1):
        if prime[p]:
            primes.append(p)
    return primes
