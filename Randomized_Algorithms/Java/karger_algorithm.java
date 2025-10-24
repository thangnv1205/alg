import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class karger_algorithm {

    // Lớp biểu diễn đồ thị
    static class Graph {
        int V; // Số đỉnh
        List<int[]> edges; // Danh sách các cạnh, mỗi cạnh là một mảng [u, v]

        public Graph(int V) {
            this.V = V;
            this.edges = new ArrayList<>();
        }

        public void addEdge(int u, int v) {
            edges.add(new int[]{u, v});
        }
    }

    // Cấu trúc dữ liệu Disjoint Set Union (DSU)
    static class DSU {
        int[] parent;

        public DSU(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int i) {
            if (parent[i] == i) {
                return i;
            }
            return parent[i] = find(parent[i]);
        }

        public boolean union(int i, int j) {
            int i_id = find(i);
            int j_id = find(j);
            if (i_id != j_id) {
                parent[i_id] = j_id;
                return true;
            }
            return false;
        }
    }

    public static int kargerMinCut(Graph graph) {
        int V = graph.V;
        List<int[]> edges = new ArrayList<>(graph.edges);

        DSU dsu = new DSU(V);
        Random random = new Random();

        // Số đỉnh còn lại (siêu đỉnh)
        int verticesLeft = V;

        while (verticesLeft > 2) {
            // Chọn ngẫu nhiên một cạnh
            int randomEdgeIndex = random.nextInt(edges.size());
            int[] edge = edges.get(randomEdgeIndex);
            int u = edge[0];
            int v = edge[1];

            // Tìm tập hợp của u và v
            int setU = dsu.find(u);
            int setV = dsu.find(v);

            // Nếu chúng không cùng một tập hợp, hợp nhất chúng
            if (setU != setV) {
                dsu.union(setU, setV);
                verticesLeft--;
            }
            // Loại bỏ cạnh đã chọn để tránh chọn lại và xử lý các vòng lặp tự thân
            // (trong triển khai này, chúng ta không cần loại bỏ vật lý, chỉ cần bỏ qua nếu chúng đã cùng tập hợp)
        }

        // Đếm số cạnh giữa hai siêu đỉnh còn lại
        int cutEdges = 0;
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            if (dsu.find(u) != dsu.find(v)) {
                cutEdges++;
            }
        }

        return cutEdges;
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        Graph g = new Graph(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(0, 3);
        g.addEdge(1, 2);
        g.addEdge(2, 3);

        // Chạy thuật toán nhiều lần để tăng xác suất tìm thấy cắt nhỏ nhất
        int minCutFound = Integer.MAX_VALUE;
        int numTrials = 100;
        for (int i = 0; i < numTrials; i++) {
            minCutFound = Math.min(minCutFound, kargerMinCut(g));
        }

        System.out.println("Cắt nhỏ nhất được tìm thấy là: " + minCutFound);

        Graph g2 = new Graph(5);
        g2.addEdge(0, 1);
        g2.addEdge(0, 2);
        g2.addEdge(1, 2);
        g2.addEdge(1, 3);
        g2.addEdge(2, 3);
        g2.addEdge(3, 4);

        int minCutFound2 = Integer.MAX_VALUE;
        for (int i = 0; i < numTrials; i++) {
            minCutFound2 = Math.min(minCutFound2, kargerMinCut(g2));
        }
        System.out.println("Cắt nhỏ nhất được tìm thấy cho đồ thị 2 là: " + minCutFound2);
    }
}
