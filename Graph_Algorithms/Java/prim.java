
/**
 * @file prim.java
 * @description Implementation of Prim's algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class prim
 * @description Class containing Prim's algorithm implementation
 */
public class prim {

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
     * @function primMST
     * @description Prim's algorithm to find Minimum Spanning Tree
     * @param graph List<List<Edge>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @returns List<Edge> - Edges in the MST
     */
    public static List<Edge> primMST(List<List<Edge>> graph, int start) {
        int n = graph.size();
        boolean[] inMST = new boolean[n];
        List<Edge> mst = new ArrayList<>();
        PriorityQueue<Edge> pq = new PriorityQueue<>();

        // Add all edges from start vertex to priority queue
        for (Edge edge : graph.get(start)) {
            pq.offer(edge);
        }
        inMST[start] = true;

        while (!pq.isEmpty() && mst.size() < n - 1) {
            Edge edge = pq.poll();

            if (inMST[edge.to]) {
                continue; // Skip if already in MST
            }

            // Add edge to MST
            mst.add(edge);
            inMST[edge.to] = true;

            // Add all edges from new vertex to priority queue
            for (Edge newEdge : graph.get(edge.to)) {
                if (!inMST[newEdge.to]) {
                    pq.offer(newEdge);
                }
            }
        }

        return mst;
    }

    /**
     * @function primMSTWithCost
     * @description Prim's algorithm that returns MST and total cost
     * @param graph List<List<Edge>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @returns double[] - [0] = total cost, [1] = number of edges in MST
     */
    public static double[] primMSTWithCost(List<List<Edge>> graph, int start) {
        List<Edge> mst = primMST(graph, start);
        double totalCost = mst.stream().mapToDouble(e -> e.weight).sum();
        return new double[] { totalCost, mst.size() };
    }

    /**
     * @function primMSTWithDetails
     * @description Prim's algorithm with detailed information
     * @param graph List<List<Edge>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @returns Map<String, Object> - Detailed results
     */
    public static Map<String, Object> primMSTWithDetails(List<List<Edge>> graph, int start) {
        Map<String, Object> result = new HashMap<>();
        int n = graph.size();
        boolean[] inMST = new boolean[n];
        List<Edge> mst = new ArrayList<>();
        PriorityQueue<Edge> pq = new PriorityQueue<>();
        List<Edge> consideredEdges = new ArrayList<>();

        // Add all edges from start vertex to priority queue
        for (Edge edge : graph.get(start)) {
            pq.offer(edge);
        }
        inMST[start] = true;

        while (!pq.isEmpty() && mst.size() < n - 1) {
            Edge edge = pq.poll();
            consideredEdges.add(edge);

            if (inMST[edge.to]) {
                continue; // Skip if already in MST
            }

            // Add edge to MST
            mst.add(edge);
            inMST[edge.to] = true;

            // Add all edges from new vertex to priority queue
            for (Edge newEdge : graph.get(edge.to)) {
                if (!inMST[newEdge.to]) {
                    pq.offer(newEdge);
                }
            }
        }

        double totalCost = mst.stream().mapToDouble(e -> e.weight).sum();

        result.put("mst", mst);
        result.put("totalCost", totalCost);
        result.put("consideredEdges", consideredEdges);
        result.put("isConnected", mst.size() == n - 1);

        return result;
    }

    /**
     * @function primMSTOptimized
     * @description Optimized Prim's algorithm using indexed priority queue
     * @param graph List<List<Edge>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @returns List<Edge> - Edges in the MST
     */
    public static List<Edge> primMSTOptimized(List<List<Edge>> graph, int start) {
        int n = graph.size();
        boolean[] inMST = new boolean[n];
        double[] key = new double[n];
        int[] parent = new int[n];
        List<Edge> mst = new ArrayList<>();

        Arrays.fill(key, Double.POSITIVE_INFINITY);
        Arrays.fill(parent, -1);
        key[start] = 0;

        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.comparingDouble(i -> key[i]));
        pq.offer(start);

        while (!pq.isEmpty()) {
            int u = pq.poll();

            if (inMST[u]) {
                continue;
            }

            inMST[u] = true;

            if (parent[u] != -1) {
                mst.add(new Edge(parent[u], u, key[u]));
            }

            for (Edge edge : graph.get(u)) {
                int v = edge.to;
                double weight = edge.weight;

                if (!inMST[v] && weight < key[v]) {
                    key[v] = weight;
                    parent[v] = u;
                    pq.offer(v);
                }
            }
        }

