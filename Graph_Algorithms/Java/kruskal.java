
/**
 * @file kruskal.java
 * @description Implementation of Kruskal's algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class kruskal
 * @description Class containing Kruskal's algorithm implementation
 */
public class kruskal {

    /**
     * @class Edge
     * @description Represents an edge in the graph
     */
    static class Edge implements Comparable<Edge> {
        int from, to;
        double weight;

        Edge(int from, int to, double weight) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }

        @Override
        public int compareTo(Edge other) {
            return Double.compare(this.weight, other.weight);
        }

        @Override
        public String toString() {
            return String.format("(%d-%d: %.2f)", from, to, weight);
        }
    }

    /**
     * @class UnionFind
     * @description Union-Find data structure for Kruskal's algorithm
     */
    static class UnionFind {
        int[] parent;
        int[] rank;

        UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }

        boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) {
                return false; // Already in same set
            }

            // Union by rank
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }

            return true;
        }
    }

    /**
     * @function kruskalMST
     * @description Kruskal's algorithm to find Minimum Spanning Tree
     * @param edges    List<Edge> - List of edges
     * @param vertices int - Number of vertices
     * @returns List<Edge> - Edges in the MST
     */
    public static List<Edge> kruskalMST(List<Edge> edges, int vertices) {
        List<Edge> mst = new ArrayList<>();
        UnionFind uf = new UnionFind(vertices);

        // Sort edges by weight
        Collections.sort(edges);

        for (Edge edge : edges) {
            if (uf.union(edge.from, edge.to)) {
                mst.add(edge);
                if (mst.size() == vertices - 1) {
                    break; // MST is complete
                }
            }
        }

        return mst;
    }

    /**
     * @function kruskalMSTWithCost
     * @description Kruskal's algorithm that returns MST and total cost
     * @param edges    List<Edge> - List of edges
     * @param vertices int - Number of vertices
     * @returns double[] - [0] = total cost, [1] = number of edges in MST
     */
    public static double[] kruskalMSTWithCost(List<Edge> edges, int vertices) {
        List<Edge> mst = kruskalMST(edges, vertices);
        double totalCost = mst.stream().mapToDouble(e -> e.weight).sum();
        return new double[] { totalCost, mst.size() };
    }

    /**
     * @function kruskalMSTWithDetails
     * @description Kruskal's algorithm with detailed information
     * @param edges    List<Edge> - List of edges
     * @param vertices int - Number of vertices
     * @returns Map<String, Object> - Detailed results
     */
    public static Map<String, Object> kruskalMSTWithDetails(List<Edge> edges, int vertices) {
        Map<String, Object> result = new HashMap<>();
        List<Edge> mst = new ArrayList<>();
        UnionFind uf = new UnionFind(vertices);
        List<Edge> rejectedEdges = new ArrayList<>();

        Collections.sort(edges);

        for (Edge edge : edges) {
            if (uf.union(edge.from, edge.to)) {
                mst.add(edge);
                if (mst.size() == vertices - 1) {
                    break;
                }
            } else {
                rejectedEdges.add(edge);
            }
        }

        double totalCost = mst.stream().mapToDouble(e -> e.weight).sum();

        result.put("mst", mst);
        result.put("totalCost", totalCost);
        result.put("rejectedEdges", rejectedEdges);
        result.put("isConnected", mst.size() == vertices - 1);

        return result;
    }

    /**
     * @function kruskalMSTOptimized
     * @description Optimized Kruskal's algorithm with early termination
     * @param edges    List<Edge> - List of edges
     * @param vertices int - Number of vertices
     * @returns List<Edge> - Edges in the MST
     */
    public static List<Edge> kruskalMSTOptimized(List<Edge> edges, int vertices) {
        List<Edge> mst = new ArrayList<>();
        UnionFind uf = new UnionFind(vertices);

        // Use priority queue for better performance
        PriorityQueue<Edge> pq = new PriorityQueue<>(edges);

        while (!pq.isEmpty() && mst.size() < vertices - 1) {
            Edge edge = pq.poll();
            if (uf.union(edge.from, edge.to)) {
                mst.add(edge);
            }
        }

        return mst;
    }

    /**
     * @function createSampleGraph
     * @description Creates a sample graph for testing
     * @returns List<Edge> - List of edges
     */
    public static List<Edge> createSampleGraph() {
        List<Edge> edges = new ArrayList<>();

        // Sample graph with 6 vertices
        edges.add(new Edge(0, 1, 4));
        edges.add(new Edge(0, 2, 4));
        edges.add(new Edge(1, 2, 2));
        edges.add(new Edge(1, 3, 6));
        edges.add(new Edge(2, 3, 8));
        edges.add(new Edge(2, 4, 9));
        edges.add(new Edge(3, 4, 11));
        edges.add(new Edge(3, 5, 7));
        edges.add(new Edge(4, 5, 10));

        return edges;
    }

    /**
     * @function createRandomGraph
     * @description Creates a random graph for testing
     * @param vertices int - Number of vertices
     * @param edges    int - Number of edges
     * @returns List<Edge> - List of edges
     */
    public static List<Edge> createRandomGraph(int vertices, int edges) {
        List<Edge> edgeList = new ArrayList<>();
        Random random = new Random();
        Set<String> usedEdges = new HashSet<>();

        for (int i = 0; i < edges; i++) {
            int from, to;
            String edgeKey;

            do {
                from = random.nextInt(vertices);
                to = random.nextInt(vertices);
                edgeKey = Math.min(from, to) + "-" + Math.max(from, to);
            } while (from == to || usedEdges.contains(edgeKey));

            usedEdges.add(edgeKey);
            double weight = random.nextDouble() * 10;
            edgeList.add(new Edge(from, to, weight));
        }

        return edgeList;
    }

    /**
     * @function testKruskal
     * @description Test function to demonstrate Kruskal's algorithm
     * @returns void
     */
    public static void testKruskal() {
        System.out.println("=== Kruskal's Algorithm Test ===");

        // Test 1: Basic Kruskal's algorithm
        System.out.println("Test 1: Basic Kruskal's algorithm");
        List<Edge> edges = createSampleGraph();
        int vertices = 6;

        System.out.println("Original edges:");
        for (Edge edge : edges) {
            System.out.println(edge);
        }
        System.out.println();

        List<Edge> mst = kruskalMST(edges, vertices);
        System.out.println("MST edges:");
        for (Edge edge : mst) {
            System.out.println(edge);
        }

        double totalCost = mst.stream().mapToDouble(e -> e.weight).sum();
        System.out.println("Total cost: " + totalCost);
        System.out.println();

        // Test 2: Kruskal's with cost
        System.out.println("Test 2: Kruskal's with cost");
        double[] result = kruskalMSTWithCost(edges, vertices);
        System.out.println("Total cost: " + result[0]);
        System.out.println("Number of edges: " + (int) result[1]);
        System.out.println();

        // Test 3: Detailed Kruskal's
        System.out.println("Test 3: Detailed Kruskal's");
        Map<String, Object> details = kruskalMSTWithDetails(edges, vertices);
        System.out.println("MST edges: " + details.get("mst"));
        System.out.println("Total cost: " + details.get("totalCost"));
        System.out.println("Rejected edges: " + details.get("rejectedEdges"));
        System.out.println("Is connected: " + details.get("isConnected"));
        System.out.println();

        // Test 4: Random graph
        System.out.println("Test 4: Random graph");
        List<Edge> randomEdges = createRandomGraph(10, 20);
        List<Edge> randomMst = kruskalMST(randomEdges, 10);
        double randomCost = randomMst.stream().mapToDouble(e -> e.weight).sum();
        System.out.println("Random graph MST cost: " + randomCost);
        System.out.println("Number of edges in MST: " + randomMst.size());
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for Kruskal's algorithm
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] vertices = { 100, 500, 1000, 2000, 5000 };

        for (int v : vertices) {
            List<Edge> edges = createRandomGraph(v, v * 2);

            long startTime = System.nanoTime();
            kruskalMST(edges, v);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Vertices %d, Edges %d: %.2f ms%n", v, edges.size(), duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the Kruskal's algorithm demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Kruskal's Algorithm Implementation");
        System.out.println("==================================");

        // Run basic tests
        testKruskal();

        // Run performance test
        performanceTest();

        System.out.println("\nKruskal's algorithm completed successfully!");
    }
}
