class Graph {
    constructor(V) {
        this.V = V; // Số đỉnh
        this.edges = []; // Danh sách các cạnh, mỗi cạnh là một mảng [u, v]
    }

    addEdge(u, v) {
        this.edges.push([u, v]);
    }
}

// Cấu trúc dữ liệu Disjoint Set Union (DSU)
class DSU {
    constructor(n) {
        this.parent = new Array(n).fill(0).map((_, i) => i);
    }

    find(i) {
        if (this.parent[i] === i) {
            return i;
        }
        return this.parent[i] = this.find(this.parent[i]);
    }

    union(i, j) {
        const i_id = this.find(i);
        const j_id = this.find(j);
        if (i_id !== j_id) {
            this.parent[i_id] = j_id;
            return true;
        }
        return false;
    }
}

function kargerMinCut(graph) {
    const V = graph.V;
    const edges = [...graph.edges]; // Tạo bản sao để không sửa đổi đồ thị gốc

    const dsu = new DSU(V);

    // Số đỉnh còn lại (siêu đỉnh)
    let verticesLeft = V;

    while (verticesLeft > 2) {
        // Chọn ngẫu nhiên một cạnh
        const randomEdgeIndex = Math.floor(Math.random() * edges.length);
        const [u, v] = edges[randomEdgeIndex];

        // Tìm tập hợp của u và v
        const setU = dsu.find(u);
        const setV = dsu.find(v);

        // Nếu chúng không cùng một tập hợp, hợp nhất chúng
        if (setU !== setV) {
            dsu.union(setU, setV);
            verticesLeft--;
        }
        // Loại bỏ cạnh đã chọn để tránh chọn lại và xử lý các vòng lặp tự thân
        // (trong triển khai này, chúng ta không cần loại bỏ vật lý, chỉ cần bỏ qua nếu chúng đã cùng tập hợp)
    }

    // Đếm số cạnh giữa hai siêu đỉnh còn lại
    let cutEdges = 0;
    for (const [u, v] of edges) {
        if (dsu.find(u) !== dsu.find(v)) {
            cutEdges++;
        }
    }

    return cutEdges;
}

// Ví dụ sử dụng:
const g = new Graph(4);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(0, 3);
g.addEdge(1, 2);
g.addEdge(2, 3);

// Chạy thuật toán nhiều lần để tăng xác suất tìm thấy cắt nhỏ nhất
let minCutFound = Infinity;
const numTrials = 100;
for (let i = 0; i < numTrials; i++) {
    minCutFound = Math.min(minCutFound, kargerMinCut(g));
}

console.log("Cắt nhỏ nhất được tìm thấy là:", minCutFound);

const g2 = new Graph(5);
g2.addEdge(0, 1);
g2.addEdge(0, 2);
g2.addEdge(1, 2);
g2.addEdge(1, 3);
g2.addEdge(2, 3);
g2.addEdge(3, 4);

let minCutFound2 = Infinity;
for (let i = 0; i < numTrials; i++) {
    minCutFound2 = Math.min(minCutFound2, kargerMinCut(g2));
}
console.log("Cắt nhỏ nhất được tìm thấy cho đồ thị 2 là:", minCutFound2);
