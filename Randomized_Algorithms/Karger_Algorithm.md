
# Thuật toán Karger (Karger's Algorithm)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Karger là một thuật toán ngẫu nhiên để tìm một cắt nhỏ nhất (minimum cut) trong một đồ thị vô hướng. Một cắt trong đồ thị là một phân vùng các đỉnh thành hai tập hợp không giao nhau, và kích thước của cắt là số lượng cạnh nối hai tập hợp này. Cắt nhỏ nhất là cắt có kích thước nhỏ nhất.

Thuật toán Karger hoạt động bằng cách liên tục co các cạnh được chọn ngẫu nhiên cho đến khi chỉ còn lại hai đỉnh. Số lượng cạnh giữa hai đỉnh còn lại này là kích thước của một cắt. Mặc dù thuật toán này không đảm bảo tìm thấy cắt nhỏ nhất trong một lần chạy, nhưng bằng cách lặp lại nó nhiều lần, xác suất tìm thấy cắt nhỏ nhất tăng lên đáng kể.

## Mã giả (Pseudocode)

```
function KargerMinCut(G) is
    while G has more than 2 vertices do
        choose a random edge (u, v) in G
        contract u and v into a single new vertex
        remove any self-loops

    return the number of edges between the two remaining vertices
```

## Hướng tiếp cận

1.  **Khởi tạo:** Bắt đầu với một đồ thị `G` có `V` đỉnh.
2.  **Co cạnh:** Lặp lại quá trình sau cho đến khi đồ thị chỉ còn lại 2 đỉnh:
    *   Chọn một cạnh `(u, v)` ngẫu nhiên từ đồ thị.
    *   **Co (Contract)** cạnh này: Thay thế các đỉnh `u` và `v` bằng một đỉnh mới, duy nhất. Tất cả các cạnh trước đây nối với `u` hoặc `v` bây giờ sẽ nối với đỉnh mới này. Các cạnh nối `u` và `v` với nhau sẽ trở thành các vòng lặp tự thân và bị loại bỏ.
3.  **Đếm cạnh:** Khi chỉ còn lại hai đỉnh, số lượng cạnh giữa hai đỉnh này là kích thước của một cắt.

Vì thuật toán này là ngẫu nhiên, nó không đảm bảo tìm thấy cắt nhỏ nhất trong một lần chạy. Để tăng xác suất tìm thấy cắt nhỏ nhất, thuật toán thường được chạy nhiều lần và kết quả nhỏ nhất được chọn.

## Ứng dụng

*   **Phân tích độ tin cậy của mạng:** Xác định các điểm yếu trong mạng lưới giao thông, mạng máy tính hoặc mạng lưới điện.
*   **Phân cụm:** Có thể được sử dụng trong các thuật toán phân cụm để tìm các nhóm các nút được kết nối chặt chẽ.
*   **Thiết kế mạch tích hợp:** Để tối ưu hóa việc đặt các thành phần trên chip.

## Bài toán thực hành (LeetCode)

Thuật toán Karger là một thuật toán ngẫu nhiên để tìm cắt nhỏ nhất trong đồ thị. Mặc dù không có bài toán LeetCode trực tiếp yêu cầu triển khai Karger, việc hiểu các khái niệm về cắt đồ thị và cấu trúc DSU là rất quan trọng.

*   [1192. Critical Connections in a Network](https://leetcode.com/problems/critical-connections-in-a-network/) (Liên quan đến các khái niệm về cắt và cầu)
*   [1579. Remove Max Number of Edges to Keep Graph Fully Traversable](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/) (Sử dụng DSU)

## Triển khai (Python)

```python
import random

class Graph:
    def __init__(self, V):
        self.V = V
        self.graph = []

    def add_edge(self, u, v):
        self.graph.append([u, v])

class DSU:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        i_id = self.find(i)
        j_id = self.find(j)
        if i_id != j_id:
            self.parent[i_id] = j_id
            return True
        return False

def karger_min_cut(graph):
    V = graph.V
    edges = graph.graph

    dsu = DSU(V)

    # Số đỉnh còn lại
    vertices_left = V

    while vertices_left > 2:
        # Chọn ngẫu nhiên một cạnh
        random_edge_index = random.randint(0, len(edges) - 1)
        u, v = edges[random_edge_index]

        # Tìm tập hợp của u và v
        set_u = dsu.find(u)
        set_v = dsu.find(v)

        # Nếu chúng không cùng một tập hợp, hợp nhất chúng
        if set_u != set_v:
            dsu.union(set_u, set_v)
            vertices_left -= 1

    # Đếm số cạnh giữa hai siêu đỉnh còn lại
    cut_edges = 0
    for u, v in edges:
        if dsu.find(u) != dsu.find(v):
            cut_edges += 1

    return cut_edges

# Ví dụ sử dụng:
g = Graph(4)
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(0, 3)
g.add_edge(1, 2)
g.add_edge(2, 3)

# Chạy thuật toán nhiều lần để tăng xác suất tìm thấy cắt nhỏ nhất
min_cut_found = float('inf')
for _ in range(100):
    min_cut_found = min(min_cut_found, karger_min_cut(g))

print("Cắt nhỏ nhất được tìm thấy là:", min_cut_found)
```
