
from collections import defaultdict

def longest_path_dag(graph):
    # Bước 1: Thực hiện sắp xếp topo
    # Sử dụng DFS để lấy thứ tự topo
    visited = {node: False for node in graph}
    stack = []

    def dfs_util(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs_util(v)
        stack.append(u)

    for node in graph:
        if not visited[node]:
            dfs_util(node)

    # Đảo ngược stack để có thứ tự topo
    topological_order = stack[::-1]

    # Bước 2: Khởi tạo khoảng cách
    dist = {node: float('-inf') for node in graph}
    # Chọn một nút nguồn tùy ý nếu không có nút nguồn rõ ràng
    # Đối với bài toán đường đi dài nhất, chúng ta cần tìm đường đi dài nhất từ MỌI nút
    # đến MỌI nút, hoặc từ một nút nguồn cụ thể.
    # Ở đây, chúng ta sẽ tìm đường đi dài nhất từ một nút nguồn cụ thể
    # hoặc tìm đường đi dài nhất tổng thể trong DAG.
    # Để tìm đường đi dài nhất tổng thể, chúng ta sẽ khởi tạo dist[u] = 0 cho tất cả các nút
    # và sau đó cập nhật chúng.

    # Để tìm đường đi dài nhất từ một nguồn cụ thể, hãy đặt dist[source] = 0
    # và các nút khác là -inf.
    # Để tìm đường đi dài nhất tổng thể, chúng ta sẽ lặp qua tất cả các nút
    # và coi chúng là nguồn tiềm năng.

    max_overall_path = 0

    for start_node in topological_order:
        # Khởi tạo lại dist cho mỗi nút nguồn tiềm năng
        current_dist = {node: float('-inf') for node in graph}
        current_dist[start_node] = 0

        for u in topological_order:
            if current_dist[u] != float('-inf'):
                for v, weight in graph[u].items():
                    if current_dist[v] < current_dist[u] + weight:
                        current_dist[v] = current_dist[u] + weight

        # Cập nhật đường đi dài nhất tổng thể
        if current_dist:
            max_overall_path = max(max_overall_path, max(current_dist.values()))

    return max_overall_path
