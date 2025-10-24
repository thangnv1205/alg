
/**
 * @file bellman_ford.java
 * @description Implementation of Bellman-Ford algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class bellman_ford
 * @description Class containing Bellman-Ford algorithm implementation
 */
public class bellman_ford {

    /**
     * @class Edge
     * @description Represents an edge in the graph
     */
    static class Edge {
        int from, to;
        double weight;

        Edge(int from, int to, double weight) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }
    }

    /**
     * @function bellmanFord
     * @description Bellman-Ford algorithm to find shortest paths
     * @param edges    List<Edge> - List of edges
     * @param vertices int - Number of vertices
     * @param source   int - Source vertex
     * @returns double[] - Array of shortest distances, null if negative cycle
     *          exists
     */
    public static double[] bellmanFord(List<Edge> edges, int vertices, int source) {
        double[] distances = new double[vertices];
        int[] predecessors = new int[vertices];

        // Initialize distances
        Arrays.fill(distances, Double.POSITIVE_INFINITY);
        Arrays.fill(predecessors, -1);
        distances[source] = 0;

        // Relax edges V-1 times
        for (int i = 0; i < vertices - 1; i++) {
            for (Edge edge : edges) {
                if (distances[edge.from] != Double.POSITIVE_INFINITY &&
                        distances[edge.from] + edge.weight < distances[edge.to]) {
                    distances[edge.to] = distances[edge.from] + edge.weight;
                    predecessors[edge.to] = edge.from;
                }
            }
        }

        // Check for negative cycles
        for (Edge edge : edges) {
            if (distances[edge.from] != Double.POSITIVE_INFINITY &&
                    distances[edge.from] + edge.weight < distances[edge.to]) {
                return null; // Negative cycle detected
            }
        }

        return distances;
    }

    /**
     * @function bellmanFordWithPath
     * @description Bellman-Ford algorithm that also returns paths
     * @param edges    List<Edge> - List of edges
     * @param vertices int - Number of vertices
     * @param source   int - Source vertex
     * @returns Map<Integer, List<Integer>> - Map of vertex to path, null if
     *          negative cycle
     */
    public static Map<Integer, List<Integer>> bellmanFordWithPath(List<Edge> edges, int vertices, int source) {
        double[] distances = new double[vertices];
        int[] predecessors = new int[vertices];

        Arrays.fill(distances, Double.POSITIVE_INFINITY);
        Arrays.fill(predecessors, -1);
        distances[source] = 0;

        // Relax edges V-1 times
        for (int i = 0; i < vertices - 1; i++) {
            for (Edge edge : edges) {
                if (distances[edge.from] != Double.POSITIVE_INFINITY &&
                        distances[edge.from] + edge.weight < distances[edge.to]) {
                    distances[edge.to] = distances[edge.from] + edge.weight;
                    predecessors[edge.to] = edge.from;
                }
            }
        }

        // Check for negative cycles
        for (Edge edge : edges) {
            if (distances[edge.from] != Double.POSITIVE_INFINITY &&
                    distances[edge.from] + edge.weight < distances[edge.to]) {
                return null; // Negative cycle detected
            }
        }

        // Reconstruct paths
        Map<Integer, List<Integer>> paths = new HashMap<>();
        for (int i = 0; i < vertices; i++) {
            if (distances[i] != Double.POSITIVE_INFINITY) {
                paths.put(i, reconstructPath(predecessors, source, i));
            }
        }

        return paths;
    }

    /**
     * @function reconstructPath
     * @description Reconstructs path from predecessors array
     * @param predecessors int[] - Predecessors array
     * @param source       int - Source vertex
     * @param target       int - Target vertex
     * @returns List<Integer> - Path from source to target
     */
    private static List<Integer> reconstructPath(int[] predecessors, int source, int target) {
        List<Integer> path = new ArrayList<>();
        int current = target;

        while (current != -1) {
            path.add(current);
            current = predecessors[current];
        }

        Collections.reverse(path);
        return path;
    }

    /**
     * @function detectNegativeCycle
     * @description Detects if graph has negative cycle
     * @param edges    List<Edge> - List of edges
     * @param vertices int - Number of vertices
     * @returns boolean - True if negative cycle exists
     */
    public static boolean detectNegativeCycle(List<Edge> edges, int vertices) {
        double[] distances = new double[vertices];
        Arrays.fill(distances, 0); // Start with all distances as 0

        // Relax edges V times
        for (int i = 0; i < vertices; i++) {
            for (Edge edge : edges) {
                if (distances[edge.from] + edge.weight < distances[edge.to]) {
                    distances[edge.to] = distances[edge.from] + edge.weight;
                    if (i == vertices - 1) {
                        return true; // Negative cycle detected
                    }
                }
            }
        }

        return false;
    }

    /**
     * @function bellmanFordOptimized
     * @description Optimized Bellman-Ford with early termination
     * @param edges    List<Edge> - List of edges
     * @param vertices int - Number of vertices
     * @param source   int - Source vertex
     * @returns double[] - Array of shortest distances, null if negative cycle
     */
    public static double[] bellmanFordOptimized(List<Edge> edges, int vertices, int source) {
        double[] distances = new double[vertices];
        Arrays.fill(distances, Double.POSITIVE_INFINITY);
        distances[source] = 0;

        boolean relaxed = true;
        for (int i = 0; i < vertices - 1 && relaxed; i++) {
            relaxed = false;
            for (Edge edge : edges) {
                if (distances[edge.from] != Double.POSITIVE_INFINITY &&
                        distances[edge.from] + edge.weight < distances[edge.to]) {
                    distances[edge.to] = distances[edge.from] + edge.weight;
                    relaxed = true;
                }
            }
        }

        // Check for negative cycles
        for (Edge edge : edges) {
            if (distances[edge.from] != Double.POSITIVE_INFINITY &&
                    distances[edge.from] + edge.weight < distances[edge.to]) {
                return null; // Negative cycle detected
            }
        }

        return distances;
    }

    /**
     * @function createSampleGraph
     * @description Creates a sample graph for testing
     * @returns List<Edge> - List of edges
     */
    public static List<Edge> createSampleGraph() {
        List<Edge> edges = new ArrayList<>();

        // Sample graph with 5 vertices
        edges.add(new Edge(0, 1, 4));
        edges.add(new Edge(0, 2, 2));
        edges.add(new Edge(1, 2, 1));
        edges.add(new Edge(1, 3, 2));
        edges.add(new Edge(2, 3, 4));
        edges.add(new Edge(2, 4, 3));
        edges.add(new Edge(3, 4, 1));

        return edges;
    }

    /**
     * @function createGraphWithNegativeCycle
     * @description Creates a graph with negative cycle for testing
     * @returns List<Edge> - List of edges
     */
    public static List<Edge> createGraphWithNegativeCycle() {
        List<Edge> edges = new ArrayList<>();

        // Graph with negative cycle: 0 -> 1 -> 2 -> 0
        edges.add(new Edge(0, 1, 1));
        edges.add(new Edge(1, 2, -3));
        edges.add(new Edge(2, 0, 1));

        return edges;
    }

    /**
     * @function testBellmanFord
     * @description Test function to demonstrate Bellman-Ford algorithm
     * @returns void
     */
    public static void testBellmanFord() {
        System.out.println("=== Bellman-Ford Test ===");

        // Test 1: Normal graph
        System.out.println("Test 1: Normal graph");
        List<Edge> edges1 = createSampleGraph();
        int vertices1 = 5;
        int source1 = 0;

        double[] distances1 = bellmanFord(edges1, vertices1, source1);
        if (distances1 != null) {
            System.out.println("Shortest distances from vertex " + source1 + ":");
            for (int i = 0; i < distances1.length; i++) {
                if (distances1[i] == Double.POSITIVE_INFINITY) {
                    System.out.println("Vertex " + i + ": Infinity");
                } else {
                    System.out.println("Vertex " + i + ": " + distances1[i]);
                }
            }
        } else {
            System.out.println("Negative cycle detected!");
        }
        System.out.println();

        // Test 2: Graph with negative cycle
        System.out.println("Test 2: Graph with negative cycle");
        List<Edge> edges2 = createGraphWithNegativeCycle();
        int vertices2 = 3;
        int source2 = 0;

        double[] distances2 = bellmanFord(edges2, vertices2, source2);
        if (distances2 != null) {
            System.out.println("Shortest distances from vertex " + source2 + ":");
            for (int i = 0; i < distances2.length; i++) {
                if (distances2[i] == Double.POSITIVE_INFINITY) {
                    System.out.println("Vertex " + i + ": Infinity");
                } else {
                    System.out.println("Vertex " + i + ": " + distances2[i]);
                }
            }
        } else {
            System.out.println("Negative cycle detected!");
        }
        System.out.println();

        // Test 3: Path reconstruction
        System.out.println("Test 3: Path reconstruction");
        Map<Integer, List<Integer>> paths = bellmanFordWithPath(edges1, vertices1, source1);
        if (paths != null) {
            for (int i = 0; i < vertices1; i++) {
                if (paths.containsKey(i)) {
                    System.out.println("Path to vertex " + i + ": " + paths.get(i));
                }
            }
        }
        System.out.println();

        // Test 4: Negative cycle detection
        System.out.println("Test 4: Negative cycle detection");
        boolean hasNegativeCycle = detectNegativeCycle(edges2, vertices2);
        System.out.println("Graph has negative cycle: " + hasNegativeCycle);
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for Bellman-Ford algorithm
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] vertices = { 10, 20, 50, 100, 200 };

        for (int v : vertices) {
            List<Edge> edges = new ArrayList<>();
            Random random = new Random();

            // Create random edges
            for (int i = 0; i < v * 2; i++) {
                int from = random.nextInt(v);
                int to = random.nextInt(v);
                double weight = random.nextDouble() * 10 - 5; // Random weight between -5 and 5
                edges.add(new Edge(from, to, weight));
            }

            long startTime = System.nanoTime();
            bellmanFord(edges, v, 0);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Vertices %d, Edges %d: %.2f ms%n", v, edges.size(), duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the Bellman-Ford demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Bellman-Ford Algorithm Implementation");
        System.out.println("====================================");

        // Run basic tests
        testBellmanFord();

        // Run performance test
        performanceTest();

        System.out.println("\nBellman-Ford completed successfully!");
    }
}
