
/**
 * @file floyd_warshall.java
 * @description Implementation of Floyd-Warshall algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class floyd_warshall
 * @description Class containing Floyd-Warshall algorithm implementation
 */
public class floyd_warshall {

    /**
     * @function floydWarshall
     * @description Floyd-Warshall algorithm to find shortest paths between all
     *              pairs
     * @param graph double[][] - Adjacency matrix representation of graph
     * @returns double[][] - Matrix of shortest distances between all pairs
     */
    public static double[][] floydWarshall(double[][] graph) {
        int n = graph.length;
        double[][] dist = new double[n][n];

        // Initialize distance matrix
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    dist[i][j] = 0;
                } else if (graph[i][j] != 0) {
                    dist[i][j] = graph[i][j];
                } else {
                    dist[i][j] = Double.POSITIVE_INFINITY;
                }
            }
        }

        // Floyd-Warshall algorithm
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] != Double.POSITIVE_INFINITY &&
                            dist[k][j] != Double.POSITIVE_INFINITY) {
                        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                    }
                }
            }
        }

        return dist;
    }

    /**
     * @function floydWarshallWithPath
     * @description Floyd-Warshall algorithm that also returns paths
     * @param graph double[][] - Adjacency matrix representation of graph
     * @returns Map<String, List<Integer>> - Map of paths between all pairs
     */
    public static Map<String, List<Integer>> floydWarshallWithPath(double[][] graph) {
        int n = graph.length;
        double[][] dist = new double[n][n];
        int[][] next = new int[n][n];

        // Initialize distance and next matrices
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    dist[i][j] = 0;
                    next[i][j] = j;
                } else if (graph[i][j] != 0) {
                    dist[i][j] = graph[i][j];
                    next[i][j] = j;
                } else {
                    dist[i][j] = Double.POSITIVE_INFINITY;
                    next[i][j] = -1;
                }
            }
        }

        // Floyd-Warshall algorithm
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] != Double.POSITIVE_INFINITY &&
                            dist[k][j] != Double.POSITIVE_INFINITY) {
                        if (dist[i][j] > dist[i][k] + dist[k][j]) {
                            dist[i][j] = dist[i][k] + dist[k][j];
                            next[i][j] = next[i][k];
                        }
                    }
                }
            }
        }

        // Reconstruct paths
        Map<String, List<Integer>> paths = new HashMap<>();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i != j && dist[i][j] != Double.POSITIVE_INFINITY) {
                    String key = i + "->" + j;
                    paths.put(key, reconstructPath(next, i, j));
                }
            }
        }

        return paths;
    }

    /**
     * @function reconstructPath
     * @description Reconstructs path from next matrix
     * @param next  int[][] - Next matrix
     * @param start int - Starting vertex
     * @param end   int - Ending vertex
     * @returns List<Integer> - Path from start to end
     */
    private static List<Integer> reconstructPath(int[][] next, int start, int end) {
        List<Integer> path = new ArrayList<>();

        if (next[start][end] == -1) {
            return path; // No path
        }

        int current = start;
        path.add(current);

        while (current != end) {
            current = next[current][end];
            path.add(current);
        }

        return path;
    }

    /**
     * @function detectNegativeCycle
     * @description Detects negative cycles in the graph
     * @param graph double[][] - Adjacency matrix representation of graph
     * @returns boolean - True if negative cycle exists
     */
    public static boolean detectNegativeCycle(double[][] graph) {
        double[][] dist = floydWarshall(graph);

        // Check for negative cycles (negative diagonal elements)
        for (int i = 0; i < dist.length; i++) {
            if (dist[i][i] < 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * @function transitiveClosure
     * @description Computes transitive closure of the graph
     * @param graph double[][] - Adjacency matrix representation of graph
     * @returns boolean[][] - Transitive closure matrix
     */
    public static boolean[][] transitiveClosure(double[][] graph) {
        int n = graph.length;
        boolean[][] reachable = new boolean[n][n];

        // Initialize reachable matrix
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                reachable[i][j] = (i == j) || (graph[i][j] != 0);
            }
        }

        // Floyd-Warshall for transitive closure
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    reachable[i][j] = reachable[i][j] || (reachable[i][k] && reachable[k][j]);
                }
            }
        }

        return reachable;
    }

    /**
     * @function floydWarshallOptimized
     * @description Optimized Floyd-Warshall with early termination
     * @param graph double[][] - Adjacency matrix representation of graph
     * @returns double[][] - Matrix of shortest distances
     */
    public static double[][] floydWarshallOptimized(double[][] graph) {
        int n = graph.length;
        double[][] dist = new double[n][n];

        // Initialize distance matrix
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    dist[i][j] = 0;
                } else if (graph[i][j] != 0) {
                    dist[i][j] = graph[i][j];
                } else {
                    dist[i][j] = Double.POSITIVE_INFINITY;
                }
            }
        }

        // Floyd-Warshall algorithm with optimization
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                if (dist[i][k] != Double.POSITIVE_INFINITY) {
                    for (int j = 0; j < n; j++) {
                        if (dist[k][j] != Double.POSITIVE_INFINITY) {
                            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                        }
                    }
                }
            }
        }

        return dist;
    }

    /**
     * @function createSampleGraph
     * @description Creates a sample graph for testing
     * @returns double[][] - Adjacency matrix
     */
    public static double[][] createSampleGraph() {
        double[][] graph = {
                { 0, 4, 0, 0, 0, 0, 0, 8, 0 },
                { 4, 0, 8, 0, 0, 0, 0, 11, 0 },
                { 0, 8, 0, 7, 0, 4, 0, 0, 2 },
                { 0, 0, 7, 0, 9, 14, 0, 0, 0 },
                { 0, 0, 0, 9, 0, 10, 0, 0, 0 },
                { 0, 0, 4, 14, 10, 0, 2, 0, 0 },
                { 0, 0, 0, 0, 0, 2, 0, 1, 6 },
                { 8, 11, 0, 0, 0, 0, 1, 0, 7 },
                { 0, 0, 2, 0, 0, 0, 6, 7, 0 }
        };
        return graph;
    }

    /**
     * @function printMatrix
     * @description Prints a matrix in a formatted way
     * @param matrix double[][] - Matrix to print
     * @returns void
     */
    public static void printMatrix(double[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == Double.POSITIVE_INFINITY) {
                    System.out.printf("%8s", "INF");
                } else {
                    System.out.printf("%8.1f", matrix[i][j]);
                }
            }
            System.out.println();
        }
    }

    /**
     * @function testFloydWarshall
     * @description Test function to demonstrate Floyd-Warshall algorithm
     * @returns void
     */
    public static void testFloydWarshall() {
        System.out.println("=== Floyd-Warshall Test ===");

        // Test 1: Basic Floyd-Warshall
        System.out.println("Test 1: Basic Floyd-Warshall");
        double[][] graph = createSampleGraph();
        System.out.println("Original graph:");
        printMatrix(graph);
        System.out.println();

        double[][] shortestPaths = floydWarshall(graph);
        System.out.println("Shortest paths between all pairs:");
        printMatrix(shortestPaths);
        System.out.println();

        // Test 2: Path reconstruction
        System.out.println("Test 2: Path reconstruction");
        Map<String, List<Integer>> paths = floydWarshallWithPath(graph);
        System.out.println("Sample paths:");
        for (String key : paths.keySet()) {
            if (key.startsWith("0->")) {
                System.out.println("Path " + key + ": " + paths.get(key));
            }
        }
        System.out.println();

        // Test 3: Negative cycle detection
        System.out.println("Test 3: Negative cycle detection");
        boolean hasNegativeCycle = detectNegativeCycle(graph);
        System.out.println("Graph has negative cycle: " + hasNegativeCycle);
        System.out.println();

        // Test 4: Transitive closure
        System.out.println("Test 4: Transitive closure");
        boolean[][] transitive = transitiveClosure(graph);
        System.out.println("Transitive closure:");
        for (int i = 0; i < transitive.length; i++) {
            for (int j = 0; j < transitive[i].length; j++) {
                System.out.printf("%5s", transitive[i][j] ? "T" : "F");
            }
            System.out.println();
        }
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for Floyd-Warshall algorithm
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 10, 20, 50, 100, 200 };

        for (int size : sizes) {
            double[][] graph = new double[size][size];
            Random random = new Random();

            // Create random graph
            for (int i = 0; i < size; i++) {
                for (int j = 0; j < size; j++) {
                    if (i == j) {
                        graph[i][j] = 0;
                    } else if (random.nextDouble() < 0.3) { // 30% chance of edge
                        graph[i][j] = random.nextDouble() * 10;
                    }
                }
            }

            long startTime = System.nanoTime();
            floydWarshall(graph);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Graph size %dx%d: %.2f ms%n", size, size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the Floyd-Warshall demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Floyd-Warshall Algorithm Implementation");
        System.out.println("======================================");

        // Run basic tests
        testFloydWarshall();

        // Run performance test
        performanceTest();

        System.out.println("\nFloyd-Warshall completed successfully!");
    }
}
