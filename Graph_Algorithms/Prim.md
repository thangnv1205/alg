
# Thuật toán Prim

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Prim là một thuật toán tham lam khác để tìm cây bao trùm tối thiểu (Minimum Spanning Tree - MST) cho một đồ thị vô hướng, có trọng số. Giống như thuật toán Kruskal, nó tìm thấy một tập hợp con của các cạnh tạo thành một cây bao gồm mọi đỉnh, trong đó tổng trọng số của tất cả các cạnh trong cây được tối thiểu hóa.

Thuật toán hoạt động bằng cách xây dựng cây này một đỉnh tại một thời điểm, từ một đỉnh bắt đầu tùy ý. Tại mỗi bước, nó thêm cạnh rẻ nhất kết nối một đỉnh trong cây đang phát triển với một đỉnh bên ngoài cây.

## Mã giả (Pseudocode)

```
function Prim(G, start_v) is
    MST := empty set
    let Q be a priority queue initialized with all vertices in G
    for each v in Q do
        key[v] := infinity
    key[start_v] := 0

    while Q is not empty do
        u := extract_min(Q)
        if u is not the start_v then
            add edge (parent[u], u) to MST
        
        for each neighbor v of u do
            if v is in Q and weight(u, v) < key[v] then
                parent[v] := u
                key[v] := weight(u, v)
                // (Giảm khóa trong hàng đợi ưu tiên)
```

*   `G`: Đồ thị
*   `start_v`: Đỉnh bắt đầu
*   `MST`: Cây bao trùm tối thiểu
*   `Q`: Hàng đợi ưu tiên để lưu trữ các đỉnh chưa có trong MST
*   `key[v]`: Trọng số của cạnh nhẹ nhất kết nối `v` với một đỉnh trong cây
*   `parent[v]`: Đỉnh cha của `v` trong MST

## Hướng tiếp cận

1.  **Khởi tạo:**
    *   Khởi tạo một cây bao trùm tối thiểu (MST) rỗng.
    *   Chọn một đỉnh bắt đầu tùy ý.
    *   Tạo một hàng đợi ưu tiên và thêm tất cả các cạnh nối với đỉnh bắt đầu vào đó.
    *   Tạo một tập hợp `visited` để theo dõi các đỉnh đã có trong MST, thêm đỉnh bắt đầu vào đó.

2.  **Vòng lặp:** Trong khi MST chưa bao gồm tất cả các đỉnh:
    *   **Chọn cạnh rẻ nhất:** Trích xuất cạnh có trọng số nhỏ nhất từ hàng đợi ưu tiên. Hãy gọi nó là cạnh `(u, v)` với trọng số `w`, trong đó `u` đã có trong `visited` và `v` thì chưa.
    *   **Thêm vào MST:** Nếu `v` chưa được truy cập, hãy thêm cạnh `(u, v)` vào MST và thêm `v` vào tập hợp `visited`.
    *   **Cập nhật hàng đợi:** Đối với đỉnh `v` mới được thêm vào, hãy thêm tất cả các cạnh của nó nối với các đỉnh chưa được truy cập vào hàng đợi ưu tiên.

3.  **Kết thúc:** Thuật toán kết thúc khi tất cả các đỉnh đã được thêm vào MST.

## Ứng dụng

Các ứng dụng của thuật toán Prim về cơ bản giống với thuật toán Kruskal, vì cả hai đều giải quyết cùng một bài toán.

*   **Thiết kế mạng:** Thiết kế mạng lưới đường ống, cáp điện, v.v., với chi phí tối thiểu.
*   **Xấp xỉ các bài toán khác:** Được sử dụng làm chương trình con trong các thuật toán khác.
*   **Phân cụm:** Có thể được sử dụng trong các thuật toán phân cụm dựa trên khoảng cách.

## Bài toán thực hành (LeetCode)

Thuật toán Prim là một thuật toán tham lam khác để tìm cây bao trùm tối thiểu (MST). Nó thường được sử dụng trong các bài toán liên quan đến kết nối các điểm với chi phí tối thiểu, đặc biệt khi đồ thị dày đặc.

*   [1584. Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)
*   [1135. Connecting Cities With Minimum Cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost/)

## Triển khai (Python)

```python
import heapq

def prim(graph):
    mst = []
    visited = set()
    # (trọng số, đỉnh nguồn, đỉnh đích)
    # Bắt đầu từ đỉnh 0 một cách tùy ý
    start_node = list(graph.keys())[0]
    min_heap = [(0, -1, start_node)]  # (weight, src, dest)

    total_weight = 0

    while min_heap and len(visited) < len(graph):
        weight, src, dest = heapq.heappop(min_heap)

        if dest in visited:
            continue

        visited.add(dest)
        total_weight += weight
        if src != -1: # Bỏ qua cạnh đầu tiên không có nguồn
            mst.append((src, dest, weight))

        for neighbor, edge_weight in graph[dest].items():
            if neighbor not in visited:
                heapq.heappush(min_heap, (edge_weight, dest, neighbor))

    return mst, total_weight

# Ví dụ sử dụng:
graph = {
    0: {1: 10, 2: 6, 3: 5},
    1: {0: 10, 3: 15},
    2: {0: 6, 3: 4},
    3: {0: 5, 1: 15, 2: 4}
}

mst, total_weight = prim(graph)

print("Các cạnh trong cây bao trùm tối thiểu:")
for u, v, weight in mst:
    print("%d -- %d == %d" % (u, v, weight))
print("Tổng trọng số:", total_weight)
```
