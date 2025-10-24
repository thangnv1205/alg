
def bellman_ford(graph, source):
    """
    Thuật toán Bellman-Ford tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả các đỉnh khác
    trong một đồ thị có trọng số, có thể chứa trọng số âm.
    Nó cũng có thể phát hiện các chu trình trọng số âm.

    Args:
        graph (dict): Biểu diễn đồ thị bằng danh sách kề.
                      Mỗi khóa là một đỉnh, giá trị là một dict các đỉnh kề và trọng số.
                      Ví dụ: {'A': {'B': -1, 'C': 4}, ...}
        source (hashable): Đỉnh nguồn.

    Returns:
        dict: Một từ điển chứa khoảng cách ngắn nhất từ nguồn đến mỗi đỉnh,
              hoặc None nếu phát hiện chu trình trọng số âm.
    """
    # Bước 1: Khởi tạo khoảng cách từ nguồn đến tất cả các đỉnh khác là vô cùng.
    # Khoảng cách đến đỉnh nguồn là 0.
    dist = {node: float('Inf') for node in graph}
    dist[source] = 0

    # Bước 2: Thư giãn tất cả các cạnh |V| - 1 lần.
    # |V| là số đỉnh trong đồ thị.
    # Sau |V| - 1 lần lặp, tất cả các đường đi ngắn nhất (không có chu trình âm)
    # sẽ được tìm thấy.
    for _ in range(len(graph) - 1):
        # Duyệt qua tất cả các cạnh trong đồ thị.
        for u, neighbors in graph.items():
            for v, weight in neighbors.items():
                # Nếu có đường đi đến u và đường đi qua u đến v ngắn hơn đường đi hiện tại đến v,
                # cập nhật khoảng cách đến v.
                if dist[u] != float('Inf') and dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight

    # Bước 3: Kiểm tra các chu trình trọng số âm.
    # Thực hiện thêm một lần lặp qua tất cả các cạnh.
    # Nếu bất kỳ khoảng cách nào được cập nhật trong lần lặp này,
    # điều đó có nghĩa là đồ thị chứa một chu trình trọng số âm.
    for u, neighbors in graph.items():
        for v, weight in neighbors.items():
            if dist[u] != float('Inf') and dist[u] + weight < dist[v]:
                print("Đồ thị chứa chu trình trọng số âm")
                return None # Trả về None để chỉ ra sự tồn tại của chu trình âm

    return dist
