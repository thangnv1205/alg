
/**
 * @file dijkstra.java
 * @description Implementation of Dijkstra's algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class Dijkstra
 * @description Class containing Dijkstra's algorithm implementation
 */
public class dijkstra {

    /**
     * @class Edge
     * @description Represents an edge in the graph
     */
    static class Edge {
        int destination;
        int weight;

        Edge(int destination, int weight) {
            this.destination = destination;
            this.weight = weight;
        }
    }

    /**
     * @class Node
     * @description Represents a node with distance for priority queue
     */
    static class Node implements Comparable<Node> {
        int vertex;
        int distance;

        Node(int vertex, int distance) {
            this.vertex = vertex;
            this.distance = distance;
        }

        @Override
        public int compareTo(Node other) {
            return Integer.compare(this.distance, other.distance);
        }
    }

    /**
     * @function dijkstra
     * @description Finds shortest paths from source to all vertices using
     *              Dijkstra's algorithm
     * @param graph  List<List<Edge>> - Adjacency list representation of graph
     * @param source int - Source vertex
     * @returns int[] - Array of shortest distances from source to each vertex
     */
    public static int[] dijkstra(List<List<Edge>> graph, int source) {
        int n = graph.size();
        int[] distances = new int[n];
        boolean[] visited = new boolean[n];

        // Initialize distances to infinity
        Arrays.fill(distances, Integer.MAX_VALUE);
        distances[source] = 0;

        // Priority queue for vertices to visit
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.offer(new Node(source, 0));

        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int u = current.vertex;

            if (visited[u]) {
                continue;
            }

            visited[u] = true;

            // Check all neighbors of current vertex
            for (Edge edge : graph.get(u)) {
                int v = edge.destination;
                int weight = edge.weight;

                if (!visited[v] && distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    pq.offer(new Node(v, distances[v]));
                }
            }
        }

        return distances;
    }

    /**
     * @function dijkstraWithPath
     * @description Finds shortest paths and returns path information
     * @param graph  List<List<Edge>> - Adjacency list representation of graph
     * @param source int - Source vertex
     * @returns Map<String, Object> - Map containing distances and parent arrays
     */
    public static Map<String, Object> dijkstraWithPath(List<List<Edge>> graph, int source) {
        int n = graph.size();
        int[] distances = new int[n];
        int[] parent = new int[n];
        boolean[] visited = new boolean[n];

        // Initialize distances to infinity and parent to -1
        Arrays.fill(distances, Integer.MAX_VALUE);
        Arrays.fill(parent, -1);
        distances[source] = 0;

        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.offer(new Node(source, 0));

        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int u = current.vertex;

            if (visited[u]) {
                continue;
            }

            visited[u] = true;

            for (Edge edge : graph.get(u)) {
                int v = edge.destination;
                int weight = edge.weight;

                if (!visited[v] && distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    parent[v] = u;
                    pq.offer(new Node(v, distances[v]));
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("distances", distances);
        result.put("parent", parent);
        return result;
    }

    /**
     * @function getPath
     * @description Reconstructs path from source to destination
     * @param parent      int[] - Parent array from dijkstra
     * @param source      int - Source vertex
     * @param destination int - Destination vertex
     * @returns List<Integer> - Path from source to destination
     */
    public static List<Integer> getPath(int[] parent, int source, int destination) {
        List<Integer> path = new ArrayList<>();

        if (parent[destination] == -1 && destination != source) {
            return path; // No path exists
        }

        int current = destination;
        while (current != -1) {
            path.add(current);
            current = parent[current];
        }

        Collections.reverse(path);
        return path;
    }

    /**
     * @function createGraph
     * @description Creates a sample graph for testing
     * @param n int - Number of vertices
     * @returns List<List<Edge>> - Adjacency list representation
     */
    public static List<List<Edge>> createGraph(int n) {
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        return graph;
    }

    /**
     * @function addEdge
     * @description Adds an edge to the graph
     * @param graph  List<List<Edge>> - Graph to add edge to
     * @param from   int - Source vertex
     * @param to     int - Destination vertex
     * @param weight int - Edge weight
     * @returns void
     */
    public static void addEdge(List<List<Edge>> graph, int from, int to, int weight) {
        graph.get(from).add(new Edge(to, weight));
        graph.get(to).add(new Edge(from, weight)); // For undirected graph
    }

    /**
     * @function printDistances
     * @description Prints shortest distances from source
     * @param distances int[] - Array of distances
     * @param source    int - Source vertex
     * @returns void
     */
    public static void printDistances(int[] distances, int source) {
        System.out.println("Shortest distances from vertex " + source + ":");
        for (int i = 0; i < distances.length; i++) {
            if (distances[i] == Integer.MAX_VALUE) {
                System.out.println("Vertex " + i + ": INF");
            } else {
                System.out.println("Vertex " + i + ": " + distances[i]);
            }
        }
    }

    /**
     * @function testDijkstra
     * @description Test function to demonstrate Dijkstra's algorithm
     * @returns void
     */
    public static void testDijkstra() {
        System.out.println("=== Dijkstra's Algorithm Test ===");

        // Create a sample graph
        int n = 6;
        List<List<Edge>> graph = createGraph(n);

        // Add edges
        addEdge(graph, 0, 1, 4);
        addEdge(graph, 0, 2, 2);
        addEdge(graph, 1, 2, 1);
        addEdge(graph, 1, 3, 5);
        addEdge(graph, 2, 3, 8);
        addEdge(graph, 2, 4, 10);
        addEdge(graph, 3, 4, 2);
        addEdge(graph, 3, 5, 6);
        addEdge(graph, 4, 5, 3);

        int source = 0;
        System.out.println("Graph with " + n + " vertices");
        System.out.println("Source vertex: " + source);
        System.out.println();

        // Find shortest distances
        int[] distances = dijkstra(graph, source);
        printDistances(distances, source);
        System.out.println();

        // Find shortest paths
        Map<String, Object> result = dijkstraWithPath(graph, source);
        int[] parent = (int[]) result.get("parent");

        System.out.println("Shortest paths:");
        for (int i = 1; i < n; i++) {
            List<Integer> path = getPath(parent, source, i);
            if (path.isEmpty()) {
                System.out.println("No path from " + source + " to " + i);
            } else {
                System.out.println("Path from " + source + " to " + i + ": " + path +
                        " (distance: " + distances[i] + ")");
            }
        }
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for Dijkstra's algorithm
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 100, 500, 1000, 2000 };

        for (int size : sizes) {
            List<List<Edge>> graph = createGraph(size);

            // Add random edges
            Random random = new Random();
            int edgeCount = size * (size - 1) / 4; // Sparse graph

            for (int i = 0; i < edgeCount; i++) {
                int from = random.nextInt(size);
                int to = random.nextInt(size);
                int weight = random.nextInt(100) + 1;

                if (from != to) {
                    addEdge(graph, from, to, weight);
                }
            }

            long startTime = System.nanoTime();
            dijkstra(graph, 0);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Graph size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the Dijkstra's algorithm demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Dijkstra's Algorithm Implementation");
        System.out.println("==================================");

        // Run basic tests
        testDijkstra();

        // Run performance test
        performanceTest();

        System.out.println("\nDijkstra's algorithm completed successfully!");
    }
}
