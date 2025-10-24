
# Bài toán đường đi dài nhất (Longest Path Problem)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Bài toán đường đi dài nhất trong một đồ thị là tìm một đường đi đơn giản (không lặp lại đỉnh) giữa hai đỉnh đã cho sao cho tổng trọng số của các cạnh trên đường đi là lớn nhất. Bài toán này là một biến thể của bài toán đường đi ngắn nhất.

Đối với các đồ thị tổng quát (có thể có chu trình), bài toán đường đi dài nhất là **NP-khó**, có nghĩa là không có thuật toán thời gian đa thức hiệu quả nào được biết đến để giải quyết nó. Tuy nhiên, đối với một lớp đồ thị đặc biệt, cụ thể là **Đồ thị có hướng không có chu trình (Directed Acyclic Graph - DAG)**, bài toán đường đi dài nhất có thể được giải quyết trong thời gian đa thức bằng cách sử dụng quy hoạch động.

Cách tiếp cận cho DAG thường liên quan đến việc chuyển đổi các trọng số cạnh thành âm và sau đó sử dụng thuật toán đường đi ngắn nhất (như Bellman-Ford hoặc Dijkstra) hoặc sử dụng sắp xếp topo.

## Mã giả (Pseudocode) - Cho DAG

```
function LongestPathInDAG(G, source) is
    dist := map with default value of -Infinity
    dist[source] := 0

    topological_sort_order := topologicalSort(G)

    for each vertex u in topological_sort_order do
        if dist[u] != -Infinity then
            for each neighbor v of u with edge weight w do
                if dist[v] < dist[u] + w then
                    dist[v] := dist[u] + w

    return dist
```

## Hướng tiếp cận (Cho DAG)

1.  **Sắp xếp Topo:** Bước đầu tiên là thực hiện sắp xếp topo trên DAG. Điều này đảm bảo rằng khi chúng ta xử lý một đỉnh, tất cả các đỉnh mà nó phụ thuộc vào đã được xử lý.
2.  **Khởi tạo khoảng cách:** Khởi tạo khoảng cách đến đỉnh nguồn là 0 và khoảng cách đến tất cả các đỉnh khác là âm vô cùng. (Nếu bạn muốn tìm đường đi dài nhất tổng thể, bạn có thể khởi tạo tất cả các khoảng cách là 0 và sau đó tìm giá trị lớn nhất).
3.  **Thư giãn các cạnh:** Lặp qua các đỉnh theo thứ tự topo. Đối với mỗi đỉnh `u` và mỗi đỉnh lân cận `v` của nó, hãy cập nhật khoảng cách đến `v` nếu đường đi qua `u` tạo ra một đường đi dài hơn.
    `dist[v] = max(dist[v], dist[u] + weight(u, v))`
4.  **Kết quả:** Sau khi xử lý tất cả các đỉnh theo thứ tự topo, giá trị lớn nhất trong mảng `dist` sẽ là độ dài của đường đi dài nhất.

## Ứng dụng

*   **Phân tích đường đi tới hạn (Critical Path Analysis):** Trong quản lý dự án, để xác định chuỗi các nhiệm vụ quan trọng nhất (đường đi dài nhất) quyết định thời gian hoàn thành dự án.
*   **Lập lịch trình:** Trong các hệ thống sản xuất hoặc lập lịch trình công việc, để tối ưu hóa thời gian hoàn thành.
*   **Tin sinh học:** Trong phân tích trình tự DNA hoặc protein, để tìm các chuỗi tương đồng dài nhất.

## Bài toán thực hành (LeetCode)

Bài toán đường đi dài nhất trong DAG có thể được giải bằng quy hoạch động kết hợp với sắp xếp topo. Các bài toán sau liên quan đến việc tìm đường đi dài nhất hoặc các đường đi có trọng số tối ưu trong đồ thị.

*   [329. Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) (Có thể giải bằng DP trên DAG)
*   [1135. Connecting Cities With Minimum Cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost/) (Mặc dù là MST, nhưng ý tưởng về đường đi tối ưu có thể liên quan)

## Triển khai (Python)

```python
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
    # Để tìm đường đi dài nhất tổng thể, chúng ta sẽ khởi tạo dist[u] = 0 cho tất cả các nút
    # và sau đó cập nhật chúng.

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

# Ví dụ sử dụng:
graph = {
    'A': {'B': 3, 'C': 2},
    'B': {'D': 4},
    'C': {'D': 1},
    'D': {}
}

print("Độ dài đường đi dài nhất trong DAG là:", longest_path_dag(graph))
```
