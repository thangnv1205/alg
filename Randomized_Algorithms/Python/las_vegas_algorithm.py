
import random

def las_vegas_search(arr, target):
    n = len(arr)
    while True:
        # Chọn ngẫu nhiên một chỉ số
        idx = random.randint(0, n - 1)
        # Kiểm tra xem phần tử tại chỉ số đó có phải là mục tiêu không
        if arr[idx] == target:
            return idx
        # Nếu không, tiếp tục lặp lại. Thuật toán này luôn tìm thấy câu trả lời đúng
        # nhưng thời gian chạy là ngẫu nhiên.
