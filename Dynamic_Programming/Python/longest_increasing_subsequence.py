
def longest_increasing_subsequence(arr):
    """
    Tính độ dài của Dãy con tăng dài nhất (LIS) trong một mảng.
    Sử dụng phương pháp quy hoạch động với độ phức tạp thời gian O(n^2).

    Args:
        arr (list): Mảng các số nguyên đầu vào.

    Returns:
        int: Độ dài của dãy con tăng dài nhất.
    """
    n = len(arr)

    # Trường hợp cơ sở: Mảng rỗng không có LIS.
    if n == 0:
        return 0

    # dp[i] lưu trữ độ dài của LIS kết thúc tại arr[i].
    # Mỗi phần tử tự nó là một LIS có độ dài 1.
    dp = [1] * n

    # Tính toán các giá trị dp từ trái sang phải.
    # Duyệt qua từng phần tử của mảng (bắt đầu từ phần tử thứ hai).
    for i in range(1, n):
        # Đối với mỗi arr[i], duyệt qua tất cả các phần tử arr[j] trước nó.
        for j in range(i):
            # Nếu arr[i] lớn hơn arr[j], thì arr[i] có thể mở rộng LIS kết thúc tại arr[j].
            # Cập nhật dp[i] nếu việc thêm arr[i] tạo ra một LIS dài hơn.
            if arr[i] > arr[j] and dp[i] < dp[j] + 1:
                dp[i] = dp[j] + 1

    # Độ dài LIS tổng thể là giá trị lớn nhất trong mảng dp.
    return max(dp)
