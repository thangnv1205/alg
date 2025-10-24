
# Sắp xếp Topo (Topological Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp topo là một thuật toán để sắp xếp tuyến tính các đỉnh của một **đồ thị có hướng không có chu trình (Directed Acyclic Graph - DAG)**. Đối với mỗi cạnh có hướng `u -> v` từ đỉnh `u` đến đỉnh `v`, `u` đứng trước `v` trong thứ tự sắp xếp.

Nói cách khác, sắp xếp topo là một cách để sắp xếp các đỉnh của một DAG sao cho tất cả các cạnh đều đi từ trái sang phải. Một đồ thị có chu trình không thể có một sắp xếp topo hợp lệ.

Có hai thuật toán chính để thực hiện sắp xếp topo:
1.  **Thuật toán của Kahn:** Dựa trên việc liên tục loại bỏ các đỉnh không có cạnh vào.
2.  **Dựa trên DFS:** Dựa trên việc thực hiện một tìm kiếm theo chiều sâu và thêm các đỉnh vào một danh sách sau khi chúng đã được khám phá hoàn toàn.

## Mã giả (Pseudocode) - Dựa trên DFS

```
function topologicalSort(G) is
    L := empty list that will contain the sorted elements
    S := set of all nodes with no incoming edge

    while S is not empty do
        remove a node n from S
        add n to L
        for each node m with an edge e from n to m do
            remove edge e from the graph
            if m has no other incoming edges then
                insert m into S

    if graph has edges then
        return error (graph has at least one cycle)
    else 
        return L
```

## Hướng tiếp cận (Dựa trên DFS)

1.  **Khởi tạo:** Tạo một ngăn xếp rỗng để lưu trữ thứ tự sắp xếp topo và một tập hợp `visited` để theo dõi các đỉnh đã được truy cập.
2.  **Lặp qua các đỉnh:** Lặp qua tất cả các đỉnh trong đồ thị.
3.  **Gọi DFS:** Nếu một đỉnh chưa được truy cập, hãy gọi một hàm trợ giúp DFS đệ quy trên nó.
4.  **Hàm trợ giúp DFS:**
    *   Đánh dấu đỉnh hiện tại là đã được truy cập.
    *   Đối với mỗi nút lân cận của đỉnh hiện tại, nếu nó chưa được truy cập, hãy gọi đệ quy hàm DFS trên nó.
    *   Sau khi đã truy cập tất cả các nút lân cận (tức là, sau khi cuộc gọi đệ quy trả về), hãy đẩy đỉnh hiện tại vào ngăn xếp.
5.  **Kết quả:** Sau khi vòng lặp chính kết thúc, ngăn xếp sẽ chứa các đỉnh theo thứ tự sắp xếp topo. Chỉ cần lấy các phần tử ra khỏi ngăn xếp để có được thứ tự cuối cùng.

## Ứng dụng

*   **Lập lịch công việc:** Cho một danh sách các công việc có các phụ thuộc (công việc A phải được thực hiện trước công việc B), sắp xếp topo có thể tìm thấy một thứ tự hợp lệ để thực hiện các công việc.
*   **Trình biên dịch:** Để giải quyết các phụ thuộc giữa các mô-đun hoặc tệp mã nguồn.
*   **Bảng tính:** Để tính toán lại các ô dựa trên các phụ thuộc công thức của chúng.
*   **Phân tích đường đi tới hạn (Critical Path Analysis):** Trong quản lý dự án, để xác định chuỗi các nhiệm vụ quan trọng nhất.

## Bài toán thực hành (LeetCode)

Sắp xếp topo là một thuật toán quan trọng cho các đồ thị có hướng không có chu trình (DAG), đặc biệt trong các bài toán lập lịch trình và phụ thuộc.

*   [207. Course Schedule](https://leetcode.com/problems/course-schedule/)
*   [210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
*   [269. Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) (Bài toán khó)

## Triển khai (Python)

```python
from collections import defaultdict

class Graph:
    def __init__(self, vertices):
        self.graph = defaultdict(list)
        self.V = vertices

    def add_edge(self, u, v):
        self.graph[u].append(v)

    def topological_sort_util(self, v, visited, stack):
        visited[v] = True

        for i in self.graph[v]:
            if not visited[i]:
                self.topological_sort_util(i, visited, stack)

        stack.insert(0, v)

    def topological_sort(self):
        visited = [False] * self.V
        stack = []

        for i in range(self.V):
            if not visited[i]:
                self.topological_sort_util(i, visited, stack)

        return stack

# Ví dụ sử dụng:
g = Graph(6)
g.add_edge(5, 2)
g.add_edge(5, 0)
g.add_edge(4, 0)
g.add_edge(4, 1)
g.add_edge(2, 3)
g.add_edge(3, 1)

print("Sắp xếp Topo của đồ thị là:")
print(g.topological_sort())
```
