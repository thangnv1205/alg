
def edit_distance(str1, str2):
    """
    Tính khoảng cách chỉnh sửa (Levenshtein distance) giữa hai chuỗi.
    Khoảng cách chỉnh sửa là số lượng thao tác tối thiểu (chèn, xóa, thay thế)
    cần thiết để biến đổi một chuỗi thành chuỗi kia.

    Args:
        str1 (str): Chuỗi thứ nhất.
        str2 (str): Chuỗi thứ hai.

    Returns:
        int: Khoảng cách chỉnh sửa giữa hai chuỗi.
    """
    m = len(str1)
    n = len(str2)

    # Tạo một bảng (ma trận) dp để lưu trữ kết quả của các bài toán con.
    # dp[i][j] sẽ lưu trữ khoảng cách chỉnh sửa giữa str1[0...i-1] và str2[0...j-1].
    dp = [[0 for x in range(n + 1)] for x in range(m + 1)]

    # Điền bảng dp theo cách từ dưới lên (bottom-up).
    for i in range(m + 1):
        for j in range(n + 1):

            # Nếu chuỗi thứ nhất trống, khoảng cách chỉnh sửa là độ dài của chuỗi thứ hai
            # (chèn tất cả các ký tự của chuỗi thứ hai).
            if i == 0:
                dp[i][j] = j    # Số thao tác tối thiểu = j

            # Nếu chuỗi thứ hai trống, khoảng cách chỉnh sửa là độ dài của chuỗi thứ nhất
            # (xóa tất cả các ký tự của chuỗi thứ nhất).
            elif j == 0:
                dp[i][j] = i    # Số thao tác tối thiểu = i

            # Nếu các ký tự cuối cùng của cả hai chuỗi giống nhau, chúng ta không cần thao tác nào
            # cho các ký tự này, vì vậy khoảng cách chỉnh sửa bằng khoảng cách của các chuỗi còn lại.
            elif str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1]

            # Nếu các ký tự cuối cùng khác nhau, chúng ta phải xem xét ba thao tác có thể:
            # 1. Chèn: dp[i][j-1] + 1 (chèn một ký tự vào str1 để khớp với str2[j-1])
            # 2. Xóa: dp[i-1][j] + 1 (xóa str1[i-1])
            # 3. Thay thế: dp[i-1][j-1] + 1 (thay thế str1[i-1] bằng str2[j-1])
            # Chúng ta chọn giá trị nhỏ nhất trong ba lựa chọn này.
            else:
                dp[i][j] = 1 + min(dp[i][j-1],        # Chi phí chèn
                                   dp[i-1][j],        # Chi phí xóa
                                   dp[i-1][j-1])    # Chi phí thay thế

    # Giá trị ở dp[m][n] sẽ là khoảng cách chỉnh sửa tối thiểu giữa toàn bộ str1 và str2.
    return dp[m][n]

