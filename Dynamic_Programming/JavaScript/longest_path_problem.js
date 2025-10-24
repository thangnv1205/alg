/**
 * @file longest_path_problem.js
 * @description Implementation to find the longest path in a Directed Acyclic Graph (DAG)
 * using dynamic programming and topological sorting.
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * Tìm đường đi dài nhất trong Đồ thị có hướng không có chu trình (DAG).
 * Thuật toán này sử dụng sắp xếp topo và quy hoạch động.
 * @param {Object<string, Array<{to: string, weight: number}>>} graph - Biểu diễn đồ thị bằng danh sách kề.
 *                                                                    Mỗi khóa là một đỉnh, giá trị là một mảng các đối tượng cạnh.
 * @returns {number} - Độ dài của đường đi dài nhất trong DAG.
 */
function longestPathInDAG(graph) {
    // Thu thập tất cả các nút duy nhất trong đồ thị
    const allNodes = new Set();
    for (const u in graph) {
        allNodes.add(u);
        for (const edge of graph[u]) {
            allNodes.add(edge.to);
        }
    }

    const visited = new Set(); // Tập hợp các đỉnh đã được thăm trong DFS
    const stack = []; // Stack để lưu trữ thứ tự topo

    /**
     * Thực hiện tìm kiếm theo chiều sâu (DFS) để điền vào stack theo thứ tự topo.
     * @param {string} u - Đỉnh hiện tại.
     */
    function topologicalSortDFS(u) {
        visited.add(u);
        if (graph[u]) { // Kiểm tra xem đỉnh có cạnh đi ra không
            for (const edge of graph[u]) {
                if (!visited.has(edge.to)) {
                    topologicalSortDFS(edge.to);
                }
            }
        }
        stack.push(u); // Đẩy đỉnh vào stack sau khi tất cả các đỉnh kề đã được thăm
    }

    // Bước 1: Thực hiện sắp xếp topo cho tất cả các nút
    for (const node of allNodes) {
        if (!visited.has(node)) {
            topologicalSortDFS(node);
        }
    }

    // Bước 2: Khởi tạo khoảng cách
    // dist[u] sẽ lưu trữ độ dài đường đi dài nhất đến u
    const dist = {};
    for (const node of allNodes) {
        dist[node] = -Infinity; // Khởi tạo khoảng cách là âm vô cùng
    }

    let maxOverallPath = 0; // Biến để lưu trữ độ dài đường đi dài nhất tổng thể

    // Bước 3: Xử lý các nút theo thứ tự topo
    while (stack.length > 0) {
        const u = stack.pop(); // Lấy đỉnh tiếp theo theo thứ tự topo

        // Nếu đỉnh hiện tại chưa được xử lý (tức là không có đường đi đến nó từ các nút trước đó)
        // thì nó có thể là điểm bắt đầu của một đường đi dài nhất mới.
        if (dist[u] === -Infinity) {
            dist[u] = 0; // Đặt khoảng cách của nó là 0 nếu nó là điểm bắt đầu
        }

        // Thư giãn các cạnh kề của u
        if (graph[u]) {
            for (const edge of graph[u]) {
                const v = edge.to;
                const weight = edge.weight;

                // Nếu có đường đi đến u và đường đi qua u đến v dài hơn đường đi hiện tại đến v
                if (dist[u] !== -Infinity && dist[u] + weight > dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
    }

    // Bước 4: Tìm giá trị lớn nhất trong tất cả các khoảng cách đã tính
    // Đây sẽ là độ dài đường đi dài nhất tổng thể trong DAG
    for (const node in dist) {
        if (dist[node] > maxOverallPath) {
            maxOverallPath = dist[node];
        }
    }

    return maxOverallPath;
}

// Ví dụ sử dụng:
// Ví dụ 1:
const graph = {
    'A': [{ to: 'B', weight: 3 }, { to: 'C', weight: 2 }],
    'B': [{ to: 'D', weight: 4 }],
    'C': [{ to: 'D', weight: 1 }],
    'D': [] // D không có cạnh đi ra
};

console.log("Độ dài đường đi dài nhất trong DAG là: ", longestPathInDAG(graph)); // Dự kiến: 7 (A->B->D)

// Ví dụ 2:
const graph2 = {
    '0': [{ to: '1', weight: 5 }, { to: '2', weight: 3 }],
    '1': [{ to: '3', weight: 6 }, { to: '2', weight: 2 }],
    '2': [{ to: '3', weight: 7 }, { to: '4', weight: 4 }],
    '3': [{ to: '4', weight: -1 }], // Cạnh có trọng số âm được phép trong DAG
    '4': []
};

console.log("Độ dài đường đi dài nhất trong DAG 2 là: ", longestPathInDAG(graph2)); // Dự kiến: 15 (0->2->3->4)
