
/**
 * @file longest_increasing_subsequence.java
 * @description Implementation of Longest Increasing Subsequence algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class longest_increasing_subsequence
 * @description Class containing Longest Increasing Subsequence algorithm
 *              implementation
 */
public class longest_increasing_subsequence {

    /**
     * @function lisDP
     * @description Dynamic programming implementation of LIS
     * @param arr int[] - Input array
     * @returns int - Length of longest increasing subsequence
     */
    public static int lisDP(int[] arr) {
        if (arr.length == 0)
            return 0;

        int n = arr.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (arr[j] < arr[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }

        return Arrays.stream(dp).max().orElse(0);
    }

    /**
     * @function lisWithSequence
     * @description LIS that returns the actual subsequence
     * @param arr int[] - Input array
     * @returns List<Integer> - Longest increasing subsequence
     */
    public static List<Integer> lisWithSequence(int[] arr) {
        if (arr.length == 0)
            return new ArrayList<>();

        int n = arr.length;
        int[] dp = new int[n];
        int[] parent = new int[n];
        Arrays.fill(dp, 1);
        Arrays.fill(parent, -1);

        int maxLength = 1;
        int maxIndex = 0;

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    parent[i] = j;
                }
            }
            if (dp[i] > maxLength) {
                maxLength = dp[i];
                maxIndex = i;
            }
        }

        // Reconstruct sequence
        List<Integer> sequence = new ArrayList<>();
        int current = maxIndex;
        while (current != -1) {
            sequence.add(arr[current]);
            current = parent[current];
        }

        Collections.reverse(sequence);
        return sequence;
    }

    /**
     * @function lisBinarySearch
     * @description LIS using binary search optimization
     * @param arr int[] - Input array
     * @returns int - Length of longest increasing subsequence
     */
    public static int lisBinarySearch(int[] arr) {
        if (arr.length == 0)
            return 0;

        List<Integer> tail = new ArrayList<>();
        tail.add(arr[0]);

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > tail.get(tail.size() - 1)) {
                tail.add(arr[i]);
            } else {
                int pos = binarySearch(tail, arr[i]);
                tail.set(pos, arr[i]);
            }
        }

        return tail.size();
    }

    /**
     * @function binarySearch
     * @description Binary search helper for LIS
     * @param tail List<Integer> - Tail array
     * @param key  int - Key to search for
     * @returns int - Position to insert/replace
     */
    private static int binarySearch(List<Integer> tail, int key) {
        int left = 0, right = tail.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tail.get(mid) < key) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }

    /**
     * @function lisWithSequenceBinarySearch
     * @description LIS with sequence using binary search
     * @param arr int[] - Input array
     * @returns List<Integer> - Longest increasing subsequence
     */
    public static List<Integer> lisWithSequenceBinarySearch(int[] arr) {
        if (arr.length == 0)
            return new ArrayList<>();

        List<Integer> tail = new ArrayList<>();
        List<Integer> indices = new ArrayList<>();
        int[] parent = new int[arr.length];
        Arrays.fill(parent, -1);

        tail.add(arr[0]);
        indices.add(0);

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > tail.get(tail.size() - 1)) {
                tail.add(arr[i]);
                indices.add(i);
                if (indices.size() > 1) {
                    parent[i] = indices.get(indices.size() - 2);
                }
            } else {
                int pos = binarySearch(tail, arr[i]);
                tail.set(pos, arr[i]);
                indices.set(pos, i);
                if (pos > 0) {
                    parent[i] = indices.get(pos - 1);
                }
            }
        }

        // Reconstruct sequence
        List<Integer> sequence = new ArrayList<>();
        int current = indices.get(indices.size() - 1);
        while (current != -1) {
            sequence.add(arr[current]);
            current = parent[current];
        }

        Collections.reverse(sequence);
        return sequence;
    }

    /**
     * @function lisStrictlyIncreasing
     * @description LIS for strictly increasing subsequence
     * @param arr int[] - Input array
     * @returns int - Length of longest strictly increasing subsequence
     */
    public static int lisStrictlyIncreasing(int[] arr) {
        if (arr.length == 0)
            return 0;

        List<Integer> tail = new ArrayList<>();
        tail.add(arr[0]);

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > tail.get(tail.size() - 1)) {
                tail.add(arr[i]);
            } else {
                int pos = binarySearch(tail, arr[i]);
                if (tail.get(pos) != arr[i]) {
                    tail.set(pos, arr[i]);
                }
            }
        }

        return tail.size();
    }

    /**
     * @function lisNonDecreasing
     * @description LIS for non-decreasing subsequence
     * @param arr int[] - Input array
     * @returns int - Length of longest non-decreasing subsequence
     */
    public static int lisNonDecreasing(int[] arr) {
        if (arr.length == 0)
            return 0;

        List<Integer> tail = new ArrayList<>();
        tail.add(arr[0]);

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] >= tail.get(tail.size() - 1)) {
                tail.add(arr[i]);
            } else {
                int pos = binarySearchNonDecreasing(tail, arr[i]);
                tail.set(pos, arr[i]);
            }
        }

        return tail.size();
    }

    /**
     * @function binarySearchNonDecreasing
     * @description Binary search for non-decreasing LIS
     * @param tail List<Integer> - Tail array
     * @param key  int - Key to search for
     * @returns int - Position to insert/replace
     */
    private static int binarySearchNonDecreasing(List<Integer> tail, int key) {
        int left = 0, right = tail.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tail.get(mid) <= key) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }

    /**
     * @function lisWithCount
     * @description LIS that returns count of all possible LIS
     * @param arr int[] - Input array
     * @returns int - Count of longest increasing subsequences
     */
    public static int lisWithCount(int[] arr) {
        if (arr.length == 0)
            return 0;

        int n = arr.length;
        int[] dp = new int[n];
        int[] count = new int[n];
        Arrays.fill(dp, 1);
        Arrays.fill(count, 1);

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (arr[j] < arr[i]) {
                    if (dp[j] + 1 > dp[i]) {
                        dp[i] = dp[j] + 1;
                        count[i] = count[j];
                    } else if (dp[j] + 1 == dp[i]) {
                        count[i] += count[j];
                    }
                }
            }
        }

        int maxLength = Arrays.stream(dp).max().orElse(0);
        int totalCount = 0;

        for (int i = 0; i < n; i++) {
            if (dp[i] == maxLength) {
                totalCount += count[i];
            }
        }

        return totalCount;
    }

    /**
     * @function createSampleData
     * @description Creates sample data for testing
     * @returns int[][] - Array of test cases
     */
    public static int[][] createSampleData() {
        return new int[][] {
                { 10, 9, 2, 5, 3, 7, 101, 18 },
                { 0, 1, 0, 3, 2, 3 },
                { 7, 7, 7, 7, 7, 7, 7 },
                { 1, 3, 6, 7, 9, 4, 10, 5, 6 },
                { 1, 2, 3, 4, 5 },
                { 5, 4, 3, 2, 1 },
                { 1 },
                {}
        };
    }

    /**
     * @function testLIS
     * @description Test function to demonstrate LIS algorithms
     * @returns void
     */
    public static void testLIS() {
        System.out.println("=== Longest Increasing Subsequence Test ===");

        int[][] testCases = createSampleData();

        for (int i = 0; i < testCases.length; i++) {
            int[] arr = testCases[i];
            System.out.println("Test case " + (i + 1) + ": " + Arrays.toString(arr));

            if (arr.length == 0) {
                System.out.println("Empty array - LIS length: 0");
                System.out.println();
                continue;
            }

            // Test DP
            long startTime = System.nanoTime();
            int dpResult = lisDP(arr);
            long endTime = System.nanoTime();
            System.out.printf("DP: %d (%.2f ms)%n", dpResult, (endTime - startTime) / 1_000_000.0);

            // Test Binary Search
            startTime = System.nanoTime();
            int binaryResult = lisBinarySearch(arr);
            endTime = System.nanoTime();
            System.out.printf("Binary Search: %d (%.2f ms)%n", binaryResult, (endTime - startTime) / 1_000_000.0);

            // Test with sequence
            List<Integer> sequence = lisWithSequence(arr);
            System.out.println("LIS sequence: " + sequence);

            // Test strictly increasing
            int strictResult = lisStrictlyIncreasing(arr);
            System.out.println("Strictly increasing: " + strictResult);

            // Test non-decreasing
            int nonDecreasingResult = lisNonDecreasing(arr);
            System.out.println("Non-decreasing: " + nonDecreasingResult);

            // Test count
            int countResult = lisWithCount(arr);
            System.out.println("Count of LIS: " + countResult);

            System.out.println();
        }
    }

    /**
     * @function performanceTest
     * @description Performance test for LIS algorithms
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 1000, 5000, 10000, 20000, 50000 };

        for (int size : sizes) {
            int[] arr = generateRandomArray(size);

            System.out.println("Array size: " + size);

            // Test DP
            long startTime = System.nanoTime();
            lisDP(arr);
            long endTime = System.nanoTime();
            System.out.printf("  DP: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            // Test Binary Search
            startTime = System.nanoTime();
            lisBinarySearch(arr);
            endTime = System.nanoTime();
            System.out.printf("  Binary Search: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            System.out.println();
        }
    }

    /**
     * @function generateRandomArray
     * @description Generates a random array of given size
     * @param size int - Size of array to generate
     * @returns int[] - Random array
     */
    private static int[] generateRandomArray(int size) {
        Random random = new Random();
        int[] arr = new int[size];

        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(1000);
        }

        return arr;
    }

    /**
     * @function main
     * @description Main method to run the LIS demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Longest Increasing Subsequence Algorithm Implementation");
        System.out.println("=====================================================");

        // Run basic tests
        testLIS();

        // Run performance test
        performanceTest();

        System.out.println("\nLongest Increasing Subsequence completed successfully!");
    }
}
