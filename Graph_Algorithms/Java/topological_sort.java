
/**
 * @file topological_sort.java
 * @description Implementation of Topological Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class topological_sort
 * @description Class containing Topological Sort algorithm implementation
 */
public class topological_sort {

    /**
     * @function topologicalSortDFS
     * @description Topological sort using DFS
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @returns List<Integer> - Topological order, empty if cycle exists
     */
    public static List<Integer> topologicalSortDFS(List<List<Integer>> graph) {
        int n = graph.size();
        boolean[] visited = new boolean[n];
        boolean[] recStack = new boolean[n];
        List<Integer> result = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                if (dfsTopological(graph, i, visited, recStack, result)) {
                    return new ArrayList<>(); // Cycle detected
                }
            }
        }

        Collections.reverse(result);
        return result;
    }

    /**
     * @function dfsTopological
     * @description DFS helper for topological sort
     * @param graph    List<List<Integer>> - Adjacency list representation
     * @param vertex   int - Current vertex
     * @param visited  boolean[] - Visited array
     * @param recStack boolean[] - Recursion stack array
     * @param result   List<Integer> - Result list
     * @returns boolean - True if cycle detected
     */
    private static boolean dfsTopological(List<List<Integer>> graph, int vertex,
            boolean[] visited, boolean[] recStack, List<Integer> result) {
        visited[vertex] = true;
        recStack[vertex] = true;

        for (int neighbor : graph.get(vertex)) {
            if (!visited[neighbor]) {
                if (dfsTopological(graph, neighbor, visited, recStack, result)) {
                    return true; // Cycle detected
                }
            } else if (recStack[neighbor]) {
                return true; // Cycle detected
            }
        }

        recStack[vertex] = false;
        result.add(vertex);
        return false;
    }

    /**
     * @function topologicalSortKahn
     * @description Topological sort using Kahn's algorithm (BFS)
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @returns List<Integer> - Topological order, empty if cycle exists
     */
    public static List<Integer> topologicalSortKahn(List<List<Integer>> graph) {
        int n = graph.size();
        int[] inDegree = new int[n];
        List<Integer> result = new ArrayList<>();
        Queue<Integer> queue = new LinkedList<>();

        // Calculate in-degrees
        for (int i = 0; i < n; i++) {
            for (int neighbor : graph.get(i)) {
                inDegree[neighbor]++;
            }
        }

        // Add vertices with in-degree 0 to queue
        for (int i = 0; i < n; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        // Process vertices
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);

            for (int neighbor : graph.get(vertex)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        // Check if all vertices were processed
        if (result.size() != n) {
            return new ArrayList<>(); // Cycle detected
        }

        return result;
    }

    /**
     * @function topologicalSortWithCycleDetection
     * @description Topological sort with cycle detection
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @returns Map<String, Object> - Results including cycle information
     */
    public static Map<String, Object> topologicalSortWithCycleDetection(List<List<Integer>> graph) {
        Map<String, Object> result = new HashMap<>();
        List<Integer> topologicalOrder = topologicalSortKahn(graph);

        result.put("topologicalOrder", topologicalOrder);
        result.put("hasCycle", topologicalOrder.isEmpty());
        result.put("isValid", !topologicalOrder.isEmpty());

        return result;
    }

    /**
     * @function topologicalSortMultiple
     * @description Finds all possible topological orderings
     * @param graph List<List<Integer>> - Adjacency list representation of graph
     * @returns List<List<Integer>> - List of all possible topological orderings
     */
    public static List<List<Integer>> topologicalSortMultiple(List<List<Integer>> graph) {
        int n = graph.size();
        int[] inDegree = new int[n];
        List<List<Integer>> allOrderings = new ArrayList<>();

        // Calculate in-degrees
        for (int i = 0; i < n; i++) {
            for (int neighbor : graph.get(i)) {
                inDegree[neighbor]++;
            }
        }

        findAllTopologicalOrderings(graph, inDegree, new ArrayList<>(), allOrderings);
        return allOrderings;
    }

    /**
     * @function findAllTopologicalOrderings
     * @description Recursive function to find all topological orderings
     * @param graph        List<List<Integer>> - Adjacency list representation
     * @param inDegree     int[] - In-degree array
     * @param current      List<Integer> - Current ordering
     * @param allOrderings List<List<Integer>> - All orderings found
     * @returns void
     */
    private static void findAllTopologicalOrderings(List<List<Integer>> graph, int[] inDegree,
            List<Integer> current, List<List<Integer>> allOrderings) {
        boolean found = false;

        for (int i = 0; i < graph.size(); i++) {
            if (inDegree[i] == 0 && !current.contains(i)) {
                // Add vertex to current ordering
                current.add(i);

                // Update in-degrees
                for (int neighbor : graph.get(i)) {
                    inDegree[neighbor]--;
                }

                // Recursive call
                findAllTopologicalOrderings(graph, inDegree, current, allOrderings);

                // Backtrack
                current.remove(current.size() - 1);
                for (int neighbor : graph.get(i)) {
                    inDegree[neighbor]++;
                }

                found = true;
            }
        }

        if (!found) {
            allOrderings.add(new ArrayList<>(current));
        }
    }

    /**
     * @function longestPathInDAG
     * @description Finds longest path in Directed Acyclic Graph
     * @param graph   List<List<Integer>> - Adjacency list representation of graph
     * @param weights double[][] - Weight matrix
     * @returns double - Length of longest path
     */
    public static double longestPathInDAG(List<List<Integer>> graph, double[][] weights) {
        List<Integer> topologicalOrder = topologicalSortKahn(graph);
        if (topologicalOrder.isEmpty()) {
            return Double.NEGATIVE_INFINITY; // Cycle exists
        }

        int n = graph.size();
        double[] dist = new double[n];
        Arrays.fill(dist, Double.NEGATIVE_INFINITY);
        dist[topologicalOrder.get(0)] = 0;

        for (int u : topologicalOrder) {
            for (int v : graph.get(u)) {
                if (dist[u] != Double.NEGATIVE_INFINITY) {
                    dist[v] = Math.max(dist[v], dist[u] + weights[u][v]);
                }
            }
        }

        return Arrays.stream(dist).max().orElse(0);
    }

    /**
     * @function createSampleGraph
     * @description Creates a sample DAG for testing
     * @returns List<List<Integer>> - Adjacency list representation
     */
    public static List<List<Integer>> createSampleGraph() {
        List<List<Integer>> graph = new ArrayList<>();

        // Create graph with 6 vertices
        for (int i = 0; i < 6; i++) {
            graph.add(new ArrayList<>());
        }

        // Add directed edges to create DAG
        graph.get(0).add(1);
        graph.get(0).add(2);
        graph.get(1).add(3);
        graph.get(2).add(3);
        graph.get(2).add(4);
        graph.get(3).add(5);
        graph.get(4).add(5);

        return graph;
    }

    /**
     * @function createGraphWithCycle
     * @description Creates a graph with cycle for testing
     * @returns List<List<Integer>> - Adjacency list representation
     */
    public static List<List<Integer>> createGraphWithCycle() {
        List<List<Integer>> graph = new ArrayList<>();

        // Create graph with 4 vertices
        for (int i = 0; i < 4; i++) {
            graph.add(new ArrayList<>());
        }

        // Add edges to create cycle: 0 -> 1 -> 2 -> 0
        graph.get(0).add(1);
        graph.get(1).add(2);
        graph.get(2).add(0);
        graph.get(2).add(3);

        return graph;
    }

    /**
     * @function testTopologicalSort
     * @description Test function to demonstrate topological sort
     * @returns void
     */
    public static void testTopologicalSort() {
        System.out.println("=== Topological Sort Test ===");

        // Test 1: Basic topological sort (DFS)
        System.out.println("Test 1: Basic topological sort (DFS)");
        List<List<Integer>> graph = createSampleGraph();
        System.out.println("Graph: 0->1,3; 0->2,4; 1->3; 2->3,4; 3->5; 4->5");

        List<Integer> result1 = topologicalSortDFS(graph);
        System.out.println("Topological order (DFS): " + result1);
        System.out.println();

        // Test 2: Topological sort (Kahn's algorithm)
        System.out.println("Test 2: Topological sort (Kahn's algorithm)");
        List<Integer> result2 = topologicalSortKahn(graph);
        System.out.println("Topological order (Kahn): " + result2);
        System.out.println();

        // Test 3: Graph with cycle
        System.out.println("Test 3: Graph with cycle");
        List<List<Integer>> cycleGraph = createGraphWithCycle();
        System.out.println("Graph with cycle: 0->1->2->0, 2->3");

        List<Integer> result3 = topologicalSortKahn(cycleGraph);
        System.out.println("Topological order: " + result3);
        System.out.println();

        // Test 4: Cycle detection
        System.out.println("Test 4: Cycle detection");
        Map<String, Object> cycleResult = topologicalSortWithCycleDetection(cycleGraph);
        System.out.println("Has cycle: " + cycleResult.get("hasCycle"));
        System.out.println("Is valid: " + cycleResult.get("isValid"));
        System.out.println();

        // Test 5: Multiple topological orderings
        System.out.println("Test 5: Multiple topological orderings");
        List<List<Integer>> allOrderings = topologicalSortMultiple(graph);
        System.out.println("All possible orderings:");
        for (int i = 0; i < allOrderings.size(); i++) {
            System.out.println("Ordering " + (i + 1) + ": " + allOrderings.get(i));
        }
        System.out.println();

        // Test 6: Longest path in DAG
        System.out.println("Test 6: Longest path in DAG");
        double[][] weights = {
                { 0, 1, 2, 0, 0, 0 },
                { 0, 0, 0, 3, 0, 0 },
                { 0, 0, 0, 1, 4, 0 },
                { 0, 0, 0, 0, 0, 2 },
                { 0, 0, 0, 0, 0, 1 },
                { 0, 0, 0, 0, 0, 0 }
        };
        double longestPath = longestPathInDAG(graph, weights);
        System.out.println("Longest path length: " + longestPath);
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for topological sort
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 100, 500, 1000, 2000, 5000 };

        for (int size : sizes) {
            List<List<Integer>> graph = new ArrayList<>();
            Random random = new Random();

            for (int i = 0; i < size; i++) {
                graph.add(new ArrayList<>());
            }

            // Add random edges
            for (int i = 0; i < size * 2; i++) {
                int from = random.nextInt(size);
                int to = random.nextInt(size);
                if (from != to) {
                    graph.get(from).add(to);
                }
            }

            long startTime = System.nanoTime();
            topologicalSortKahn(graph);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Graph size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the topological sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Topological Sort Algorithm Implementation");
        System.out.println("=========================================");

        // Run basic tests
        testTopologicalSort();

        // Run performance test
        performanceTest();

        System.out.println("\nTopological Sort completed successfully!");
    }
}
