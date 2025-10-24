
/**
 * @file insertion_sort.java
 * @description Implementation of Insertion Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class InsertionSort
 * @description Class containing Insertion Sort algorithm implementation
 */
public class insertion_sort {

    /**
     * @function insertionSort
     * @description Sorts an array using insertion sort algorithm
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            // Move elements of arr[0..i-1] that are greater than key
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    /**
     * @function insertionSortRecursive
     * @description Recursive implementation of insertion sort
     * @param arr int[] - Array to be sorted
     * @param n   int - Number of elements to sort
     * @returns void
     */
    public static void insertionSortRecursive(int[] arr, int n) {
        // Base case
        if (n <= 1) {
            return;
        }

        // Sort first n-1 elements
        insertionSortRecursive(arr, n - 1);

        // Insert last element at its correct position
        int last = arr[n - 1];
        int j = n - 2;

        while (j >= 0 && arr[j] > last) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = last;
    }

    /**
     * @function insertionSortWithCallback
     * @description Insertion sort with custom comparison function
     * @param arr       Object[] - Array to be sorted
     * @param compareFn Function - Comparison function
     * @returns void
     */
    public static void insertionSortWithCallback(Object[] arr,
            java.util.function.BiFunction<Object, Object, Integer> compareFn) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            Object key = arr[i];
            int j = i - 1;

            while (j >= 0 && compareFn.apply(arr[j], key) > 0) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    /**
     * @function binaryInsertionSort
     * @description Binary insertion sort using binary search to find insertion
     *              position
     * @param arr int[] - Array to be sorted
     * @returns void
     */
    public static void binaryInsertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int pos = binarySearchPosition(arr, key, 0, i - 1);

            // Shift elements to make space
            for (int j = i - 1; j >= pos; j--) {
                arr[j + 1] = arr[j];
            }
            arr[pos] = key;
        }
    }

    /**
     * @function binarySearchPosition
     * @description Binary search to find insertion position
     * @param arr   int[] - Array to search in
     * @param key   int - Key to insert
     * @param left  int - Left boundary
     * @param right int - Right boundary
     * @returns int - Insertion position
     */
    private static int binarySearchPosition(int[] arr, int key, int left, int right) {
        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] <= key) {
                left = mid + 1;
            } else {
                right = mid - 1;
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
     * @function testInsertionSort
     * @description Test function to demonstrate insertion sort
     * @returns void
     */
    public static void testInsertionSort() {
        System.out.println("=== Insertion Sort Test ===");

        // Test case 1: Random array
        int[] arr1 = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        insertionSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Already sorted array
        int[] arr2 = { 1, 2, 3, 4, 5 };
        System.out.println("Already sorted array: " + Arrays.toString(arr2));
        insertionSort(arr2);
        System.out.println("After sorting: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: Reverse sorted array
        int[] arr3 = { 5, 4, 3, 2, 1 };
        System.out.println("Reverse sorted array: " + Arrays.toString(arr3));
        insertionSort(arr3);
        System.out.println("After sorting: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: Array with duplicates
        int[] arr4 = { 3, 1, 4, 1, 5, 9, 2, 6, 5 };
        System.out.println("Array with duplicates: " + Arrays.toString(arr4));
        insertionSort(arr4);
        System.out.println("After sorting: " + Arrays.toString(arr4));
        System.out.println();

        // Test case 5: Recursive insertion sort
        int[] arr5 = { 7, 2, 1, 6, 8, 5, 3, 4 };
        System.out.println("Testing Recursive Insertion Sort:");
        System.out.println("Original array: " + Arrays.toString(arr5));
        insertionSortRecursive(arr5, arr5.length);
        System.out.println("Sorted array: " + Arrays.toString(arr5));
        System.out.println();

        // Test case 6: Binary insertion sort
        int[] arr6 = { 9, 3, 7, 1, 5, 8, 2, 6, 4 };
        System.out.println("Testing Binary Insertion Sort:");
        System.out.println("Original array: " + Arrays.toString(arr6));
        binaryInsertionSort(arr6);
        System.out.println("Sorted array: " + Arrays.toString(arr6));
        System.out.println();

        // Test case 7: String array
        String[] arr7 = { "banana", "apple", "cherry", "date" };
        System.out.println("String array: " + Arrays.toString(arr7));
        insertionSortWithCallback(arr7, (a, b) -> ((String) a).compareTo((String) b));
        System.out.println("Sorted string array: " + Arrays.toString(arr7));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for insertion sort
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 100, 500, 1000, 2000 };

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with random numbers
            for (int i = 0; i < size; i++) {
                arr[i] = (int) (Math.random() * 1000);
            }

            long startTime = System.nanoTime();
            insertionSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the insertion sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Insertion Sort Algorithm Implementation");
        System.out.println("=======================================");

        // Run basic tests
        testInsertionSort();

        // Run performance test
        performanceTest();

        System.out.println("\nInsertion Sort completed successfully!");
    }
}
