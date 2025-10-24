
# Tìm kiếm theo chiều rộng (BFS - Breadth-First Search)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Tìm kiếm theo chiều rộng (BFS) là một thuật toán để duyệt hoặc tìm kiếm các cấu trúc dữ liệu cây hoặc đồ thị. Nó bắt đầu tại một nút tùy ý (thường được gọi là 'nút nguồn') và khám phá tất cả các nút lân cận ở độ sâu hiện tại trước khi chuyển sang các nút ở cấp độ sâu tiếp theo.

BFS sử dụng một hàng đợi (queue) để theo dõi các nút cần truy cập. Điều này đảm bảo rằng các nút được khám phá theo thứ tự khoảng cách của chúng từ nút nguồn, làm cho BFS trở thành một thuật toán tối ưu để tìm đường đi ngắn nhất trên các đồ thị không có trọng số.

## Mã giả (Pseudocode)

```
procedure BFS(G, start_v) is
    let Q be a queue
    Q.enqueue(start_v)
    let S be a set
    S.add(start_v)
    while Q is not empty do
        v := Q.dequeue()
        // process v
        for each edge from v to w in G.adjacentEdges(v) do
            if w is not in S then
                S.add(w)
                Q.enqueue(w)
```

*   `G`: Đồ thị
*   `start_v`: Nút bắt đầu
*   `Q`: Hàng đợi để lưu trữ các nút cần truy cập
*   `S`: Một tập hợp hoặc mảng boolean để theo dõi các nút đã được truy cập

## Hướng tiếp cận

1.  **Khởi tạo:** Chọn một nút nguồn. Thêm nó vào một hàng đợi và đánh dấu nó là đã được truy cập (để tránh các chu trình và các lần truy cập lặp lại).
2.  **Vòng lặp:** Trong khi hàng đợi không trống, hãy thực hiện các bước sau:
    *   **Lấy ra:** Lấy nút ở đầu hàng đợi. Hãy gọi nó là `u`.
    *   **Xử lý:** Thực hiện một số thao tác trên `u` (ví dụ: kiểm tra xem nó có phải là nút mục tiêu hay không).
    *   **Thêm các nút lân cận:** Đối với mỗi nút lân cận `v` của `u` chưa được truy cập:
        *   Đánh dấu `v` là đã được truy cập.
        *   Thêm `v` vào cuối hàng đợi.
3.  **Kết thúc:** Khi hàng đợi trống, điều đó có nghĩa là tất cả các nút có thể truy cập từ nút nguồn đã được truy cập.

## Ứng dụng

*   **Tìm đường đi ngắn nhất trong đồ thị không có trọng số:** BFS luôn tìm thấy đường đi ngắn nhất (về số cạnh) từ nút nguồn đến tất cả các nút khác.
*   **Trình thu thập thông tin web (Web Crawlers):** Để lập chỉ mục các trang web, các trình thu thập thông tin thường bắt đầu từ một trang nguồn và khám phá các liên kết theo kiểu BFS.
*   **Mạng xã hội:** Tìm tất cả bạn bè của một người ở một khoảng cách nhất định (`k` cấp kết nối).
*   **Kiểm tra đồ thị hai phía:** Có thể được sử dụng để xác định xem một đồ thị có phải là đồ thị hai phía hay không.
*   **Thuật toán của Cheney cho việc thu gom rác.**

## Bài toán thực hành (LeetCode)

*   [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)
*   [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
*   [752. Open the Lock](https://leetcode.com/problems/open-the-lock/)
*   [542. 01 Matrix](https://leetcode.com/problems/01-matrix/)

## Triển khai (Python)

```python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        vertex = queue.popleft()
        result.append(vertex)

        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

# Ví dụ sử dụng:
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

print("Kết quả duyệt BFS bắt đầu từ A:")
print(bfs(graph, 'A'))
```
