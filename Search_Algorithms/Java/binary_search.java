
/**
 * @file binary_search.java
 * @description Implementation of Binary Search algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class BinarySearch
 * @description Class containing Binary Search algorithm implementation
 */
public class binary_search {

    /**
     * @function binarySearch
     * @description Searches for a target value in a sorted array using binary
     *              search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int binarySearch(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    /**
     * @function binarySearchRecursive
     * @description Recursive implementation of binary search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int binarySearchRecursive(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }
        return binarySearchRecursive(arr, target, 0, arr.length - 1);
    }

    /**
     * @function binarySearchRecursive
     * @description Recursive helper method for binary search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @param left   int - Left boundary
     * @param right  int - Right boundary
     * @returns int - Index of target if found, -1 if not found
     */
    private static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1;
        }

        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }

    /**
     * @function findFirstOccurrence
     * @description Finds the first occurrence of target in array with duplicates
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @returns int - Index of first occurrence if found, -1 if not found
     */
    public static int findFirstOccurrence(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int left = 0;
        int right = arr.length - 1;
        int result = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                result = mid;
                right = mid - 1; // Continue searching in left half
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }

    /**
     * @function findLastOccurrence
     * @description Finds the last occurrence of target in array with duplicates
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @returns int - Index of last occurrence if found, -1 if not found
     */
    public static int findLastOccurrence(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int left = 0;
        int right = arr.length - 1;
        int result = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                result = mid;
                left = mid + 1; // Continue searching in right half
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }

    /**
     * @function findInsertPosition
     * @description Finds the position where target should be inserted to maintain
     *              sorted order
     * @param arr    int[] - Sorted array
     * @param target int - Value to insert
     * @returns int - Index where target should be inserted
     */
    public static int findInsertPosition(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return 0;
        }

        int left = 0;
        int right = arr.length;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
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
     * @function testBinarySearch
     * @description Test function to demonstrate binary search
     * @returns void
     */
    public static void testBinarySearch() {
        System.out.println("=== Binary Search Test ===");

        // Test case 1: Basic search
        int[] arr1 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int target1 = 5;
        System.out.println("Array: " + Arrays.toString(arr1));
        System.out.println("Searching for " + target1);
        int result1 = binarySearch(arr1, target1);
        System.out.println("Result: " + (result1 != -1 ? "Found at index " + result1 : "Not found"));
        System.out.println();

        // Test case 2: Search for non-existent element
        int target2 = 11;
        System.out.println("Searching for " + target2);
        int result2 = binarySearch(arr1, target2);
        System.out.println("Result: " + (result2 != -1 ? "Found at index " + result2 : "Not found"));
        System.out.println();

        // Test case 3: Array with duplicates
        int[] arr3 = { 1, 2, 2, 2, 3, 4, 5, 6, 7, 8 };
        int target3 = 2;
        System.out.println("Array with duplicates: " + Arrays.toString(arr3));
        System.out.println("Searching for " + target3);
        int firstOccurrence = findFirstOccurrence(arr3, target3);
        int lastOccurrence = findLastOccurrence(arr3, target3);
        System.out.println("First occurrence at index: " + firstOccurrence);
        System.out.println("Last occurrence at index: " + lastOccurrence);
        System.out.println();

        // Test case 4: Insert position
        int[] arr4 = { 1, 3, 5, 7, 9 };
        int target4 = 6;
        System.out.println("Array: " + Arrays.toString(arr4));
        System.out.println("Insert position for " + target4 + ": " + findInsertPosition(arr4, target4));
        System.out.println();

        // Test case 5: Recursive search
        int[] arr5 = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
        int target5 = 70;
        System.out.println("Array: " + Arrays.toString(arr5));
        System.out.println("Recursive search for " + target5);
        int result5 = binarySearchRecursive(arr5, target5);
        System.out.println("Result: " + (result5 != -1 ? "Found at index " + result5 : "Not found"));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for binary search
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
                binarySearch(arr, target);
                long endTime = System.nanoTime();

                double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
                System.out.printf("Array size %d, target %d: %.4f ms%n", size, target, duration);
            }
        }
    }

    /**
     * @function main
     * @description Main method to run the binary search demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Binary Search Algorithm Implementation");
        System.out.println("=====================================");

        // Run basic tests
        testBinarySearch();

        // Run performance test
        performanceTest();

        System.out.println("\nBinary Search completed successfully!");
    }
}
