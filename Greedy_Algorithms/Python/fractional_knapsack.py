
def fractional_knapsack(W, arr):
    # Sắp xếp các vật phẩm theo tỷ lệ giá trị/trọng lượng giảm dần
    arr.sort(key=lambda x: (x[1] / x[0]), reverse=True)

    final_value = 0.0

    for item in arr:
        weight = item[0]
        value = item[1]

        if W >= weight:
            # Lấy toàn bộ vật phẩm
            W -= weight
            final_value += value
        else:
            # Lấy một phần của vật phẩm
            final_value += value * (W / weight)
            W = 0
            break
    return final_value
