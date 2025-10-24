
def fibonacci(n):
    # Tạo một mảng để lưu trữ các giá trị Fibonacci đã tính toán
    f = [0] * (n + 1)

    # Trường hợp cơ sở
    f[1] = 1

    # Tính toán các giá trị Fibonacci từ 2 đến n
    for i in range(2, n + 1):
        f[i] = f[i-1] + f[i-2]

    return f[n]
