
/**
 * @file knapsack_problem.java
 * @description Implementation of Knapsack Problem algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class knapsack_problem
 * @description Class containing Knapsack Problem algorithm implementation
 */
public class knapsack_problem {

    /**
     * @function knapsack01Recursive
     * @description Recursive implementation of 0/1 Knapsack
     * @param weights  int[] - Array of item weights
     * @param values   int[] - Array of item values
     * @param capacity int - Knapsack capacity
     * @returns int - Maximum value that can be obtained
     */
    public static int knapsack01Recursive(int[] weights, int[] values, int capacity) {
        return knapsack01RecursiveHelper(weights, values, capacity, weights.length);
    }

    /**
     * @function knapsack01RecursiveHelper
     * @description Helper function for recursive 0/1 Knapsack
     * @param weights  int[] - Array of item weights
     * @param values   int[] - Array of item values
     * @param capacity int - Remaining capacity
     * @param n        int - Number of items to consider
     * @returns int - Maximum value that can be obtained
     */
    private static int knapsack01RecursiveHelper(int[] weights, int[] values, int capacity, int n) {
        if (n == 0 || capacity == 0) {
            return 0;
        }

        if (weights[n - 1] > capacity) {
            return knapsack01RecursiveHelper(weights, values, capacity, n - 1);
        }

        return Math.max(
                values[n - 1] + knapsack01RecursiveHelper(weights, values, capacity - weights[n - 1], n - 1),
                knapsack01RecursiveHelper(weights, values, capacity, n - 1));
    }

