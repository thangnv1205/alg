
# Thuật toán Floyd-Warshall

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Floyd-Warshall là một thuật toán quy hoạch động để tìm đường đi ngắn nhất giữa tất cả các cặp đỉnh trong một đồ thị có hướng, có trọng số. Thuật toán có thể xử lý cả trọng số dương và âm, nhưng nó sẽ không hoạt động nếu có các chu trình trọng số âm (mặc dù nó có thể phát hiện chúng).

Thuật toán hoạt động bằng cách xem xét tất cả các cặp đỉnh `(i, j)` và cải thiện dần dần ước tính về đường đi ngắn nhất giữa chúng. Nó thực hiện điều này bằng cách xem xét tất cả các đỉnh `k` và kiểm tra xem việc đi từ `i` đến `j` qua `k` có tạo ra một đường đi ngắn hơn không.

## Mã giả (Pseudocode)

```
let dist be a |V| × |V| array of minimum distances initialized to ∞ (infinity)
for each vertex v do
    dist[v][v] := 0
for each edge (u, v) do
    dist[u][v] := weight(u, v)

for k from 1 to |V| do
    for i from 1 to |V| do
        for j from 1 to |V| do
            if dist[i][j] > dist[i][k] + dist[k][j] then
                dist[i][j] := dist[i][k] + dist[k][j]
```

*   `dist[i][j]`: Khoảng cách ngắn nhất từ đỉnh `i` đến đỉnh `j`
*   `k`: Đỉnh trung gian đang được xem xét

## Hướng tiếp cận

1.  **Khởi tạo:** Tạo một ma trận khoảng cách `dist` có kích thước `|V| x |V|`. `dist[i][j]` là trọng số của cạnh từ `i` đến `j` nếu có, 0 nếu `i` bằng `j`, và vô cùng nếu không có cạnh trực tiếp.
2.  **Lặp qua các đỉnh trung gian:** Lặp qua tất cả các đỉnh của đồ thị, từ `k = 1` đến `|V|`. Đỉnh `k` này được coi là một đỉnh trung gian tiềm năng.
3.  **Cập nhật khoảng cách:** Trong mỗi lần lặp của `k`, lặp qua tất cả các cặp đỉnh `(i, j)` và kiểm tra xem đường đi từ `i` đến `j` có thể được cải thiện bằng cách đi qua `k` hay không. Cụ thể, kiểm tra xem `dist[i][k] + dist[k][j]` có nhỏ hơn `dist[i][j]` hay không. Nếu có, hãy cập nhật `dist[i][j]`.
4.  **Kết quả:** Sau khi vòng lặp ngoài cùng kết thúc (sau khi đã xem xét tất cả các đỉnh có thể có làm đỉnh trung gian), ma trận `dist` sẽ chứa khoảng cách đường đi ngắn nhất giữa tất cả các cặp đỉnh.

## Ứng dụng

*   **Tìm đường đi ngắn nhất trong đồ thị dày đặc:** Khi một đồ thị có nhiều cạnh, Floyd-Warshall có thể hiệu quả hơn việc chạy thuật toán Dijkstra từ mỗi đỉnh.
*   **Tính toán bao đóng chuyển tiếp của một đồ thị:** Bằng cách sửa đổi thuật toán một chút, nó có thể được sử dụng để tìm xem có đường đi giữa mọi cặp đỉnh hay không.
*   **Phát hiện chu trình trọng số âm:** Nếu sau khi thuật toán kết thúc, bất kỳ giá trị nào trên đường chéo chính của ma trận khoảng cách là âm, thì đồ thị chứa một chu trình trọng số âm.

## Bài toán thực hành (LeetCode)

Thuật toán Floyd-Warshall được sử dụng để tìm đường đi ngắn nhất giữa tất cả các cặp đỉnh trong một đồ thị. Nó đặc biệt hữu ích cho các đồ thị dày đặc hoặc khi cần tìm tất cả các cặp đường đi ngắn nhất.

*   [1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) (Có thể giải bằng Floyd-Warshall)
*   [787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (Có thể giải bằng biến thể của Floyd-Warshall hoặc Bellman-Ford)

## Triển khai (Python)

```python
# Số đỉnh trong đồ thị
V = 4

# Giá trị vô cùng
INF = 99999

# Thuật toán Floyd-Warshall
def floyd_warshall(graph):
    dist = list(map(lambda i: list(map(lambda j: j, i)), graph))

    # Thêm các đỉnh vào tập hợp các đỉnh trung gian
    for k in range(V):
        # Chọn tất cả các đỉnh làm nguồn một lượt
        for i in range(V):
            # Chọn tất cả các đỉnh làm đích cho nguồn đã chọn
            for j in range(V):
                # Nếu đỉnh k nằm trên đường đi ngắn nhất từ i đến j,
                # thì cập nhật giá trị của dist[i][j]
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    return dist

# Ví dụ sử dụng:
graph = [[0, 5, INF, 10],
         [INF, 0, 3, INF],
         [INF, INF, 0, 1],
         [INF, INF, INF, 0]]

distances = floyd_warshall(graph)
print("Ma trận khoảng cách ngắn nhất giữa mọi cặp đỉnh:")
for row in distances:
    print(row)
```
