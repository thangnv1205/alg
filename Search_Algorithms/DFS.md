
# Tìm kiếm theo chiều sâu (DFS - Depth-First Search)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Tìm kiếm theo chiều sâu (DFS) là một thuật toán để duyệt hoặc tìm kiếm các cấu trúc dữ liệu cây hoặc đồ thị. Thuật toán bắt đầu tại nút gốc (chọn một số nút tùy ý làm nút gốc trong trường hợp đồ thị) và khám phá càng xa càng tốt dọc theo mỗi nhánh trước khi quay lui.

Không giống như BFS sử dụng hàng đợi, DFS sử dụng một ngăn xếp (stack) để theo dõi các nút cần truy cập. Điều này có thể được thực hiện một cách đệ quy (sử dụng ngăn xếp cuộc gọi của chương trình) hoặc một cách lặp đi lặp lại (sử dụng một cấu trúc dữ liệu ngăn xếp rõ ràng).

## Mã giả (Pseudocode)

### Phiên bản đệ quy

```
procedure DFS(G, v) is
    label v as discovered
    for all directed edges from v to w that are in G.adjacentEdges(v) do
        if vertex w is not labeled as discovered then
            recursively call DFS(G, w)
```

### Phiên bản lặp

```
procedure DFS_iterative(G, v) is
    let S be a stack
    S.push(v)
    while S is not empty do
        v := S.pop()
        if v is not labeled as discovered then
            label v as discovered
            for all edges from v to w in G.adjacentEdges(v) do 
                S.push(w)
```

## Hướng tiếp cận

1.  **Khởi tạo:** Chọn một nút nguồn. Nếu sử dụng phiên bản lặp, hãy đẩy nó vào một ngăn xếp. Đánh dấu nó là đã được truy cập.
2.  **Khám phá:**
    *   **Đệ quy:** Từ nút hiện tại, chọn một nút lân cận chưa được truy cập. Gọi đệ quy hàm DFS trên nút lân cận đó. Tiếp tục cho đến khi bạn đến một nút không có nút lân cận chưa được truy cập.
    *   **Lặp:** Lấy nút trên cùng của ngăn xếp. Nếu nó chưa được truy cập, hãy đánh dấu là đã truy cập và đẩy tất cả các nút lân cận của nó vào ngăn xếp.
3.  **Quay lui (Backtrack):** Khi bạn đến một "ngõ cụt" (một nút không có nút lân cận chưa được truy cập), bạn sẽ quay lui. Trong phiên bản đệ quy, điều này xảy ra khi một lệnh gọi hàm trả về. Trong phiên bản lặp, bạn chỉ cần lấy nút tiếp theo từ ngăn xếp.
4.  **Kết thúc:** Quá trình tiếp tục cho đến khi tất cả các nút có thể truy cập từ nút nguồn đã được truy cập.

## Ứng dụng

*   **Phát hiện chu trình trong đồ thị:** Nếu DFS gặp một nút đã được truy cập (và không phải là cha trực tiếp của nó trong cây DFS), thì có một chu trình.
*   **Sắp xếp tô pô (Topological Sorting):** Được sử dụng để sắp xếp tuyến tính các đỉnh của một đồ thị có hướng không có chu trình (DAG).
*   **Tìm các thành phần liên thông mạnh:** Trong một đồ thị có hướng, DFS có thể được sử dụng để tìm các nhóm các nút liên thông với nhau.
*   **Giải các câu đố và mê cung:** DFS có thể được sử dụng để khám phá tất cả các con đường có thể có trong một mê cung, với việc quay lui xảy ra khi nó đi vào ngõ cụt.
*   **Phân tích cấu trúc cây:** Chẳng hạn như xác định xem một nút có phải là tổ tiên của một nút khác hay không.

## Bài toán thực hành (LeetCode)

*   [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)
*   [133. Clone Graph](https://leetcode.com/problems/clone-graph/)
*   [695. Max Area of Island](https://leetcode.com/problems/max-area-of-island/)
*   [733. Flood Fill](https://leetcode.com/problems/flood-fill/)

## Triển khai (Python)

```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    result = []

    def _dfs_recursive(vertex):
        visited.add(vertex)
        result.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                _dfs_recursive(neighbor)

    _dfs_recursive(start)
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

print("Kết quả duyệt DFS bắt đầu từ A:")
print(dfs(graph, 'A'))
```
