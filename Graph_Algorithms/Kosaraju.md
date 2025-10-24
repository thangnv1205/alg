
# Thuật toán Kosaraju

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Kosaraju là một thuật toán hiệu quả để tìm các thành phần liên thông mạnh (Strongly Connected Components - SCCs) trong một đồ thị có hướng. Một SCC là một tập hợp các đỉnh trong đó có một đường đi từ bất kỳ đỉnh nào đến bất kỳ đỉnh nào khác trong tập hợp.

Thuật toán này sử dụng hai lần duyệt tìm kiếm theo chiều sâu (DFS) trên đồ thị và đồ thị chuyển vị của nó (đồ thị với tất cả các cạnh bị đảo ngược).

## Mã giả (Pseudocode)

```
function Kosaraju(G) is
    order := empty list
    visited := set of all vertices, initially empty
    for each vertex u in G do
        if u is not in visited then
            DFS1(G, u, visited, order)

    G_rev := reverse(G) // Đồ thị chuyển vị
    visited := set of all vertices, initially empty
    SCCs := empty list
    while order is not empty do
        u := pop from order
        if u is not in visited then
            current_SCC := empty list
            DFS2(G_rev, u, visited, current_SCC)
            add current_SCC to SCCs
    return SCCs

function DFS1(G, u, visited, order) is
    add u to visited
    for each neighbor v of u in G do
        if v is not in visited then
            DFS1(G, v, visited, order)
    add u to order // Thêm vào sau khi tất cả các con đã được duyệt

function DFS2(G_rev, u, visited, current_SCC) is
    add u to visited
    add u to current_SCC
    for each neighbor v of u in G_rev do
        if v is not in visited then
            DFS2(G_rev, v, visited, current_SCC)
```

## Hướng tiếp cận

Thuật toán Kosaraju bao gồm ba bước chính:

1.  **DFS thứ nhất (DFS1):** Thực hiện một DFS trên đồ thị gốc `G`. Trong quá trình DFS, khi một đỉnh được khám phá hoàn toàn (tức là, tất cả các đỉnh có thể truy cập từ nó đã được truy cập), hãy đẩy nó vào một ngăn xếp hoặc danh sách theo thứ tự hoàn thành.

2.  **Đồ thị chuyển vị:** Xây dựng đồ thị chuyển vị `G_rev` bằng cách đảo ngược hướng của tất cả các cạnh trong `G`.

3.  **DFS thứ hai (DFS2):** Thực hiện một DFS khác trên đồ thị chuyển vị `G_rev`. Lần này, duyệt các đỉnh theo thứ tự được xác định bởi ngăn xếp từ bước 1 (tức là, bắt đầu từ đỉnh được hoàn thành cuối cùng trong DFS1). Mỗi lần DFS2 được gọi trên một đỉnh chưa được truy cập, nó sẽ khám phá tất cả các đỉnh trong một SCC. Tất cả các đỉnh được truy cập trong một lần gọi DFS2 này tạo thành một SCC.

## Ứng dụng

*   **Phân tích mạng xã hội:** Để xác định các nhóm người có ảnh hưởng lẫn nhau.
*   **Phân tích phụ thuộc:** Trong các hệ thống phần mềm hoặc cơ sở dữ liệu, để tìm các thành phần phụ thuộc lẫn nhau.
*   **Kiểm tra tính liên thông mạnh:** Để xác định xem một đồ thị có liên thông mạnh hay không.

## Bài toán thực hành (LeetCode)

Thuật toán Kosaraju được sử dụng để tìm các thành phần liên thông mạnh (SCCs) trong đồ thị có hướng. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Kosaraju, việc hiểu SCCs là rất quan trọng cho các bài toán đồ thị phức tạp hơn.

*   [1192. Critical Connections in a Network](https://leetcode.com/problems/critical-connections-in-a-network/) (Liên quan đến các thành phần liên thông mạnh và cầu)
*   [1568. Minimum Number of Days to Disconnect Island](https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/) (Liên quan đến tính liên thông của đồ thị)

## Triển khai (Python)

```python
from collections import defaultdict

class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = defaultdict(list)

    def add_edge(self, u, v):
        self.graph[u].append(v)

    def dfs_fill_order(self, v, visited, stack):
        visited[v] = True
        for i in self.graph[v]:
            if not visited[i]:
                self.dfs_fill_order(i, visited, stack)
        stack.append(v)

    def dfs_scc(self, v, visited, scc_list):
        visited[v] = True
        scc_list.append(v)
        for i in self.graph[v]:
            if not visited[i]:
                self.dfs_scc(i, visited, scc_list)

    def get_transpose(self):
        g = Graph(self.V)
        for i in self.graph:
            for j in self.graph[i]:
                g.add_edge(j, i)
        return g

    def find_sccs(self):
        stack = []
        visited = [False] * (self.V)

        # Bước 1: Điền các đỉnh vào ngăn xếp theo thứ tự hoàn thành
        for i in range(self.V):
            if not visited[i]:
                self.dfs_fill_order(i, visited, stack)

        # Bước 2: Lấy đồ thị chuyển vị
        gr = self.get_transpose()

        # Bước 3: Thực hiện DFS trên đồ thị chuyển vị theo thứ tự từ ngăn xếp
        visited = [False] * (self.V)
        sccs = []
        while stack:
            i = stack.pop()
            if not visited[i]:
                scc = []
                gr.dfs_scc(i, visited, scc)
                sccs.append(scc)
        return sccs

# Ví dụ sử dụng:
g = Graph(5)
g.add_edge(1, 0)
g.add_edge(0, 2)
g.add_edge(2, 1)
g.add_edge(0, 3)
g.add_edge(3, 4)

sccs = g.find_sccs()
print("Các thành phần liên thông mạnh là:")
for scc in sccs:
    print(scc)
```