    /**
     * @function knapsack01DP
     * @description Dynamic programming implementation of 0/1 Knapsack
     * @param weights  int[] - Array of item weights
     * @param values   int[] - Array of item values
     * @param capacity int - Knapsack capacity
     * @returns int - Maximum value that can be obtained
     */
    public static int knapsack01DP(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(
                            values[i - 1] + dp[i - 1][w - weights[i - 1]],
                            dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        return dp[n][capacity];
    }

    /**
     * @function knapsack01Optimized
     * @description Space-optimized implementation of 0/1 Knapsack
     * @param weights  int[] - Array of item weights
     * @param values   int[] - Array of item values
     * @param capacity int - Knapsack capacity
     * @returns int - Maximum value that can be obtained
     */
    public static int knapsack01Optimized(int[] weights, int[] values, int capacity) {
        int[] dp = new int[capacity + 1];

        for (int i = 0; i < weights.length; i++) {
            for (int w = capacity; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }

        return dp[capacity];
    }

    /**
     * @function knapsack01WithItems
     * @description 0/1 Knapsack that returns selected items
     * @param weights  int[] - Array of item weights
     * @param values   int[] - Array of item values
     * @param capacity int - Knapsack capacity
     * @returns List<Integer> - List of selected item indices
     */
    public static List<Integer> knapsack01WithItems(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];

        // Fill DP table
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(
                            values[i - 1] + dp[i - 1][w - weights[i - 1]],
                            dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        // Backtrack to find selected items
        List<Integer> selectedItems = new ArrayList<>();
        int i = n, w = capacity;

        while (i > 0 && w > 0) {
            if (dp[i][w] != dp[i - 1][w]) {
                selectedItems.add(i - 1);
                w -= weights[i - 1];
            }
            i--;
        }

        Collections.reverse(selectedItems);
        return selectedItems;
    }

    /**
     * @function knapsackFractional
     * @description Fractional knapsack using greedy approach
     * @param weights  int[] - Array of item weights
     * @param values   int[] - Array of item values
     * @param capacity int - Knapsack capacity
     * @returns double - Maximum value that can be obtained
     */
    public static double knapsackFractional(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        Item[] items = new Item[n];

        for (int i = 0; i < n; i++) {
            items[i] = new Item(i, weights[i], values[i]);
        }

        // Sort by value per unit weight
        Arrays.sort(items, (a, b) -> Double.compare(b.valuePerWeight, a.valuePerWeight));

        double totalValue = 0;
        int remainingCapacity = capacity;

        for (Item item : items) {
            if (remainingCapacity >= item.weight) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } else {
                totalValue += item.valuePerWeight * remainingCapacity;
                break;
            }
        }

        return totalValue;
    }

    /**
     * @class Item
     * @description Represents an item in the knapsack
     */
    static class Item {
        int index;
        int weight;
        int value;
        double valuePerWeight;

        Item(int index, int weight, int value) {
            this.index = index;
            this.weight = weight;
            this.value = value;
            this.valuePerWeight = (double) value / weight;
        }
    }

    /**
     * @function knapsackUnbounded
     * @description Unbounded knapsack problem
     * @param weights  int[] - Array of item weights
     * @param values   int[] - Array of item values
     * @param capacity int - Knapsack capacity
     * @returns int - Maximum value that can be obtained
     */
    public static int knapsackUnbounded(int[] weights, int[] values, int capacity) {
        int[] dp = new int[capacity + 1];

        for (int w = 1; w <= capacity; w++) {
            for (int i = 0; i < weights.length; i++) {
                if (weights[i] <= w) {
                    dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
                }
            }
        }

        return dp[capacity];
    }

    /**
     * @function knapsackMultiple
     * @description Multiple knapsack problem
     * @param weights    int[] - Array of item weights
     * @param values     int[] - Array of item values
     * @param capacities int[] - Array of knapsack capacities
     * @returns int - Maximum value that can be obtained
     */
    public static int knapsackMultiple(int[] weights, int[] values, int[] capacities) {
        int n = weights.length;
        int k = capacities.length;
        int[][][] dp = new int[n + 1][k + 1][];

        // Initialize DP table
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i][j] = new int[capacities[j] + 1];
            }
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= k; j++) {
                for (int w = 1; w <= capacities[j - 1]; w++) {
                    if (weights[i - 1] <= w) {
                        dp[i][j][w] = Math.max(
                                values[i - 1] + dp[i - 1][j][w - weights[i - 1]],
                                dp[i - 1][j][w]);
                    } else {
                        dp[i][j][w] = dp[i - 1][j][w];
                    }
                }
            }
        }

        return dp[n][k][capacities[k - 1]];
    }

    /**
     * @function createSampleData
     * @description Creates sample data for testing
     * @returns Map<String, Object> - Sample data
     */
    public static Map<String, Object> createSampleData() {
        Map<String, Object> data = new HashMap<>();

        int[] weights = { 10, 20, 30, 40, 50 };
        int[] values = { 60, 100, 120, 160, 200 };
        int capacity = 100;

        data.put("weights", weights);
        data.put("values", values);
        data.put("capacity", capacity);

        return data;
    }

    /**
     * @function testKnapsack
     * @description Test function to demonstrate knapsack algorithms
     * @returns void
     */
    public static void testKnapsack() {
        System.out.println("=== Knapsack Problem Test ===");

        Map<String, Object> data = createSampleData();
        int[] weights = (int[]) data.get("weights");
        int[] values = (int[]) data.get("values");
        int capacity = (int) data.get("capacity");

        System.out.println("Sample data:");
        System.out.println("Weights: " + Arrays.toString(weights));
        System.out.println("Values: " + Arrays.toString(values));
        System.out.println("Capacity: " + capacity);
        System.out.println();

        // Test 0/1 Knapsack - Recursive
        System.out.println("0/1 Knapsack - Recursive:");
        long startTime = System.nanoTime();
        int recursiveResult = knapsack01Recursive(weights, values, capacity);
        long endTime = System.nanoTime();
        System.out.printf("Result: %d (%.2f ms)%n", recursiveResult, (endTime - startTime) / 1_000_000.0);
        System.out.println();

        // Test 0/1 Knapsack - DP
        System.out.println("0/1 Knapsack - DP:");
        startTime = System.nanoTime();
        int dpResult = knapsack01DP(weights, values, capacity);
        endTime = System.nanoTime();
        System.out.printf("Result: %d (%.2f ms)%n", dpResult, (endTime - startTime) / 1_000_000.0);
        System.out.println();

        // Test 0/1 Knapsack - Optimized
        System.out.println("0/1 Knapsack - Optimized:");
        startTime = System.nanoTime();
        int optimizedResult = knapsack01Optimized(weights, values, capacity);
        endTime = System.nanoTime();
        System.out.printf("Result: %d (%.2f ms)%n", optimizedResult, (endTime - startTime) / 1_000_000.0);
        System.out.println();

        // Test 0/1 Knapsack with items
        System.out.println("0/1 Knapsack - Selected items:");
        List<Integer> selectedItems = knapsack01WithItems(weights, values, capacity);
        System.out.println("Selected items: " + selectedItems);
        System.out.println();

        // Test Fractional Knapsack
        System.out.println("Fractional Knapsack:");
        startTime = System.nanoTime();
        double fractionalResult = knapsackFractional(weights, values, capacity);
        endTime = System.nanoTime();
        System.out.printf("Result: %.2f (%.2f ms)%n", fractionalResult, (endTime - startTime) / 1_000_000.0);
        System.out.println();

        // Test Unbounded Knapsack
        System.out.println("Unbounded Knapsack:");
        startTime = System.nanoTime();
        int unboundedResult = knapsackUnbounded(weights, values, capacity);
        endTime = System.nanoTime();
        System.out.printf("Result: %d (%.2f ms)%n", unboundedResult, (endTime - startTime) / 1_000_000.0);
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for knapsack algorithms
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 50, 100, 200, 500, 1000 };

        for (int size : sizes) {
            int[] weights = new int[size];
            int[] values = new int[size];
            int capacity = size * 10;

            // Generate random data
            Random random = new Random();
            for (int i = 0; i < size; i++) {
                weights[i] = random.nextInt(50) + 1;
                values[i] = random.nextInt(100) + 1;
            }

            System.out.println("Size: " + size + ", Capacity: " + capacity);

            // Test DP
            long startTime = System.nanoTime();
            knapsack01DP(weights, values, capacity);
            long endTime = System.nanoTime();
            System.out.printf("  DP: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            // Test Optimized
            startTime = System.nanoTime();
            knapsack01Optimized(weights, values, capacity);
            endTime = System.nanoTime();
            System.out.printf("  Optimized: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            System.out.println();
        }
    }

    /**
     * @function main
     * @description Main method to run the knapsack demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Knapsack Problem Algorithm Implementation");
        System.out.println("========================================");

        // Run basic tests
        testKnapsack();

        // Run performance test
        performanceTest();

        System.out.println("\nKnapsack problem completed successfully!");
    }
}
