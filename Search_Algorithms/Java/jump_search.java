
/**
 * @file jump_search.java
 * @description Implementation of Jump Search algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class JumpSearch
 * @description Class containing Jump Search algorithm implementation
 */
public class jump_search {

    /**
     * @function jumpSearch
     * @description Searches for a target value in a sorted array using jump search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int jumpSearch(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int n = arr.length;
        int step = (int) Math.sqrt(n);
        int prev = 0;

        // Find the block where target might be present
        while (arr[Math.min(step, n) - 1] < target) {
            prev = step;
            step += (int) Math.sqrt(n);
            if (prev >= n) {
                return -1;
            }
        }

        // Perform linear search in the found block
        while (arr[prev] < target) {
            prev++;
            if (prev == Math.min(step, n)) {
                return -1;
            }
        }

        // If target is found
        if (arr[prev] == target) {
            return prev;
        }

        return -1;
    }

    /**
     * @function jumpSearchWithStep
     * @description Jump search with custom step size
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @param step   int - Step size for jumping
     * @returns int - Index of target if found, -1 if not found
     */
    public static int jumpSearchWithStep(int[] arr, int target, int step) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int n = arr.length;
        int prev = 0;

        // Find the block where target might be present
        while (arr[Math.min(step, n) - 1] < target) {
            prev = step;
            step += step;
            if (prev >= n) {
                return -1;
            }
        }

        // Perform linear search in the found block
        while (arr[prev] < target) {
            prev++;
            if (prev == Math.min(step, n)) {
                return -1;
            }
        }

        // If target is found
        if (arr[prev] == target) {
            return prev;
        }

        return -1;
    }

    /**
     * @function jumpSearchRecursive
     * @description Recursive implementation of jump search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int jumpSearchRecursive(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int step = (int) Math.sqrt(arr.length);
        return jumpSearchRecursiveHelper(arr, target, 0, step);
    }

    /**
     * @function jumpSearchRecursiveHelper
     * @description Recursive helper method for jump search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @param prev   int - Previous position
     * @param step   int - Current step size
     * @returns int - Index of target if found, -1 if not found
     */
    private static int jumpSearchRecursiveHelper(int[] arr, int target, int prev, int step) {
        if (prev >= arr.length) {
            return -1;
        }

        int current = Math.min(step, arr.length) - 1;

        if (arr[current] < target) {
            return jumpSearchRecursiveHelper(arr, target, step, step + (int) Math.sqrt(arr.length));
        }

        // Perform linear search in the found block
        for (int i = prev; i <= current; i++) {
            if (arr[i] == target) {
                return i;
            }
        }

        return -1;
    }

    /**
     * @function jumpSearchWithCallback
     * @description Jump search with custom comparison function
     * @param arr       Object[] - Sorted array to search in
     * @param target    Object - Value to search for
     * @param compareFn Function - Comparison function
     * @returns int - Index of target if found, -1 if not found
     */
    public static int jumpSearchWithCallback(Object[] arr, Object target,
            java.util.function.BiFunction<Object, Object, Integer> compareFn) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int n = arr.length;
        int step = (int) Math.sqrt(n);
        int prev = 0;

        // Find the block where target might be present
        while (compareFn.apply(arr[Math.min(step, n) - 1], target) < 0) {
            prev = step;
            step += (int) Math.sqrt(n);
            if (prev >= n) {
                return -1;
            }
        }

        // Perform linear search in the found block
        while (compareFn.apply(arr[prev], target) < 0) {
            prev++;
            if (prev == Math.min(step, n)) {
                return -1;
            }
        }

        // If target is found
        if (compareFn.apply(arr[prev], target) == 0) {
            return prev;
        }

        return -1;
    }

    /**
     * @function printArray
     * @description Prints the elements of an array
     * @param arr int[] - Array to be printed
     * @returns void
     */
    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    /**
     * @function testJumpSearch
     * @description Test function to demonstrate jump search
     * @returns void
     */
    public static void testJumpSearch() {
        System.out.println("=== Jump Search Test ===");

        // Test case 1: Basic search
        int[] arr1 = { 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 };
        int target1 = 55;
        System.out.println("Array: " + Arrays.toString(arr1));
        System.out.println("Searching for " + target1);
        int result1 = jumpSearch(arr1, target1);
        System.out.println("Result: " + (result1 != -1 ? "Found at index " + result1 : "Not found"));
        System.out.println();

        // Test case 2: Search for non-existent element
        int target2 = 100;
        System.out.println("Searching for " + target2);
        int result2 = jumpSearch(arr1, target2);
        System.out.println("Result: " + (result2 != -1 ? "Found at index " + result2 : "Not found"));
        System.out.println();

        // Test case 3: With custom step
        int[] arr3 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 };
        int target3 = 7;
        System.out.println("Array: " + Arrays.toString(arr3));
        System.out.println("Searching for " + target3 + " with step 4");
        int result3 = jumpSearchWithStep(arr3, target3, 4);
        System.out.println("Result: " + (result3 != -1 ? "Found at index " + result3 : "Not found"));
        System.out.println();

        // Test case 4: Recursive search
        int[] arr4 = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
        int target4 = 70;
        System.out.println("Array: " + Arrays.toString(arr4));
        System.out.println("Recursive search for " + target4);
        int result4 = jumpSearchRecursive(arr4, target4);
        System.out.println("Result: " + (result4 != -1 ? "Found at index " + result4 : "Not found"));
        System.out.println();

        // Test case 5: String array
        String[] arr5 = { "apple", "banana", "cherry", "date", "elderberry", "fig", "grape" };
        String target5 = "cherry";
        System.out.println("String array: " + Arrays.toString(arr5));
        System.out.println("Searching for '" + target5 + "'");
        int result5 = jumpSearchWithCallback(arr5, target5, (a, b) -> ((String) a).compareTo((String) b));
        System.out.println("Result: " + (result5 != -1 ? "Found at index " + result5 : "Not found"));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for jump search
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 1000, 5000, 10000, 50000, 100000 };

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with sequential numbers
            for (int i = 0; i < size; i++) {
                arr[i] = i;
            }

            // Test with target at different positions
            int[] targets = { 0, size / 4, size / 2, 3 * size / 4, size - 1 };

            for (int target : targets) {
                long startTime = System.nanoTime();
                jumpSearch(arr, target);
                long endTime = System.nanoTime();

                double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
                System.out.printf("Array size %d, target %d: %.4f ms%n", size, target, duration);
            }
        }
    }

    /**
     * @function main
     * @description Main method to run the jump search demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Jump Search Algorithm Implementation");
        System.out.println("====================================");

        // Run basic tests
        testJumpSearch();

        // Run performance test
        performanceTest();

        System.out.println("\nJump Search completed successfully!");
    }
}
