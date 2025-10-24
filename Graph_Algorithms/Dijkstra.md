
# Thuật toán Dijkstra

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Dijkstra là một thuật toán để tìm đường đi ngắn nhất giữa các nút trong một đồ thị, có thể đại diện cho, ví dụ, mạng lưới đường bộ. Nó được hình thành bởi nhà khoa học máy tính Edsger W. Dijkstra vào năm 1956 và được xuất bản ba năm sau đó.

Thuật toán tồn tại trong nhiều biến thể; phiên bản gốc của Dijkstra đã tìm thấy đường đi ngắn nhất giữa hai nút đã cho, nhưng một biến thể phổ biến hơn sẽ sửa một nút duy nhất làm nút "nguồn" và tìm các đường đi ngắn nhất từ nguồn đến tất cả các nút khác trong đồ thị, tạo ra một cây đường đi ngắn nhất.

**Quan trọng:** Thuật toán Dijkstra chỉ hoạt động trên các đồ thị có trọng số cạnh **không âm**.

## Mã giả (Pseudocode)

```
function Dijkstra(Graph, source) is
    dist := array of size |V|, initialized to infinity
    prev := array of size |V|, initialized to undefined
    dist[source] := 0

    Q := a priority queue of all vertices in Graph

    while Q is not empty do
        u := vertex in Q with min dist[u]
        remove u from Q

        for each neighbor v of u do
            alt := dist[u] + length(u, v)
            if alt < dist[v] then
                dist[v] := alt
                prev[v] := u

    return dist, prev
```

*   `Graph`: Đồ thị đầu vào
*   `source`: Nút nguồn
*   `dist`: Mảng để lưu trữ khoảng cách ngắn nhất hiện tại từ `source` đến mỗi nút
*   `prev`: Mảng để lưu trữ nút trước đó trên đường đi ngắn nhất
*   `Q`: Hàng đợi ưu tiên để chọn hiệu quả nút có khoảng cách nhỏ nhất

## Hướng tiếp cận

Thuật toán Dijkstra hoạt động bằng cách duy trì một tập hợp các nút đã được truy cập và khoảng cách ngắn nhất đã biết từ nguồn đến chúng. Nó hoạt động theo các bước sau:

1.  **Khởi tạo:**
    *   Tạo một mảng `distances` và khởi tạo khoảng cách đến tất cả các nút là vô cùng, ngoại trừ nút nguồn, được đặt thành 0.
    *   Tạo một hàng đợi ưu tiên và thêm tất cả các nút vào đó. Hàng đợi ưu tiên sẽ sắp xếp các nút dựa trên khoảng cách của chúng từ nguồn.

2.  **Vòng lặp:** Trong khi hàng đợi ưu tiên không trống:
    *   **Trích xuất nút nhỏ nhất:** Chọn nút `u` trong hàng đợi ưu tiên có khoảng cách nhỏ nhất từ nguồn.
    *   **Khám phá các nút lân cận:** Đối với mỗi nút lân cận `v` của `u`:
        *   Tính toán khoảng cách đến `v` thông qua `u`: `distance_through_u = distances[u] + weight(u, v)`.
        *   **Thư giãn (Relax):** Nếu `distance_through_u` nhỏ hơn khoảng cách đã biết hiện tại đến `v` (`distances[v]`), hãy cập nhật `distances[v]` thành `distance_through_u`.

3.  **Kết thúc:** Khi hàng đợi ưu tiên trống, mảng `distances` sẽ chứa khoảng cách đường đi ngắn nhất từ nút nguồn đến tất cả các nút khác.

## Ứng dụng

*   **Định tuyến mạng:** Được sử dụng trong các giao thức định tuyến như OSPF (Open Shortest Path First) để tìm đường đi tốt nhất cho các gói dữ liệu di chuyển qua mạng.
*   **Hệ thống GPS và bản đồ:** Để tìm đường đi ngắn nhất giữa hai địa điểm trên bản đồ đường bộ.
*   **Lập kế hoạch chuyến bay:** Tìm đường bay ngắn nhất hoặc rẻ nhất giữa các thành phố.
*   **Tin sinh học:** Được sử dụng trong phân tích trình tự và mạng lưới trao đổi chất.

## Bài toán thực hành (LeetCode)

Thuật toán Dijkstra là một trong những thuật toán quan trọng nhất để tìm đường đi ngắn nhất trên đồ thị có trọng số không âm. Nó được sử dụng rộng rãi trong nhiều bài toán.

*   [743. Network Delay Time](https://leetcode.com/problems/network-delay-time/)
*   [1631. Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)
*   [787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (Có thể giải bằng biến thể của Dijkstra hoặc Bellman-Ford)
*   [1514. Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/) (Biến thể của Dijkstra)

## Triển khai (Python)

```python
import heapq

def dijkstra(graph, start):
    # Khởi tạo khoảng cách đến tất cả các nút là vô cùng, ngoại trừ nút bắt đầu là 0.
    distances = {node: float('inf') for node in graph}
    distances[start] = 0

    # Hàng đợi ưu tiên để lưu trữ các bộ (khoảng cách, nút).
    pq = [(0, start)]

    while pq:
        # Lấy nút có khoảng cách nhỏ nhất.
        current_distance, current_node = heapq.heappop(pq)

        # Nếu chúng ta đã tìm thấy một đường đi ngắn hơn, hãy bỏ qua.
        if current_distance > distances[current_node]:
            continue

        # Khám phá các nút lân cận.
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            # Nếu chúng ta tìm thấy một đường đi ngắn hơn đến nút lân cận, hãy cập nhật nó.
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances

# Ví dụ sử dụng:
graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}

print("Khoảng cách từ A:")
print(dijkstra(graph, 'A'))
```
