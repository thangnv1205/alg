
/**
 * @file dfs.java
 * @description Implementation of Depth-First Search algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class dfs
 * @description Class containing Depth-First Search algorithm implementation
 */
public class dfs {

    /**
     * @function dfsRecursive
     * @description Recursive implementation of DFS
     * @param graph   List<List<Integer>> - Adjacency list representation of graph
     * @param start   int - Starting vertex
     * @param visited boolean[] - Array to track visited vertices
     * @returns void
     */
    public static void dfsRecursive(List<List<Integer>> graph, int start, boolean[] visited) {
        visited[start] = true;
        System.out.print(start + " ");

        for (int neighbor : graph.get(start)) {
            if (!visited[neighbor]) {
                dfsRecursive(graph, neighbor, visited);
            }
        }
    }

    /**
     * @function dfsIterative
     * @description Iterative implementation of DFS using stack
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @returns void
     */
    public static void dfsIterative(List<List<Integer>> graph, int start) {
        boolean[] visited = new boolean[graph.size()];
        Stack<Integer> stack = new Stack<>();

        stack.push(start);

        while (!stack.isEmpty()) {
            int current = stack.pop();

            if (!visited[current]) {
                visited[current] = true;
                System.out.print(current + " ");

                for (int neighbor : graph.get(current)) {
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    }

    /**
     * @function dfsWithPath
     * @description DFS that finds path from start to target
     * @param graph  List<List<Integer>> - Adjacency list representation of graph
     * @param start  int - Starting vertex
     * @param target int - Target vertex
     * @returns List<Integer> - Path from start to target, empty if no path
     */
    public static List<Integer> dfsWithPath(List<List<Integer>> graph, int start, int target) {
        boolean[] visited = new boolean[graph.size()];
        int[] parent = new int[graph.size()];
        Arrays.fill(parent, -1);

        Stack<Integer> stack = new Stack<>();
        stack.push(start);

        while (!stack.isEmpty()) {
            int current = stack.pop();

            if (current == target) {
                return reconstructPath(parent, start, target);
            }

            if (!visited[current]) {
                visited[current] = true;

                for (int neighbor : graph.get(current)) {
                    if (!visited[neighbor]) {
                        parent[neighbor] = current;
                        stack.push(neighbor);
                    }
                }
            }
        }

        return new ArrayList<>(); // No path found
    }

    /**
     * @function reconstructPath
     * @description Reconstructs path from parent array
     * @param parent int[] - Parent array
     * @param start  int - Starting vertex
     * @param target int - Target vertex
     * @returns List<Integer> - Path from start to target
     */
    private static List<Integer> reconstructPath(int[] parent, int start, int target) {
        List<Integer> path = new ArrayList<>();
        int current = target;

        while (current != -1) {
            path.add(current);
            current = parent[current];
        }

        Collections.reverse(path);
        return path;
    }

    /**
     * @function dfsConnectedComponents
     * @description Finds all connected components using DFS
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @returns List<List<Integer>> - List of connected components
     */
    public static List<List<Integer>> dfsConnectedComponents(List<List<Integer>> graph) {
        boolean[] visited = new boolean[graph.size()];
        List<List<Integer>> components = new ArrayList<>();

        for (int i = 0; i < graph.size(); i++) {
            if (!visited[i]) {
                List<Integer> component = new ArrayList<>();
                dfsComponent(graph, i, visited, component);
                components.add(component);
            }
        }

        return components;
    }

    /**
     * @function dfsComponent
     * @description DFS helper to find connected component
     * @param graph     List<List<Integer>> - Adjacency list representation of graph
     * @param start     int - Starting vertex
     * @param visited   boolean[] - Array to track visited vertices
     * @param component List<Integer> - Current component being built
     * @returns void
     */
    private static void dfsComponent(List<List<Integer>> graph, int start, boolean[] visited, List<Integer> component) {
        visited[start] = true;
        component.add(start);

        for (int neighbor : graph.get(start)) {
            if (!visited[neighbor]) {
                dfsComponent(graph, neighbor, visited, component);
            }
        }
    }

    /**
     * @function dfsCycleDetection
     * @description Detects cycle in undirected graph using DFS
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @returns boolean - True if cycle exists, false otherwise
     */
    public static boolean dfsCycleDetection(List<List<Integer>> graph) {
        boolean[] visited = new boolean[graph.size()];

        for (int i = 0; i < graph.size(); i++) {
            if (!visited[i]) {
                if (hasCycle(graph, i, -1, visited)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @function hasCycle
     * @description Helper function to detect cycle
     * @param graph   List<List<Integer>> - Adjacency list representation of graph
     * @param vertex  int - Current vertex
     * @param parent  int - Parent vertex
     * @param visited boolean[] - Array to track visited vertices
     * @returns boolean - True if cycle exists, false otherwise
     */
    private static boolean hasCycle(List<List<Integer>> graph, int vertex, int parent, boolean[] visited) {
        visited[vertex] = true;

        for (int neighbor : graph.get(vertex)) {
            if (!visited[neighbor]) {
                if (hasCycle(graph, neighbor, vertex, visited)) {
                    return true;
                }
            } else if (neighbor != parent) {
                return true;
            }
        }

        return false;
    }

    /**
     * @function createGraph
     * @description Creates a sample graph for testing
     * @param vertices int - Number of vertices
     * @returns List<List<Integer>> - Adjacency list representation of graph
     */
    public static List<List<Integer>> createGraph(int vertices) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < vertices; i++) {
            graph.add(new ArrayList<>());
        }
        return graph;
    }

    /**
     * @function addEdge
     * @description Adds an undirected edge to the graph
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @param u     int - First vertex
     * @param v     int - Second vertex
     * @returns void
     */
    public static void addEdge(List<List<Integer>> graph, int u, int v) {
        graph.get(u).add(v);
        graph.get(v).add(u);
    }

    /**
     * @function testDFS
     * @description Test function to demonstrate DFS
     * @returns void
     */
    public static void testDFS() {
        System.out.println("=== DFS Test ===");

        // Create a sample graph
        List<List<Integer>> graph = createGraph(6);
        addEdge(graph, 0, 1);
        addEdge(graph, 0, 2);
        addEdge(graph, 1, 3);
        addEdge(graph, 2, 4);
        addEdge(graph, 3, 5);

        System.out.println("Graph: 0-1-3-5, 0-2-4");
        System.out.println();

        // Test recursive DFS
        System.out.println("Recursive DFS from vertex 0:");
        boolean[] visited = new boolean[graph.size()];
        dfsRecursive(graph, 0, visited);
        System.out.println();

        // Test iterative DFS
        System.out.println("Iterative DFS from vertex 0:");
        dfsIterative(graph, 0);
        System.out.println();

        // Test DFS with path finding
        System.out.println("Path from 0 to 5:");
        List<Integer> path = dfsWithPath(graph, 0, 5);
        System.out.println("Path: " + path);
        System.out.println();

        // Test connected components
        System.out.println("Connected components:");
        List<List<Integer>> components = dfsConnectedComponents(graph);
        for (int i = 0; i < components.size(); i++) {
            System.out.println("Component " + i + ": " + components.get(i));
        }
        System.out.println();

        // Test cycle detection
        System.out.println("Cycle detection:");
        boolean hasCycle = dfsCycleDetection(graph);
        System.out.println("Graph has cycle: " + hasCycle);
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for DFS
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 100, 500, 1000, 2000, 5000 };

        for (int size : sizes) {
            List<List<Integer>> graph = createGraph(size);

            // Add random edges
            Random random = new Random();
            for (int i = 0; i < size * 2; i++) {
                int u = random.nextInt(size);
                int v = random.nextInt(size);
                if (u != v) {
                    addEdge(graph, u, v);
                }
            }

            long startTime = System.nanoTime();
            boolean[] visited = new boolean[size];
            dfsRecursive(graph, 0, visited);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Graph size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the DFS demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Depth-First Search Algorithm Implementation");
        System.out.println("=========================================");

        // Run basic tests
        testDFS();

        // Run performance test
        performanceTest();

        System.out.println("\nDFS completed successfully!");
    }
}
