import java.util.*;

/**
 * Lớp kosaraju cung cấp một triển khai của thuật toán Kosaraju
 * để tìm các Thành phần liên thông mạnh (Strongly Connected Components - SCCs)
 * trong một đồ thị có hướng.
 */
public class kosaraju {

    /**
     * Lớp Graph biểu diễn một đồ thị có hướng bằng danh sách kề.
     */
    static class Graph {
        int V; // Số lượng đỉnh trong đồ thị
        List<List<Integer>> adj; // Danh sách kề để lưu trữ các cạnh

        /**
         * Khởi tạo một đối tượng Graph mới.
         * @param V int - Số lượng đỉnh trong đồ thị.
         */
        Graph(int V) {
            this.V = V;
            adj = new ArrayList<>(V);
            for (int i = 0; i < V; i++) {
                adj.add(new ArrayList<>()); // Khởi tạo danh sách kề cho mỗi đỉnh
            }
        }

        /**
         * Thêm một cạnh có hướng từ đỉnh u đến đỉnh v.
         * @param u int - Đỉnh nguồn.
         * @param v int - Đỉnh đích.
         */
        void addEdge(int u, int v) {
            adj.get(u).add(v);
        }

        /**
         * DFS thứ nhất: Điền các đỉnh vào stack theo thứ tự hoàn thành.
         * @param u int - Đỉnh hiện tại.
         * @param visited boolean[] - Mảng theo dõi các đỉnh đã được thăm.
         * @param stack Stack<Integer> - Stack để lưu trữ thứ tự hoàn thành.
         */
        void dfs1(int u, boolean[] visited, Stack<Integer> stack) {
            visited[u] = true;
            // Duyệt qua tất cả các đỉnh kề của u
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    dfs1(v, visited, stack);
                }
            }
            stack.push(u); // Đẩy đỉnh vào stack sau khi tất cả các đỉnh kề đã được thăm
        }

        /**
         * Lấy đồ thị chuyển vị (transpose) bằng cách đảo ngược hướng của tất cả các cạnh.
         * @return Graph - Đồ thị chuyển vị.
         */
        Graph getTranspose() {
            Graph gT = new Graph(V);
            for (int u = 0; u < V; u++) {
                for (int v : adj.get(u)) {
                    gT.addEdge(v, u); // Đảo ngược cạnh (u -> v) thành (v -> u)
                }
            }
            return gT;
        }

        /**
         * DFS thứ hai: Tìm các SCCs trong đồ thị chuyển vị.
         * @param u int - Đỉnh hiện tại.
         * @param visited boolean[] - Mảng theo dõi các đỉnh đã được thăm.
         * @param currentSCC List<Integer> - Danh sách lưu trữ các đỉnh trong SCC hiện tại.
         */
        void dfs2(int u, boolean[] visited, List<Integer> currentSCC) {
            visited[u] = true;
            currentSCC.add(u);
            // Duyệt qua tất cả các đỉnh kề của u trong đồ thị chuyển vị
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    dfs2(v, visited, currentSCC);
                }
            }
        }

        /**
         * Phương thức chính để tìm tất cả các Thành phần liên thông mạnh (SCCs) trong đồ thị.
         * @return List<List<Integer>> - Danh sách các SCCs, mỗi SCC là một danh sách các đỉnh.
         */
        List<List<Integer>> findSCCs() {
            Stack<Integer> stack = new Stack<>();
            boolean[] visited = new boolean[V];

            // Bước 1: Điền các đỉnh vào stack theo thứ tự hoàn thành
            // Thực hiện DFS trên đồ thị gốc
            for (int i = 0; i < V; i++) {
                if (!visited[i]) {
                    dfs1(i, visited, stack);
                }
            }

            // Bước 2: Lấy đồ thị chuyển vị
            Graph gT = getTranspose();

            // Bước 3: Thực hiện DFS trên đồ thị chuyển vị theo thứ tự từ stack
            // Đặt lại mảng visited
            Arrays.fill(visited, false);
            List<List<Integer>> sccs = new ArrayList<>();
            // Xử lý các đỉnh theo thứ tự được lấy ra từ stack
            while (!stack.isEmpty()) {
                int u = stack.pop();
                // Nếu đỉnh chưa được thăm trong đồ thị chuyển vị, bắt đầu một DFS mới
                // để tìm một SCC mới
                if (!visited[u]) {
                    List<Integer> currentSCC = new ArrayList<>();
                    gT.dfs2(u, visited, currentSCC);
                    sccs.add(currentSCC);
                }
            }
            return sccs;
        }
    }

    /**
     * Phương thức chính để trình diễn việc sử dụng thuật toán Kosaraju.
     * @param args String[] - Đối số dòng lệnh (không được sử dụng).
     */
    public static void main(String[] args) {
        // Ví dụ 1:
        // Đồ thị với 5 đỉnh
        Graph g = new Graph(5);
        g.addEdge(1, 0);
        g.addEdge(0, 2);
        g.addEdge(2, 1);
        g.addEdge(0, 3);
        g.addEdge(3, 4);

        List<List<Integer>> sccs = g.findSCCs();
        System.out.println("Các thành phần liên thông mạnh là:");
        for (List<Integer> scc : sccs) {
            System.out.println(scc);
        }

        // Ví dụ 2:
        // Đồ thị với 4 đỉnh tạo thành một chu trình
        Graph g2 = new Graph(4);
        g2.addEdge(0, 1);
        g2.addEdge(1, 2);
        g2.addEdge(2, 3);
        g2.addEdge(3, 0);

        List<List<Integer>> sccs2 = g2.findSCCs();
        System.out.println("Các thành phần liên thông mạnh của đồ thị 2 là:");
        for (List<Integer> scc : sccs2) {
            System.out.println(scc);
        }
    }
}
