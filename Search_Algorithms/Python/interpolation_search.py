
def interpolation_search(arr, n, x):
    # Tìm chỉ số của hai góc
    lo = 0
    hi = (n - 1)

    # Vì mảng đã được sắp xếp, nên phần tử phải nằm trong phạm vi được xác định bởi các góc
    while lo <= hi and x >= arr[lo] and x <= arr[hi]:
        if lo == hi:
            if arr[lo] == x:
                return lo;
            return -1;

        # Thăm dò vị trí bằng công thức nội suy
        pos = lo + int(((float(hi - lo) / ( arr[hi] - arr[lo])) * ( x - arr[lo])))

        # Nếu tìm thấy, trả về chỉ số
        if arr[pos] == x:
            return pos

        # Nếu x lớn hơn, x nằm ở phần trên
        if arr[pos] < x:
            lo = pos + 1;

        # Nếu x nhỏ hơn, x nằm ở phần dưới
        else:
            hi = pos - 1;

    return -1
