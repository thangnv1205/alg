/**
 * @file kosaraju.js
 * @description Implementation of Kosaraju's Algorithm to find Strongly Connected Components (SCCs)
 * in a directed graph.
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * Lớp Graph biểu diễn một đồ thị có hướng bằng danh sách kề.
 */
class Graph {
    /**
     * Khởi tạo một đối tượng Graph mới.
     * @param {number} vertices - Số lượng đỉnh trong đồ thị.
     */
    constructor(vertices) {
        this.V = vertices; // Số lượng đỉnh trong đồ thị
        this.adj = new Array(vertices).fill(0).map(() => []); // Danh sách kề để lưu trữ các cạnh
    }

    /**
     * Thêm một cạnh có hướng từ đỉnh u đến đỉnh v.
     * @param {number} u - Đỉnh nguồn.
     * @param {number} v - Đỉnh đích.
     */
    addEdge(u, v) {
        this.adj[u].push(v);
    }

    /**
     * DFS thứ nhất: Điền các đỉnh vào stack theo thứ tự hoàn thành.
     * @param {number} u - Đỉnh hiện tại.
     * @param {boolean[]} visited - Mảng theo dõi các đỉnh đã được thăm.
     * @param {Array<number>} stack - Stack để lưu trữ thứ tự hoàn thành.
     */
    dfs1(u, visited, stack) {
        visited[u] = true;
        // Duyệt qua tất cả các đỉnh kề của u
        for (const v of this.adj[u]) {
            if (!visited[v]) {
                this.dfs1(v, visited, stack);
            }
        }
        stack.push(u); // Đẩy đỉnh vào stack sau khi tất cả các đỉnh kề đã được thăm
    }

    /**
     * Lấy đồ thị chuyển vị (transpose) bằng cách đảo ngược hướng của tất cả các cạnh.
     * @returns {Graph} - Đồ thị chuyển vị.
     */
    getTranspose() {
        const gT = new Graph(this.V);
        for (let u = 0; u < this.V; u++) {
            for (const v of this.adj[u]) {
                gT.addEdge(v, u); // Đảo ngược cạnh (u -> v) thành (v -> u)
            }
        }
        return gT;
    }

    /**
     * DFS thứ hai: Tìm các SCCs trong đồ thị chuyển vị.
     * @param {number} u - Đỉnh hiện tại.
     * @param {boolean[]} visited - Mảng theo dõi các đỉnh đã được thăm.
     * @param {Array<number>} currentSCC - Danh sách lưu trữ các đỉnh trong SCC hiện tại.
     */
    dfs2(u, visited, currentSCC) {
        visited[u] = true;
        currentSCC.push(u);
        // Duyệt qua tất cả các đỉnh kề của u trong đồ thị chuyển vị
        for (const v of this.adj[u]) {
            if (!visited[v]) {
                this.dfs2(v, visited, currentSCC);
            }
        }
    }

    /**
     * Phương thức chính để tìm tất cả các Thành phần liên thông mạnh (SCCs) trong đồ thị.
     * @returns {Array<Array<number>>} - Danh sách các SCCs, mỗi SCC là một danh sách các đỉnh.
     */
    findSCCs() {
        const stack = [];
        const visited = new Array(this.V).fill(false);

        // Bước 1: Điền các đỉnh vào stack theo thứ tự hoàn thành
        // Thực hiện DFS trên đồ thị gốc
        for (let i = 0; i < this.V; i++) {
            if (!visited[i]) {
                this.dfs1(i, visited, stack);
            }
        }

        // Bước 2: Lấy đồ thị chuyển vị
        const gT = this.getTranspose();

        // Bước 3: Thực hiện DFS trên đồ thị chuyển vị theo thứ tự từ stack
        // Đặt lại mảng visited
        visited.fill(false);
        const sccs = [];
        // Xử lý các đỉnh theo thứ tự được lấy ra từ stack
        while (stack.length > 0) {
            const u = stack.pop();
            // Nếu đỉnh chưa được thăm trong đồ thị chuyển vị, bắt đầu một DFS mới
            // để tìm một SCC mới
            if (!visited[u]) {
                const currentSCC = [];
                gT.dfs2(u, visited, currentSCC);
                sccs.push(currentSCC);
            }
        }
        return sccs;
    }
}

// Ví dụ sử dụng:
// Ví dụ 1:
// Đồ thị với 5 đỉnh
const g = new Graph(5);
g.addEdge(1, 0);
g.addEdge(0, 2);
g.addEdge(2, 1);
g.addEdge(0, 3);
g.addEdge(3, 4);

const sccs = g.findSCCs();
console.log("Các thành phần liên thông mạnh là:");
for (const scc of sccs) {
    console.log(scc);
}

// Ví dụ 2:
// Đồ thị với 4 đỉnh tạo thành một chu trình
const g2 = new Graph(4);
g2.addEdge(0, 1);
g2.addEdge(1, 2);
g2.addEdge(2, 3);
g2.addEdge(3, 0);

const sccs2 = g2.findSCCs();
console.log("Các thành phần liên thông mạnh của đồ thị 2 là:");
for (const scc of sccs2) {
    console.log(scc);
}
