
def edit_distance(str1, str2):
    m = len(str1)
    n = len(str2)

    # Tạo một bảng để lưu trữ kết quả của các bài toán con
    dp = [[0 for x in range(n + 1)] for x in range(m + 1)]

    # Điền bảng dp theo cách từ dưới lên
    for i in range(m + 1):
        for j in range(n + 1):

            # Nếu chuỗi đầu tiên trống, chỉ có một cách để chuyển đổi chuỗi thứ hai
            # (chèn tất cả các ký tự của chuỗi thứ hai)
            if i == 0:
                dp[i][j] = j    # Min. operations = j

            # Nếu chuỗi thứ hai trống, chỉ có một cách để chuyển đổi chuỗi đầu tiên
            # (xóa tất cả các ký tự của chuỗi đầu tiên)
            elif j == 0:
                dp[i][j] = i    # Min. operations = i

            # Nếu các ký tự cuối cùng giống nhau, bỏ qua chúng và kiểm tra phần còn lại
            elif str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1]

            # Nếu các ký tự cuối cùng khác nhau, hãy xem xét tất cả ba thao tác:
            # chèn, xóa, thay thế
            else:
                dp[i][j] = 1 + min(dp[i][j-1],        # Chèn
                                   dp[i-1][j],        # Xóa
                                   dp[i-1][j-1])    # Thay thế

    return dp[m][n]
