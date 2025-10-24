
# Số đỉnh trong đồ thị
V = 4

# Giá trị vô cùng
INF = 99999

# Thuật toán Floyd-Warshall
def floyd_warshall(graph):
    dist = list(map(lambda i: list(map(lambda j: j, i)), graph))

    # Thêm các đỉnh vào tập hợp các đỉnh trung gian
    for k in range(V):
        # Chọn tất cả các đỉnh làm nguồn một lượt
        for i in range(V):
            # Chọn tất cả các đỉnh làm đích cho nguồn đã chọn
            for j in range(V):
                # Nếu đỉnh k nằm trên đường đi ngắn nhất từ i đến j,
                # thì cập nhật giá trị của dist[i][j]
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    return dist
