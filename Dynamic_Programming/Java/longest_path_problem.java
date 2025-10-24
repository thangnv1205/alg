import java.util.*;

/**
 * Lớp longest_path_problem cung cấp một triển khai để tìm đường đi dài nhất
 * trong Đồ thị có hướng không có chu trình (DAG) sử dụng quy hoạch động
 * và sắp xếp topo.
 */
public class longest_path_problem {

    /**
     * Lớp Edge biểu diễn một cạnh trong đồ thị có hướng, có trọng số.
     */
    static class Edge {
        String to; // Đỉnh đích của cạnh
        int weight; // Trọng số của cạnh

        public Edge(String to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }

    /**
     * Thực hiện tìm kiếm theo chiều sâu (DFS) để điền vào stack theo thứ tự topo.
     * @param u String - Đỉnh hiện tại.
     * @param graph Map<String, List<Edge>> - Biểu diễn đồ thị bằng danh sách kề.
     * @param visited Set<String> - Tập hợp các đỉnh đã được thăm.
     * @param stack Stack<String> - Stack để lưu trữ thứ tự topo.
     */
    private static void topologicalSortDFS(String u, Map<String, List<Edge>> graph, Set<String> visited, Stack<String> stack) {
        visited.add(u);
        // Duyệt qua tất cả các đỉnh kề của u
        if (graph.containsKey(u)) {
            for (Edge edge : graph.get(u)) {
                if (!visited.contains(edge.to)) {
                    topologicalSortDFS(edge.to, graph, visited, stack);
                }
            }
        }
        stack.push(u); // Đẩy đỉnh vào stack sau khi tất cả các đỉnh kề đã được thăm
    }

    /**
     * Tìm đường đi dài nhất trong Đồ thị có hướng không có chu trình (DAG).
     * Thuật toán này sử dụng sắp xếp topo và quy hoạch động.
     * @param graph Map<String, List<Edge>> - Biểu diễn đồ thị bằng danh sách kề.
     * @return int - Độ dài của đường đi dài nhất trong DAG.
     */
    public static int longestPathInDAG(Map<String, List<Edge>> graph) {
        // Thu thập tất cả các nút duy nhất trong đồ thị
        Set<String> allNodes = new HashSet<>();
        for (String u : graph.keySet()) {
            allNodes.add(u);
            for (Edge edge : graph.get(u)) {
                allNodes.add(edge.to);
            }
        }

        Stack<String> stack = new Stack<>();
        Set<String> visited = new HashSet<>();

        // Bước 1: Thực hiện sắp xếp topo cho tất cả các nút
        for (String node : allNodes) {
            if (!visited.contains(node)) {
                topologicalSortDFS(node, graph, visited, stack);
            }
        }

        // Bước 2: Khởi tạo khoảng cách
        // dist[u] sẽ lưu trữ độ dài đường đi dài nhất đến u
        Map<String, Integer> dist = new HashMap<>();
        for (String node : allNodes) {
            dist.put(node, Integer.MIN_VALUE); // Khởi tạo khoảng cách là âm vô cùng
        }

        int maxOverallPath = 0; // Biến để lưu trữ độ dài đường đi dài nhất tổng thể

        // Bước 3: Xử lý các nút theo thứ tự topo
        while (!stack.isEmpty()) {
            String u = stack.pop(); // Lấy đỉnh tiếp theo theo thứ tự topo

            // Nếu đỉnh hiện tại chưa được xử lý (tức là không có đường đi đến nó từ các nút trước đó)
            // thì nó có thể là điểm bắt đầu của một đường đi dài nhất mới.
            if (dist.get(u) == Integer.MIN_VALUE) {
                dist.put(u, 0); // Đặt khoảng cách của nó là 0 nếu nó là điểm bắt đầu
            }

            // Thư giãn các cạnh kề của u
            if (graph.containsKey(u)) {
                for (Edge edge : graph.get(u)) {
                    String v = edge.to;
                    int weight = edge.weight;

                    // Nếu có đường đi đến u và đường đi qua u đến v dài hơn đường đi hiện tại đến v
                    if (dist.get(u) != Integer.MIN_VALUE && dist.get(u) + weight > dist.get(v)) {
                        dist.put(v, dist.get(u) + weight);
                    }
                }
            }
        }

        // Bước 4: Tìm giá trị lớn nhất trong tất cả các khoảng cách đã tính
        // Đây sẽ là độ dài đường đi dài nhất tổng thể trong DAG
        for (int pathLength : dist.values()) {
            if (pathLength > maxOverallPath) {
                maxOverallPath = pathLength;
            }
        }

        return maxOverallPath;
    }

    /**
     * Phương thức chính để trình diễn việc tìm đường đi dài nhất trong DAG.
     * @param args String[] - Đối số dòng lệnh (không được sử dụng).
     */
    public static void main(String[] args) {
        // Ví dụ 1:
        Map<String, List<Edge>> graph = new HashMap<>();
        graph.put("A", Arrays.asList(new Edge("B", 3), new Edge("C", 2)));
        graph.put("B", Arrays.asList(new Edge("D", 4)));
        graph.put("C", Arrays.asList(new Edge("D", 1)));
        graph.put("D", new ArrayList<>()); // D không có cạnh đi ra

        System.out.println("Độ dài đường đi dài nhất trong DAG là: " + longestPathInDAG(graph)); // Dự kiến: 7 (A->B->D)

        // Ví dụ 2:
        Map<String, List<Edge>> graph2 = new HashMap<>();
        graph2.put("0", Arrays.asList(new Edge("1", 5), new Edge("2", 3)));
        graph2.put("1", Arrays.asList(new Edge("3", 6), new Edge("2", 2)));
        graph2.put("2", Arrays.asList(new Edge("3", 7), new Edge("4", 4)));
        graph2.put("3", Arrays.asList(new Edge("4", -1))); // Cạnh có trọng số âm được phép trong DAG
        graph2.put("4", new ArrayList<>());

        System.out.println("Độ dài đường đi dài nhất trong DAG 2 là: " + longestPathInDAG(graph2)); // Dự kiến: 15 (0->2->3->4)
    }
}
