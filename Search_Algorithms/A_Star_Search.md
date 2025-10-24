
# Tìm kiếm A* (A* Search)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Tìm kiếm A* là một thuật toán tìm kiếm thông tin và tìm đường đi, được sử dụng rộng rãi trong các bài toán tìm đường và duyệt đồ thị. Điều làm cho A* trở nên mạnh mẽ là nó kết hợp các đặc điểm của thuật toán Dijkstra (ưu tiên các đường đi có chi phí thấp) và tìm kiếm tham lam thuần túy (ưu tiên các nút gần với mục tiêu nhất).

A* đạt được hiệu suất tốt bằng cách sử dụng một hàm heuristic để ước tính chi phí từ một nút đến nút mục tiêu. Nó cân bằng chi phí đã biết để đến một nút (`g(n)`) với chi phí ước tính để từ nút đó đến mục tiêu (`h(n)`). Tổng của hai giá trị này là `f(n)`, giá trị mà A* cố gắng tối thiểu hóa.

`f(n) = g(n) + h(n)`

*   `g(n)`: Chi phí thực tế của đường đi từ nút bắt đầu đến nút `n`.
*   `h(n)`: Chi phí ước tính (heuristic) từ nút `n` đến nút mục tiêu.

Để đảm bảo A* tìm thấy đường đi ngắn nhất, hàm heuristic phải **nhất quán** (hoặc ít nhất là **chấp nhận được**), có nghĩa là nó không bao giờ đánh giá quá cao chi phí thực tế để đến mục tiêu.

## Mã giả (Pseudocode)

```
function A*(start, goal, h) is
    openSet := {start} // Hàng đợi ưu tiên
    cameFrom := an empty map

    gScore := map with default value of Infinity
    gScore[start] := 0

    fScore := map with default value of Infinity
    fScore[start] := h(start)

    while openSet is not empty do
        current := the node in openSet having the lowest fScore[] value
        if current = goal then
            return reconstruct_path(cameFrom, current)

        remove current from openSet
        for each neighbor of current do
            tentative_gScore := gScore[current] + d(current, neighbor)
            if tentative_gScore < gScore[neighbor] then
                cameFrom[neighbor] := current
                gScore[neighbor] := tentative_gScore
                fScore[neighbor] := gScore[neighbor] + h(neighbor)
                if neighbor not in openSet then
                    add neighbor to openSet

    return failure // Không tìm thấy đường đi
```

## Hướng tiếp cận

1.  **Khởi tạo:**
    *   Tạo một "danh sách mở" (thường là một hàng đợi ưu tiên) chứa nút bắt đầu.
    *   Tạo một "danh sách đóng" (thường là một tập hợp) để lưu trữ các nút đã được đánh giá.
    *   Đặt `g_score` của nút bắt đầu là 0 và `f_score` là giá trị heuristic từ điểm bắt đầu đến mục tiêu.

2.  **Vòng lặp:** Trong khi danh sách mở không trống:
    *   Chọn nút `n` trong danh sách mở có giá trị `f_score` thấp nhất.
    *   Nếu `n` là nút mục tiêu, hãy xây dựng lại và trả về đường đi. Quá trình tìm kiếm kết thúc.
    *   Di chuyển `n` từ danh sách mở sang danh sách đóng.
    *   Đối với mỗi nút lân cận của `n`:
        *   Tính toán `g_score` dự kiến (chi phí từ điểm bắt đầu đến nút lân cận này thông qua `n`).
        *   Nếu `g_score` dự kiến này tốt hơn (thấp hơn) `g_score` hiện tại của nút lân cận, hãy cập nhật nó. Cập nhật cả `f_score` của nút lân cận và ghi lại rằng chúng ta đã đến được nút lân cận này từ `n`.
        *   Nếu nút lân cận không có trong danh sách mở, hãy thêm nó vào.

3.  **Kết thúc:** Nếu danh sách mở trống và chúng ta chưa đến được mục tiêu, điều đó có nghĩa là không có đường đi nào.

## Ứng dụng

*   **Trò chơi điện tử:** Được sử dụng rộng rãi để tìm đường đi cho các nhân vật không phải người chơi (NPC) để di chuyển trong thế giới trò chơi.
*   **Robotics:** Để lập kế hoạch đường đi cho robot di chuyển qua một môi trường có chướng ngại vật.
*   **Phân tích mạng:** Tìm đường đi tối ưu trong mạng máy tính hoặc mạng lưới giao thông.
*   **Tin sinh học:** Được sử dụng trong các bài toán căn chỉnh trình tự.

## Bài toán thực hành (LeetCode)

Tìm kiếm A* thường được áp dụng trong các bài toán tìm đường đi tối ưu trên lưới hoặc đồ thị có trọng số, đặc biệt khi có heuristic. Các bài toán sau có thể được giải quyết bằng A* hoặc các thuật toán tìm đường đi tương tự:

*   [778. Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/) (Có thể giải bằng Dijkstra với heuristic, tương tự A*)
*   [1631. Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) (Có thể giải bằng Dijkstra với heuristic, tương tự A*)
*   [847. Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) (Có thể áp dụng A* với trạng thái được mở rộng)

## Triển khai (Python)

```python
import heapq

def a_star_search(graph, start, goal, heuristic):
    # hàng đợi ưu tiên để lưu trữ các nút cần khám phá, với f_score là độ ưu tiên
    open_list = []
    heapq.heappush(open_list, (0, start))

    # came_from để xây dựng lại đường đi
    came_from = {}

    # g_score lưu trữ chi phí từ nút bắt đầu đến nút hiện tại
    g_score = {node: float('inf') for node in graph}
    g_score[start] = 0

    # f_score đại diện cho tổng chi phí ước tính từ nút bắt đầu đến nút mục tiêu
    f_score = {node: float('inf') for node in graph}
    f_score[start] = heuristic(start, goal)

    while open_list:
        # lấy nút trong open_list có f_score thấp nhất
        _, current = heapq.heappop(open_list)

        if current == goal:
            # xây dựng lại đường đi
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]

        for neighbor, weight in graph[current].items():
            # khoảng cách từ nút bắt đầu đến nút lân cận
            tentative_g_score = g_score[current] + weight

            if tentative_g_score < g_score[neighbor]:
                # tìm thấy đường đi tốt hơn
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
                if neighbor not in [i[1] for i in open_list]:
                    heapq.heappush(open_list, (f_score[neighbor], neighbor))

    return None # không tìm thấy đường đi
```
