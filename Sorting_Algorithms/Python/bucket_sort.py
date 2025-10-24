
def bucket_sort(arr):
    # 1) Tạo các xô rỗng
    n = len(arr)
    buckets = [[] for _ in range(n)]

    # 2) Đặt các phần tử mảng vào các xô khác nhau
    for i in range(n):
        bucket_index = int(n * arr[i])
        buckets[bucket_index].append(arr[i])

    # 3) Sắp xếp các xô riêng lẻ
    for i in range(n):
        buckets[i].sort()

    # 4) Nối các xô lại
    index = 0
    for i in range(n):
        for j in range(len(buckets[i])):
            arr[index] = buckets[i][j]
            index += 1
    return arr
