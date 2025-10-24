
from collections import defaultdict

def longest_path_dag(graph):
    """
    Tìm đường đi dài nhất trong Đồ thị có hướng không có chu trình (DAG).
    Thuật toán này sử dụng sắp xếp topo và quy hoạch động.

    Args:
        graph (dict): Biểu diễn đồ thị bằng danh sách kề.
                      Mỗi khóa là một đỉnh, giá trị là một dict các đỉnh kề và trọng số.
                      Ví dụ: {'A': {'B': 3, 'C': 2}, 'B': {'D': 4}, 'C': {'D': 1}, 'D': {}}

    Returns:
        int: Độ dài của đường đi dài nhất trong DAG.
    """
    # Bước 1: Thực hiện sắp xếp topo
    # Sử dụng DFS để lấy thứ tự topo
    visited = {node: False for node in graph} # Theo dõi các đỉnh đã thăm
    stack = [] # Stack để lưu trữ thứ tự topo

    def dfs_util(u):
        visited[u] = True
        # Duyệt qua tất cả các đỉnh kề của u
        for v in graph[u]:
            if not visited[v]:
                dfs_util(v)
        stack.append(u) # Đẩy đỉnh vào stack sau khi tất cả các đỉnh kề đã được thăm

    # Gọi DFS cho tất cả các đỉnh để đảm bảo tất cả các thành phần được xử lý
    for node in graph:
        if not visited[node]:
            dfs_util(node)

    # Đảo ngược stack để có thứ tự topo (đỉnh nguồn ở đầu)
    topological_order = stack[::-1]

    # Bước 2: Khởi tạo khoảng cách
    # dist[u] sẽ lưu trữ độ dài đường đi dài nhất đến u
    dist = {node: float('-inf') for node in graph} # Khởi tạo khoảng cách là âm vô cùng

    max_overall_path = 0 # Biến để lưu trữ độ dài đường đi dài nhất tổng thể

    # Xử lý từng đỉnh theo thứ tự topo.
    # Chúng ta cần xem xét mọi đỉnh như một điểm bắt đầu tiềm năng
    # để tìm đường đi dài nhất tổng thể.
    for start_node in topological_order:
        # Khởi tạo lại current_dist cho mỗi nút nguồn tiềm năng
        current_dist = {node: float('-inf') for node in graph}
        current_dist[start_node] = 0 # Đặt khoảng cách của nút nguồn là 0

        # Duyệt qua các đỉnh theo thứ tự topo
        for u in topological_order:
            # Nếu có đường đi đến u
            if current_dist[u] != float('-inf'):
                # Thư giãn các cạnh kề của u
                for v, weight in graph[u].items():
                    # Nếu đường đi qua u đến v dài hơn đường đi hiện tại đến v
                    if current_dist[v] < current_dist[u] + weight:
                        current_dist[v] = current_dist[u] + weight

        # Cập nhật đường đi dài nhất tổng thể được tìm thấy cho đến nay
        # Đảm bảo current_dist không rỗng trước khi gọi max()
        if current_dist:
            max_overall_path = max(max_overall_path, max(current_dist.values()))

    return max_overall_path
