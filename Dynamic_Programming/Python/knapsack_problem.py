
def knapsack_problem(W, wt, val, n):
    """
    Giải bài toán cái túi 0/1 bằng phương pháp quy hoạch động.
    Mục tiêu là tìm tổng giá trị lớn nhất của các vật phẩm có thể đặt vào một cái túi
    có sức chứa W, trong đó mỗi vật phẩm chỉ có thể được chọn một lần.

    Args:
        W (int): Sức chứa tối đa của cái túi.
        wt (list): Danh sách trọng lượng của các vật phẩm.
        val (list): Danh sách giá trị của các vật phẩm.
        n (int): Tổng số vật phẩm (số lượng phần tử trong wt hoặc val).

    Returns:
        int: Giá trị tối đa có thể có trong cái túi.
    """
    # Tạo một bảng 2D K để lưu trữ kết quả của các bài toán con.
    # K[i][w] sẽ lưu trữ giá trị tối đa có thể có khi xem xét i vật phẩm
    # với sức chứa cái túi là w.
    K = [[0 for x in range(W + 1)] for x in range(n + 1)]

    # Xây dựng bảng K[][] theo cách từ dưới lên (bottom-up).
    for i in range(n + 1):
        for w in range(W + 1):
            # Trường hợp cơ sở: Nếu không có vật phẩm nào hoặc sức chứa cái túi là 0,
            # thì giá trị tối đa là 0.
            if i == 0 or w == 0:
                K[i][w] = 0
            # Nếu trọng lượng của vật phẩm hiện tại (wt[i-1]) nhỏ hơn hoặc bằng sức chứa hiện tại (w):
            # Chúng ta có hai lựa chọn:
            # 1. Bao gồm vật phẩm hiện tại: val[i-1] + K[i-1][w-wt[i-1]]
            #    (giá trị của vật phẩm hiện tại cộng với giá trị tối đa từ các vật phẩm còn lại
            #     với sức chứa giảm đi trọng lượng của vật phẩm hiện tại).
            # 2. Không bao gồm vật phẩm hiện tại: K[i-1][w]
            #    (giá trị tối đa từ các vật phẩm còn lại với cùng sức chứa).
            # Chúng ta chọn giá trị lớn nhất trong hai lựa chọn này.
            elif wt[i-1] <= w:
                K[i][w] = max(val[i-1] + K[i-1][w-wt[i-1]], K[i-1][w])
            # Nếu trọng lượng của vật phẩm hiện tại lớn hơn sức chứa hiện tại,
            # chúng ta không thể bao gồm vật phẩm này, vì vậy giá trị tối đa
            # bằng giá trị tối đa từ các vật phẩm còn lại với cùng sức chứa.
            else:
                K[i][w] = K[i-1][w]

    # Giá trị ở K[n][W] sẽ là giá trị tối đa có thể có trong cái túi với n vật phẩm
    # và sức chứa W.
    return K[n][W]

