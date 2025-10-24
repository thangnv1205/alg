
/**
 * @file linear_search.java
 * @description Implementation of Linear Search algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class LinearSearch
 * @description Class containing Linear Search algorithm implementation
 */
public class linear_search {

    /**
     * @function linearSearch
     * @description Searches for a target value in an array using linear search
     * @param arr    int[] - Array to search in
     * @param target int - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int linearSearch(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }

        return -1;
    }

    /**
     * @function linearSearchRecursive
     * @description Recursive implementation of linear search
     * @param arr    int[] - Array to search in
     * @param target int - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int linearSearchRecursive(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }
        return linearSearchRecursiveHelper(arr, target, 0);
    }

    /**
     * @function linearSearchRecursiveHelper
     * @description Recursive helper method for linear search
     * @param arr    int[] - Array to search in
     * @param target int - Value to search for
     * @param index  int - Current index
     * @returns int - Index of target if found, -1 if not found
     */
    private static int linearSearchRecursiveHelper(int[] arr, int target, int index) {
        if (index >= arr.length) {
            return -1;
        }

        if (arr[index] == target) {
            return index;
        }

        return linearSearchRecursiveHelper(arr, target, index + 1);
    }

    /**
     * @function findAllOccurrences
     * @description Finds all occurrences of target in array
     * @param arr    int[] - Array to search in
     * @param target int - Value to search for
     * @returns int[] - Array of indices where target is found
     */
    public static int[] findAllOccurrences(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return new int[0];
        }

        int count = 0;
        // First pass: count occurrences
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                count++;
            }
        }

        // Second pass: collect indices
        int[] indices = new int[count];
        int index = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                indices[index++] = i;
            }
        }

        return indices;
    }

    /**
     * @function linearSearchWithCallback
     * @description Linear search with custom comparison function
     * @param arr       Object[] - Array to search in
     * @param target    Object - Value to search for
     * @param compareFn Function - Comparison function
     * @returns int - Index of target if found, -1 if not found
     */
    public static int linearSearchWithCallback(Object[] arr, Object target,
            java.util.function.BiFunction<Object, Object, Boolean> compareFn) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        for (int i = 0; i < arr.length; i++) {
            if (compareFn.apply(arr[i], target)) {
                return i;
            }
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
     * @function testLinearSearch
     * @description Test function to demonstrate linear search
     * @returns void
     */
    public static void testLinearSearch() {
        System.out.println("=== Linear Search Test ===");

        // Test case 1: Basic search
        int[] arr1 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int target1 = 5;
        System.out.println("Array: " + Arrays.toString(arr1));
        System.out.println("Searching for " + target1);
        int result1 = linearSearch(arr1, target1);
        System.out.println("Result: " + (result1 != -1 ? "Found at index " + result1 : "Not found"));
        System.out.println();

        // Test case 2: Search for non-existent element
        int target2 = 11;
        System.out.println("Searching for " + target2);
        int result2 = linearSearch(arr1, target2);
        System.out.println("Result: " + (result2 != -1 ? "Found at index " + result2 : "Not found"));
        System.out.println();

        // Test case 3: Array with duplicates
        int[] arr3 = { 1, 2, 2, 2, 3, 4, 5, 6, 7, 8 };
        int target3 = 2;
        System.out.println("Array with duplicates: " + Arrays.toString(arr3));
        System.out.println("Searching for " + target3);
        int result3 = linearSearch(arr3, target3);
        System.out.println("First occurrence at index: " + result3);

        // Find all occurrences
        int[] allOccurrences = findAllOccurrences(arr3, target3);
        System.out.println("All occurrences at indices: " + Arrays.toString(allOccurrences));
        System.out.println();

        // Test case 4: Recursive search
        int[] arr4 = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
        int target4 = 70;
        System.out.println("Array: " + Arrays.toString(arr4));
        System.out.println("Recursive search for " + target4);
        int result4 = linearSearchRecursive(arr4, target4);
        System.out.println("Result: " + (result4 != -1 ? "Found at index " + result4 : "Not found"));
        System.out.println();

        // Test case 5: String array
        String[] arr5 = { "apple", "banana", "cherry", "date", "elderberry" };
        String target5 = "cherry";
        System.out.println("String array: " + Arrays.toString(arr5));
        System.out.println("Searching for '" + target5 + "'");
        int result5 = linearSearchWithCallback(arr5, target5, (a, b) -> a.equals(b));
        System.out.println("Result: " + (result5 != -1 ? "Found at index " + result5 : "Not found"));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for linear search
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
                linearSearch(arr, target);
                long endTime = System.nanoTime();

                double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
                System.out.printf("Array size %d, target %d: %.4f ms%n", size, target, duration);
            }
        }
    }

    /**
     * @function main
     * @description Main method to run the linear search demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Linear Search Algorithm Implementation");
        System.out.println("=====================================");

        // Run basic tests
        testLinearSearch();

        // Run performance test
        performanceTest();

        System.out.println("\nLinear Search completed successfully!");
    }
}
