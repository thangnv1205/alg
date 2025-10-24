
def bellman_ford(graph, source):
    # Bước 1: Khởi tạo khoảng cách từ nguồn đến tất cả các đỉnh khác là vô cùng
    dist = {node: float('Inf') for node in graph}
    dist[source] = 0

    # Bước 2: Thư giãn tất cả các cạnh |V| - 1 lần
    for _ in range(len(graph) - 1):
        for u, neighbors in graph.items():
            for v, weight in neighbors.items():
                if dist[u] != float('Inf') and dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight

    # Bước 3: Kiểm tra các chu trình trọng số âm
    for u, neighbors in graph.items():
        for v, weight in neighbors.items():
            if dist[u] != float('Inf') and dist[u] + weight < dist[v]:
                print("Đồ thị chứa chu trình trọng số âm")
                return None

    return dist