        return mst;
    }

    /**
     * @function createSampleGraph
     * @description Creates a sample graph for testing
     * @returns List<List<Edge>> - Adjacency list representation
     */
    public static List<List<Edge>> createSampleGraph() {
        List<List<Edge>> graph = new ArrayList<>();

        // Create graph with 6 vertices
        for (int i = 0; i < 6; i++) {
            graph.add(new ArrayList<>());
        }

        // Add edges
        addEdge(graph, 0, 1, 4);
        addEdge(graph, 0, 2, 4);
        addEdge(graph, 1, 2, 2);
        addEdge(graph, 1, 3, 6);
        addEdge(graph, 2, 3, 8);
        addEdge(graph, 2, 4, 9);
        addEdge(graph, 3, 4, 11);
        addEdge(graph, 3, 5, 7);
        addEdge(graph, 4, 5, 10);

        return graph;
    }

    /**
     * @function addEdge
     * @description Adds an undirected edge to the graph
     * @param graph  List<List<Edge>> - Adjacency list representation
     * @param from   int - First vertex
     * @param to     int - Second vertex
     * @param weight double - Edge weight
     * @returns void
     */
    public static void addEdge(List<List<Edge>> graph, int from, int to, double weight) {
        graph.get(from).add(new Edge(from, to, weight));
        graph.get(to).add(new Edge(to, from, weight));
    }

    /**
     * @function createRandomGraph
     * @description Creates a random graph for testing
     * @param vertices int - Number of vertices
     * @param edges    int - Number of edges
     * @returns List<List<Edge>> - Adjacency list representation
     */
    public static List<List<Edge>> createRandomGraph(int vertices, int edges) {
        List<List<Edge>> graph = new ArrayList<>();
        Random random = new Random();
        Set<String> usedEdges = new HashSet<>();

        for (int i = 0; i < vertices; i++) {
            graph.add(new ArrayList<>());
        }

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
            addEdge(graph, from, to, weight);
        }

        return graph;
    }

    /**
     * @function testPrim
     * @description Test function to demonstrate Prim's algorithm
     * @returns void
     */
    public static void testPrim() {
        System.out.println("=== Prim's Algorithm Test ===");

        // Test 1: Basic Prim's algorithm
        System.out.println("Test 1: Basic Prim's algorithm");
        List<List<Edge>> graph = createSampleGraph();
        int start = 0;

        System.out.println("Graph adjacency list:");
        for (int i = 0; i < graph.size(); i++) {
            System.out.print("Vertex " + i + ": ");
            for (Edge edge : graph.get(i)) {
                System.out.print(edge + " ");
            }
            System.out.println();
        }
        System.out.println();

        List<Edge> mst = primMST(graph, start);
        System.out.println("MST edges:");
        for (Edge edge : mst) {
            System.out.println(edge);
        }

        double totalCost = mst.stream().mapToDouble(e -> e.weight).sum();
        System.out.println("Total cost: " + totalCost);
        System.out.println();

        // Test 2: Prim's with cost
        System.out.println("Test 2: Prim's with cost");
        double[] result = primMSTWithCost(graph, start);
        System.out.println("Total cost: " + result[0]);
        System.out.println("Number of edges: " + (int) result[1]);
        System.out.println();

        // Test 3: Detailed Prim's
        System.out.println("Test 3: Detailed Prim's");
        Map<String, Object> details = primMSTWithDetails(graph, start);
        System.out.println("MST edges: " + details.get("mst"));
        System.out.println("Total cost: " + details.get("totalCost"));
        System.out.println("Considered edges: " + details.get("consideredEdges"));
        System.out.println("Is connected: " + details.get("isConnected"));
        System.out.println();

        // Test 4: Optimized Prim's
        System.out.println("Test 4: Optimized Prim's");
        List<Edge> optimizedMst = primMSTOptimized(graph, start);
        double optimizedCost = optimizedMst.stream().mapToDouble(e -> e.weight).sum();
        System.out.println("Optimized MST cost: " + optimizedCost);
        System.out.println("Number of edges: " + optimizedMst.size());
        System.out.println();

        // Test 5: Random graph
        System.out.println("Test 5: Random graph");
        List<List<Edge>> randomGraph = createRandomGraph(10, 20);
        List<Edge> randomMst = primMST(randomGraph, 0);
        double randomCost = randomMst.stream().mapToDouble(e -> e.weight).sum();
        System.out.println("Random graph MST cost: " + randomCost);
        System.out.println("Number of edges in MST: " + randomMst.size());
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for Prim's algorithm
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] vertices = { 100, 500, 1000, 2000, 5000 };

        for (int v : vertices) {
            List<List<Edge>> graph = createRandomGraph(v, v * 2);

            long startTime = System.nanoTime();
            primMST(graph, 0);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Vertices %d, Edges %d: %.2f ms%n", v, v * 2, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the Prim's algorithm demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Prim's Algorithm Implementation");
        System.out.println("===============================");

        // Run basic tests
        testPrim();

        // Run performance test
        performanceTest();

        System.out.println("\nPrim's algorithm completed successfully!");
    }
}
