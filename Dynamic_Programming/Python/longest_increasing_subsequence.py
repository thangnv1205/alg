
def longest_increasing_subsequence(arr):
    n = len(arr)
    # dp[i] lưu trữ độ dài của LIS kết thúc tại arr[i]
    dp = [1] * n

    # Tính toán các giá trị dp từ trái sang phải
    for i in range(1, n):
        for j in range(i):
            if arr[i] > arr[j] and dp[i] < dp[j] + 1:
                dp[i] = dp[j] + 1

    # Độ dài LIS là giá trị lớn nhất trong mảng dp
    return max(dp)
