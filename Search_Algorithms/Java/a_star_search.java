
/**
 * @file a_star_search.java
 * @description Implementation of A* Search algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class a_star_search
 * @description Class containing A* Search algorithm implementation
 */
public class a_star_search {

    /**
     * @class Node
     * @description Represents a node in the search space
     */
    static class Node {
        int x, y;
        double g, h, f;
        Node parent;

        Node(int x, int y) {
            this.x = x;
            this.y = y;
            this.g = 0;
            this.h = 0;
            this.f = 0;
            this.parent = null;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null || getClass() != obj.getClass())
                return false;
            Node node = (Node) obj;
            return x == node.x && y == node.y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }

    /**
     * @function aStar
     * @description A* search algorithm implementation
     * @param grid  int[][] - Grid representation (0 = walkable, 1 = obstacle)
     * @param start Node - Starting node
     * @param goal  Node - Goal node
     * @returns List<Node> - Path from start to goal, empty if no path
     */
    public static List<Node> aStar(int[][] grid, Node start, Node goal) {
        PriorityQueue<Node> openSet = new PriorityQueue<>(Comparator.comparingDouble(n -> n.f));
        Set<Node> closedSet = new HashSet<>();
        Map<Node, Node> cameFrom = new HashMap<>();
        Map<Node, Double> gScore = new HashMap<>();
        Map<Node, Double> fScore = new HashMap<>();

        // Initialize
        gScore.put(start, 0.0);
        fScore.put(start, heuristic(start, goal));
        start.g = 0;
        start.h = heuristic(start, goal);
        start.f = start.g + start.h;
        openSet.add(start);

        while (!openSet.isEmpty()) {
            Node current = openSet.poll();

            if (current.equals(goal)) {
                return reconstructPath(cameFrom, current);
            }

            closedSet.add(current);

            for (Node neighbor : getNeighbors(grid, current)) {
                if (closedSet.contains(neighbor)) {
                    continue;
                }

                double tentativeGScore = gScore.get(current) + distance(current, neighbor);

                if (!gScore.containsKey(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                    cameFrom.put(neighbor, current);
                    gScore.put(neighbor, tentativeGScore);
                    fScore.put(neighbor, tentativeGScore + heuristic(neighbor, goal));

                    neighbor.g = tentativeGScore;
                    neighbor.h = heuristic(neighbor, goal);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;

                    if (!openSet.contains(neighbor)) {
                        openSet.add(neighbor);
                    }
                }
            }
        }

        return new ArrayList<>(); // No path found
    }

    /**
     * @function heuristic
     * @description Heuristic function (Euclidean distance)
     * @param a Node - First node
     * @param b Node - Second node
     * @returns double - Heuristic value
     */
    private static double heuristic(Node a, Node b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    /**
     * @function distance
     * @description Distance between two nodes
     * @param a Node - First node
     * @param b Node - Second node
     * @returns double - Distance
     */
    private static double distance(Node a, Node b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    /**
     * @function getNeighbors
     * @description Gets valid neighbors of a node
     * @param grid int[][] - Grid representation
     * @param node Node - Current node
     * @returns List<Node> - List of valid neighbors
     */
    private static List<Node> getNeighbors(int[][] grid, Node node) {
        List<Node> neighbors = new ArrayList<>();
        int[] dx = { -1, -1, -1, 0, 0, 1, 1, 1 };
        int[] dy = { -1, 0, 1, -1, 1, -1, 0, 1 };

        for (int i = 0; i < 8; i++) {
            int newX = node.x + dx[i];
            int newY = node.y + dy[i];

            if (isValid(grid, newX, newY)) {
                neighbors.add(new Node(newX, newY));
            }
        }

        return neighbors;
    }

    /**
     * @function isValid
     * @description Checks if coordinates are valid and walkable
     * @param grid int[][] - Grid representation
     * @param x    int - X coordinate
     * @param y    int - Y coordinate
     * @returns boolean - True if valid and walkable
     */
    private static boolean isValid(int[][] grid, int x, int y) {
        return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] == 0;
    }

    /**
     * @function reconstructPath
     * @description Reconstructs path from cameFrom map
     * @param cameFrom Map<Node, Node> - Parent map
     * @param current  Node - Current node
     * @returns List<Node> - Path from start to goal
     */
    private static List<Node> reconstructPath(Map<Node, Node> cameFrom, Node current) {
        List<Node> path = new ArrayList<>();

        while (current != null) {
            path.add(current);
            current = cameFrom.get(current);
        }

        Collections.reverse(path);
        return path;
    }

    /**
     * @function aStarWithCustomHeuristic
     * @description A* with custom heuristic function
     * @param grid        int[][] - Grid representation
     * @param start       Node - Starting node
     * @param goal        Node - Goal node
     * @param heuristicFn Function - Custom heuristic function
     * @returns List<Node> - Path from start to goal
     */
    public static List<Node> aStarWithCustomHeuristic(int[][] grid, Node start, Node goal,
            java.util.function.BiFunction<Node, Node, Double> heuristicFn) {
        PriorityQueue<Node> openSet = new PriorityQueue<>(Comparator.comparingDouble(n -> n.f));
        Set<Node> closedSet = new HashSet<>();
        Map<Node, Node> cameFrom = new HashMap<>();
        Map<Node, Double> gScore = new HashMap<>();

        gScore.put(start, 0.0);
        start.g = 0;
        start.h = heuristicFn.apply(start, goal);
        start.f = start.g + start.h;
        openSet.add(start);

        while (!openSet.isEmpty()) {
            Node current = openSet.poll();

            if (current.equals(goal)) {
                return reconstructPath(cameFrom, current);
            }

            closedSet.add(current);

            for (Node neighbor : getNeighbors(grid, current)) {
                if (closedSet.contains(neighbor)) {
                    continue;
                }

                double tentativeGScore = gScore.get(current) + distance(current, neighbor);

                if (!gScore.containsKey(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                    cameFrom.put(neighbor, current);
                    gScore.put(neighbor, tentativeGScore);

                    neighbor.g = tentativeGScore;
                    neighbor.h = heuristicFn.apply(neighbor, goal);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;

                    if (!openSet.contains(neighbor)) {
                        openSet.add(neighbor);
                    }
                }
            }
        }

        return new ArrayList<>();
    }

    /**
     * @function manhattanHeuristic
     * @description Manhattan distance heuristic
     * @param a Node - First node
     * @param b Node - Second node
     * @returns double - Manhattan distance
     */
    public static double manhattanHeuristic(Node a, Node b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    /**
     * @function chebyshevHeuristic
     * @description Chebyshev distance heuristic
     * @param a Node - First node
     * @param b Node - Second node
     * @returns double - Chebyshev distance
     */
    public static double chebyshevHeuristic(Node a, Node b) {
        return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    }

    /**
     * @function createGrid
     * @description Creates a sample grid for testing
     * @param rows int - Number of rows
     * @param cols int - Number of columns
     * @returns int[][] - Grid with some obstacles
     */
    public static int[][] createGrid(int rows, int cols) {
        int[][] grid = new int[rows][cols];

        // Add some obstacles
        if (rows >= 3 && cols >= 3) {
            grid[1][1] = 1;
            grid[1][2] = 1;
            grid[2][1] = 1;
        }

        return grid;
    }

    /**
     * @function printGrid
     * @description Prints the grid with path
     * @param grid int[][] - Grid representation
     * @param path List<Node> - Path to highlight
     * @returns void
     */
    public static void printGrid(int[][] grid, List<Node> path) {
        Set<Node> pathSet = new HashSet<>(path);

        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                Node node = new Node(i, j);
                if (pathSet.contains(node)) {
                    System.out.print("* ");
                } else if (grid[i][j] == 1) {
                    System.out.print("# ");
                } else {
                    System.out.print(". ");
                }
            }
            System.out.println();
        }
    }

    /**
     * @function testAStar
     * @description Test function to demonstrate A* search
     * @returns void
     */
    public static void testAStar() {
        System.out.println("=== A* Search Test ===");

        // Create a sample grid
        int[][] grid = createGrid(5, 5);
        Node start = new Node(0, 0);
        Node goal = new Node(4, 4);

        System.out.println("Grid (0,0 to 4,4):");
        printGrid(grid, new ArrayList<>());
        System.out.println();

        // Test basic A* search
        System.out.println("A* search with Euclidean heuristic:");
        List<Node> path = aStar(grid, start, goal);
        if (!path.isEmpty()) {
            System.out.println("Path found with " + path.size() + " steps:");
            printGrid(grid, path);
            System.out.println("Path: " + path.stream()
                    .map(n -> "(" + n.x + "," + n.y + ")")
                    .reduce((a, b) -> a + " -> " + b)
                    .orElse(""));
        } else {
            System.out.println("No path found!");
        }
        System.out.println();

        // Test with Manhattan heuristic
        System.out.println("A* search with Manhattan heuristic:");
        List<Node> path2 = aStarWithCustomHeuristic(grid, start, goal, a_star_search::manhattanHeuristic);
        if (!path2.isEmpty()) {
            System.out.println("Path found with " + path2.size() + " steps");
        } else {
            System.out.println("No path found!");
        }
        System.out.println();

        // Test with Chebyshev heuristic
        System.out.println("A* search with Chebyshev heuristic:");
        List<Node> path3 = aStarWithCustomHeuristic(grid, start, goal, a_star_search::chebyshevHeuristic);
        if (!path3.isEmpty()) {
            System.out.println("Path found with " + path3.size() + " steps");
        } else {
            System.out.println("No path found!");
        }
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for A* search
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 10, 20, 30, 40, 50 };

        for (int size : sizes) {
            int[][] grid = createGrid(size, size);
            Node start = new Node(0, 0);
            Node goal = new Node(size - 1, size - 1);

            long startTime = System.nanoTime();
            aStar(grid, start, goal);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Grid size %dx%d: %.2f ms%n", size, size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the A* search demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("A* Search Algorithm Implementation");
        System.out.println("==================================");

        // Run basic tests
        testAStar();

        // Run performance test
        performanceTest();

        System.out.println("\nA* Search completed successfully!");
    }
}
