
/**
 * @file bfs.java
 * @description Implementation of Breadth-First Search algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class bfs
 * @description Class containing Breadth-First Search algorithm implementation
 */
public class bfs {

    /**
     * @function bfsTraversal
     * @description Basic BFS traversal
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @returns void
     */
    public static void bfsTraversal(List<List<Integer>> graph, int start) {
        boolean[] visited = new boolean[graph.size()];
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();
            System.out.print(current + " ");

            for (int neighbor : graph.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }

    /**
     * @function bfsWithLevels
     * @description BFS with level information
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @returns void
     */
    public static void bfsWithLevels(List<List<Integer>> graph, int start) {
        boolean[] visited = new boolean[graph.size()];
        Queue<Integer> queue = new LinkedList<>();
        int[] level = new int[graph.size()];

        visited[start] = true;
        level[start] = 0;
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();
            System.out.println("Vertex " + current + " at level " + level[current]);

            for (int neighbor : graph.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    level[neighbor] = level[current] + 1;
                    queue.offer(neighbor);
                }
            }
        }
    }

    /**
     * @function bfsShortestPath
     * @description BFS to find shortest path in unweighted graph
     * @param graph  List<List<Integer>> - Adjacency list representation of graph
     * @param start  int - Starting vertex
     * @param target int - Target vertex
     * @returns List<Integer> - Shortest path from start to target
     */
    public static List<Integer> bfsShortestPath(List<List<Integer>> graph, int start, int target) {
        boolean[] visited = new boolean[graph.size()];
        int[] parent = new int[graph.size()];
        Arrays.fill(parent, -1);
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();

            if (current == target) {
                return reconstructPath(parent, start, target);
            }

            for (int neighbor : graph.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    parent[neighbor] = current;
                    queue.offer(neighbor);
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
     * @function bfsDistance
     * @description BFS to find shortest distances from start vertex
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @returns int[] - Array of distances from start vertex
     */
    public static int[] bfsDistance(List<List<Integer>> graph, int start) {
        boolean[] visited = new boolean[graph.size()];
        int[] distance = new int[graph.size()];
        Arrays.fill(distance, -1);
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        distance[start] = 0;
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();

            for (int neighbor : graph.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    distance[neighbor] = distance[current] + 1;
                    queue.offer(neighbor);
                }
            }
        }

        return distance;
    }

    /**
     * @function bfsConnectedComponents
     * @description Finds all connected components using BFS
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @returns List<List<Integer>> - List of connected components
     */
    public static List<List<Integer>> bfsConnectedComponents(List<List<Integer>> graph) {
        boolean[] visited = new boolean[graph.size()];
        List<List<Integer>> components = new ArrayList<>();

        for (int i = 0; i < graph.size(); i++) {
            if (!visited[i]) {
                List<Integer> component = new ArrayList<>();
                bfsComponent(graph, i, visited, component);
                components.add(component);
            }
        }

        return components;
    }

    /**
     * @function bfsComponent
     * @description BFS helper to find connected component
     * @param graph     List<List<Integer>> - Adjacency list representation of graph
     * @param start     int - Starting vertex
     * @param visited   boolean[] - Array to track visited vertices
     * @param component List<Integer> - Current component being built
     * @returns void
     */
    private static void bfsComponent(List<List<Integer>> graph, int start, boolean[] visited, List<Integer> component) {
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();
            component.add(current);

            for (int neighbor : graph.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }

    /**
     * @function bfsBipartiteCheck
     * @description Checks if graph is bipartite using BFS
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @returns boolean - True if graph is bipartite, false otherwise
     */
    public static boolean bfsBipartiteCheck(List<List<Integer>> graph) {
        int[] color = new int[graph.size()];
        Arrays.fill(color, -1);

        for (int i = 0; i < graph.size(); i++) {
            if (color[i] == -1) {
                if (!isBipartiteComponent(graph, i, color)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * @function isBipartiteComponent
     * @description Helper function to check if component is bipartite
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @param start int - Starting vertex
     * @param color int[] - Color array (0 or 1)
     * @returns boolean - True if component is bipartite, false otherwise
     */
    private static boolean isBipartiteComponent(List<List<Integer>> graph, int start, int[] color) {
        Queue<Integer> queue = new LinkedList<>();

        color[start] = 0;
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();

            for (int neighbor : graph.get(current)) {
                if (color[neighbor] == -1) {
                    color[neighbor] = 1 - color[current];
                    queue.offer(neighbor);
                } else if (color[neighbor] == color[current]) {
                    return false;
                }
            }
        }

        return true;
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
     * @function testBFS
     * @description Test function to demonstrate BFS
     * @returns void
     */
    public static void testBFS() {
        System.out.println("=== BFS Test ===");

        // Create a sample graph
        List<List<Integer>> graph = createGraph(6);
        addEdge(graph, 0, 1);
        addEdge(graph, 0, 2);
        addEdge(graph, 1, 3);
        addEdge(graph, 2, 4);
        addEdge(graph, 3, 5);

        System.out.println("Graph: 0-1-3-5, 0-2-4");
        System.out.println();

        // Test basic BFS
        System.out.println("BFS traversal from vertex 0:");
        bfsTraversal(graph, 0);
        System.out.println();

        // Test BFS with levels
        System.out.println("BFS with levels from vertex 0:");
        bfsWithLevels(graph, 0);
        System.out.println();

        // Test shortest path
        System.out.println("Shortest path from 0 to 5:");
        List<Integer> path = bfsShortestPath(graph, 0, 5);
        System.out.println("Path: " + path);
        System.out.println();

        // Test distance calculation
        System.out.println("Distances from vertex 0:");
        int[] distances = bfsDistance(graph, 0);
        for (int i = 0; i < distances.length; i++) {
            System.out.println("Distance to " + i + ": " + distances[i]);
        }
        System.out.println();

        // Test connected components
        System.out.println("Connected components:");
        List<List<Integer>> components = bfsConnectedComponents(graph);
        for (int i = 0; i < components.size(); i++) {
            System.out.println("Component " + i + ": " + components.get(i));
        }
        System.out.println();

        // Test bipartite check
        System.out.println("Bipartite check:");
        boolean isBipartite = bfsBipartiteCheck(graph);
        System.out.println("Graph is bipartite: " + isBipartite);
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for BFS
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
            bfsTraversal(graph, 0);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Graph size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the BFS demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Breadth-First Search Algorithm Implementation");
        System.out.println("============================================");

        // Run basic tests
        testBFS();

        // Run performance test
        performanceTest();

        System.out.println("\nBFS completed successfully!");
    }
}
