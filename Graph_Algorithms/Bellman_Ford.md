
# Thuật toán Bellman-Ford

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Bellman-Ford là một thuật toán tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả các đỉnh khác trong một đồ thị có trọng số. Nó tương tự như thuật toán của Dijkstra, nhưng nó có khả năng xử lý các đồ thị có trọng số cạnh âm, điều mà thuật toán của Dijkstra không thể làm được.

Sự đánh đổi cho sự linh hoạt này là Bellman-Ford chậm hơn Dijkstra. Bellman-Ford hoạt động bằng cách "thư giãn" các cạnh lặp đi lặp lại, và nó thực hiện điều này `|V| - 1` lần, trong đó `|V|` là số đỉnh trong đồ thị. Sau `|V| - 1` lần lặp, nếu vẫn có thể thư giãn một cạnh, điều đó có nghĩa là đồ thị chứa một chu trình trọng số âm.

## Mã giả (Pseudocode)

```
function BellmanFord(list vertices, list edges, vertex source) is
   // Bước 1: khởi tạo đồ thị
   distance := create list
   predecessor := create list
   for each vertex v in vertices do
       distance[v] := inf
       predecessor[v] := null
   distance[source] := 0

   // Bước 2: thư giãn các cạnh lặp đi lặp lại
   for i from 1 to size(vertices)-1 do
       for each edge (u, v) with weight w in edges do
           if distance[u] + w < distance[v] then
               distance[v] := distance[u] + w
               predecessor[v] := u

   // Bước 3: kiểm tra các chu trình trọng số âm
   for each edge (u, v) with weight w in edges do
       if distance[u] + w < distance[v] then
           error "Đồ thị chứa chu trình trọng số âm"

   return distance, predecessor
```

## Hướng tiếp cận

1.  **Khởi tạo:** Đặt khoảng cách đến nút nguồn là 0 và tất cả các nút khác là vô cùng. Đặt nút tiền nhiệm của tất cả các nút là null.
2.  **Thư giãn các cạnh:** Lặp lại `|V| - 1` lần (trong đó `|V|` là tổng số đỉnh):
    *   Đối với mỗi cạnh `(u, v)` có trọng số `w`, nếu khoảng cách đã tính đến `u` cộng với `w` nhỏ hơn khoảng cách đã biết đến `v`, hãy cập nhật khoảng cách đến `v`.
3.  **Kiểm tra chu trình trọng số âm:** Sau `|V| - 1` lần lặp, thực hiện thêm một lần lặp nữa qua tất cả các cạnh. Nếu bất kỳ khoảng cách nào được cập nhật trong lần lặp này, điều đó có nghĩa là có một chu trình trọng số âm trong đồ thị. Điều này là do một đường đi ngắn nhất đơn giản không thể có nhiều hơn `|V| - 1` cạnh.

## Ứng dụng

*   **Định tuyến với trọng số âm:** Được sử dụng trong các giao thức định tuyến (ví dụ: RIP - Routing Information Protocol) nơi trọng số cạnh có thể là âm (mặc dù trong thực tế, các chu trình trọng số âm được tránh).
*   **Phát hiện chênh lệch giá:** Trong thị trường tài chính, các chu trình trọng số âm có thể đại diện cho các cơ hội kinh doanh chênh lệch giá. Bellman-Ford có thể được sử dụng để phát hiện chúng.

## Bài toán thực hành (LeetCode)

Thuật toán Bellman-Ford rất quan trọng để tìm đường đi ngắn nhất trên đồ thị có trọng số âm và phát hiện chu trình âm. Các bài toán sau có thể được giải bằng Bellman-Ford:

*   [743. Network Delay Time](https://leetcode.com/problems/network-delay-time/) (Có thể giải bằng Bellman-Ford, mặc dù Dijkstra thường nhanh hơn cho trọng số dương)
*   [1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) (Có thể giải bằng Bellman-Ford hoặc Floyd-Warshall)
*   [787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (Có thể giải bằng biến thể của Bellman-Ford)

## Triển khai (Python)

```python
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

# Ví dụ sử dụng:
graph = {
    'A': {'B': -1, 'C': 4},
    'B': {'C': 3, 'D': 2, 'E': 2},
    'C': {},
    'D': {'B': 1, 'C': 5},
    'E': {'D': -3}
}

distances = bellman_ford(graph, 'A')
if distances:
    print("Khoảng cách từ A:", distances)
```
