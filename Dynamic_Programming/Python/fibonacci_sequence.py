
def fibonacci(n):
    """
    Tính số Fibonacci thứ n bằng phương pháp quy hoạch động (lập bảng).
    Thuật toán này tránh tính toán lại các giá trị đã được tính toán,
    làm cho nó hiệu quả hơn so với cách tiếp cận đệ quy thuần túy.

    Args:
        n (int): Vị trí của số Fibonacci cần tính (n >= 0).

    Returns:
        int: Số Fibonacci tại vị trí n.
    """
    # Trường hợp cơ sở: F(0) = 0, F(1) = 1
    if n <= 1:
        return n

    # Tạo một mảng (bảng) để lưu trữ các giá trị Fibonacci đã tính toán.
    # Kích thước n + 1 để chứa các giá trị từ F(0) đến F(n).
    f = [0] * (n + 1)

    # Khởi tạo các giá trị cơ sở.
    f[0] = 0
    f[1] = 1

    # Tính toán các giá trị Fibonacci từ 2 đến n bằng cách lặp.
    # Mỗi số Fibonacci là tổng của hai số đứng trước nó: F(i) = F(i-1) + F(i-2).
    for i in range(2, n + 1):
        f[i] = f[i-1] + f[i-2]

    # Trả về số Fibonacci tại vị trí n.
    return f[n]
