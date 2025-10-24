
# Thuật toán Kruskal

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Kruskal là một thuật toán tham lam để tìm cây bao trùm tối thiểu (Minimum Spanning Tree - MST) cho một đồ thị vô hướng, có trọng số. Một cây bao trùm tối thiểu của một đồ thị là một tập hợp con của các cạnh kết nối tất cả các đỉnh với nhau, không có chu trình và với tổng trọng số cạnh tối thiểu có thể.

Thuật toán hoạt động bằng cách sắp xếp tất cả các cạnh theo trọng số tăng dần và thêm từng cạnh vào cây bao trùm đang phát triển, miễn là việc thêm cạnh đó không tạo thành một chu trình.

## Mã giả (Pseudocode)

```
function Kruskal(G) is
    F := new forest (a set of trees), where each vertex in G is a separate tree
    E := the set of edges in G
    sort E by weight in non-decreasing order
    MST := empty set

    while F has more than one tree and E is not empty do
        (u, v) := the edge in E with the minimum weight
        remove (u, v) from E
        if find-set(u) ≠ find-set(v) then
            add edge (u, v) to MST
            union(u, v)
    
    return MST
```

*   `G`: Đồ thị
*   `F`: Một tập hợp các cây (ban đầu mỗi đỉnh là một cây riêng lẻ)
*   `E`: Tập hợp các cạnh
*   `MST`: Cây bao trùm tối thiểu
*   `find-set(u)`: Tìm tập hợp chứa đỉnh `u` (để kiểm tra chu trình)
*   `union(u, v)`: Hợp nhất hai tập hợp chứa `u` và `v`

## Hướng tiếp cận

1.  **Sắp xếp các cạnh:** Tạo một danh sách tất cả các cạnh trong đồ thị và sắp xếp chúng theo trọng số tăng dần.
2.  **Khởi tạo:** Khởi tạo một cây bao trùm tối thiểu (MST) rỗng và một cấu trúc dữ liệu Disjoint Set Union (DSU), trong đó mỗi đỉnh ban đầu nằm trong tập hợp riêng của nó.
3.  **Lặp qua các cạnh:** Lặp qua danh sách các cạnh đã sắp xếp.
4.  **Kiểm tra chu trình:** Đối với mỗi cạnh `(u, v)`, hãy kiểm tra xem `u` và `v` đã thuộc cùng một tập hợp (cùng một thành phần liên thông) hay chưa bằng cách sử dụng thao tác `find` của DSU. Nếu chúng không thuộc cùng một tập hợp, việc thêm cạnh này sẽ không tạo ra chu trình.
5.  **Thêm vào MST:** Nếu cạnh không tạo ra chu trình, hãy thêm nó vào MST và hợp nhất hai tập hợp chứa `u` và `v` bằng cách sử dụng thao tác `union` của DSU.
6.  **Kết thúc:** Lặp lại quá trình cho đến khi MST có `|V| - 1` cạnh, trong đó `|V|` là số đỉnh.

## Ứng dụng

*   **Thiết kế mạng:** Tìm cách rẻ nhất để kết nối một tập hợp các thiết bị đầu cuối (ví dụ: máy tính, thành phố) với nhau.
*   **Phân cụm:** Được sử dụng trong các thuật toán phân cụm để nhóm các điểm dữ liệu tương tự.
*   **Xấp xỉ các bài toán NP-khó:** Được sử dụng làm một bước trong các thuật toán xấp xỉ cho các bài toán như bài toán người bán hàng.

## Bài toán thực hành (LeetCode)

Thuật toán Kruskal là một thuật toán tham lam để tìm cây bao trùm tối thiểu (MST). Nó thường được sử dụng trong các bài toán liên quan đến kết nối các điểm với chi phí tối thiểu.

*   [1584. Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)
*   [1135. Connecting Cities With Minimum Cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost/)

## Triển khai (Python)

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        i_id = self.find(i)
        j_id = self.find(j)
        if i_id != j_id:
            if self.rank[i_id] > self.rank[j_id]:
                self.parent[j_id] = i_id
            else:
                self.parent[i_id] = j_id
                if self.rank[i_id] == self.rank[j_id]:
                    self.rank[j_id] += 1
            return True
        return False

def kruskal(graph):
    # graph là một danh sách các bộ (u, v, w)
    mst = []
    # Giả sử các đỉnh được đánh số từ 0 đến V-1
    V = 0
    for u,v,w in graph:
        V = max(V, u, v)
    V += 1

    edges = sorted(graph, key=lambda item: item[2])
    dsu = DSU(V)
    num_edges = 0
    i = 0
    while num_edges < V - 1 and i < len(edges):
        u, v, weight = edges[i]
        i += 1
        if dsu.union(u,v):
            num_edges += 1
            mst.append((u,v,weight))
    return mst

# Ví dụ sử dụng:
graph = [(0, 1, 10), (0, 2, 6), (0, 3, 5), (1, 3, 15), (2, 3, 4)]

mst = kruskal(graph)

print("Các cạnh trong cây bao trùm tối thiểu:")
for u, v, weight in mst:
    print("%d -- %d == %d" % (u, v, weight))
```
